import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { createOrderController } from "../admin/auth/order/controller";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
  const sig = headers(request).get("stripe-signature");

  let event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    console.log("Constructed event:", event);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
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
        return new NextResponse("Missing required order details", {
          status: 400,
        });
      }

      try {
        await createOrderController(orderDetails);
        console.log("Order created successfully");
      } catch (error) {
        console.error("Error saving order details:", error);
        return new NextResponse(
          `Error saving order details: ${error.message}`,
          {
            status: 500,
          }
        );
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse("Webhook received and processed", { status: 200 });
}

export async function GET() {
  return new NextResponse("GET request received successfully", { status: 200 });
}
