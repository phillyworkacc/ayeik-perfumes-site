import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers"
import { db } from "@/db"
import { ordersTable } from "@/db/schemas"
import { and, eq } from "drizzle-orm"
import FailedOrder from "./FailedOrder"
import SuccessOrder from "./SuccessOrder"

type CheckoutSuccessPageProps = {
   searchParams: Promise<{
      session_id?: string;
   }>;
};

export default async function page ({ searchParams } : CheckoutSuccessPageProps) {
   await dalRequireAuthRedirect();

   const { session_id } = await searchParams;

   if (!session_id) return (
      <FailedOrder 
         reason="Invalid Session Id - Your payment and order was not able to be processed at this time"
      />
   )
   
   const order = await dalRequireAuth(async user => 
      await dalDbOperation(async () => {
         const res = await db.select().from(ordersTable)
            .where(and(
               eq(ordersTable.userId, user.userid),
               eq(ordersTable.stripeSessionId, session_id!)
            )).limit(1);

         return (res.length > 0);
      })
   );

   if (order.success) {
      if (order.data) {
         return <SuccessOrder />
      } else {
         return (
            <FailedOrder reason={`Couldn't find your order`} />
         )
      }
   } else {
      return (
         <FailedOrder reason={`Failed to create your order - ${order.error}`} />
      )
   }
}
