'use client'
import { Order } from "@/types";
import { toast } from "sonner";
import { syncAllRoyalMailTracking } from "@/app/actions/admin";
import { CloudSync } from "lucide-react";
import EmptySection from "@/components/CustomSection/EmptySection";
import AdminWrapper from "@/components/StoreWrapper/AdminWrapper";
import OrdersTable from "@/components/Table/OrdersTable";
import AwaitButton from "@/components/AwaitButton/AwaitButton";

type AdminOrdersPageProps = {
   orders: Order[];
}

export default function AdminOrdersPage ({ orders }: AdminOrdersPageProps) {

   async function handleSyncOrdersWithRoyalMail (callback: Function) {
      try {
         const result = await syncAllRoyalMailTracking();
         if (result.success) {
            toast.success(result.message);
         } else {
            toast.error(result.message);
         }
      } finally {
         callback();
      }
   }

   return (
      <AdminWrapper>
         <EmptySection bgColor="white" textColor="black">
            <div className="box full">
               <div className="text-xb full bold-700">All Orders</div>
            </div>
            <div className="box dfb wrap gap-10 full pd-1 mb-1">
               <AwaitButton className="xxxs pd-12 pdx-15 fit" onClick={handleSyncOrdersWithRoyalMail}>
                  <CloudSync size={18} /> Sync Orders
               </AwaitButton>
            </div>
            <OrdersTable orders={orders} />
         </EmptySection>
      </AdminWrapper>
   )
}
