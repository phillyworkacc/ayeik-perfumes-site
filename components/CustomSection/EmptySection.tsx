'use client'
import { websiteConfig } from "@/config/websiteConfig";

type EmptySectionProps = {
   children: React.ReactNode;
   bgColor: string;
   textColor: string;
}

export default function EmptySection ({ bgColor, textColor, children }: EmptySectionProps) {
   const { accentColor } = websiteConfig;
   const bgColorsOptions = ["accent-color-10", "accent-color-30", "accent-color-50", "accent-color-70", "accent-color-90"];
   const bgColors: Record<string, string> = {
      "accent-color-10": accentColor + "1a",
      "accent-color-30": accentColor + "4d",
      "accent-color-50": accentColor + "80",
      "accent-color-70": accentColor + "b3",
      "accent-color-90": accentColor + "e5",
   }
   const style = { backgroundColor: bgColorsOptions.includes(bgColor) ? bgColors[bgColor!] : bgColor || accentColor, color: textColor }

   return (
      <section className="custom-section" style={style}>
         <div className="page-container">{children}</div>
      </section>
   )
}
