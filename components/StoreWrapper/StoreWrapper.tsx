'use client'
import "@/styles/globals.css"
import "@/styles/site.css"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function StoreWrapper({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         {children}
         <Footer /> 
      </>
   )
}
