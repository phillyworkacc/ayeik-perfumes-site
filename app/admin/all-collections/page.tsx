import { dalDbOperation, dalRequireAdminRedirect } from '@/dal/helpers'
import { db } from '@/db'
import { collectionsTable } from '@/db/schemas'
import sanitise from '@/utils/sanitise'
import AdminCollectionsPage from './AdminCollectionsPage';
import { desc } from 'drizzle-orm';

export default async function page () {
   await dalRequireAdminRedirect();

   const collections = await dalDbOperation(async () => {
      const results = await db.select().from(collectionsTable).orderBy(desc(collectionsTable.id));
      return results;
   });

   if (collections.success) {
      return (
         <AdminCollectionsPage collections={sanitise(collections.data)} />
      )
   } else {
      return <>Failed to get collections</>
   }
}