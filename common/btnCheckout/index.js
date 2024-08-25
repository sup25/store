"use client";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import Spinner from "../spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConfig from "@/config";

const BtnCheckout = ({ items, showLoginPopup, user, deleteItem = null }) => {
  const [loading, setLoading] = useState(false);

  const proceedCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(publishableKey);

    try {
      if (
        !user.addresses ||
        user.addresses.length === 0 ||
        !user.verified_email ||
        !user.verified_phone
      ) {
        toast.error("Please complete your profile before checking out.");
        setLoading(false);
        return;
      } else if (deleteItem) {
        const itemIds = items.map((item) => item.id);
        await deleteItem(itemIds);
      }

      const checkoutSessionData = {
        items: items.map((item) => ({
          product: item.product.id,
          price: Math.round(item.product.price * 100),
          quantity: item.quantity,
          name: item.product.title,
          description: item.product.short_desc,
          images: [item.product.images[0].original_url],
          admin: item.product.adminId,
        })),
        user: user.id,
        email: user.email,
        username: user.first_name + " " + user.last_name,
        address: JSON.stringify(user.addresses),
      };

      const checkoutSession = await axios.post(
        `/${appConfig.basePath}/admin/auth/order`,
        checkoutSessionData,
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
      toast.error("Error during checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      showLoginPopup(e);
      return;
    }

    const soldOutItem = items.find((item) => item.product.quantity === 0);
    if (soldOutItem) {
      toast.error(
        `Cannot checkout "${soldOutItem.product.title}". It is sold out!`
      );
      return;
    }

    proceedCheckout(e);
  };

  return (
    <div
      className="w-full min-h-[50px] font-others min-w-64 cursor-pointer flex items-center justify-center px-2 py-2 bg-primary hover:bg-tertiary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in"
      onClick={loading ? null : handleClick}
    >
      {loading ? <Spinner /> : "Checkout Now"}
    </div>
  );
};

export default BtnCheckout;
