import { createCustomerAccount } from "@/app/actions/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { hashPwd } from "@/utils/uuid";
import { and, eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt"
   },
   providers: [
      CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {}
			},
         async authorize (credentials, req) {
            if (credentials?.email == "" || credentials?.password == "") {
               return null;
            } else {
               const results = await db
                  .select().from(usersTable)
                  .where(eq(usersTable.email, credentials?.email!)).limit(1);
               if (results.length > 0) {
                  const validateUserPassword = await db
                     .select().from(usersTable)
                     .where(and(
                        eq(usersTable.email, credentials?.email!),
                        eq(usersTable.password, hashPwd(credentials?.password!))
                     )).limit(1);
                  
                  if (validateUserPassword.length > 0) {
                     return {
                        id: validateUserPassword[0].userid!,
                        email: validateUserPassword[0].email,
                        name: validateUserPassword[0].name,
                        image: `/clientdefault.jpg`,
                     }
                  } else {
                     return null;
                  }
               } else {
                  const user = await createCustomerAccount(credentials?.email!, hashPwd(credentials?.password!));
                  if (user) {
                     return {
                        id: user,
                        email: credentials?.email!,
                        name: credentials?.password!,
                        image: `/clientdefault.jpg`,
                     }
                  } else return null;
               }
            }
         }
      })
   ],
   callbacks: {
      async session ({ session, token }) {
         // Example: attach latest user data
         if (session.user) {
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.picture;
         }
         return session;
      },
      jwt: async ({ user, token, trigger, session }) => {
         if (trigger == "update") {
            return { ...token, ...session.user }
         }
         return { ...token, ...user }
      }
   }
}