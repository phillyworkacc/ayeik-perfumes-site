import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { db } from "@/db";
import { ordersTable } from "@/db/schemas";
import { desc, eq } from "drizzle-orm";
import { PackageX } from "lucide-react";
import Link from "next/link";
import FailPage from "@/components/FailPage/FailPage";
import Orders from "./Orders";
import sanitise from "@/utils/sanitise";


export default async function page() {
   await dalRequireAuthRedirect();

   const userOrders = await dalRequireAuth(async user =>
      await dalDbOperation(async () => {
         const results = await db.select().from(ordersTable)
            .where(eq(ordersTable.userId, user.userid))
            .orderBy(desc(ordersTable.createdAt));
            
         return results;
      })
   );

   if (userOrders.success) {
      return <Orders userOrders={sanitise(userOrders.data)} />
   } else {
      return (
         <FailPage>
            <div className="text-l full bold-600 dfb align-center gap-10"><PackageX size={30} /> Error</div>
            <div className="text-xs full pd-1 grey-5">Unfortunately, we could not get your orders. Please try again later.</div>
            <div className="box full pd-15">
               <Link className="box fit" href="/account">
                  <button className="xxs pd-12 pdx-2">Back to Account</button>
               </Link>
            </div>
         </FailPage>
      )
   }
}
