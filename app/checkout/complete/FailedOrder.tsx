'use client'
import EmptySection from "@/components/CustomSection/EmptySection"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import Card from "@/components/Card/Card"
import { useRouter } from "next/navigation"
import { PackageX } from "lucide-react"

export default function FailedOrder ({ reason }: { reason: string }) {
   const router = useRouter();

   const failedCardStyles: React.CSSProperties = {
      padding: "25px", borderRadius: "20px",
      background: "#ffd8d8", border: "1px solid #efefef",
      boxShadow: "0 0 2px 2px rgba(0,0,0,0.054)"
   }

   return (
      <StoreWrapper>
         <EmptySection bgColor="white" textColor="black">
            <Card styles={failedCardStyles}>
               <div className="text-l full bold-600 dfb align-center gap-10"><PackageX size={30} /> Order Failed</div>
               <div className="text-xs full pd-1 grey-5">Unfortunately, we could not process your order.</div>
               <div className="text-xs full pd-1 grey-5">
                  Due to the following reasons: <span className="text-xs error-text">{reason}</span>
               </div>
               <div className="box full pd-15">
                  <button className="xxs pd-12 pdx-2" onClick={() => router.push("/cart")}>Back to Cart</button>
               </div>
            </Card>
         </EmptySection>
      </StoreWrapper>
   )
}