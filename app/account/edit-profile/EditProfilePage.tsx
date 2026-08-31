'use client'
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import EmptySection from "@/components/CustomSection/EmptySection"
import Spacing from "@/components/Spacing/Spacing";
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import useUser from "@/hooks/useUser";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProfilePage ({ user }: { user: User }) {
   const { updateUser } = useUser();
   const { update } = useSession();
   const [editingUser, setEditingUser] = useState(user);

   async function handleUpdateUserInfo (callback: Function) {
      if ([editingUser.name, editingUser.email].includes("")) {
         toast.error("Please fill all the required fields");
         callback();
         return;
      }
      await updateUser({
         ...user!,
         name: editingUser.name,
         email: editingUser.email
      }, false, async () => {
         await update({
            user: { name: editingUser.name, email: editingUser.email }
         });
      });
      callback();
   }

   return (
      <StoreWrapper>
			<EmptySection bgColor="white" textColor="black">
            <Breadcrumb
               pages={[
                  { label: "Account", href: "/account" },
                  { label: "Edit Profile", href: "/account/" },
               ]}
               hideDashboardLink
            />
            <Spacing />
            <div className="text-xl full bold-700">Edit Profile</div>
            <div className="text-xs grey-5 full">Update your information</div>
            <Spacing />
            <div className="box full pd-1 dfb column gap-5">
               <div className="text-s full bold-600">Name</div>
               <input 
                  type="text" className="xxs pd-13 pdx-2 full mw-600"
                  value={editingUser.name} onChange={e => setEditingUser(p => ({ ...p, name: e.target.value }))}   
               />
            </div>
            <div className="box full pd-1 dfb column gap-5">
               <div className="text-s full bold-600">Email</div>
               <input 
                  type="text" className="xxs pd-13 pdx-2 full mw-600"
                  value={editingUser.email} onChange={e => setEditingUser(p => ({ ...p, email: e.target.value }))}   
               />
            </div>
            <div className="box full pd-1 dfb column gap-5 mw-300">
               <AwaitButton className="xs pd-14 full" onClick={handleUpdateUserInfo}>Update</AwaitButton>
            </div>
         </EmptySection>
      </StoreWrapper>
   )
}
