import {
  Body, Container, Head, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "react-email";
import type { ReactNode } from "react";

type EmailConfig = {
   logo: string;
	accentColor: string;
	buttonForegroundColor: string;
   name: string;
	email: string;
   shopUrl: string;
}

type EmailLayoutProps = {
   preview: string;
   children: ReactNode;
   emailConfig: EmailConfig;
};

export default function EmailLayout({ preview, children, emailConfig }: EmailLayoutProps) {
   return (
      <Html lang="en">
         <Head />
         <Preview>{preview}</Preview>
         <Body style={styles.body}>
            <Container style={styles.container}>
               <Section style={styles.header}>
                  <Img
                     src={emailConfig.logo}
                     alt={emailConfig.name}
                     width="120"
                     style={styles.logo}
                  />
               </Section>
               <Section style={styles.content}>{children}</Section>
               <Hr style={styles.hr} />
               <Section style={styles.footer}>
                  <Text style={styles.footerText}>
                     Need help?{" "}
                     <Link
                        href={`mailto:${emailConfig.email}`}
                        style={styles.footerLink}
                     >
                        {emailConfig.email}
                     </Link>
                  </Text>
                  <Text style={styles.footerText}>
                     © {new Date().getFullYear()} {emailConfig.name}. All rights reserved.
                  </Text>
               </Section>
            </Container>
         </Body>
      </Html>
   );
}

const styles = {
   body: {
      backgroundColor: "#f6f6f6",
      fontFamily:
         '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: "0",
      padding: "30px 0",
   },

   container: {
      backgroundColor: "#ffffff",
      margin: "0 auto",
      maxWidth: "600px",
      borderRadius: "12px",
      overflow: "hidden",
   },

   header: {
      padding: "30px 40px 20px",
      textAlign: "center" as const,
   },

   logo: {
      margin: "0 auto",
      objectFit: "contain" as const,
   },

   brand: {
      fontSize: "24px",
      lineHeight: "30px",
      fontWeight: "700",
      color: "#111111",
      margin: "0",
   },

   content: {
      padding: "10px 40px 35px",
   },

   hr: {
      borderColor: "#eeeeee",
      margin: "0",
   },

   footer: {
      padding: "25px 40px 30px",
      textAlign: "center" as const,
   },

   footerText: {
      color: "#888888",
      fontSize: "12px",
      lineHeight: "18px",
      margin: "4px 0",
   },

   footerLink: {
      color: "#555555",
      textDecoration: "underline",
   },
};