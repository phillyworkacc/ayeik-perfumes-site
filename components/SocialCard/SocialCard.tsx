'use client'
import { SocialMediaPlatform } from "@/config/websiteConfig";
import styles from "./SocialCard.module.css";
import { ArrowUpRight } from "lucide-react";

// Brand config: colors + labels for each supported platform
const PLATFORM_CONFIG: Record<any, any> = {
   instagram: {
      label: "Instagram",
      handle: "Follow us",
      bg: "linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)",
      icon: (
         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
         <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
         <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
         <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
         </svg>
      ),
   },
   tiktok: {
      label: "TikTok",
      handle: "Follow us",
      bg: "#000000",
      icon: (
         <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
         <path d="M16.5 2h-3.2v13.6a3 3 0 1 1-2.5-2.96V9.4a6.2 6.2 0 1 0 5.7 6.18V8.8a7.1 7.1 0 0 0 4.1 1.3V6.9a3.9 3.9 0 0 1-4.1-3.9V2z" />
         </svg>
      ),
   },
   facebook: {
      label: "Facebook",
      handle: "Follow us",
      bg: "#1877F2",
      icon: (
         <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
         <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.02H7.9v-2.92h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.92h-2.34V22C18.34 21.23 22 17.08 22 12.06z" />
         </svg>
      ),
   },
   youtube: {
      label: "YouTube",
      handle: "Subscribe",
      bg: "#FF0000",
      icon: (
         <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
         <path d="M21.6 7.2s-.21-1.49-.87-2.15c-.83-.87-1.76-.87-2.19-.92C15.44 4 12 4 12 4h-.01s-3.44 0-6.54.13c-.43.05-1.36.05-2.19.92-.66.66-.87 2.15-.87 2.15S2.18 8.94 2.18 10.68v1.63c0 1.74.21 3.48.21 3.48s.21 1.49.87 2.15c.83.87 1.92.84 2.41.93 1.75.17 7.33.22 7.33.22s3.44 0 6.54-.13c.43-.05 1.36-.05 2.19-.92.66-.66.87-2.15.87-2.15s.21-1.74.21-3.48v-1.63c0-1.74-.21-3.48-.21-3.48zM9.98 14.6V8.9l5.6 2.86-5.6 2.84z" />
         </svg>
      ),
   },
};

type SocialCardProps = {
   platform: SocialMediaPlatform;
   url: string;
}

export function SocialCard({ platform, url }: SocialCardProps) {
   const config = PLATFORM_CONFIG[platform];

   if (!config) return null;

   return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.card}>
         <div className={styles.iconWrapper} style={{ background: config.bg }}>
            {config.icon}
         </div>
         <div className={styles.textWrapper}>
            <p className={styles.label}>{config.label}</p>
            <p className={styles.handle}>{config.handle}</p>
         </div>
         <ArrowUpRight className={styles.arrow} />
      </a>
   );
}