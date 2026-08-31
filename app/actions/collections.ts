"use server"
import { dalDbOperation } from "@/dal/helpers";
import { db } from "@/db";
import { collectionsTable } from "@/db/schemas";
import { Collection } from "@/types";
import { uuid } from "@/utils/uuid";
import { eq } from "drizzle-orm";

export async function createCollection (collection: Omit<Collection, "id" | "collectionId">): Promise<Collection | false> {
   try {
      const updated = await dalDbOperation(async () => {
         const collectionId = uuid().replaceAll("-","");
         const [collectionAdded] = await db.insert(collectionsTable).values({ ...collection, collectionId }).returning();
         return collectionAdded;
      });
      return updated.success ? updated.data : false
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function getAllCollections (): Promise<Collection[]> {
   try {
      const collections = await dalDbOperation(async () => {
         const results = await db.select().from(collectionsTable);
         return results;
      });
      return collections.success ? collections.data : []
   } catch (e) {
      console.error(e);
      return [];
   }
}

export async function editCollection (collection: Collection): Promise<boolean> {
   try {
      const updated = await dalDbOperation(async () => {
         const results = await db.update(collectionsTable)
            .set({ ...collection })
            .where(eq(collectionsTable.collectionId, collection.collectionId!));
         return (results.rowCount === 1);
      })

      return updated.success ? updated.data : false
   } catch (err) {
      console.error(err);
      return false;
   }
}