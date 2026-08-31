'use client'
import { websiteConfig } from "@/config/websiteConfig";

type CustomSectionConfig = | {
   type: "version-1";
   title: React.ReactNode | string;
   titleSize?: "l" | "xl" | "xxl" | "xxxl" | "b" | "xb";
   align: "left" | "center";
   icon?: React.ReactNode;
} | {
   type: "version-2";
   title: React.ReactNode | string;
   titleSize?: "l" | "xl" | "xxl" | "xxxl" | "b" | "xb";
   image: string;
   align: "left" | "center";
   imagePosition: "left" | "right";
   icon?: React.ReactNode;
}

type CustomSectionProps = {
   customSectionConfig: CustomSectionConfig;
   children: React.ReactNode;
   bgColor: string;
   textColor: string;
}

export default function CustomSection ({ customSectionConfig, children, bgColor, textColor }: CustomSectionProps) {
   const { accentColor } = websiteConfig;
   const bgColorsOptions = ["accent-color-10", "accent-color-30", "accent-color-50", "accent-color-70", "accent-color-90"];
   const bgColors: Record<string, string> = {
      "accent-color-10": accentColor + "1a",
      "accent-color-30": accentColor + "4d",
      "accent-color-50": accentColor + "80",
      "accent-color-70": accentColor + "b3",
      "accent-color-90": accentColor + "e5",
   }

   if (customSectionConfig.type == "version-1") {
      const { title, align, icon, titleSize } = customSectionConfig;
      return (
         <section 
            className="custom-section"
            style={{ backgroundColor: bgColorsOptions.includes(bgColor) ? bgColors[bgColor!] : bgColor || accentColor, color: textColor }}
         >
            <div className="page-container">
               {icon ? (<>
                  <div className={`box full dfb align-center justify-${align == 'left' ? 'start' : align} gap-10`}>
                     {icon} <div className={`text-${titleSize || 'b'} bold-700 fit whitespace-nowrap text-${align}`}>{title}</div>
                  </div>
               </>) : (<>
                  <div className={`text-b bold-700 full text-${align}`}>{title}</div>
               </>)}
               <div className={`box full text-${align}`}>{children}</div>
            </div>
         </section>
      )
   } else if (customSectionConfig.type == "version-2") {
      const { title, image, align, icon, titleSize, imagePosition } = customSectionConfig;
      return (
         <section 
            className="custom-section"
            style={{ 
               backgroundColor: bgColorsOptions.includes(bgColor) ? bgColors[bgColor!] : bgColor || accentColor, 
               color: textColor,
               padding: "0"
            }}
         >
            <div className="page-container">
               <div className="horizontal-convertible pd-3 vertical-center gap-20">
                  <div className="box full pdx-2" style={{ order: (imagePosition == "left" ? 1 : 2) }}>
                     <img 
                        className="image-fit" src={image} alt='custom-section-image'
                        style={{
                           height: "100%", width: "100%",
                           objectFit: "cover", borderRadius: "30px"
                        }}
                     />
                  </div>
                  <div className="box full pdx-2 pd-1" style={{ order: (imagePosition == "left" ? 2 : 1) }}>
                     <div className="box full pd-1 mb-1">
                        {icon ? (<>
                           <div className={`box full dfb align-center justify-${align == 'left' ? 'start' : align} gap-10`}>
                              {icon} <div className={`text-${titleSize || 'b'} bold-700 fit whitespace-nowrap text-${align}`}>{title}</div>
                           </div>
                        </>) : (<>
                           <div className={`text-b bold-700 full text-${align}`}>{title}</div>
                        </>)}
                     </div>
                     <div className="box full text-left">{children}</div>
                  </div>
               </div>
               {/* <div className="horizontal-convertible full dfb gap-10">
                  <div className="box full text-left">{children}</div>
                  <div className="box full">
                     <img className="image-fit" src={image} alt='custom-section-image' style={{ borderRadius: "20px" }} />
                  </div>
               </div> */}
            </div>
         </section>
      )
   }
}
