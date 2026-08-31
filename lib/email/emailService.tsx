import WelcomeEmail from "@/emails/welcome-email";
import OrderCreatedEmail, { EmailShippingAddress, OrderEmailItem } from "@/emails/order-created-email";
import OrderTrackableEmail from "@/emails/order-trackable-email";
import sendMail from "./sendMail";
import { render } from "react-email";
import { websiteConfig } from "@/config/websiteConfig";

const emailConfig = {
	logo: websiteConfig.logo.src,
	accentColor: websiteConfig.accentColor,
	buttonForegroundColor: "#ffffff",
	name: websiteConfig.name,
	email: websiteConfig.email,
	shopUrl: process.env.NEXT_PUBLIC_SITE_URL! || "http://localhost:3000",
}

export async function sendWelcomeEmail({ to, name }: { to: string; name: string; }) {
	const content = await render(
		<WelcomeEmail
			name={name}
			emailConfig={emailConfig}
		/>
	)
   return await sendMail({
      to,
      subject: `Welcome to ${emailConfig.name}`,
      content
   });
}

export async function sendOrderCreatedEmail({
	to, customerName, orderId, items, orderUrl,
	subtotal, shipping, total, shippingAddress,
}: {
	to: string; customerName: string; orderId: string; items: OrderEmailItem[]; orderUrl: string;
	subtotal: number; shipping: number; total: number; shippingAddress: EmailShippingAddress;
}) {
	const content = await render(
      <OrderCreatedEmail
			customerName={customerName}
			orderId={orderId}
			items={items}
			subtotal={subtotal}
			shipping={shipping}
			total={total}
			shippingAddress={shippingAddress}
			orderUrl={`${emailConfig.shopUrl}${orderUrl}`}
			emailConfig={emailConfig}
      />
	)

	return await sendMail({
		to,
		subject: `Order confirmed - ${orderId}`,
		content
	});
}

export async function sendOrderTrackableEmail({
	to, customerName, orderId, carrier,
	trackingNumber, trackingUrl, estimatedDelivery,
}: {
	to: string; customerName: string; orderId: string; carrier: string;
	trackingNumber: string;trackingUrl: string;estimatedDelivery?: string;
}) {

	const content = await render(
		<OrderTrackableEmail
			customerName={customerName}
			orderId={orderId}
			carrier={carrier}
			trackingNumber={trackingNumber}
			trackingUrl={trackingUrl}
			estimatedDelivery={estimatedDelivery}
			emailConfig={emailConfig}
		/>
	)

	return await sendMail({
		to,
		subject: `Your order ${orderId} is on its way`,
		content
	});
}