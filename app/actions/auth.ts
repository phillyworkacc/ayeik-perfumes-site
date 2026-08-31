"use server"
import { dalDbOperation } from "@/dal/helpers";
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { sendWelcomeEmail } from "@/lib/email/emailService";
import { uuid } from "@/utils/uuid";

export async function createCustomerAccount (email: string, password: string) {
   try {
      const result = await dalDbOperation(async () => {
         const userid = uuid();
         const userName = email.split("@")[0];
         const results = await db.insert(usersTable).values({
            userid, name: userName,
            email, password, userType: "customer",
            createdAt: Date.now().toString()
         });
         return results.rowCount === 1 ? userid : false;
      })

      if (result.success) {
         await sendWelcomeEmail({
            to: email, name: email.split("@")[0]
         })
      }

      return result.success ? result.data : false;
   } catch (err) {
      return false;
   }
}