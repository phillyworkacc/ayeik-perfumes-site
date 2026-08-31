import { dalDbOperation } from '@/dal/helpers'
import { db } from '@/db'
import { collectionsTable, productsTable } from '@/db/schemas'
import { arrayContains, eq } from 'drizzle-orm'
import sanitise from '@/utils/sanitise'
import CollectionProductsPage from './CollectionProductsPage'

type ProductPageProps = {
   params: Promise<{ collectionId: string }>;
}

export default async function page ({ params }: ProductPageProps) {
   const { collectionId } = await params;
   const products = await dalDbOperation(async () => {
      const collectionResults = await db.select().from(collectionsTable)
         .where(eq(collectionsTable.collectionId, collectionId)).limit(1);

      const productsResults = await db.select().from(productsTable)
         .where(arrayContains(productsTable.collections, [collectionId]));

      return {
         collection: collectionResults[0],
         products: productsResults
      };
   });

   if (products.success) {
      return (
         <CollectionProductsPage collection={sanitise(products.data.collection)} products={sanitise(products.data.products)} />
      )
   } else {
      return <>Failed to get product from collections</>
   }
}