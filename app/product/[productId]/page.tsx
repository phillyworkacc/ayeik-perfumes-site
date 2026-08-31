import { dalDbOperation } from '@/dal/helpers'
import { db } from '@/db'
import { productsTable } from '@/db/schemas'
import sanitise from '@/utils/sanitise'
import { eq } from 'drizzle-orm'
import ProductPage from './ProductPage'

type ProductPageProps = {
   params: Promise<{ productId: string }>;
}

export default async function page ({ params }: ProductPageProps) {
   const { productId } = await params;
   const product = await dalDbOperation(async () => {
      const results = await db.select().from(productsTable)
         .where(eq(productsTable.productId, productId)).limit(1);
      return results[0];
   });

   if (product.success) {
      return (
         <ProductPage product={sanitise(product.data)} />
      )
   } else {
      return <>Failed to get product</>
   }
}