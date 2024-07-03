import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import Spinner from "../spinner";

const BtnCheckout = ({ product, quantity, showLoginPopup, user }) => {
  const [loading, setLoading] = useState(false);

  const proceedCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(publishableKey);
    const priceInCents = Math.round(product.price * 100);

    try {
      const checkoutSession = await axios.post(
        "/api/v1/admin/auth/order",
        {
          product: product.id,
          price: priceInCents,
          quantity: quantity,
          name: product.title,
          description: product.short_desc,
          images: [product.images[0].original_url],
          user: user.id,
          address: user.address || "Dummy Address",
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
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    if (!user) {
      showLoginPopup(e);
    } else {
      proceedCheckout(e);
    }
  };

  return (
    <div
      className="w-full cursor-pointer flex items-center justify-center px-2 py-2 bg-tertiary hover:bg-primary text-white  font-bold text-lg transition duration-150 ease-out hover:ease-in"
      onClick={loading ? null : handleClick}
    >
      {loading ? <Spinner /> : "Checkout Now"}
    </div>
  );
};

export default BtnCheckout;
