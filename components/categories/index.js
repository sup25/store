import Jewelery from "@/modules/jewelery";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div className="w-full  h-auto flex md:flex-col justify-around bg-slate-50 rounded shadow items-center ">
      <Link
        href={"/jewelery"}
        className="text-xl w-full font-bold  hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        Jewelery
      </Link>

      <Link
        href={"/mensclothing"}
        className="text-xl w-full font-bold  hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        Men's Clothing
      </Link>
      <Link
        href={"/womensclothing"}
        className="text-xl w-full font-bold  hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer"
      >
        Women's Clothing
      </Link>
    </div>
  );
};

export default Categories;
