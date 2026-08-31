'use client'
import { websiteConfig } from '@/config/websiteConfig'
import { usePageTitle } from "@/utils/usePageTitle"
import { UserRoundPen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Review } from '@/types'
import CustomSection from "@/components/CustomSection/CustomSection"
import SectionBannerTitle from "@/components/SectionBannerTitle"
import ReviewCard from "@/components/Review/Review"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"
import Spacing from '@/components/Spacing/Spacing'

export default function ReviewPage ({ reviews }: { reviews: Review[] }) {
   usePageTitle(`Reviews | ${websiteConfig.name}`);
   const router = useRouter();

   return (
      <StoreWrapper>
         <SectionBannerTitle
            eyebrow='reviews'
            title="Reviews"
            description="What Our Customers Say"
         />
         <CustomSection
            bgColor="#e0e0e0" textColor="black"
            customSectionConfig={{ title: "", type: "version-1", align: "left" }}
         >
				<div className="box full">
					<button className="s pd-15 pdx-3" onClick={() => router.push("/review-us")}>
						<UserRoundPen size={18} /> Write a review
					</button>
				</div>
            <Spacing size={2} />
            <div className="box full dfb wrap gap-10">
               {reviews.map(review => <ReviewCard key={review.name} review={review} />)}
            </div>
         </CustomSection>
      </StoreWrapper>
   )
}
