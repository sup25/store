import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div className="h-auto flex md:flex-col justify-around bg-primary rounded shadow items-center ">
      <Link
        href={"/jewelery"}
        className="text-lg text-white w-full font-bold  hover:bg-tertiary px-4 py-2  cursor-pointer"
      >
        Jewelery
      </Link>

      <Link
        href={"/mensclothing"}
        className="text-lg w-full text-white font-bold  hover:bg-tertiary px-4 py-2  cursor-pointer"
      >
        Men's Clothing
      </Link>
      <Link
        href={"/womensclothing"}
        className="text-lg w-full text-white font-bold  hover:bg-tertiary px-4 py-2  cursor-pointer"
      >
        Women's Clothing
      </Link>
    </div>
  );
};

export default Categories;
