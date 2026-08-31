'use client'
import { websiteConfig } from "@/config/websiteConfig";
import { useEffect, useState } from "react"

export default function GoogleMap () {
   const [width, setWidth] = useState('');
   const [height, setHeight] = useState('');

   useEffect(() => {
      setWidth(window.innerWidth <= 900 ? '300' : '600');
      setHeight(window.innerHeight <= 900 ? '300' : '400');
      window.addEventListener("resize", () => {
         setWidth(window.innerWidth <= 900 ? '300' : '600');
         setHeight(window.innerHeight <= 900 ? '300' : '400');
      })
   }, [])

   

   return (
      <div className="google-map-embed">
         <iframe 
            src={websiteConfig.googleMapEmbedUrl}
            width={width}
            height={height} style={{border:0}} 
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
         />
      </div>
   )
}
