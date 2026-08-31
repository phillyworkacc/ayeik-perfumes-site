'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import EmptySection from "@/components/CustomSection/EmptySection";
import Spacing from "@/components/Spacing/Spacing";
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper";
import { copyToClipboard } from "@/lib/str";
import { OrderProducts } from "@/modals/OrderCardView";
import { Order } from "@/types"
import { formatMilliseconds } from "@/utils/date";
import { formatNumber } from "@/utils/num";
import { Copy, PackageSearch } from "lucide-react";
import Link from "next/link";

type OrderDetailsProps = {
   order: Order;
}

export default function OrderDetails ({ order }: OrderDetailsProps) {
   return (
      <StoreWrapper>
         <EmptySection bgColor="white" textColor="black">
            
            <Breadcrumb
               pages={[
                  { label: "My Orders", href: "/account/orders" },
                  { label: `Order #${order.id}`, href: "/product/" },
               ]}
               hideDashboardLink
            />
            <Spacing />

            <div className="text-xl bold-700 full">Order #{order.id}</div>
            <div className="text-xs full bold-500 grey-5">Order placed on {formatMilliseconds(parseInt(order.createdAt))}</div>
            <Spacing />

            <div className="box full dfb column">
               <div className="text-m bold-700 full pd-05">Shipping Address</div>
               <div className="text-xs full">{order.addressLine1}</div>
               {order.addressLine2 && (<div className="text-s full">{order.addressLine2}</div>)}
               <div className="text-xs full">{order.addressCity}</div>
               <div className="text-xs full">{order.addressPostcode}</div>
            </div>
            <Spacing />

            <div className="text-m bold-700 full">Order Items</div>
            <div className="box full pd-1">
               <OrderProducts orderId={order.orderId} />
            </div>
            <div className="box full pd-05">
               <div className="text-xs full bold-500">
                  Order Total: {formatNumber(order.total/100, { prefix: "£", showDecimals: true, decimalPlaces: 2, useCommas: true })}
               </div>
            </div>
            <Spacing />

            <div className="text-m bold-700 full">Shipping Information</div>
            <OrderTracking order={order} />
            <Spacing />

         </EmptySection>
      </StoreWrapper>
   )
}

type OrderTrackingProps = {
   order: Order;
};

function OrderTracking ({ order }: OrderTrackingProps) {
   const { trackingNumber, shippingService, shippingCarrier } = order;

   if (!trackingNumber) {
      return (
         <div className="box full pd-1 dfb column gap-10">
            <div className="text-s bold-600 full">Order being prepared</div>
            <div className="text-xs full">
               {order.shippingCarrier} {" "}
               {order.shippingService?.includes("24") ? "Tracked 24®" : "Tracked 48®"}
            </div>
            <div className="text-xs full">
               Tracking information will become available once your order has been dispatched.
            </div>
         </div>
      );
   }

   const trackingUrl = `https://www.royalmail.com/portal/rm/track?trackNumber=${encodeURIComponent(trackingNumber)}`;
   return (
      <div className="box full pd-1 dfb column gap-10">
         <div className="text-s bold-600 full">Your order has been dispatched 🚚</div>
         <div className="text-xs full">
            {order.shippingCarrier} {" "}
            {order.shippingService?.includes("24") ? "Tracked 24®" : "Tracked 48®"}
         </div>
         <div className="text-xs full">
            Tracking Number: {" "}
            <strong>{trackingNumber}</strong>
         </div>
         <div className="box full dfb wrap gap-10 pd-1">
            <Link className="box fit" href={trackingUrl} target="_blank" rel="noopener noreferrer">
               <button 
                  className="xxxs pd-12 pdx-2 tiny-shadow"
               ><PackageSearch size={16} /> Track Parcel</button>
            </Link>
            <button 
               className="xxxs pd-12 pdx-2 tiny-shadow outline-black"
               onClick={() => copyToClipboard(trackingNumber)}
            ><Copy size={15} /> Copy Tracking Number</button>
         </div>
      </div>
   );
}
