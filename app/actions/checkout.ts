"use server"
import { and, eq, gte, sql } from "drizzle-orm";
import { checkoutSessionsTable, ordersTable, orderLinesTable, usersTable, productsTable } from "@/db/schemas";
import { db } from "@/db";
import { uuid } from "@/utils/uuid";
import Stripe from "stripe";
import { sendOrderCreatedEmail } from "@/lib/email/emailService";
import { pluralSuffixer, titleCase } from "@/lib/str";
import { getSubscriptionsForAdmins } from "./notifications";
import webpush from "@/utils/webpush";

export async function fulfillCheckout(session: Stripe.Checkout.Session) {
   try {
      // This is the actual important check
      // Only fulfill if stripe says payment has been made
      console.log(session);
      if (session.payment_status !== "paid") return;
   
      const checkoutId = session.client_reference_id;
      if (!checkoutId) {
         console.log("Checkout does not have a reference ID")
         throw new Error("Checkout does not have a reference ID");
      }
   
      const [checkout] = await db.select().from(checkoutSessionsTable)
         .where(eq(checkoutSessionsTable.checkoutId, checkoutId)).limit(1);
      if (!checkout) {
         console.log("Checkout record not found")
         throw new Error("Checkout record not found");
      }

      // get user from the stripe session
      const stripeCustomerEmail = session.customer_details?.email!;
      const [user] = await db.select().from(usersTable).where(eq(usersTable.email, stripeCustomerEmail!)).limit(1);
      if (!user) {
         console.log("Customer not found")
         throw new Error("Customer not found");
      }
   
      // Stripe can retry webhook events.
      // Therefore the function MUST be idempotent.
      const shippingCharged = session.shipping_cost?.amount_total ?? 0;
      const orderId = `order_${uuid()}`;
      await db.transaction(async tx => {
         // insert the order
         const insertedOrder = await tx.insert(ordersTable).values({
            orderId,
            stripeSessionId: session.id,
            stripePaymentIntentId:
               typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id,
            userId: user.userid,
            email: session.customer_details?.email ?? "",
            addressLine1: user.addressLine1,
            addressLine2: user.addressLine2,
            addressCity: user.addressCity,
            addressPostcode: user.addressPostcode,
            shippingCharged,
            total: session.amount_total ?? checkout.total,
            status: "paid",
            createdAt: Date.now().toString()
         }).onConflictDoNothing({
            // VERY IMPORTANT
            // Stops Stripe webhook retries from
            // creating the same order twice.
            target: ordersTable.stripeSessionId,
         }).returning();
   
         //  If nothing was inserted, this order was already processed.
         if (!insertedOrder.length) return;
   
         // add order lines
         await tx.insert(orderLinesTable).values(
            checkout.items.map(item => ({
               orderItemId: `order_line_${uuid()}`,
               orderId,
               productId: item.productId,
               name: item.name,
               quantity: item.quantity,
               price: item.price,
            }))
         );

         // reduce the stock
         for (const item of checkout.items) {
            const updatedProducts = await tx.update(productsTable)
               .set({ stock:sql`${productsTable.stock} - ${item.quantity}` })
               .where(and(
                  eq(productsTable.productId, item.productId),
                  gte(productsTable.stock, item.quantity)
               ))
               .returning({ productId: productsTable.productId });

            if (!updatedProducts.length) {
               throw new Error(`Insufficient stock for ${item.name}`);
            }  
         }
   
         await tx.update(checkoutSessionsTable).set({ completed: true, })
            .where(eq(checkoutSessionsTable.checkoutId,checkoutId));
         
      });

      // Send customer an email to notify them about their order
      await sendOrderCreatedEmail({
         to: user.email,
         customerName: user.name,
         orderId: titleCase(orderId.split("-")[0]),
         items: checkout.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
         })),
         orderUrl: `/account/order/${orderId}`,
         subtotal: (session.amount_total ?? checkout.total) - (session.shipping_cost?.amount_total ?? 0),
         shipping: session.shipping_cost?.amount_total ?? 0,
         total: session.amount_total ?? checkout.total,
         shippingAddress: {
            name: user.name,
            line1: user.addressLine1,
            city: user.addressCity,
            postcode: user.addressPostcode,
            country: "United Kingdom",
         },
      })

      // Notify Admin of a new order
      const adminSubscriptions: any[] = await getSubscriptionsForAdmins();
      for (const adminSubscription of adminSubscriptions) {
         await webpush.sendNotification(
            adminSubscription.subscription as any,
            JSON.stringify({
               title: "New Order",
               body: `You have a new order for ${checkout.items.length} ${pluralSuffixer('item', checkout.items.length, 's')} from ${user.name}`,
               url: `/admin/all-orders`
            })
         );
      }

      console.log(`Order ${orderId} successfully created`);

      return true;
   } catch (err) {
      console.error(err);
      return false;
   }
}