import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { createOrderController } from "../api/v1/admin/auth/order/controller";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(request) {
  const nextRequest = new NextRequest(request);
  const body = await nextRequest.text();
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
  const sig = headers(nextRequest).get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  let checkoutSessionCompleted;

  switch (event.type) {
    case "checkout.session.completed":
      checkoutSessionCompleted = event.data.object;

      const orderDetails = {
        price: checkoutSessionCompleted.amount_total,
        name: checkoutSessionCompleted.metadata.name,
        product: checkoutSessionCompleted.metadata.product,
        user: checkoutSessionCompleted.metadata.userId,
        address: checkoutSessionCompleted.metadata.address,
        admin: checkoutSessionCompleted.metadata.adminId,
      };

      console.log("Extracted order details:", orderDetails);

      if (!orderDetails.name || !orderDetails.product || !orderDetails.user) {
        console.error("Missing required order details", orderDetails);
        return new Response("Missing required order details", { status: 400 });
      }

      try {
        await createOrderController(orderDetails);
      } catch (error) {
        console.error("Error saving order details:", error);
        return new Response(`Error saving order details: ${error.message}`, {
          status: 500,
        });
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Webhook received and processed", { status: 200 });
}
