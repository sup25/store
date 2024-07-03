"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ product }) => {
  const { id, title, description, images, price } = product;
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    console.log("product added to cart");
    setAddedToCart(true);
  };

  const getImage = () => {
    if (images && images.length > 0 && images[0].thumbnail) {
      return images[0].thumbnail;
    }
    return "";
  };

  return (
    <div className="relative md:w-[300px] h-[400px] cursor-pointer flex flex-col items-center justify-center px-6 py-4 shadow-lg rounded-20 gap-4 transform transition ease-in hover:scale-105">
      <Link
        href={{
          pathname: `/productdetails/${id}`,
          query: { product: JSON.stringify(product) },
        }}
      >
        <div className="flex flex-col items-center">
          <img
            className="w-60 h-60 object-cover"
            src={getImage()}
            alt={title}
          />
          <div className="font-bold text-center text-lg">{title}</div>
          <p className="text-gray-700 text-sm text-center">{description}</p>
          <p className="text-[#BFA100] text-xl font-bold">${price}</p>
        </div>
      </Link>
      <div className="relative  group">
        <FaShoppingCart
          size={25}
          onClick={handleAddToCart}
          fill={addedToCart ? "red" : "black"}
          stroke={addedToCart ? "red" : "black"}
          className="cursor-pointer"
        />
        <span className="absolute right-[-100px] top-0 bg-primary text-white text-xs py-1 px-2 rounded transition-transform transform translate-x-[100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
          Add to cart
        </span>
      </div>
    </div>
  );
};

export default Card;
