"use server"
import { db } from "@/db";
import { pushNotificationsTable } from "@/db/schemas";

export async function getSubscriptionsForAdmins () {
   try {
      const userPushNotificationsSubscriptions = await db.select().from(pushNotificationsTable);
      return userPushNotificationsSubscriptions;
   } catch (err) {
      return [];
   }
}