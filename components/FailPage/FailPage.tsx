'use client'
import EmptySection from "@/components/CustomSection/EmptySection"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import Card from "@/components/Card/Card"

type FailPageProps = {
   children: React.ReactNode;
}

export default function FailPage ({ children }: FailPageProps) {

   const failCardStyles: React.CSSProperties = {
      padding: "25px", borderRadius: "20px",
      background: "#ffd8d8", border: "1px solid #efefef",
      boxShadow: "0 0 2px 2px rgba(0,0,0,0.054)"
   }

   return (
      <StoreWrapper>
         <EmptySection bgColor="white" textColor="black">
            <Card styles={failCardStyles}>
               {children}
            </Card>
         </EmptySection>
      </StoreWrapper>
   )
}