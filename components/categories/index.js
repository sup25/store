import Jewelery from "@/modules/jewelery";
import React from "react";

const Categories = () => {
  return (
    <div className="w-full  h-auto flex md:flex-col justify-around bg-slate-50 rounded shadow items-center ">
      <div className="text-xl w-full font-bold hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer">
        <Jewelery />
      </div>
      <h2 className="text-xl w-full font-bold  hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer">
        Men's Clothing
        {/*     https://fakestoreapi.com/products/category/men's%20clothing */}
      </h2>
    </div>
  );
};

export default Categories;
