import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import Spinner from "../spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConfig from "@/config";
const BtnCheckout = ({
  product,
  quantity,
  showLoginPopup,
  user,
  deleteItem = null,
  itemId,
  admin,
}) => {
  const [loading, setLoading] = useState(false);
  const proceedCheckout = async (e) => {
    console.log("Product:", product);
    console.log("User:", user);
    e.preventDefault();
    setLoading(true);
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(publishableKey);
    const priceInCents = Math.round(product.price * 100);

    try {
      console.log(user);
      if (deleteItem) {
        await deleteItem(itemId);
      }
      if (
        !user.addresses ||
        user.addresses.length === 0 ||
        !user.verified_email ||
        !user.verified_phone
      ) {
        toast.error("Please complete your profile before checking out");
        return;
      }
      const address = JSON.stringify(user.addresses);
      const checkoutSession = await axios.post(
        `/${appConfig.basePath}/admin/auth/order`,
        {
          product: product.id,
          price: priceInCents,
          quantity: quantity,
          name: product.title,
          description: product.short_desc,
          images: [product.images[0].original_url],
          user: user.id,
          address: address,
          admin: admin,
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
      className="w-full min-h-[50px] cursor-pointer flex items-center justify-center px-2 py-2 bg-tertiary hover:bg-primary text-white  font-bold text-lg transition duration-150 ease-out hover:ease-in"
      onClick={loading ? null : handleClick}
    >
      {loading ? <Spinner /> : "Checkout Now"}
    </div>
  );
};

export default BtnCheckout;
