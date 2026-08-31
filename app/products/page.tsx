import { dalDbOperation } from '@/dal/helpers'
import { db } from '@/db'
import { productsTable } from '@/db/schemas'
import ProductsPage from './ProductsPage'
import sanitise from '@/utils/sanitise'

export default async function page () {
   const products = await dalDbOperation(async () => {
      const results = await db.select().from(productsTable);
      return results;
   });

   if (products.success) {
      return (
         <ProductsPage products={sanitise(products.data)} />
      )
   } else {
      return <>Failed to get products</>
   }
}