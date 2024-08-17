import Stripe from "stripe";
import { NextResponse } from "next/server";
import appConfig from "@/config";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const requestData = await request.json();
  console.log(requestData);

  const { items, user, address } = requestData;

  if (!user || (!items && !requestData.product)) {
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
    let lineItems = [];

    if (items) {
      lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
            metadata: {
              productId: item.product,
              adminId: item.admin,
              userId: user.id,
              address: address,
            },
            images: item.images,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }));
    } else {
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: requestData.name,
              description: requestData.description,
              metadata: {
                productId: requestData.product,
                adminId: requestData.admin,
                userId: user.id,
                address: address,
              },
              images: requestData.images,
            },
            unit_amount: requestData.price,
          },
          quantity: requestData.quantity,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/ordersuccess`,
      cancel_url: `${baseUrl}/ordererror`,
    });

    return new NextResponse(
      JSON.stringify({ sessionId: session.id, appConfig }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Error creating checkout session", {
      status: 500,
    });
  }
}
