import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const requestData = await request.json();
  console.log("requestData", requestData);

  const { price, name, description, images, quantity } = requestData;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              images: images,
              name: name,
              description: description,
            },
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/ordersuccess",
      cancel_url: "http://localhost:3000/ordercancel",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Checkout session:", error);
    return NextResponse.error("Failed to create Checkout session.");
  }
}
