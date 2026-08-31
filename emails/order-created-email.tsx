import {
  Button, Column, Heading,
  Hr, Row, Section, Text,
} from "react-email";
import EmailLayout from "./components/email-layout";

type EmailConfig = {
   logo: string;
	accentColor: string;
	buttonForegroundColor: string;
   name: string;
	email: string;
   shopUrl: string;
}

export type OrderEmailItem = {
   name: string;
   quantity: number;
   // Price of ONE item in pennies
   price: number;
};

export type EmailShippingAddress = {
   name: string;
   line1: string;
   line2?: string;
   city: string;
   postcode: string;
   country: string;
};

type OrderCreatedEmailProps = {
   customerName: string;
   orderId: string;
   items: OrderEmailItem[];
   subtotal: number;
   shipping: number;
   total: number;
   shippingAddress: EmailShippingAddress;
   emailConfig: EmailConfig;
   orderUrl?: string;
   currency?: string;
   companyName?: string;
   logoUrl?: string;
   supportEmail?: string;
};

function formatMoney(amount: number, currency = "GBP") {
   return new Intl.NumberFormat("en-GB", {
      style: "currency", currency
   }).format(amount / 100);
}

export default function OrderCreatedEmail({
   customerName = "John",
   orderId = "order_example123",
   items = [
      {
         name: "Example Product",
         quantity: 1,
         price: 6000,
      },
   ],
   subtotal = 6000,
   shipping = 399,
   total = 6399,
   shippingAddress = {
      name: "John Smith",
      line1: "123 Example Street",
      city: "Glasgow",
      postcode: "G1 1AA",
      country: "United Kingdom",
   },
   orderUrl, emailConfig,
   currency = "GBP",
}: OrderCreatedEmailProps) {
   const address = [
      shippingAddress.line1,
      shippingAddress.line2,
      shippingAddress.city,
      shippingAddress.postcode,
      shippingAddress.country,
   ].filter(Boolean).join(", ");

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

      orderBox: {
         backgroundColor: "#f7f7f7",
         borderRadius: "8px",
         padding: "18px",
         margin: "25px 0",
      },

      orderLabel: {
         color: "#888888",
         fontSize: "11px",
         fontWeight: "600",
         margin: "0 0 5px",
      },

      orderNumber: {
         color: "#111111",
         fontSize: "14px",
         fontWeight: "600",
         margin: "0",
      },

      sectionHeading: {
         color: "#111111",
         fontSize: "18px",
         lineHeight: "24px",
         fontWeight: "600",
         margin: "30px 0 15px",
      },

      hr: {
         borderColor: "#eeeeee",
      },

      item: {
         margin: "12px 0",
      },

      itemLeft: {
         width: "70%",
      },

      itemRight: {
         width: "30%",
      },

      itemName: {
         color: "#111111",
         fontSize: "14px",
         fontWeight: "600",
         margin: "0",
      },

      quantity: {
         color: "#888888",
         fontSize: "12px",
         margin: "3px 0 0",
      },

      price: {
         color: "#111111",
         fontSize: "14px",
         fontWeight: "600",
         margin: "0",
      },

      summaryLabel: {
         color: "#666666",
         fontSize: "14px",
         margin: "6px 0",
      },

      summaryValue: {
         color: "#111111",
         fontSize: "14px",
         margin: "6px 0",
      },

      totalLabel: {
         color: "#111111",
         fontSize: "16px",
         fontWeight: "700",
      },

      total: {
         color: "#111111",
         fontSize: "17px",
         fontWeight: "700",
      },

      addressName: {
         color: "#111111",
         fontSize: "14px",
         fontWeight: "600",
         marginBottom: "4px",
      },

      address: {
         color: "#666666",
         fontSize: "14px",
         lineHeight: "22px",
         marginTop: "0",
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

      notice: {
         backgroundColor: "#f7f7f7",
         borderRadius: "8px",
         color: "#666666",
         fontSize: "13px",
         lineHeight: "20px",
         padding: "15px",
      },
   };

   return (
      <EmailLayout preview={`Your ${emailConfig.name} order has been confirmed`} emailConfig={emailConfig}>
         <Heading style={styles.heading}>Order confirmed 🎉</Heading>
         <Text style={styles.text}>Hi {customerName},</Text>
         <Text style={styles.text}>
            Thanks for your order. We've received it and will begin preparing it
            for dispatch.
         </Text>

         <Section style={styles.orderBox}>
            <Text style={styles.orderLabel}>ORDER NUMBER</Text>
            <Text style={styles.orderNumber}>{orderId}</Text>
         </Section>

         <Heading as="h2" style={styles.sectionHeading}>Your order</Heading>
         <Hr style={styles.hr} />

         {items.map((item, index) => (
            <Row key={`${item.name}-${index}`} style={styles.item}>
               <Column style={styles.itemLeft}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.quantity}>Qty: {item.quantity}</Text>
               </Column>
               <Column align="right" style={styles.itemRight}>
                  <Text style={styles.price}>
                     {formatMoney(
                        item.price * item.quantity,
                        currency,
                     )}
                  </Text>
               </Column>
            </Row>
         ))}

         <Hr style={styles.hr} />

         <Row>
            <Column>
               <Text style={styles.summaryLabel}>Subtotal</Text>
            </Column>
            <Column align="right">
               <Text style={styles.summaryValue}>{formatMoney(subtotal, currency)}</Text>
            </Column>
         </Row>

         <Row>
            <Column>
               <Text style={styles.summaryLabel}>Shipping</Text>
            </Column>
            <Column align="right">
               <Text style={styles.summaryValue}>{formatMoney(shipping, currency)}</Text>
            </Column>
         </Row>

         <Hr style={styles.hr} />

         <Row>
            <Column>
               <Text style={styles.totalLabel}>Total</Text>
            </Column>
            <Column align="right">
               <Text style={styles.total}>{formatMoney(total, currency)}</Text>
            </Column>
         </Row>

         <Heading as="h2" style={styles.sectionHeading}>Shipping to</Heading>

         <Text style={styles.addressName}>{shippingAddress.name}</Text>
         <Text style={styles.address}>{address}</Text>
         {orderUrl && (
            <Section style={styles.buttonContainer}>
               <Button href={orderUrl} style={styles.button}>View your order</Button>
            </Section>
         )}

         <Text style={styles.notice}>
            We'll send you another email as soon as your order has been dispatched
            and tracking becomes available.
         </Text>
      </EmailLayout>
   );
}