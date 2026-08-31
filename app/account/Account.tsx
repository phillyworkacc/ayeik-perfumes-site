'use client'
import EmptySection from "@/components/CustomSection/EmptySection";
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper";
import useUser from "@/hooks/useUser"
import UpdateShippingAddress from "@/modals/UpdateShippingAddress";
import { websiteConfig } from "@/config/websiteConfig";
import { HousePlus, LogOut, Trash2, Truck, UserLock, UserRoundCog, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/Modal/ModalContext";
import { signOut, useSession } from "next-auth/react";
import Spacing from "@/components/Spacing/Spacing";

export default function Account () {
   const { user } = useUser();
   const { data: session } = useSession();
   const { showModal } = useModal();
   const router = useRouter();

   function handleUpdateAddress () {
      showModal({
         content: <UpdateShippingAddress />
      })
   }

   return (
      <StoreWrapper>
			<EmptySection bgColor="white" textColor="black">
            <div className="text-xl full bold-700">Account</div>
            <div className="box full pd-1 dfb column gap-5">
               <div className="text-xs full"><b>Name:</b> {user?.name || session?.user?.name}</div>
               <div className="text-xs full"><b>Email:</b> {user?.email || session?.user?.email}</div>
            </div>
            <Spacing />
            <div className="box full dfb wrap gap-10">
               {(user?.userType == "admin") && (
                  <button className="xxs pd-12 pdx-2 whitespace-nowrap" onClick={() => router.push("/admin")}>
                     <UserRoundCog size={17} /> Admin Dashboard
                  </button>
               )}
               <button className="xxs pd-12 pdx-2 whitespace-nowrap" onClick={() => router.push("/account/edit-profile")}>
                  <UserRoundPen size={17} /> Edit Profile
               </button>
               <button className="xxs pd-12 pdx-2 whitespace-nowrap" onClick={() => router.push("/account/change-password")}>
                  <UserLock size={17} /> Change Password
               </button>
               <button className="xxs pd-12 pdx-2 whitespace-nowrap" onClick={handleUpdateAddress}>
                  <HousePlus size={17} /> Update Address
               </button>
            </div>
			</EmptySection>
			<EmptySection bgColor="accent-color-10" textColor="black">
            <div className="text-xl full bold-700">My Orders</div>
            <div className="text-xs full pd-15">Click below to view all your order with {websiteConfig.name}</div>
            <button className="xxs pd-12 pdx-2" onClick={() => router.push("/account/orders")}><Truck size={17} /> View My Orders</button>
			</EmptySection>
			<EmptySection bgColor="white" textColor="black">
            <div className="text-xl full bold-700">Account Security</div>
            <div className="text-xs full pd-15">Security items for your {websiteConfig.name} account</div>
            <div className="box full dfb wrap gap-10">
               <button className="xxs pd-12 pdx-2 whitespace-nowrap" onClick={() => signOut()}>
                  <LogOut size={17} /> Sign Out
               </button>
               <button className="xxs pd-12 pdx-2 whitespace-nowrap delete" onClick={handleUpdateAddress}>
                  <Trash2 size={17} /> Delete Account
               </button>
            </div>
			</EmptySection>
      </StoreWrapper>
   )
}
