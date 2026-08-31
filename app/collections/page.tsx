import { dalDbOperation } from '@/dal/helpers'
import { db } from '@/db'
import { collectionsTable } from '@/db/schemas'
import sanitise from '@/utils/sanitise'
import CollectionsPage from './CollectionsPage';

export default async function page () {
   const collections = await dalDbOperation(async () => {
      const results = await db.select().from(collectionsTable);
      return results;
   });

   if (collections.success) {
      return (
         <CollectionsPage collections={sanitise(collections.data)} />
      )
   } else {
      return <>Failed to get collections</>
   }
}