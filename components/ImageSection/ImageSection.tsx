'use client'
import { StaticImageData } from "next/image"

type ImageSectionProps = {
   image: StaticImageData;
   children: React.ReactNode;
   backgroundOpacity?: number;
}

export default function ImageSection ({ image, children, backgroundOpacity }: ImageSectionProps) {
   return (
      <section 
         className="image-section"
         style={{
            backgroundImage: `url('${image.src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
         }}
      >
         <div 
            className="image-section-cover"
            style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity || 0.2})` }}
         >
            <div className="page-container">{children}</div>
         </div>
      </section>
   )
}
