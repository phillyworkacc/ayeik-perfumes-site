"use server"
import { websiteConfig } from "@/config/websiteConfig";
import { dalDbOperation } from "@/dal/helpers";
import { db } from "@/db";
import { orderLinesTable, ordersTable, productsTable, usersTable } from "@/db/schemas";
import { shippoFetch } from "@/lib/shippo";
import { ShippoParcelMeasurements } from "@/utils/parcelSizes";
import { and, eq, isNotNull, isNull } from "drizzle-orm";
import { getCurrentUser } from "./user";
import { ShippoShipment, ShippoTransaction } from "@/shippoTypes";
import { Order, OrderLineItem } from "@/types";
import { sendOrderTrackableEmail } from "@/lib/email/emailService";
import { titleCase } from "@/lib/str";
import { royalMailFetch } from "@/lib/royalMail";
import { revalidatePath } from "next/cache";

// IMPORTANT: Commented code is for shippo shipping
// export async function getShippoShippingRates (orderId: string, parcelProfile: ShippoParcelMeasurements) {
//    try {
//       // only admins can use this endpoint
//       const currentUser = await getCurrentUser();
//       if (!currentUser) {
//          return {
//             success: false,
//             error: "Admin Not Found",
//             data: undefined
//          }
//       }

//       if (currentUser.userType !== "admin") {
//          return {
//             success: false,
//             error: "No Access",
//             data: undefined
//          }
//       }

//       // get the order and return error if order doesn't exist
//       const [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId)).limit(1);
//       if (!order) {
//          return {
//             success: false,
//             error: "Order Not Found",
//             data: undefined
//          }
//       }

//       // get the user that owns the order
//       const [user] = await db.select().from(usersTable).where(eq(usersTable.userid, order.userId)).limit(1);
//       if (!user) {
//          return {
//             success: false,
//             error: "User Not Found",
//             data: undefined
//          }
//       }
      
//       const shipment = await shippoFetch<ShippoShipment>("/shipments/", {
//          method: "POST",
//          body: JSON.stringify({
//             address_from: {
//                name: websiteConfig.name,
//                street1: websiteConfig.shippingInformation.addressLine1,
//                street2: websiteConfig.shippingInformation.addressLine2 || undefined,
//                city: websiteConfig.shippingInformation.city,
//                zip: websiteConfig.shippingInformation.postcode,
//                country: "GB",
//                email: websiteConfig.shippingInformation.email,
//                phone: websiteConfig.shippingInformation.phone,
//             },
//             address_to: {
//                name: user.name,
//                street1: order.addressLine1,
//                street2: order.addressLine2 || undefined,
//                city: order.addressCity,
//                zip: order.addressPostcode,
//                country: "GB",
//                email: order.email,
//                phone: "",
//             },
//             parcels: [parcelProfile],
//             // Important: wait until rates are returned
//             async: false,
//             metadata: `Order ${order.orderId}`,
//          }),
//       });

//       // Save shipment id to the order, so we know what order the shipment is for
//       const result = await dalDbOperation(async () => {
//          const res = await db.update(ordersTable)
//             .set({ shippoShipmentId: shipment.object_id })
//             .where(eq(ordersTable.orderId, orderId));
//          return (res.rowCount === 1);
//       })

//       if (!result.success || !result.data) {
//          return {
//             success: false,
//             error: "Failed to update order with shipment info",
//             data: undefined
//          }
//       }

//       return {
//          success: true,
//          error: undefined,
//          data: {
//             shipmentId: shipment.object_id,
//             rates: shipment.rates,
//          }
//       }
//    } catch (error) {
//       console.error(error);
//       return {
//          success: false,
//          error: "Failed to get shipping rates",
//          data: undefined
//       }
//    }
// }

// export async function buyShippoShippingRates (orderId: string, rateId: string) {
//    try {
//       // only admins can use this endpoint
//       const currentUser = await getCurrentUser();
//       if (!currentUser) {
//          return {
//             success: false,
//             error: "Admin Not Found",
//             data: undefined
//          }
//       }

//       if (currentUser.userType !== "admin") {
//          return {
//             success: false,
//             error: "No Access",
//             data: undefined
//          }
//       }

//       if (!orderId) {
//          return {
//             success: false,
//             error: "No Order Id",
//             data: undefined
//          }
//       }

