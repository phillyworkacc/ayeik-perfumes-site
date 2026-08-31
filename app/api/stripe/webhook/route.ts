import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { fulfillCheckout } from "@/app/actions/checkout";

export const runtime = "nodejs";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = req.headers.get("stripe-signature");

	if (!signature) return new Response("Missing Stripe signature", { status: 400 });

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error) {
		console.error("Stripe webhook verification failed:", error);
		return new Response("Invalid webhook signature", { status: 400 });
	}

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				await fulfillCheckout(session);
				break;
			}

			// Useful if you eventually enable payment methods that don't confirm instantly.
			case "checkout.session.async_payment_succeeded": {
				const session = event.data.object as Stripe.Checkout.Session;
				await fulfillCheckout(session);
				break;
			}
		}

		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Webhook processing failed:", error);
		return new Response("Webhook processing failed", { status: 500 });
	}
}