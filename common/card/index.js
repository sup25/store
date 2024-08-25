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
import Image from "next/image";

const Card = ({ product }) => {
  const { user } = useAuth();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handle, title, description, images, price } = product;
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
          productId: product.id,
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
      <div className="relative mx-2 md:w-[250px] h-[350px] cursor-pointer flex flex-col items-center justify-center px-6 py-4 shadow-lg rounded-md gap-4 transform transition ease-in hover:scale-105">
        <Link href={`/product/${handle}`}>
          <div className="flex flex-col items-center">
            <div className="w-48 h-44  relative">
              <Image
                alt={title}
                src={getImage()}
                fill
                priority={true}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="flex flex-col pt-3">
              <p className="font-bold font-heading text-center text-base mt-2">
                {title}
              </p>
              <p className="text-gray-700 font-others text-sm text-center">
                {description}
              </p>
              <p className="text-[#BFA100] font-others text-center text-xl font-bold">
                ${price}
              </p>
            </div>
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
              <span className="absolute right-[-100px] top-0 bg-primary text-white text-xs px-2 rounded transition-transform transform translate-x-[100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
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
