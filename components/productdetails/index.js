// ProductDetails.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const ProductDetails = ({ id }) => {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (res.status >= 200 && res.status < 300) {
          setProduct(res.data);
          console.log("response", res.data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleCheckout = async () => {
    const unit_amount = product.price * 100;
    const lineItems = [
      {
        price: unit_amount.toString(),
        quantity: 1,
      },
    ];

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    if (stripe) {
      try {
        const { error } = await stripe.redirectToCheckout({
          mode: "payment",
          lineItems: lineItems,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/error`,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="flex md:flex-row flex-col w-full gap-10">
          <div className="md:w-3/5  w-full flex items-center justify-center border border-solid py-5">
            <img
              src={product.image}
              alt={product.title}
              className="md:w-[200px] w-[300px]"
            />
          </div>
          <div className="md:w-2/5 w-full flex flex-col gap-10">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p>{product.description}</p>
            <p className="text-[#BFA100] text-2xl font-bold">
              ${product.price}
            </p>
            <div className="w-full flex flex-col md:flex-row justify-between gap-5">
              <div className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-btn hover:bg-primary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in">
                Add to cart
              </div>
              <div
                className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-tertiary hover:bg-primary hover:text-white text-black font-bold text-lg transition duration-150 ease-out hover:ease-in"
                onClick={handleCheckout}
              >
                Chekout now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
