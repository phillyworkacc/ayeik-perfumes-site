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

type OrderTrackableEmailProps = {
   customerName: string;
   orderId: string;
   carrier: string;
   trackingNumber: string;
   trackingUrl: string;
   estimatedDelivery?: string;
   emailConfig: EmailConfig;
};

export default function OrderTrackableEmail({
   customerName = "John",
   orderId = "order_example123",
   carrier = "Royal Mail",
   trackingNumber = "AB123456789GB",
   trackingUrl = "https://example.com/tracking",
   estimatedDelivery, emailConfig
}: OrderTrackableEmailProps) {

   const styles = {
      icon: {
         fontSize: "38px",
         textAlign: "center" as const,
         margin: "15px 0 5px",
      },

      heading: {
         color: "#111111",
         fontSize: "28px",
         lineHeight: "36px",
         fontWeight: "700",
         textAlign: "center" as const,
         margin: "10px 0 30px",
      },

      text: {
         color: "#444444",
         fontSize: "15px",
         lineHeight: "24px",
      },

      trackingBox: {
         backgroundColor: "#f7f7f7",
         borderRadius: "10px",
         padding: "22px",
         margin: "25px 0",
      },

      label: {
         color: "#888888",
         fontSize: "10px",
         lineHeight: "16px",
         fontWeight: "600",
         margin: "15px 0 2px",
      },

      value: {
         color: "#111111",
         fontSize: "14px",
         fontWeight: "600",
         margin: "0",
      },

      trackingNumber: {
         color: "#111111",
         fontSize: "16px",
         fontWeight: "700",
         letterSpacing: "1px",
         margin: "0",
      },

      buttonContainer: {
         textAlign: "center" as const,
         margin: "30px 0",
      },

      button: {
         backgroundColor: emailConfig.accentColor,
         borderRadius: "8px",
         color: emailConfig.buttonForegroundColor,
         fontSize: "14px",
         fontWeight: "600",
         textDecoration: "none",
         padding: "14px 28px",
      },

      smallText: {
         color: "#888888",
         fontSize: "12px",
         lineHeight: "19px",
         textAlign: "center" as const,
      },
   };

   return (
      <EmailLayout preview={`Your order is on its way`} emailConfig={emailConfig}>
         <Text style={styles.icon}>📦</Text>
         <Heading style={styles.heading}>Your order is on its way!</Heading>
         <Text style={styles.text}>Hi {customerName},</Text>
         <Text style={styles.text}>
            Good news — your order has now been dispatched and tracking information
            is available.
         </Text>

         <Section style={styles.trackingBox}>
            <Text style={styles.label}>ORDER</Text>
            <Text style={styles.value}>{orderId}</Text>
            <Text style={styles.label}>COURIER</Text>
            <Text style={styles.value}>{carrier}</Text>
            <Text style={styles.label}>TRACKING NUMBER</Text>
            <Text style={styles.trackingNumber}>{trackingNumber}</Text>
            {estimatedDelivery && (<>
               <Text style={styles.label}>ESTIMATED DELIVERY</Text>
               <Text style={styles.value}>{estimatedDelivery}</Text>
            </>)}
         </Section>

         <Section style={styles.buttonContainer}>
            <Button href={trackingUrl} style={styles.button}>
               Track your order
            </Button>
         </Section>

         <Text style={styles.smallText}>
            Tracking information may take a short while to update after the parcel
            is first collected by the courier.
         </Text>
      </EmailLayout>
   );
}