'use client'
import EmptySection from "@/components/CustomSection/EmptySection"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import useCart from "@/hooks/useCart"
import Card from "@/components/Card/Card"
import { websiteConfig } from "@/config/websiteConfig"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Truck } from "lucide-react"

export default function SuccessOrder () {
   const router = useRouter();

   const { clearCart } = useCart();
   useEffect(() => { clearCart() }, [])

   const successCardStyles: React.CSSProperties = {
      padding: "25px", borderRadius: "20px",
      background: "#dfffdc", border: "1px solid #efefef",
      boxShadow: "0 0 2px 2px rgba(0,0,0,0.054)"
   }

   return (
      <StoreWrapper>
         <EmptySection bgColor="white" textColor="black">
            <Card styles={successCardStyles}>
               <div className="text-l full bold-600 dfb align-center gap-10"><Truck size={30} /> Order Confirmed</div>
               <div className="text-xs full pd-1 grey-5">Thanks for shopping with {websiteConfig.name}. Click below to see your orders.</div>
               <div className="box full pd-15">
                  <button className="xxs pd-12 pdx-2" onClick={() => router.push("/account/orders")}>My Orders</button>
               </div>
            </Card>
         </EmptySection>
      </StoreWrapper>
   )
}
