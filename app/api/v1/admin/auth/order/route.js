import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const requestData = await request.json();

  console.log("requestedData", requestData);

  const { items, user, address, email, username } = requestData;

  const validItems = items.filter(
    (item) => item.product && item.price && item.quantity
  );

  if (!user || !items || items.length === 0) {
    console.error("User or items information is missing or incomplete.");
    return new NextResponse(
      "User or items information is missing or incomplete.",
      { status: 400 }
    );
  }

  const { headers } = request;
  const baseUrl = `${
    headers.get("x-forwarded-proto") || "http"
  }://${headers.get("host")}`;

  try {
    const lineItems = validItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));
    const adminIds = validItems.map((item) => item.admin).join(",");
    const products = validItems.map((item) => ({
      productId: item.product,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      admin: item.admin,
    }));

    const names = validItems.map((item) => item.name).join(",");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/user/ordersuccess`,
      cancel_url: `${baseUrl}/user/ordererror`,
      metadata: {
        name: names,
        userId: user,
        email: email,
        username: username,
        address: address,
        adminId: adminIds,
        product: JSON.stringify(products),
      },
    });

    return new NextResponse(JSON.stringify({ sessionId: session.id }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Error creating checkout session", {
      status: 500,
    });
  }
}
