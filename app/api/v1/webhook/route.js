import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createOrderController } from "../admin/auth/order/controller";
import nodemailer from "nodemailer";
import { generateOrderEmailContent } from "./components";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
  const sig = headers(request).get("stripe-signature");
  if (!sig) {
    console.error("Missing stripe-signature header");
    return new NextResponse("Missing stripe-signature header", { status: 400 });
  }

  let event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  async function handleCheckoutSessionCompleted(event) {
    const checkoutSessionCompleted = event.data.object;

    if (!checkoutSessionCompleted.metadata) {
      console.error(
        "Metadata is missing in checkout session",
        checkoutSessionCompleted
      );
      return new NextResponse("Metadata is missing in checkout session", {
        status: 400,
      });
    }

    let products;

    try {
      if (!checkoutSessionCompleted.metadata.product) {
        throw new Error("Products metadata is missing");
      }
      products = JSON.parse(checkoutSessionCompleted.metadata.product);
      if (!Array.isArray(products)) {
        throw new Error("Products metadata is not an array");
      }
    } catch (parseError) {
      console.error("Error parsing products metadata:", parseError.message);
      return new NextResponse("Invalid products metadata format", {
        status: 400,
      });
    }

    const orderDetails = {
      price: checkoutSessionCompleted.amount_total,
      name: checkoutSessionCompleted.metadata.name,
      email: checkoutSessionCompleted.metadata.email,
      username: checkoutSessionCompleted.metadata.username,
      products: products,
      user: checkoutSessionCompleted.metadata.userId,
      address: checkoutSessionCompleted.metadata.address,
      admin: checkoutSessionCompleted.metadata.adminId,
    };

    if (!orderDetails.name || !orderDetails.products || !orderDetails.user) {
      console.error("Missing required order details", orderDetails);
      return new NextResponse("Missing required order details", {
        status: 400,
      });
    }

    try {
      await createOrderController(orderDetails);
      console.log("Order created successfully");
      const emailContent = generateOrderEmailContent(orderDetails, products);

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: orderDetails.email,
        subject: "Order Confirmation",
        html: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });
    } catch (error) {
      console.error("Error saving order details:", error);
      return new NextResponse(`Error saving order details: ${error.message}`, {
        status: 500,
      });
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event);
      break;
    case "payment_intent.requires_action":
      break;
    case "payment_intent.created":
      break;
    case "payment_intent.succeeded":
      break;
    case "charge.succeeded":
      break;
    default:
  }

  return new NextResponse("Webhook received and processed", { status: 200 });
}

export async function GET() {
  return new NextResponse("GET request received successfully", { status: 200 });
}
