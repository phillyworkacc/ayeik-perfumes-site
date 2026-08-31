"use server"
import { dalDbOperation, dalRequireAdmin } from "@/dal/helpers";
import { db } from "@/db";
import { productsTable } from "@/db/schemas";
import { Cart, FullCart, FullCartItem, Product } from "@/types";
import { arrayContains, eq, inArray, not, sql } from "drizzle-orm";

export async function loadCartInfo (cart: Cart): Promise<FullCart | false> {
   try {
      const cartInfo = await dalDbOperation(async () => {
         const cartProducts = cart.map(cartItem => (cartItem.productId));
         const results = await db.select().from(productsTable)
            .where(inArray(productsTable.productId, cartProducts));
         
         return results;
      })

      if (cartInfo.success) {
         const fullCartInfo = cart.map(cartItem => {
            return {
               product: cartInfo.data.find(ci => ci.productId == cartItem.productId),
               quantity: cartItem.quantity
            } as FullCartItem
         })
         return fullCartInfo;
      } else {
         return false;
      }
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function editProduct (product: Product): Promise<boolean> {
   try {
      const updated =  await dalRequireAdmin(async user => 
         await dalDbOperation(async () => {
            const results = await db.update(productsTable)
               .set({ ...product })
               .where(eq(productsTable.productId, product.productId));
            return (results.rowCount === 1);
         })
      );

      return updated.success ? updated.data : false
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function insertManyProducts (products: Omit<Product, "id">[]) {
   try {
      const inserted =  await dalRequireAdmin(async user => 
         await dalDbOperation(async () => {
            const results = await db.insert(productsTable).values(products);
            return (results.rowCount === products.length);
         })
      );
      return inserted.success ? inserted.data : false;
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function addCollectionToProducts (productIds: string[], collectionId: string): Promise<boolean> {
   try {
      const updated =  await dalRequireAdmin(async user => 
         await dalDbOperation(async () => {
            const results = await db.update(productsTable)
               .set({
                  collections: sql`array_append(${productsTable.collections}, ${collectionId})`,
               })
               .where(inArray(productsTable.productId, productIds));
            return (results.rowCount === productIds.length);
         })
      );
      return updated.success ? updated.data : false
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function getAllProductsExcludeColl (collectionId: string): Promise<Product[]> {
   try {
      const products = await dalDbOperation(async () => {
         const results = await db.select().from(productsTable)
            .where(not(arrayContains(productsTable.collections, [collectionId])));
         return results;
      })

      console.log(products)

      return products.success ? products.data : []
   } catch (err) {
      console.error(err);
      return [];
   }
}