//       if (!rateId) {
//          return {
//             success: false,
//             error: "Shipping Rate Required",
//             data: undefined
//          }
//       }

//       // get the order and return error if order doesn't exist
//       const [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId)).limit(1);
//       if (!order) {
//          return {
//             success: false,
//             error: "Order Not Found",
//             data: undefined
//          }
//       }
//       if (order.shippoTransactionId) {
//          return {
//             success: false,
//             error: "This order already has a shipping label",
//             data: undefined
//          }
//       }

//       // create a shippo transaction
//       const transaction = await shippoFetch<ShippoTransaction>("/transactions/", {
//          method: "POST",
//          body: JSON.stringify({
//             rate: rateId,
//             async: false,
//             label_file_type: "PDF_4x6", // Good size for thermal shipping printing
//             metadata: `Order #${orderId}`,
//          }),
//       });

//       if (transaction.status !== "SUCCESS") {
//          console.error("Shippo label error:", transaction.messages);
//          return {
//             success: false,
//             error: "Shippo failed to create label",
//             data: undefined
//          }
//       }
      
//       const updatedOrder = await dalDbOperation(async () => {
//          const res = await db.update(ordersTable)
//             .set({
//                shippoTransactionId: transaction?.object_id,
//                shippingProvider: transaction?.rate?.provider,
//                shippingService: transaction?.rate?.servicelevel_name,
//                trackingNumber: transaction?.tracking_number!,
//                trackingUrl: transaction?.tracking_url_provider,
//                shippingLabelUrl: transaction?.label_url,
//                shippingStatus: "label_created",
//             }).where(eq(ordersTable.orderId, orderId));
//          return (res.rowCount === 1);
//       })

//       if (!updatedOrder.success || !updatedOrder.data) {
//          return {
//             success: false,
//             error: "Failed to update order with new shipment rate info",
//             data: undefined
//          }
//       }

//       if (updatedOrder.success) {
//          const [orderOwner] = await db.select().from(usersTable).where(eq(usersTable.userid, order.userId)).limit(1);
//          await sendOrderTrackableEmail({
//             to: order.email,
//             customerName: orderOwner.name,
//             orderId: titleCase(order.orderId.split("-")[0]),
//             carrier: transaction?.rate?.provider!,
//             trackingNumber: transaction?.tracking_number!,
//             trackingUrl: transaction?.tracking_url_provider!
//          })
//       }

//       return {
//          success: true,
//          error: undefined,
//          data: {
//             shippingProvider: transaction.rate?.provider,
//             shippingService: transaction.rate?.servicelevel_name,
//             shippoTransactionId: transaction.object_id,
//             shippingLabelUrl: transaction.label_url,
//             trackingNumber: transaction.tracking_number,
//             trackingUrl: transaction.tracking_url_provider,
//          }
//       }

//    } catch (err) {
//       console.error(err);
//       return {
//          success: false,
//          error: "Failed to buy shipping rates",
//          data: undefined
//       }
//    }
// }

export async function getOrderLineInfo (orderId: string): Promise<OrderLineItem[] | false> {
   try {
      // only admins can use this endpoint
      const currentUser = await getCurrentUser();
      if (!currentUser) return false;
      if (!orderId) return false;

      const orderLineItems = await dalDbOperation(async () => {
         const results = await db
            .select({
               product: {
                  productId: productsTable.productId,
                  name: productsTable.name,
                  images: productsTable.images,
               },
               quantity: orderLinesTable.quantity,
               price: orderLinesTable.price, // this is in pennies
            })
            .from(orderLinesTable)
            .innerJoin(productsTable, eq(productsTable.productId, orderLinesTable.productId))
            .where(eq(orderLinesTable.orderId, orderId));
         
         return results;
      })

      if (orderLineItems.success) {
         return orderLineItems.data as any[];
      } else {
         return false;
      }
   } catch (err) {
      console.error(err);
      return false;
   }
}

type CreateRoyalMailShipmentInput = {
   orderId: string;
   customer: {
      fullName: string;
      email: string;
      phone?: string;
      addressLine1: string;
      addressLine2?: string;
      addressLine3?: string;
      city: string;
      county?: string;
      postcode: string;
      countryCode: string;
   };
   parcel: {
      weightInGrams: number;
      packageFormatIdentifier: string;
   };
   serviceCode: string;
   cost: {
      subtotal: number;
      shippingCharged: number;
      total: number;
   }
};

