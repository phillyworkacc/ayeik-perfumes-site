import { InferSelectModel } from "drizzle-orm";
import { collectionsTable, discountsTable, orderLinesTable, ordersTable, productsTable, pushNotificationsTable, reviewsTable, usersTable } from "./db/schemas";


export type User = InferSelectModel<typeof usersTable>;

export type Product = InferSelectModel<typeof productsTable>;
export type Collection = InferSelectModel<typeof collectionsTable>;
export type Order = InferSelectModel<typeof ordersTable>;
export type OrderLine = InferSelectModel<typeof orderLinesTable>;
export type Discount = InferSelectModel<typeof discountsTable>;

export type Review = InferSelectModel<typeof reviewsTable>;

export type PushNotifications = InferSelectModel<typeof pushNotificationsTable>;

export type CheckoutItem = {
   productId: string;
   name: string;
   quantity: number;
   price: number; // in pence
}
export type CartItem = {
   productId: string;
   quantity: number;
}
export type FullCartItem = {
   product: Product;
   quantity: number;
}
export type Cart = CartItem[];
export type FullCart = FullCartItem[];

export type OrderLineItem = {
   product: {
      productId: string;
      name: string;
      images: string;
   };
   quantity: number;
   price: number;
}