'use client'
import { websiteConfig } from "@/config/websiteConfig";
import Spacing from "./Spacing/Spacing";

type SectionBannerTitleProps = {
   eyebrow: string;
   title: string;
   description: string;
}

export default function SectionBannerTitle({ eyebrow, title, description }: SectionBannerTitleProps) {
   return (
      <section 
         className="section-banner-title"
         style={{
            background: `linear-gradient(to bottom, ${websiteConfig.accentColor}2d, ${websiteConfig.accentColor}1a)`
         }}
      >
         <div className="page-container">
            <Spacing />
            <div className="text-xxxs full bold-700" style={{ color: websiteConfig.accentColor }}>{eyebrow.toUpperCase()}</div>
            <div className="text-xxxl full pd-1 bold-900 section-banner-heading">{title}</div>
            <div className="text-xs full grey-5 line-height-14">{description}</div>
            <Spacing />
         </div>
      </section>
   )
}
