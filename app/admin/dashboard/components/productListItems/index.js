import React from "react";

const ProductListItems = ({ item, sold }) => {
  return (
    <div>
      <li
        key={item.id}
        className={`flex md:flex-row justify-between gap-4 flex-col items-center p-3 rounded-lg ${
          sold ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <img
          className="w-20 h-20 object-cover rounded-full"
          src={item.image[0]}
          alt={item.title}
        />
        <span className="md:text-2xl font-others text-center w-fit  text-xl font-semibold">
          {item.title}
        </span>
        <span
          className={`font-semibold md:text-2xl font-others text-center w-fit text-xl text-${
            sold ? "green" : "red"
          }-700`}
        >
          {sold ? `${item.sold} sold` : "0 sold"}
        </span>
      </li>
    </div>
  );
};

export default ProductListItems;
