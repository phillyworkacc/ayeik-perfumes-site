'use client'
import Link from "next/link";
import { Logo } from "../Icons/Icon"
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { titleCase } from "@/utils/str";
import { websiteConfig } from "@/config/websiteConfig";

export default function Header () {
   const router = useRouter();
   const pathname = usePathname();
   const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
   const [mobileOpenHeaderLinks, setMobileOpenHeaderLinks] = useState(false);
   const mobileThreshold = 1200;

   useEffect(() => {
      document.body.scrollTo({ top: 0, behavior: "auto" });
      setDeviceType((window.innerWidth >= mobileThreshold) ? "desktop" : "mobile");
      window.addEventListener("resize", () => {
         setDeviceType((window.innerWidth >= mobileThreshold) ? "desktop" : "mobile");
      })
   }, []);
   
   return (
      <header className="header" style={{
         backgroundColor: websiteConfig.header.background,
         color: websiteConfig.header.color
      }}>
         <div className="page-container">
            {(deviceType == "desktop") && (<>
               {websiteConfig.header.desktopNavStyle == "left" ? (<>
                  <div className="box full dfb align-center">
                     <div className="box full dfb align-center gap-20">
                        <div className="box fit dfb align-center cursor-pointer" onClick={() => router.push("/")}><Logo size={50} /></div>
                        {websiteConfig.header.links.map((link, index) => (
                           <Link href={link.href} key={index}>
                              <div 
                                 className="text-s hover-to-accent-color fit bold-700 cursor-pointer accent-color whitespace-nowrap"
                                 style={{ color: pathname == link.href ? websiteConfig.accentColor : 'inherit' }}
                              >
                                 {websiteConfig.header.linksStyle == "title-case" ? titleCase(link.label) : link.label.toUpperCase()}
                              </div>
                           </Link>
                        ))}
                     </div>
                     <div className="box fit dfb align-center justify-end gap-10">
                        <Link href="/account">
                           <button className="xs pd-12 pdx-15 whitespace-nowrap">
                              <UserRound size={18} />
                           </button>
                        </Link>
                        <Link href="/cart">
                           <button className="xs pd-12 pdx-15 whitespace-nowrap">
                              <ShoppingBag size={18} />
                           </button>
                        </Link>
                     </div>
                  </div>
               </>) : (websiteConfig.header.desktopNavStyle == "center") ? (<>
                  <div className="box full dfb align-center">
                     <div className="box fit dfb align-center cursor-pointer" onClick={() => router.push("/")}>
                        <Logo size={50} />
                     </div>
                     <div className="box full dfb align-center justify-center gap-20">
                        {websiteConfig.header.links.map((link, index) => (
                           <Link href={link.href} key={index}>
                              <div 
                                 className="text-s hover-to-accent-color fit bold-700 cursor-pointer accent-color whitespace-nowrap"
                                 style={{ color: pathname == link.href ? websiteConfig.accentColor : 'inherit' }}
                              >
                                 {websiteConfig.header.linksStyle == "title-case" ? titleCase(link.label) : link.label.toUpperCase()}
                              </div>
                           </Link>
                        ))}
                     </div>
                     <div className="box fit dfb align-center justify-end gap-10">
                        <Link href="/account">
                           <button className="xs pd-12 pdx-15 whitespace-nowrap">
                              <UserRound size={18} />
                           </button>
                        </Link>
                        <Link href="/cart">
                           <button className="xs pd-12 pdx-15 whitespace-nowrap">
                              <ShoppingBag size={18} />
                           </button>
                        </Link>
                     </div>
                  </div>
               </>) : (<>
                  <div className="box full dfb align-center">
                     <div className="box fit dfb align-center cursor-pointer" onClick={() => router.push("/")}>
                        <Logo size={50} />
                     </div>
                     <div className="box full dfb align-center justify-end gap-20">
                        {websiteConfig.header.links.map((link, index) => (
                           <Link href={link.href} key={index}>
                              <div 
                                 className="text-s hover-to-accent-color fit bold-700 cursor-pointer accent-color whitespace-nowrap"
                                 style={{ color: pathname == link.href ? websiteConfig.accentColor : 'inherit' }}
                              >
                                 {websiteConfig.header.linksStyle == "title-case" ? titleCase(link.label) : link.label.toUpperCase()}
                              </div>
                           </Link>
                        ))}
                        <div className="box fit dfb align-center justify-end gap-10">
                           <Link href="/account">
                              <button className="xs pd-12 pdx-15 whitespace-nowrap">
                                 <UserRound size={18} />
                              </button>
                           </Link>
                           <Link href="/cart">
                              <button className="xs pd-12 pdx-15 whitespace-nowrap">
                                 <ShoppingBag size={18} />
                              </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </>)}
            </>)}

            
            {(deviceType == "mobile") && (<>
               <div className="box full dfb align-center pdx-3">
                  <div className="box fit dfb align-center cursor-pointer" onClick={() => router.push("/")}>
                     <Logo size={50} />
                  </div>
                  <div className="box full dfb align-center justify-end">
                     <button className="pd-1 pdx-1 transparent no-shadow" onClick={() => setMobileOpenHeaderLinks(true)}>
                        <Menu size={25} />
                     </button>
                  </div>
                  <AnimatePresence>
                     {mobileOpenHeaderLinks && (
                        <motion.div
                           className="header-links-mobile"
                           initial={{ x: -900 }}
                           animate={{ x: 0 }}
                           exit={{ x: -900 }}
                           transition={{ duration: 0.2, ease: "easeIn" }}
                        >
                           <div className="box full dfb align-center justify-end mb-2">
                              <button className="transparent no-hover-scale no-shadow" onClick={() => setMobileOpenHeaderLinks(false)}>
                                 <X />
                              </button>
                           </div>
                           <div className="box full dfb column gap-20">
                              {websiteConfig.header.links.map((link, index) => (
                                 <Link href={link.href} key={index}>
                                    <div className="text-ml hover-to-accent-color fit bold-700 cursor-pointer accent-color whitespace-nowrap">
                                       {link.label.toUpperCase()}
                                    </div>
                                 </Link>
                              ))}
                           </div>
                           <div className="box fit dfb column pd-2 gap-10">
                              <Link href="/cart">
                                 <button className="xs pd-12 pdx-15 whitespace-nowrap">
                                    <ShoppingBag size={18} /> Cart
                                 </button>
                              </Link>
                              <Link href="/account">
                                 <button className="xs pd-12 pdx-15 whitespace-nowrap">
                                    <UserRound size={18} /> Account
                                 </button>
                              </Link>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </>)}
         </div>
      </header>
   )
}
