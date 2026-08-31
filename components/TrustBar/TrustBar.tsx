'use client'
import { websiteConfig } from "@/config/websiteConfig";

type TrustBarProps = {
   trustItems: {
      icon: React.ReactNode;
      label: string;
   }[];
   bgColor?: "accent-color-10" | "accent-color-30" | "accent-color-50" | "accent-color-70" | "accent-color-90";
   textColor: string;
}

export default function TrustBar ({ trustItems, bgColor, textColor }: TrustBarProps) {
   const { accentColor } = websiteConfig;
   const bgColors = {
      "accent-color-10": accentColor + "1a",
      "accent-color-30": accentColor + "4d",
      "accent-color-50": accentColor + "80",
      "accent-color-70": accentColor + "b3",
      "accent-color-90": accentColor + "e5",
   }

   return (
      <section 
         className="trust-bar"
         style={{ backgroundColor: bgColors[bgColor!] || accentColor, color: textColor }}
      >
         <div className="page-container">
            <div className="box full dfb align-center justify-center gap-20 wrap">
               {trustItems.map((trustItem, index) => (
                  <div key={index} className="box fit dfb align-center justify-center gap-5">
                     {trustItem.icon}
                     <div className="text-sm bold-700 whitespace-nowrap">{trustItem.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}
