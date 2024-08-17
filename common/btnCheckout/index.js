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
  multipleItems = null,
  singleItem = true,
}) => {
  const [loading, setLoading] = useState(false);

  const proceedCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(publishableKey);

    try {
      if (singleItem && (!product || quantity === 0)) {
        toast.error("No items in the cart to checkout.");
        setLoading(false);
        return;
      }

      if (!singleItem && (!multipleItems || multipleItems.length === 0)) {
        toast.error("No items in the cart to checkout.");
        setLoading(false);
        return;
      }

      if (deleteItem) {
        if (singleItem && itemId) {
          await deleteItem([itemId]);
        } else if (multipleItems) {
          const itemIds = multipleItems.map((item) => item.id);
          await deleteItem(multipleItems);
        }
      }

      if (
        !user.addresses ||
        user.addresses.length === 0 ||
        !user.verified_email ||
        !user.verified_phone
      ) {
        toast.error("Please complete your profile before checking out");
        setLoading(false);
        return;
      }

      let checkoutSessionData;
      if (singleItem) {
        const priceInCents = Math.round(product.price * 100);
        const address = JSON.stringify(user.addresses);
        checkoutSessionData = {
          product: product.id,
          price: priceInCents,
          quantity: quantity,
          name: product.title,
          description: product.short_desc,
          images: [product.images[0].original_url],
          user: user.id,
          address: address,
          admin: admin,
        };
      } else {
        const address = JSON.stringify(user.addresses);
        checkoutSessionData = {
          items: multipleItems,
          user: user.id,
          address: address,
        };
      }

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
      className="w-full min-h-[50px] min-w-64 cursor-pointer flex items-center justify-center px-2 py-2 bg-primary hover:bg-secondary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in"
      onClick={loading ? null : handleClick}
    >
      {loading ? <Spinner /> : "Checkout Now"}
    </div>
  );
};

export default BtnCheckout;
