import React, { useState } from "react";
import axios from "axios";
import Spinner from "../spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/context/cartContext";
import appConfig from "@/config";

const BtnAddToCart = ({ product, showLoginPopup, user, quantity }) => {
  const [loading, setLoading] = useState(false);
  const { updateCartItems } = useCart();

  const handleClick = async (e) => {
    if (product.quantity === 0) {
      toast.error(`Cannot add to cart "${product.title}". It is sold out!`);
      return;
    }
    if (!user) {
      showLoginPopup();
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          `/${appConfig.basePath}/user/products`,
          {
            userId: user.id,
            productId: product.id,
            quantity,
          }
        );

        console.log("response", response.data);
        toast.success("Product added to cart");

        const updatedCartResponse = await axios.get(
          `/${appConfig.basePath}/user/products/${user.id}`
        );
        const updatedCartItems = updatedCartResponse.data.returnedData;
        updateCartItems(updatedCartItems);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="w-full font-others cursor-pointer flex items-center justify-center px-2 py-2 bg-secondary hover:bg-tertiary text-white font-bold text-lg transition duration-150 ease-out hover:ease-in"
      onClick={handleClick}
    >
      {loading ? <Spinner /> : "Add to cart"}
    </div>
  );
};

export default BtnAddToCart;
