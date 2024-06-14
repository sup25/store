import Stripe from "stripe";
import { NextResponse } from "next/server";
import appConfig from "@/config";
export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const requestData = await request.json();
  console.log("requestData", requestData);

  const { price, name, description, images, quantity, user, product } =
    requestData;

  if (!user || !product) {
    console.error("User or product information is missing or incomplete.");
    return NextResponse.error(
      "User or product information is missing or incomplete."
    );
  }

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
      success_url: `${appConfig.baseUrl}/ordersuccess`,
      cancel_url: `${appConfig.baseUrl}/ordercancel`,
      metadata: {
        userId: user,
        name: name,
        product: product,
        address: user.address || "Dummy Address",
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Checkout session:", error);
    return NextResponse.error("Failed to create Checkout session.");
  }
}
