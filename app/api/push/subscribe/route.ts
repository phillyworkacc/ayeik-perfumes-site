import { db } from "@/db";
import { pushNotificationsTable } from "@/db/schemas";

export async function POST(req: Request) {
   try {
      const pushNotificationBody = await req.json();
   
      // insert new subscription
      const result = await db.insert(pushNotificationsTable).values({
         userId: pushNotificationBody.userId,
         subscription: pushNotificationBody.subscription,
         createdAt: Date.now().toString(),
         updatedAt: Date.now().toString()
      });

      return Response.json({ success: (result.rowCount === 1) }, { status: 200 });
   } catch (err) {
      return Response.json({ success: false }, { status: 500 });
   }
}