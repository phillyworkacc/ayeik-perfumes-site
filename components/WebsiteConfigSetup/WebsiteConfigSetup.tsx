'use client'
import { useEffect } from "react";
import { websiteConfig } from "@/config/websiteConfig";

export default function WebsiteConfigSetup ({ children }: { children: React.ReactNode }) {
   useEffect (() => {
      const root = document.documentElement;
      root.style.setProperty("--accent-color", websiteConfig.accentColor);
      root.style.setProperty("--accent-color-70", `${websiteConfig.accentColor}b3`);
      root.style.setProperty("--accent-color-50", `${websiteConfig.accentColor}80`);
      root.style.setProperty("--accent-color-30", `${websiteConfig.accentColor}4d`);
      root.style.setProperty("--accent-color-10", `${websiteConfig.accentColor}1a`);
      root.style.setProperty("--font-family", `"${websiteConfig.font.fontName}", ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`);
   }, []);
   return (<>{children}</>)
}
