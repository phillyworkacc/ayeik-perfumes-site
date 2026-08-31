'use client'
import Link from "next/link";
import { Logo, SocialMediaIcon } from "../Icons/Icon";
import { websiteConfig } from "@/config/websiteConfig";
import { Mail, MapPin, Phone } from "lucide-react";
import Spacing from "../Spacing/Spacing";

export default function Footer () {
   const { accentColor, name, footer } = websiteConfig;

   if (footer.style == "footer-1") {
      return (
         <section 
            className="footer"
            style={{ backgroundColor: footer.background || `${accentColor}4d`, color: footer.color || "black" }}
         >
            <div className="page-container">
               <div className="box full dfb column gap-10">
                  <Logo size={35} />
                  <div className="text-xs pd-1 full">
                     &copy; {new Date().getFullYear()} Copyright {name}
                  </div>
                  <div className="box full pd-05">
                     <div className="horizontal-convertible gap-10">
                        <div className="box full dfb column gap-10">
                           <div className="text-s bold-700">Business</div>
                           {websiteConfig.header.links.map(headerLink => (
                              <Link key={headerLink.href} href={headerLink.href} className="text-xs fit">
                                 <div className="text-xs fit visible-link">{headerLink.label}</div>
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="box full dfb align-center gap-20 wrap pd-15 mt-1">
                     <Link href='/privacy-policy' className="text-s fit">
                        <div className="text-xs fit visible-link">Privacy Policy</div>
                     </Link>
                     <Link href='/terms' className="text-s fit">
                        <div className="text-xs fit visible-link">Terms and Conditions</div>
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      )
   } else if (footer.style == "footer-2") {
      return (
         <section 
            className="footer"
            style={{ backgroundColor: footer.background || `${accentColor}4d`, color: footer.color || "black" }}
         >
            <div className="page-container">
               <div className="box full dfb column gap-10 wrap">
                  <Logo size={footer.logoSize || 45} />
                  <div className="box full dfb gap-40 wrap">
                     <div className="box fit dfb column gap-10">
                        <div className="text-sm full bold-600">{websiteConfig.name}</div>
                        <Link href={`mailto:${websiteConfig.email}`} className="text-xs full dfb align-center gap-5 visible-link">
                           <Mail size={17} /> {websiteConfig.email}
                        </Link>
                        <div className="text-xs full dfb align-center gap-5">
                           <MapPin size={17} /> {websiteConfig.address}
                        </div>
                     </div>
                     <div className="box fit dfb column gap-10">
                        <div className="text-s bold-700">Business</div>
                        {websiteConfig.header.links.map(headerLink => (
                           <Link key={headerLink.href} href={headerLink.href} className="text-xs fit">
                              <div className="text-xs fit visible-link">{headerLink.label}</div>
                           </Link>
                        ))}
                     </div>
                     {websiteConfig.socialMedia && (<div className="box fit dfb column gap-10">
                        <div className="text-s bold-700">Social Media</div>
                        {websiteConfig.socialMedia.map(socialMediaItem => (
                           <Link key={socialMediaItem.platform} href={socialMediaItem.link} className="text-xs fit dfb align-center gap-5" target="_blank">
                              <SocialMediaIcon socialMediaKey={socialMediaItem.platform} size={18} />
                              <div className="text-xs fit visible-link">{socialMediaItem.label}</div>
                           </Link>
                        ))}
                     </div>)}
                  </div>
               </div>
               <Spacing />
               <div style={{ width: "100%", height: "1px", background: "#888888" }} />
               <div className="box full pd-15 dfb column">
                  <div className="text-xs pd-1 full bold-600">&copy; {new Date().getFullYear()} Copyright {name}</div>
                  <div className="box full dfb align-center gap-20 wrap">
                     <Link href='/privacy-policy' className="text-s fit">
                        <div className="text-xs fit visible-link">Privacy Policy</div>
                     </Link>
                     <Link href='/terms' className="text-s fit">
                        <div className="text-xs fit visible-link">Terms and Conditions</div>
                     </Link>
                  </div>

               </div>
            </div>
         </section>
      )
   } 
}