export async function createRoyalMailShipment(input: CreateRoyalMailShipmentInput) {
   const response = await royalMailFetch("/orders", {
      method: "POST",
      body: JSON.stringify({
         items: [{
            orderReference: input.orderId,
            isRecipientABusiness: false,
            recipient: {
               address: {
                  fullName: input.customer.fullName,
                  addressLine1: input.customer.addressLine1,
                  addressLine2: input.customer.addressLine2 ?? "",
                  addressLine3: input.customer.addressLine3 ?? "",
                  city: input.customer.city,
                  county: input.customer.county ?? "",
                  postcode: input.customer.postcode,
                  countryCode: input.customer.countryCode,
               },
               emailAddress: input.customer.email,
               phoneNumber: input.customer.phone ?? "",
            },
            packages: [{
               weightInGrams: input.parcel.weightInGrams,
               packageFormatIdentifier: input.parcel.packageFormatIdentifier,
            }],
            postageDetails: {
               serviceCode: input.serviceCode,
               sendNotificationsTo: "recipient",
               receiveEmailNotification: true,
               receiveSmsNotification: false,
            },
            label: {
               includeLabelInResponse: true,
               includeCN: false,
               includeReturnsLabel: false,
            },
            subtotal: input.cost.subtotal,
            shippingCostCharged: input.cost.shippingCharged,
            total: input.cost.total,
            orderDate: new Date().toISOString(),
         }],
      }),
   });

   const data = await response.json();
   if (data.failedOrders?.length) {
      throw new Error(
         JSON.stringify(data.failedOrders[0].errors)
      );
   }

   const shipment = data.createdOrders?.[0];
   if (!shipment) {
      throw new Error("Royal Mail did not create the shipment.");
   }

   return {
      royalMailOrderId: shipment.orderIdentifier,
      trackingNumber: shipment.trackingNumber,
      labelBase64: shipment.label,
   };
}

