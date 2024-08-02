import Stripe from "stripe";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    // Check if address already exists
    let existingAddress = await prisma.address.findFirst({
      where: {
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipcode: address.zipcode,
        userId: user.id,
      },
    });

    // If address doesn't exist, create a new one
    if (!existingAddress) {
      existingAddress = await prisma.address.create({
        data: {
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          zipcode: address.zipcode,
          userId: user.id,
        },
      });
    }

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
      success_url: `${baseUrl}/api/v1/order/ordersuccess`,
      cancel_url: `${baseUrl}/api/v1/order/ordercancel`,
      metadata: {
        userId: user.id,
        name: name,
        product: product,
        addressId: existingAddress.id,
        adminId: admin.id,
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
