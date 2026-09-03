import { getCurrentUser } from "@/app/actions/user";
import priceCalculator from "@/config/priceCalculatorV2";
import { db } from "@/db";
import { checkoutSessionsTable, productsTable } from "@/db/schemas";
import { stripe } from "@/lib/stripe";
import { CartItem, CheckoutItem } from "@/types";
import { uuid } from "@/utils/uuid";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
   try {
      const body = await req.json();
      const cart = body.cart as CartItem[];

      // if the cart is empty return an error
      if (!cart?.length) {
         return NextResponse.json({ error: "Cart is empty", success: false, data: undefined }, { status: 400 })
      }

      // validate item quantities
      for (const item of cart) {
         if (!item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0) {
            return NextResponse.json({ error: "Invalid Cart", success: false, data: undefined }, { status: 400 });
         }
      }

      // Get Products from Database
      const productIds = cart.map(item => item.productId);
      const products = await db.select().from(productsTable)
         .where(inArray(productsTable.productId, productIds));

      // Validate Cart length with products found
      if (products.length !== productIds.length) {
         return NextResponse.json({ error: "One or more products do not exist", success: false, data: undefined }, { status: 400 });
      }

      // calculate the full checkout items
      const checkoutItems: CheckoutItem[] = cart.map(cartItem => {
         const product = products.find(p => p.productId === cartItem.productId);
         if (!product) {
            throw new Error("Product not found");
         }

         // Check if the product has enough stock for it
         if (product.stock < cartItem.quantity) {
            throw new Error(`${product.name} does not have enough stock`);
         }

         // Round price to pennies for stripe payments
         const price = Math.round(Number(product.price) * 100);
         return {
            productId: product.productId,
            name: product.name,
            quantity: cartItem.quantity,
            price
         };
      });

      // add deals from the reselling user
      const newCheckOutItems = priceCalculator(checkoutItems);

      // calculate total price
      const totalPrice = checkoutItems.reduce((total, item) => {
         return total + (item.price * item.quantity)
      }, 0);
      const checkoutId = uuid().replaceAll("-","");
      
      // get current user
      const user = await getCurrentUser();
      if (!user) return NextResponse.json({ success: false, data: undefined, error: "No User Found" }, { status: 400 });
      if (!user.stripeCustomerId) return NextResponse.json({ success: false, data: undefined, error: "Stripe Customer Not Found" }, { status: 400 });

      // get stripe session
      const session = await stripe.checkout.sessions.create({
         mode: "payment",
         customer: user.stripeCustomerId,
         shipping_options: [
            { 
               shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: 399, currency: "gbp" }, // £3.99 
                  display_name: "Standard Delivery",
                  delivery_estimate: {
                     minimum: { unit: "business_day", value: 2 },
                     maximum: { unit: "business_day", value: 4, },
                  },
               },
            },
            {
               shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: 699, currency: "gbp" }, // £6.99 
                  display_name: "Express Delivery",
                  delivery_estimate: {
                     minimum: { unit: "business_day", value: 1 },
                     maximum: { unit: "business_day", value: 2, },
                  },
               },
            },
         ],
         client_reference_id: checkoutId,
         line_items: newCheckOutItems.newCheckOutItems!.map(item => ({
            quantity: item.quantity,
            price_data: {
               currency: "gbp",
               unit_amount: item.price,
               product_data: {
                  name: item.name,
               },
            },
         })),
        /* Useful for physical products */
         shipping_address_collection: { allowed_countries: ["GB"] },
         phone_number_collection: { enabled: false },
         success_url:
            `${process.env.NEXT_PUBLIC_SITE_URL}` +
            `/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      });
      

      // save checkout session
      await db.insert(checkoutSessionsTable).values({
         checkoutId,
         stripeSessionId: session.id,
         items: checkoutItems,
         total: newCheckOutItems.price
      })

      // return success
      return NextResponse.json({ success: true, data: session.url, error: undefined }, { status: 200 });
   } catch (err) {
      console.error(err);
      return NextResponse.json({ success: false, data: undefined, error: "Failed to create checkout" }, { status: 500 });
   } 
}