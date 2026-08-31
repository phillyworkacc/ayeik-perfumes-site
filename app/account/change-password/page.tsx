import { dalRequireAuthRedirect } from "@/dal/helpers";
import { UserRoundX } from "lucide-react";
import { getCurrentUser } from "@/app/actions/user";
import Link from "next/link";
import FailPage from "@/components/FailPage/FailPage";
import ChangePasswordPage from "./ChangePasswordPage";


export default async function page() {
   await dalRequireAuthRedirect();

   const user = await getCurrentUser();

   if (user) {
      return <ChangePasswordPage />
   } else {
      return (
         <FailPage>
            <div className="text-l full bold-600 dfb align-center gap-10"><UserRoundX size={30} /> User Not Found</div>
            <div className="text-xs full pd-1 grey-5">Unfortunately, we could not find your accounnt.</div>
            <div className="box full pd-15">
               <Link className="box fit" href="/">
                  <button className="xxs pd-12 pdx-2">Back to Website</button>
               </Link>
            </div>
         </FailPage>
      )
   }
}
