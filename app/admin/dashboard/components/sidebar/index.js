"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import Accordion from "@/common/accordion";

const SideBar = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedActiveItem = sessionStorage.getItem("activeItem");
      if (storedActiveItem) {
        setActiveItem(storedActiveItem);
      }
    }
  }, []);

  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName);
    sessionStorage.setItem("activeItem", itemName);
    router.push(path);
  };

  const items = [
    {
      name: "Dashboard",
      icon: <MdDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <FiPackage size={20} />,
      subItems: [
        { text: "Create Product", path: "/admin/dashboard/createproduct" },
        { text: "All Products", path: "/admin/dashboard/allproducts" },
      ],
    },
    {
      name: "Orders",
      icon: <FiShoppingBag size={20} />,
      subItems: [
        { text: "Completed Orders", path: "/admin/dashboard/completedorders" },
        { text: "Pending Orders", path: "/admin/dashboard/pendingorders" },
        { text: "Cancelled Orders", path: "/admin/dashboard/cancelledorders" },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div key={index}>
          {!item.subItems ? (
            <div
              className={`flex cursor-pointer px-2 gap-2 py-2 items-center  rounded transition ease-in duration-300 ${
                activeItem === item.name ? "bg-tertiary" : ""
              }`}
              onClick={() => handleItemClick(item.name, item.path)}
            >
              {item.icon}
              <span className=" text-base md:text-lg font-bold">
                {item.name}
              </span>
            </div>
          ) : (
            <Accordion
              icon={item.icon}
              title={item.name}
              items={item.subItems}
              onItemClick={(subItem) =>
                handleItemClick(subItem.text, subItem.path)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
