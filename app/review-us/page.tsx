'use client'
import CustomSection from "@/components/CustomSection/CustomSection"
import AwaitButton from "@/components/AwaitButton/AwaitButton"
import SectionBannerTitle from "@/components/SectionBannerTitle"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import useUser from "@/hooks/useUser"
import { Logo } from "@/components/Icons/Icon"
import { useEffect, useState } from "react"
import { websiteConfig } from '@/config/websiteConfig'
import { toast } from "sonner"
import { usePageTitle } from "@/utils/usePageTitle"
import { addReview } from "../actions/reviews"

export default function ReviewUsPage () {
   const { user, status } = useUser();
   usePageTitle(`Review Us | ${websiteConfig.name}`);

   const [name, setName] = useState<string | undefined>(undefined);
   const [email, setEmail] = useState<string | undefined>(undefined);
   const [feedback, setFeedback] = useState('');

   useEffect(() => {
      if (status == "authenticated") {
         setName(user?.name)
         setEmail(user?.email)
      } else if (status == "none") {
         setName("")
         setEmail("")
      }
   }, [status, user])

   async function createReview (callback: Function) {
      if (feedback.trim() == "") {
         toast.error("Please enter your feedback");
         callback();
         return;
      }
      const result = await addReview({
         name: name || 'Anonymous Customer',
         email: email || 'anonymous@customer.com',
         review: feedback
      })
      if (result) {
         setName("");
         setEmail("");
         setFeedback("");
         toast.success("Review Sent. Thanks for shopping with us!");
      } else {
         toast.error("Failed to Send Review. Please Try Again!");
      }
      callback();
   }

   return (
      <StoreWrapper>
         <SectionBannerTitle
            eyebrow='feedback'
            title="Review Us"
            description="Tell us about your experience with us"
         />
         <CustomSection
            bgColor="#e0e0e0" textColor="black"
            customSectionConfig={{
               title: "How did we do?", type: "version-1", align: "left"
            }}
         >
            <div className="box full dfb column align-start gap-10 pd-2">
               <div className="box full mw-700 h-fit bg-white radius-20 pd-3 pdx-3">
                  <div className="box pd-1 full mw-700">
                     <Logo size={40} />
                  </div>
                  <div className="box pd-1 full mw-700">
                     {(name !== undefined && email !== undefined) && (<>
                        <div className="box full pd-1 dfb column gap-8">
                           <div className="text-sm full bold-600 text-left">Name (optional)</div>
                           <input 
                              type="text"
                              className="xs full pd-15 pdx-2 radius-20"
                              placeholder="John Doe"
                              value={name} onChange={e => setName(e.target.value)}
                           />
                        </div>
                        <div className="box full pd-1 dfb column gap-8">
                           <div className="text-sm full bold-600 text-left">Email (optional)</div>
                           <input 
                              type="text"
                              className="xs full pd-15 pdx-2 radius-20"
                              placeholder="john.doe@example.com"
                              value={email} onChange={e => setEmail(e.target.value)}
                           />
                        </div>
                     </>)} 
                     <div className="box full pd-1 dfb column gap-8">
                        <div className="text-sm full bold-600 text-left">Your Feedback (Please tell us about your experience) *</div>
                        <textarea 
                           className="xs full h-20 pd-15 pdx-2 radius-15" 
                           placeholder="Your feedback"
                           value={feedback} onChange={e => setFeedback(e.target.value)}
                        />
                     </div>
                     <AwaitButton className="xs full pd-13 radius-10 no-hover-scale" onClick={createReview}>
                        Submit
                     </AwaitButton>
                  </div>
                  </div>
               </div>

         </CustomSection>
      </StoreWrapper>
      )
}
