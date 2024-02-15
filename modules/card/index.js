import React from "react";

const Card = ({ title, description, imageUrl, price }) => {
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <div className=" md:w-[300px] h-[400px] cursor-pointer flex flex-col items-center justify-center px-6 py-4 shadow-lg rounded-20 gap-4 transform transition ease-in hover:scale-105">
      <img className="w-20" src={imageUrl} alt={title} />
      <div className="font-bold text-center text-base">{title}</div>
      <p className="text-gray-700 text-sm text-center">
        {truncateDescription(description, 100)}
      </p>
      <p className="text-[#BFA100] text-xl font-bold">${price}</p>
    </div>
  );
};

export default Card;
