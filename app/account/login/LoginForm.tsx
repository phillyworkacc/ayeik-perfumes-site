'use client'
import "@/styles/globals.css"
import "@/styles/site.css"
import { Logo } from "@/components/Icons/Icon"
import { websiteConfig } from "@/config/websiteConfig"
import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { isValidEmail } from "@/utils/validate"
import AwaitButton from "@/components/AwaitButton/AwaitButton"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"

export default function page() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const router = useRouter();

   const handleSignIn = async (callback: Function) => {
      if (email == "") {
         toast.error("Please enter your email");
         callback();
         return;
      }
      if (password == "") {
         toast.error("Please enter your password");
         callback();
         return;
      }
      if (!isValidEmail(email)) {
         toast.error("Please enter a valid email");
         callback();
         return;
      }
      const response = await signIn("credentials", { email, password, redirect: false });
      if (response?.error) {
         toast.error("Failed to log you in");
         callback();
         return;
      }
      redirect("/account");
   }

   return (
      <StoreWrapper>
         <div className='box full dfb align-center column gap-10 pdx-3 pd-4'>
            <div className="page-container">
               <div className="box fit pd-1 cursor-pointer mb-05" onClick={() => router.push("/")}>
                  <Logo size={65} />
               </div>
               <div className="text-xl bold-700 full pd-1">Sign In to {websiteConfig.name}</div>
               <div className="text-xs pd-05 grey-5 full">Please fill all fields</div>
               <div className="box full pd-1 mw-700">
                  <input 
                     type="email"
                     className="xs full pd-15 pdx-2 radius-20"
                     placeholder="Email"
                     value={email} onChange={e => setEmail(e.target.value)}
                  />
               </div>
               <div className="box full pd-1 mw-700">
                  <input 
                     type="password"
                     className="xs full pd-15 pdx-2 radius-20"
                     placeholder="Password"
                     value={password} onChange={e => setPassword(e.target.value)}
                  />
               </div>
               <div className="box full pd-1 mw-700">
                  <AwaitButton className="xs full pd-13 radius-20 no-hover-scale" onClick={handleSignIn}>
                     Continue
                  </AwaitButton>
               </div>
            </div>
         </div>
      </StoreWrapper>
   )
}
