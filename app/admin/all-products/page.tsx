import { dalDbOperation, dalRequireAdminRedirect } from '@/dal/helpers'
import { db } from '@/db'
import { productsTable } from '@/db/schemas'
import AdminProductsPage from './AdminProductsPage'
import sanitise from '@/utils/sanitise'

export default async function page () {
   await dalRequireAdminRedirect();

   const products = await dalDbOperation(async () => {
      const results = await db.select().from(productsTable);
      return results;
   });

   if (products.success) {
      return (
         <AdminProductsPage products={sanitise(products.data)} />
      )
   } else {
      return <>Failed to get products</>
   }
}