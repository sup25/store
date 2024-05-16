"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import SelectProductQuantity from "@/components/selectProductQuantity";

function ProductDetail() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  useEffect(() => {
    const productData = searchParams.get("product");
    if (productData) {
      const decodedProductData = JSON.parse(decodeURIComponent(productData));
      setProduct(decodedProductData);
    }
  }, []);

  const handleAddToCart = () => {
    console.log("Product added to cart:", product);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const priceInCents = Math.round(product.price * 100);
    try {
      const checkoutSession = await axios.post(
        "/api/v1/payment",
        {
          product: product.id,
          price: priceInCents,
          quantity: quantity,
          name: product.title,
          description: product.short_desc,
          images: [product.images[0].original_url],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sessionId = checkoutSession.data.sessionId;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      alert("Error during checkout. Please try again later.");
    }
  };

  return (
    <div className="section">
      <div className="container">
        {product && (
          <div className="flex md:flex-row flex-col w-full gap-10">
            <div className="md:w-3/4 w-full flex items-center justify-center border border-solid  py-5">
              <img
                src={product.images[0].original_url}
                alt={product.title}
                className="md:w-[500px] h-[400px]"
              />
            </div>

            <div className="md:w-2/5 w-full flex flex-col gap-10">
              <h1 className="text-4xl font-bold">{product.title}</h1>
              <p className="text-[#BFA100] text-2xl font-bold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="text-base font-medium">{product.sku}</p>
              <p>{product.short_desc}</p>
              <p>{product.quantity}</p>
              <SelectProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <p>{product.desc}</p>
              <div className="w-full flex flex-col md:flex-row justify-between gap-5">
                <div
                  className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-btn hover:bg-primary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </div>
                <div
                  className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-tertiary hover:bg-primary hover:text-white text-black font-bold text-lg transition duration-150 ease-out hover:ease-in"
                  onClick={handleCheckout}
                >
                  Checkout Now
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
