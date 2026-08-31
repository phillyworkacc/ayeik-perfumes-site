import type { Metadata } from "next";
import { Toaster } from "sonner";
import { websiteConfig } from "@/config/websiteConfig";
import { ModalProvider } from "@/components/Modal/ModalContext";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import NotificationsProvider from "@/components/NotificationsProvider/NotificationsProvider";
import WebsiteConfigSetup from "@/components/WebsiteConfigSetup/WebsiteConfigSetup";
import { UserProvider } from "@/hooks/useUser";

export const metadata: Metadata = {
  title: websiteConfig.name,
  description: websiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <UserProvider>
        <NotificationsProvider>
          <WebsiteConfigSetup>
            <html lang="en">
              <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
              </head>
              <body className={websiteConfig.font.fontFamily.className}>
                <ModalProvider>
                  <Toaster richColors position="top-center" />
                  {children}
                </ModalProvider>
              </body>
            </html>
          </WebsiteConfigSetup>
        </NotificationsProvider>
      </UserProvider>
    </SessionWrapper>
  );
}
