"use server"
import { db } from "@/db";
import { reviewsTable } from "@/db/schemas";
import { Review } from "@/types";

export async function getReviews (): Promise<Review[]> {
   try {
      const reviews = await db.select().from(reviewsTable);
      return reviews;
   } catch (err) {
      console.error(err);
      return [];
   }
}

export async function addReview (review: Omit<Review, "id" | "createdAt">): Promise<boolean> {
   try {
      const createdAt = Date.now().toString();
      const inserted = await db.insert(reviewsTable).values({
         name: review.name, email: review.email,
         review: review.review, createdAt
      });
      return (inserted.rowCount == 1);
   } catch (err) {
      console.error(err);
      return false;
   }
}