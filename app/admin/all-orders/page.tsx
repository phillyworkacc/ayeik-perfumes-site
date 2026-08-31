import { dalDbOperation, dalRequireAdminRedirect } from '@/dal/helpers'
import { db } from '@/db'
import { ordersTable } from '@/db/schemas'
import { desc } from 'drizzle-orm';
import sanitise from '@/utils/sanitise'
import AdminOrdersPage from './AdminOrdersPage';

export default async function page () {
   await dalRequireAdminRedirect();

   const products = await dalDbOperation(async () => {
      const results = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
      return results;
   });

   if (products.success) {
      return (
         <AdminOrdersPage orders={sanitise(products.data)} />
      )
   } else {
      return <>Failed to get orders</>
   }
}