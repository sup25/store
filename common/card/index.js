// In Card.js

import React from "react";
import Link from "next/link";

const Card = ({ product }) => {
  const { id, title, description, images, price } = product;

  const getImage = () => {
    if (images && images.length > 0 && images[0].thumbnail) {
      return images[0].thumbnail;
    }
    return "";
  };

  return (
    <Link
      href={{
        pathname: `/productdetails/${id}`,
        query: { product: JSON.stringify(product) },
      }}
    >
      <div className="md:w-[300px] h-[400px] cursor-pointer flex flex-col items-center justify-center px-6 py-4 shadow-lg rounded-20 gap-4 transform transition ease-in hover:scale-105">
        <img className="w-40 h-40 object-cover" src={getImage()} alt={title} />
        <div className="font-bold text-center text-lg">{title}</div>
        <p className="text-gray-700 text-sm text-center">{description}</p>
        <p className="text-[#BFA100] text-xl font-bold">${price}</p>
      </div>
    </Link>
  );
};

export default Card;
