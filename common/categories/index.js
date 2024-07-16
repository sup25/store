import Link from "next/link";
import React from "react";

const Categories = () => {
  const LinkItems = [
    {
      name: "Jewelery",
      href: "/productsByTags",
    },
    {
      name: " Men's Clothing",
      href: "/productByPrice",
    },
    {
      name: "Women's Clothing",
      href: "/womensclothing",
    },
  ];

  return (
    <div className="h-auto flex  justify-between bg-primary rounded shadow items-center ">
      {LinkItems.map((items, index) => (
        <Link
          key={index}
          href={items.href}
          className="text-lg text-center text-white w-full font-bold flex justify-center transition duration-300  hover:bg-tertiary px-4 py-2  cursor-pointer"
        >
          {items.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
