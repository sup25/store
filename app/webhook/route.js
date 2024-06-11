import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

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
    console.log(`Webhook Error: ${err}`);
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  let checkoutSessionAsyncPaymentFailed;
  let checkoutSessionAsyncPaymentSucceeded;
  let checkoutSessionCompleted;

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      checkoutSessionAsyncPaymentSucceeded = event.data.object;
      break;
    case "checkout.session.completed":
      checkoutSessionCompleted = event.data.object;

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  console.log(checkoutSessionAsyncPaymentFailed);

  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
