'use client'
import './ImageGallery.css'
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { useState } from 'react';

type ImageGalleryProps = {
   images: StaticImageData[];
}

export default function ImageGallery ({ images }: ImageGalleryProps) {
   const [imageSelected, setImageSelected] = useState(-1);

   return (
      <div className="image-gallery">
         {(imageSelected > -1) && (<motion.div 
            className="image-zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
         >
            <div className="close">
               <button className="delete pd-05 pdx-05" onClick={() => setImageSelected(-1)}><X size={30} color='#fff' /></button>
            </div>
            <div className="image-selected-display">
               <img src={images[imageSelected].src} alt="image selected" />
            </div>
         </motion.div>)}
         <div className="all-images">
            {images.map((image, index) => (
               <div key={`row-item-${index}`} className="gallery-image" onClick={() => setImageSelected(index)}>
                  <img src={image.src} alt={`gallery-image-${index}`} />
               </div>
            ))}
         </div>
      </div>
   )
}
