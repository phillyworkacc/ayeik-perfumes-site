'use client'
import Card from "@/components/Card/Card"
import EmptySection from "@/components/CustomSection/EmptySection"
import Spacing from "@/components/Spacing/Spacing"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import Link from "next/link"
import { Order } from "@/types"
import { formatMilliseconds } from "@/utils/date"
import { formatNumber } from "@/utils/num"
import { PackageSearch } from "lucide-react"
import { useRouter } from "next/navigation"


type OrdersProps = {
   userOrders: Order[]
}

export default function Orders ({ userOrders }: OrdersProps) {
   return (
      <StoreWrapper>
         <EmptySection bgColor="white" textColor="black">
            <div className="text-xl bold-600 full">My Orders</div>
            <Spacing />
            {userOrders.length === 0 ? (<>
               <div className="text-s full grey-5">You have no orders</div>
            </>) : (<>
               <div className="box full dfb wrap gap-15">
                  {userOrders.map(order => (
                     <OrderCard key={order.id} order={order} />
                  ))}
               </div>
            </>)}
         </EmptySection>
      </StoreWrapper>
   )
}

export function OrderCard ({ order }: { order: Order }) {
   const router = useRouter();
   const cardStyles: React.CSSProperties = {
      padding: "20px", borderRadius: "18px",
      border: "1px solid #efefef", width: "100%",
      maxWidth: "350px"
   }

   return (
      <Card styles={cardStyles}>
         <div className="box full dfb column gap-5">
            <div className="text-s full bold-600">#{order.id}</div>
            <div className="text-xxs full">
               Order placed on {formatMilliseconds(parseInt(order.createdAt), true)}
            </div>
            <div className="text-xxs full">
               Order Total: <b>{formatNumber(order.total/100, {
                  useCommas: true, showDecimals: true, decimalPlaces: 2, prefix: "£"
               })}</b>
            </div>
            <Spacing />
            <div className="box full dfb wrap gap-10">
               <button 
                  className="xxxs pd-12 pdx-2 tiny-shadow" 
                  onClick={() => router.push(`/account/order/${order.orderId}`)}
               >Order Details</button>
            </div>
         </div>
      </Card>
   )
}
