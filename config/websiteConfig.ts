// images
import LogoImage from "@/public/logo.jpg"
import HeroImage from "@/public/banner-image.png"
import { StaticImageData } from "next/image";
import { NextFont } from "next/dist/compiled/@next/font";
import { DM_SansFont } from "@/fonts/fonts";

export type HeaderLink = {
   label: string;
   href: string;
}

export type HeaderSettings = {
   background: string;
   color: string;
   linksStyle: "upper-case" | "title-case";
   links: HeaderLink[];
   desktopNavStyle: "left" | "center" | "right";
}

export type HeroSettings = {
	headline: string;
	subHeading: string;
	description: string;
	backgroundImage: StaticImageData;
}

export type ReviewItem = {
   name: string;
   review: string;
}

export type SocialMediaPlatform = "instagram" | "tiktok" | "facebook" | "x" | "linkedIn" | "youtube";
export type SocialMediaLink = {
   platform: SocialMediaPlatform;
   label: string;
   link: string;
}
export type SocialMediaLinks = SocialMediaLink[];

export type FooterSettings = {
   style: "footer-1" | "footer-2";
   logoSize?: number;
   background?: string;
   color?: string;
}

export type FontSettings = {
   fontFamily: NextFont;
	fontName: string;
}

export type EmailSettings = {
	name: string;
	email: string;
}

export type WebsiteConfig = {
	logo: StaticImageData;
	font: FontSettings;
   accentColor: string;
	resellingSite: boolean;
	notificationsKey: string;
   name: string;
   email: string;
   address: string;
	hero: HeroSettings;
   description: string;
	header: HeaderSettings;
   reviews: ReviewItem[];
   footer: FooterSettings;
   socialMedia?: SocialMediaLinks;
	emailSettings: EmailSettings;
	shippingInformation: {
		name: string;
		addressLine1: string;
		addressLine2: string;
		city: string; 
		postcode: string;
		country: string; 
		phone: string;
		email: string;
	}
}

export const websiteConfig: WebsiteConfig = {
	logo: LogoImage,
	font: {
		fontFamily: DM_SansFont,
		fontName: "DM Sans"
	},
	accentColor: "#a07d6b",
   name: "Ayeik Perfumes",
	email: "ayakperfumes@gmail.com",
	emailSettings: {
		name: "Ayeik Perfumes",
		email: "ayakperfumes@gmail.com",
	},
	address: "",
   description: "Buy designer perfumes at ayeik perfumes",
	resellingSite: true,
	notificationsKey: "ayeik-admin-enabled-notifications",
	header: {
		background: "#fff",
		color: "#000000",
		linksStyle: "title-case",
		desktopNavStyle: "right",
		links: [
			{ href: "/", label: "Home" },
			{ href: "/products", label: "Products" },
			{ href: "/collections", label: "Collections" },
			{ href: "/reviews", label: "Reviews" },
			{ href: "/contact", label: "Contact Us" },
		]
	},
	hero: {
		headline: "Ayeik Perfumes",
		subHeading: "Buy designer perfumes at ayeik perfumes",
		description: "Buy designer perfumes at ayeik perfumes.",
		backgroundImage: HeroImage
	},
	reviews: [
		{
			name: "Sarah Thompson",
			review: "Absolutely delighted with the work. The team was professional, punctual, and the finish exceeded my expectations. My home looks completely refreshed and I wouldn't hesitate to recommend them."
		},
		{
			name: "Michael Carter",
			review: "Fantastic service from start to finish. Communication was excellent, the painters were tidy and respectful, and the quality of the workmanship was outstanding. Great value for money."
		},
		{
			name: "Emma Richardson",
			review: "We hired them to paint several rooms in our house and the results were excellent. Attention to detail was impressive, the project was completed on schedule, and everything was left spotless afterward."
		}
	],
	footer: {
		style: "footer-2",
	},
	socialMedia: [
		{
			platform: "instagram",
			label: "Instagram",
			link: "https://www.instagram.com/ayeikperfumes/"
		},
	],
	shippingInformation: {
		name: "Ayeik Perfumes",
		addressLine1: "30 Angus Road",
		addressLine2: "",
		city: "Glasgow",
		postcode: "G524RG",
		country: "GB",
		phone: "+442322321234",
		email: "ayakperfumes@gmail.com",
	}
}