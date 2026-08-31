'use client'
import CustomSection from '@/components/CustomSection/CustomSection';
import Hero from '@/components/Hero/Hero';
import Review from '@/components/Review/Review';
import Spacing from '@/components/Spacing/Spacing';
import StoreWrapper from '@/components/StoreWrapper/StoreWrapper'
import Link from 'next/link';
import EmailMarketingImage from '@/public/email-marketing-img.jpg'
import EmailMarketingImage2 from '@/public/email-marketing-img2.png'
import { websiteConfig } from '@/config/websiteConfig'
import { BadgeInfo, CircleUserRound, UserRound, UserRoundPen } from 'lucide-react';
import { useRouter } from 'next/navigation'


export default function page() {
	const router = useRouter();
	return (
		<StoreWrapper>
			<Hero 
				name={websiteConfig.hero.headline} 
				description={websiteConfig.hero.description} 
				style="version-2" backgroundOpacity={0.55}
				actions={[
					{
						label: "Shop Now", buttonStyle: "normal", type: "action",
						action: () => router.push("/collections"), buttonSize: "sm"
					}
				]}
			/>

			<CustomSection
				bgColor="accent-color-10" textColor="black"
				customSectionConfig={{
					title: "Join the Club".toUpperCase(), type: "version-2", align: "left",
					image: EmailMarketingImage2.src, imagePosition: "right", icon: <CircleUserRound size={40} />
				}}

			>
				<div className="text-sm full mb-15">
					Click below to join the people who get early access to new drops, discounts and more.
				</div>
				<div className="box full">
					<Link href="https://ayeik-perfumes.vercel.app/signup" target="_blank" className='box fit'>
						<button className="s pd-15 pdx-3">
							<UserRound size={18} /> Join NOW
						</button>
					</Link>
				</div>
			</CustomSection>

			{websiteConfig.resellingSite && (
				<CustomSection
					bgColor="accent-color-50" textColor="black"
					customSectionConfig={{
						title: "Independent Reseller Disclaimer".toUpperCase(), type: "version-1", align: "left", icon: <BadgeInfo size={40} />
					}}
				>
					<div className="text-s line-height-15 full pd-1 mt-1">
						This website operates solely as an independent reseller of products. We are not the manufacturer, official distributor, authorised retailer, or representative of any of the brands featured on this website unless explicitly stated otherwise.
					</div>
					<div className="text-s line-height-15 full pd-1">
						All brand names, trademarks, logos, product names, packaging designs, and other intellectual property displayed on this website remain the property of their respective owners. Their use on this website is solely for the purpose of identifying and describing the products being resold.
					</div>
					<div className="text-s line-height-15 full pd-1">
						We do not claim any ownership, affiliation, sponsorship, endorsement, or partnership with the brands whose products are listed on this website.
					</div>
					<div className="text-s line-height-15 full pd-1">
						Products sold through this website are independently sourced and resold by us. Any reference to a brand or manufacturer should not be interpreted as implying an official relationship with that brand.
					</div>
					<div className="text-s line-height-15 full pd-1">
						By purchasing from this website, customers acknowledge that they are purchasing from an independent reseller and not directly from the original manufacturer or an authorised retailer, unless specifically stated otherwise.
					</div>
				</CustomSection>
			)}
		</StoreWrapper>
	)
}
