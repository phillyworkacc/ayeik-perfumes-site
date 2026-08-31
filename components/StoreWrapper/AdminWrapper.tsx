'use client'
import "@/styles/globals.css"
import "@/styles/site.css"
import AdminHeader from "../Header/AdminHeader";
import EnableNotificationsCard from "../EnableNotificationsCard/EnableNotificationsCard";

type AdminWrapperProps = {
   children: React.ReactNode;
}

export default function AdminWrapper ({ children }: AdminWrapperProps) {
   return (<>
      <AdminHeader />
      <EnableNotificationsCard />
      {children}  
   </>)
}
