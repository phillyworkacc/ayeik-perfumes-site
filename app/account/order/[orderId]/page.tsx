import { dalDbOperation, dalRequireAuthRedirect } from '@/dal/helpers'
import { db } from '@/db'
import { ordersTable } from '@/db/schemas'
import { eq } from 'drizzle-orm';
import sanitise from '@/utils/sanitise'
import OrderDetails from './OrderDetails';

type OrderDetailsPageProps = {
   params: Promise<{
      orderId: string;
   }>
}

export default async function page ({ params }: OrderDetailsPageProps) {
   await dalRequireAuthRedirect();

   const { orderId } = await params;

   const order = await dalDbOperation(async () => {
      const results = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId)).limit(1);
      return results[0];
   });

   if (order.success) {
      return (
         <OrderDetails order={sanitise(order.data)} />
      )
   } else {
      return <>Failed to get orders</>
   }
}