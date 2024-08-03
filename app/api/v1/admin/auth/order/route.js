import Stripe from "stripe";
import { NextResponse } from "next/server";
import appConfig from "@/config";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const requestData = await request.json();
  console.log(requestData);
  const {
    price,
    name,
    description,
    images,
    quantity,
    user,
    product,
    address,
    admin,
  } = requestData;

  if (!user || !product) {
    console.error("User or product information is missing or incomplete.");
    return new NextResponse(
      "User or product information is missing or incomplete.",
      { status: 400 }
    );
  }

  const { headers } = request;
  const baseUrl = `${
    headers.get("x-forwarded-proto") || "http"
  }://${headers.get("host")}`;

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
      success_url: `${baseUrl}/${appConfig.basePath}/order/ordersuccess`,
      cancel_url: `${baseUrl}/${appConfig.basePath}/order/ordercancel`,
      metadata: {
        userId: user,
        name: name,
        product: product,
        address: address,
        adminId: admin,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Checkout session:", error);
    return new NextResponse("Failed to create Checkout session.", {
      status: 500,
    });
  }
}
