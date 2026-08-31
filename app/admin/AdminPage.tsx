'use client'
import EmptySection from "@/components/CustomSection/EmptySection"
import Spacing from "@/components/Spacing/Spacing";
import AdminWrapper from "@/components/StoreWrapper/AdminWrapper"
import { useRouter } from "next/navigation"

export default function AdminPage () {
   const router = useRouter();

   return (
      <AdminWrapper>
         <EmptySection bgColor="white" textColor="black">
            <div className="text-xxxl full pd-1 bold-600">Admin Dashboard</div>
            <button 
               className="xs pd-12 pdx-2 fit"
               onClick={() => router.push("/")}
            >Go to website</button>
            <Spacing />
         </EmptySection>
      </AdminWrapper>
   )
}
