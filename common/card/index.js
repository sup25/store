"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAddToCart } from "./handler";
import { useCart } from "@/context/cartContext";
import { CgSpinner } from "react-icons/cg";
import { LoginModal } from "./component";

const Card = ({ product }) => {
  const { user } = useAuth();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id, title, description, images, price } = product;
  const [addedToCart, setAddedToCart] = useState(false);
  const { updateCartItems } = useCart();

  const getImage = () => {
    if (images && images.length > 0 && images[0].thumbnail) {
      return images[0].thumbnail;
    }
    return "";
  };

  const handleCartClick = async () => {
    if (!user) {
      setIsLoginModalVisible(true);
    } else {
      setIsLoading(true);
      try {
        await handleAddToCart({
          userId: user.id,
          productId: id,
          setAddedToCart,
          toast,
          updateCartItems,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setIsLoginModalVisible(false);
  };

  return (
    <>
      {isLoginModalVisible && <LoginModal handler={handleClose} />}
      <div className="relative mx-2 md:w-[300px] h-[400px] cursor-pointer flex flex-col items-center justify-center px-6 py-4 shadow-lg rounded-20 gap-4 transform transition ease-in hover:scale-105">
        <Link
          href={{
            pathname: `/productdetails/${id}`,
            query: { product: encodeURIComponent(JSON.stringify(product)) },
          }}
        >
          <div className="flex flex-col  items-center">
            <img
              className="w-60 h-60 object-cover rounded"
              src={getImage()}
              alt={title}
            />
            <p className="font-bold font-heading text-center text-lg mt-2">
              {title}
            </p>
            <p className="text-gray-700  font-others text-sm text-center">
              {description}
            </p>
            <p className="text-[#BFA100] font-others text-center text-2xl font-bold">
              ${price}
            </p>
          </div>
        </Link>
        <div className="relative group">
          {isLoading ? (
            <CgSpinner className="animate-spin" />
          ) : (
            <>
              <FaShoppingCart
                size={25}
                onClick={handleCartClick}
                fill={addedToCart ? "red" : "black"}
                stroke={addedToCart ? "red" : "black"}
                className="cursor-pointer"
              />
              <span className="absolute right-[-100px] top-0 bg-primary text-white text-xs  px-2 rounded transition-transform transform translate-x-[100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                Add to cart
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
