import { CheckoutItem } from "@/types";
import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
   id: serial("id").primaryKey(),
   userid: text("userid").notNull(),
   stripeCustomerId: text("stripe_customer_id").notNull().default(""),
   name: text("name").notNull(),
   email: text("email").notNull(),
   addressLine1: text("address_line1").notNull().default(""),
   addressLine2: text("address_line2").notNull().default(""),
   addressCity: text("address_city").notNull().default(""),
   addressPostcode: text("address_postcode").notNull().default(""),
   userType: text("user_type").notNull(),
   password: text("password").notNull(),
   createdAt: text("created_at").notNull()
});

export const productsTable = pgTable("products", {
   id: serial("id").primaryKey(),
   productId: text("product_id").notNull(),
   name: text("name").notNull(),
   description: text("description").notNull(),
   images: text("images").notNull(),
   stock: integer("stock").notNull(),
   price: integer("price").notNull(),
   collections: text("collections").array().default([]).notNull(),
   createdAt: text("created_at").notNull()
});

export const collectionsTable = pgTable("collections", {
   id: serial("id").primaryKey(),
   collectionId: text("collection_id").unique(),
   name: text("name").notNull(),
   description: text("description").notNull(),
   createdAt: text("created_at").notNull()
})

export const ordersTable = pgTable("orders", {
   id: serial("id").primaryKey(),
   orderId: text("order_id").notNull(),
   stripeSessionId: text("stripe_session_id").notNull().unique(),
   stripePaymentIntentId: text("stripe_payment_intent_id"),
   userId: text("userid").notNull(),
   email: text("email").notNull(),
   addressLine1: text("address_line1").notNull().default(""),
   addressLine2: text("address_line2").notNull().default(""),
   addressCity: text("address_city").notNull().default(""),
   addressPostcode: text("address_postcode").notNull().default(""),
   royalMailOrderId: integer("royal_mail_order_id"),
   trackingNumber: text("tracking_number"),
   shippingCarrier: text("shipping_carrier"),
   shippingService: text("shipping_service"),
   shippingCharged: integer("shipping_cost").default(0),
   shippingStatus: text("shipping_status").default("not_shipped"),
   status: text("status").notNull(),
   total: integer("total").notNull(),
   createdAt: text("created_at").notNull()
});

export const orderLinesTable = pgTable("order_lines", {
   id: serial("id").primaryKey(),
   orderId: text("order_id").notNull(),
   productId: text("product_id").notNull(),
   name: text("name").notNull(),
   price: integer("price").notNull(),
   quantity: integer("quantity").notNull()
});

export const discountsTable = pgTable("discounts", {
   id: serial("id").primaryKey(),
   discountId: text("discount_id").notNull(),
   code: text("code").notNull(),
   amount: integer("amount"),
   percentage: integer("percentage"),
   createdAt: text("created_at").notNull()
});

export const reviewsTable = pgTable("reviews", {
   id: serial("id").primaryKey(),
   name: text("name"),
   email: text("email"),
   review: text("review"),
   createdAt: text("created_at").notNull()
})

export const pushNotificationsTable = pgTable("push_notifications", {
   id: serial("id").primaryKey(),
   userId: text("user_id"),
   subscription: jsonb("subscription"),
   createdAt: text("created_at"),
   updatedAt: text("updated_at")
})

export const checkoutSessionsTable = pgTable("checkout_sessions", {
   checkoutId: text("checkout_id").primaryKey(),
   stripeSessionId: text("stripe_session_id").unique(),
   items: jsonb("items").$type<CheckoutItem[]>().notNull(),
   total: integer("total").notNull(),
   completed: boolean("completed").notNull().default(false),
   createdAt: timestamp("created_at").notNull().defaultNow(),
});