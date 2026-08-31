"use server"
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schemas";
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { User } from "@/types";
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { stripe } from "@/lib/stripe";
import { hashPwd } from "@/utils/uuid";

export async function getCurrentUser (): Promise<User | null> {
   try {
      const session = await getServerSession(authOptions);

      if (!session) return null;
      if (!session.user) return null;

      const user = await db.select().from(usersTable).where(eq(usersTable.email, session.user.email!)).limit(1);
      
      return user[0] as User;
   } catch (err) {
      return null;
   }
}

export async function editUser (updatedUser: User, updateAddress?: boolean): Promise<boolean> {
   try {
      const user = await getCurrentUser();
      if (!user) return false;
      if (user.userid !== updatedUser.userid) return false;

      let newUpdatedUser = { ...updatedUser };
      if (updateAddress) {
         const updatedStripeCustomerId = await updateStripeSession(updatedUser);
         if (!updatedStripeCustomerId) return false;
         newUpdatedUser.stripeCustomerId = updatedStripeCustomerId;
      }

      const updated = await dalRequireAuth(async user =>
         await dalDbOperation(async () => {
            const results = await db.update(usersTable)
               .set({ ...newUpdatedUser })
               .where(eq(usersTable.userid, user.userid));
            return (results.rowCount === 1);
         })
      );

      return updated.success ? updated.data : false
   } catch (err) {
      console.error(err);
      return false;
   }
}

export async function updateStripeSession (updatedUser: User) {
   try {
      const user = await getCurrentUser();
      if (!user) return false;

      if (!user.stripeCustomerId) {
         // create user as a stripe customer
         const customer = await stripe.customers.create({
            email: updatedUser.email,
            name: updatedUser.name,
            shipping: {
               name: updatedUser.name,
               address: {
                  line1: updatedUser.addressLine1,
                  line2: updatedUser.addressLine2 ?? undefined,
                  city: updatedUser.addressCity,
                  postal_code: updatedUser.addressPostcode,
                  country: "GB",
               },
            },
         });
         return customer.id;
      } else {
         const customer = await stripe.customers.update(user.stripeCustomerId, {
            shipping: {
               name: updatedUser.name,
               address: {
                  line1: updatedUser.addressLine1,
                  line2: updatedUser.addressLine2 ?? undefined,
                  city: updatedUser.addressCity,
                  postal_code: updatedUser.addressPostcode,
                  country: "GB",
               },
            },
         });
         return customer.id;
      }
   } catch (err) {
      console.error(err);
      return false
   }
}

export async function changeUserPassword (password: string): Promise<boolean> {
   try {
      const user = await getCurrentUser();
      if (!user) return false;

      const hashedPwd = hashPwd(password);
      if (user.password == hashedPwd) return true;

      const updated = await dalRequireAuth(async user =>
         await dalDbOperation(async () => {
            const results = await db.update(usersTable)
               .set({ password: hashedPwd })
               .where(eq(usersTable.userid, user.userid));
            return (results.rowCount === 1);
         })
      );

      return updated.success ? updated.data : false
   } catch (err) {
      console.error(err);
      return false;
   }
}