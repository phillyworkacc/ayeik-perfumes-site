'use client'
import Link from 'next/link'
import CustomSection from '@/components/CustomSection/CustomSection'
import { Mail } from 'lucide-react'
import { websiteConfig } from '@/config/websiteConfig'
import { usePageTitle } from '@/utils/usePageTitle'
import StoreWrapper from '@/components/StoreWrapper/StoreWrapper'
import Spacing from '@/components/Spacing/Spacing'
import { SocialCard } from '@/components/SocialCard/SocialCard'

export default function GalleryPage () {
   usePageTitle(`Contact Us | ${websiteConfig.name}`);
   
   return (
      <StoreWrapper>
         <CustomSection 
            textColor="black" bgColor="#efefef"
            customSectionConfig={{
               title: "Contact Us".toUpperCase(),
               titleSize: "l", type: "version-1", align: "left"
            }}
         >
            <div className="horizontal-convertible full gap-40">
               <div className="box full">
                  <div className="text-m pd-1 full text-left">Contact us by filling in the form or by using any of the options below and we'll get back to you</div>
                  <div className="box full pd-1 dfb column gap-10">
                     <Link href={`mailto:${websiteConfig.email}`} target="_blank" className='box fit'>
                        <button className="xs pd-15 pdx-2 fit whitespace-nowrap"><Mail size={17} /> {websiteConfig.email}</button>
                     </Link>
                  </div>
               </div>
            </div>

            <Spacing />
            
            <div className="box full dfb wrap gap-10">
               {websiteConfig.socialMedia?.map(socialMedia => (
                  <SocialCard 
                     key={socialMedia.platform}
                     platform={socialMedia.platform}
                     url={socialMedia.link}
                  />
               ))}
            </div>
         </CustomSection>
      </StoreWrapper>
   )
}
