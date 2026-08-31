import { Button, Heading, Section, Text } from "react-email";
import EmailLayout from "./components/email-layout";

type EmailConfig = {
   logo: string;
	accentColor: string;
	buttonForegroundColor: string;
   name: string;
	email: string;
   shopUrl: string;
}

type WelcomeEmailProps = {
   name: string;
   emailConfig: EmailConfig;
};

export default function WelcomeEmail({ name = "John", emailConfig }: WelcomeEmailProps) {
   const styles = {
      heading: {
         color: "#111111",
         fontSize: "28px",
         lineHeight: "36px",
         fontWeight: "700",
         margin: "20px 0",
      },

      text: {
         color: "#444444",
         fontSize: "15px",
         lineHeight: "24px",
      },

      buttonContainer: {
         margin: "30px 0",
      },

      button: {
         backgroundColor: emailConfig.accentColor,
         borderRadius: "8px",
         color: emailConfig.buttonForegroundColor,
         fontSize: "14px",
         fontWeight: "600",
         textDecoration: "none",
         padding: "14px 24px",
      },

      signOff: {
         color: "#444444",
         fontSize: "15px",
         lineHeight: "24px",
         marginTop: "30px",
      },
   };

   return (
      <EmailLayout preview={`Welcome to ${emailConfig.name}`} emailConfig={emailConfig}>
         <Heading style={styles.heading}>Welcome, {name}! 👋</Heading>
         <Text style={styles.text}>
            Thanks for joining {emailConfig.name}. We're happy to have you here.
         </Text>

         <Text style={styles.text}>
            You can now browse products, place orders and keep track of
            everything directly from your account.
         </Text>

         <Section style={styles.buttonContainer}>
            <Button href={emailConfig.shopUrl} style={styles.button}>
               Start shopping
            </Button>
         </Section>

         <Text style={styles.text}>
            If you ever need any help, just reply to this email and we'll be happy
            to assist.
         </Text>

         <Text style={styles.signOff}>
            Thanks,
            <br />
            The {emailConfig.name} Team
         </Text>
      </EmailLayout>
   );
}