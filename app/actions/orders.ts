"use server"
import { dalDbOperation, dalRequireAdmin, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { ordersTable } from "@/db/schemas";
import { Order } from "@/types";
import { eq } from "drizzle-orm";


export async function getAllOrders (): Promise<Order[]> {
   try {
      const userOrders = await dalRequireAdmin(async user => 
         await dalDbOperation(async () => {
            const results = await db.select().from(ordersTable);
            return results;
         })
      )
      return userOrders.success ? userOrders.data : []
   } catch (e) {
      console.error(e);
      return [];
   }
}

export async function getAllUserOrders (): Promise<Order[]> {
   try {
      const userOrders = await dalRequireAuth(async user => 
         await dalDbOperation(async () => {
            const results = await db.select().from(ordersTable).where(eq(ordersTable.userId, user.userid));
            return results;
         })
      )
      return userOrders.success ? userOrders.data : []
   } catch (e) {
      console.error(e);
      return [];
   }
}