export async function createRoyalMailOrder (order: Order, serviceCode: string, weight: number) {
   try {
      const [orderOwner] = await db.select().from(usersTable).where(eq(usersTable.userid, order.userId)).limit(1);
      if (!orderOwner) {
         throw new Error("User not found");
      }
      
      // create shipment in royal mail
      const shipment = await createRoyalMailShipment({
         orderId: `TEST-${order.orderId}`.substring(0,40),
         customer: {
            fullName: orderOwner.name,
            email: orderOwner.email,
            phone: "",
            addressLine1: order.addressLine1,
            addressLine2: order.addressLine2,
            city: order.addressCity,
            postcode: order.addressPostcode,
            countryCode: "GB",
         },
         parcel: {
            weightInGrams: weight * 1000,
            packageFormatIdentifier: "Parcel",
         },
         serviceCode,
         cost: {
            total: order.total/100,
            shippingCharged: order.shippingCharged! / 100,
            subtotal: (order.total - order.shippingCharged!) / 100
         }
      });

      // update order table in db
      const updatedOrder = await db
         .update(ordersTable)
         .set({
            royalMailOrderId: shipment.royalMailOrderId,
            trackingNumber: shipment.trackingNumber,
            shippingCarrier: "Royal Mail",
            shippingService: serviceCode,
            shippingStatus: "shipping_initiated"
         }).where(eq(ordersTable.orderId, order.orderId));


      return (updatedOrder.rowCount == 1) ? shipment.royalMailOrderId : false;
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function getRoyalMailLabel(royalMailOrderId: number) {
   const url =
      `/orders/${royalMailOrderId}/label` +
      `?documentType=postageLabel` +
      `&includeReturnsLabel=false` +
      `&includeCN=false`;

   const response = await royalMailFetch(url, {
      method: "GET",
      headers: {
         Authorization: process.env.ROYAL_MAIL_API_KEY!,
      },
   });

   return response.arrayBuffer();
}

export async function getRoyalMailTracking(trackingNumber: string) {
   const response = await fetch(`${process.env.ROYAL_MAIL_TRACKING_BASE_URL}/${trackingNumber}/events`, {
      headers: {
         "X-IBM-Client-Id": process.env.ROYAL_MAIL_TRACKING_CLIENT_ID!,
         "X-IBM-Client-Secret": process.env.ROYAL_MAIL_TRACKING_CLIENT_SECRET!,
      },
      next: { revalidate: 300 },
   });

   if (!response.ok) {
      throw new Error(`Royal Mail tracking failed: ${response.status}`);
   }

   return response.json();
}

type RoyalMailOrder = {
   orderIdentifier: number;
   orderReference: string;
   trackingNumber?: string;
   packages?: {
      packageNumber: number;
      trackingNumber?: string;
   }[];
};

export async function syncRoyalMailTracking(orderId: string) {
   try {
      const [order] = await db.select({
         orderId: ordersTable.orderId,
         royalMailOrderId: ordersTable.royalMailOrderId,
      }).from(ordersTable).where(eq(ordersTable.orderId, orderId)).limit(1);
      if (!order) {
         return {
            success: false,
            message: "Order not found",
         };
      }

      if (!order.royalMailOrderId) {
         return {
            success: false,
            message: "This order has not been sent to Royal Mail",
         };
      }

      const response = await royalMailFetch(`/orders/${order.royalMailOrderId}`);
      if (!response.ok) {
         const error = await response.text();
         console.error(error);
         return {
            success: false,
            message: "Could not retrieve Royal Mail order",
         };
      }

      const data: RoyalMailOrder[] = await response.json();
      const royalMailOrder = data[0];
      if (!royalMailOrder) {
         return {
            success: false,
            message: "Royal Mail order not found",
         };
      }

      const trackingNumber = royalMailOrder.trackingNumber || royalMailOrder.packages?.[0]?.trackingNumber;
      if (!trackingNumber) {
         return {
            success: false,
            message: "Tracking number has not been generated yet. Make sure postage has been paid.",
         };
      }

      const updated = await db.update(ordersTable).set({
         trackingNumber,
      }).where(eq(ordersTable.orderId, orderId));

      if (updated.rowCount == 1) {
         revalidatePath(`/admin/orders/${orderId}`);
         revalidatePath(`/orders/${orderId}`);
         return {
            success: true,
            trackingNumber,
         };
      } else {
         return {
            success: false,
            message: "Failed to update order with tracking number",
         }
      }
   } catch (error) {
      console.error(error);
      return {
         success: false,
         message: "Failed to sync Royal Mail tracking",
      };
   }
}

function chunk<T>(array: T[], size: number) {
   const chunks: T[][] = [];
   for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
   }
   return chunks;
}

export async function syncAllRoyalMailTracking() {
   try {
      // Only get Royal Mail orders which don't have tracking yet
      const orders = await db
         .select({
            orderId: ordersTable.orderId,
            royalMailOrderId: ordersTable.royalMailOrderId,
         })
         .from(ordersTable)
         .where(and(
            isNotNull(ordersTable.royalMailOrderId),
            isNull(ordersTable.trackingNumber)
         ));

      if (orders.length === 0) {
         return {
            success: true,
            synced: 0,
            message: "No orders need syncing",
         };
      }

      // Royal Mail supports maximum 100 identifiers per request
      const batches = chunk(orders, 100);
      let synced = 0;
      for (const batch of batches) {
         const ids = batch.map((order) => order.royalMailOrderId).join(";");
         const response = await royalMailFetch(`/orders/${ids}`);
         if (!response.ok) {
            const error = await response.text();
            console.error("Royal Mail sync error:", error);
            continue;
         }

         const royalMailOrders: RoyalMailOrder[] =
         await response.json();

         // Makes matching Royal Mail -> local DB fast
         const orderMap = new Map(
            batch.map((order) => [
               String(order.royalMailOrderId),
               order,
            ])
         );

         for (const royalMailOrder of royalMailOrders) {
            const localOrder = orderMap.get(String(royalMailOrder.orderIdentifier));
            if (!localOrder) continue;

            const trackingNumber = royalMailOrder.trackingNumber || royalMailOrder.packages?.[0]?.trackingNumber;
            if (!trackingNumber) {
               // Probably hasn't been paid for yet
               continue;
            }

            await db.update(ordersTable).set({
               trackingNumber,
            }).where(eq(ordersTable.orderId, localOrder.orderId));

            synced++;
         }
      }

      revalidatePath("/admin/orders");

      return {
         success: true,
         synced,
         message: `Synced ${synced} Royal Mail orders`,
      };
   } catch (error) {
      console.error(error);
      return {
         success: false,
         synced: 0,
         message: "Failed to sync Royal Mail orders",
      };
   }
}