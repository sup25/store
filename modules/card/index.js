import React from "react";

const Card = ({ title, description, imageUrl, price }) => {
  return (
    <div className="flex  w-full justify-between gap-5 cursor-pointer">
      <div className=" w-[300px]  h-[500px] flex flex-col items-center justify-center px-6 py-4 shadow-lg rounded-20 gap-4 transform transition ease-in hover:scale-105">
        <img className="w-1/2" src={imageUrl} alt={title} />
        <div className="font-bold text-center text-base">{title}</div>
        <p className="text-gray-700 text-sm">{description}</p>
        <p className="text-[#BFA100] text-xl font-bold">${price}</p>
      </div>
    </div>
  );
};

export default Card;
