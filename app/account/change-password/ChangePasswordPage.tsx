'use client'
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import EmptySection from "@/components/CustomSection/EmptySection"
import Spacing from "@/components/Spacing/Spacing";
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import { useState } from "react";
import { toast } from "sonner";
import { changeUserPassword } from "@/app/actions/user";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

export default function ChangePasswordPage () {
   const [password1, setPassword1] = useState("");
   const [password2, setPassword2] = useState("");

   async function handleUpdatePassword (callback: Function) {
      if ([password1, password2].includes("")) {
         toast.error("Please fill all he fields");
         callback();
         return;
      }
      if (password1 !== password2) {
         toast.error("Passwords do not match");
         callback();
         return;
      }
      if (password1.length < 8) {
         toast.error("Password must be at least 8 characters");
         callback();
         return;
      }
      const changed = await changeUserPassword(password1);
      if (changed) {
         toast.success("Changed Password Successfully");
      } else {
         toast.error("Failed to change password")
      }
      callback();
   }

   return (
      <StoreWrapper>
			<EmptySection bgColor="white" textColor="black">
            <Breadcrumb
               pages={[
                  { label: "Account", href: "/account" },
                  { label: "Change Password", href: "/account/" },
               ]}
               hideDashboardLink
            />
            <Spacing />
            <div className="text-xl full bold-700">Change Password</div>
            <div className="text-xs grey-5 full">Please change your password frequently to keep your account safe</div>
            <Spacing />
            <div className="box full pd-1 dfb column gap-5">
               <div className="text-s full bold-600">New Password</div>
               <input 
                  type="password" className="xxs pd-13 pdx-2 full mw-600"
                  value={password1} onChange={e => setPassword1(e.target.value)}   
               />
            </div>
            <div className="box full pd-1 dfb column gap-5">
               <div className="text-s full bold-600">New Password (again)</div>
               <input 
                  type="password" className="xxs pd-13 pdx-2 full mw-600"
                  value={password2} onChange={e => setPassword2(e.target.value)}   
               />
            </div>
            <div className="box full pd-1 dfb column gap-5 mw-300">
               <AwaitButton className="xs pd-14 full" onClick={handleUpdatePassword}>Change Password</AwaitButton>
            </div>
         </EmptySection>
      </StoreWrapper>
   )
}
