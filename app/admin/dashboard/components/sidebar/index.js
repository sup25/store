"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import Accordion from "@/common/accordion";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [autoCollapseTimeout, setAutoCollapseTimeout] = useState(null);

  const items = [
    {
      name: "Dashboard",
      icon: <MdDashboard size={25} />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <FiPackage size={25} />,
      subItems: [
        { text: "Create Product", path: "/admin/dashboard/createproduct" },
        { text: "All Products", path: "/admin/dashboard/allproducts" },
      ],
    },
    {
      name: "Completed Orders",
      icon: <FiShoppingBag size={25} />,
      path: "/admin/dashboard/completedorders",
    },
  ];

  useEffect(() => {
    const matchedItem = items.find((item) => item.path === pathname);
    if (matchedItem) {
      setActiveItem(matchedItem.name);
      sessionStorage.setItem("activeItem", matchedItem.name);
    } else {
      items.forEach((item) => {
        if (
          item.subItems &&
          item.subItems.some((subItem) => subItem.path === pathname)
        ) {
          setActiveItem(item.name);
          sessionStorage.setItem("activeItem", item.name);
        }
      });
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName);
    sessionStorage.setItem("activeItem", itemName);
    router.push(path);
  };

  const handleExpand = () => {
    if (window.innerWidth <= 768) {
      setIsExpanded(true);
      clearTimeout(autoCollapseTimeout);
    }
  };

  const handleCollapse = () => {
    if (window.innerWidth <= 768) {
      const timeout = setTimeout(() => {
        setIsExpanded(false);
      }, 500);
      setAutoCollapseTimeout(timeout);
    }
  };

  return (
    <div
      onMouseEnter={handleExpand}
      onMouseLeave={handleCollapse}
      onTouchStart={handleExpand}
      onTouchEnd={handleCollapse}
      className={`flex shadow-md h-fit px-1 py-1 flex-col gap-2 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-2 py-2 cursor-pointer">
        <span className="text-lg font-bold">Menu</span>
      </div>
      {items.map((item, index) => (
        <div key={index}>
          {!item.subItems ? (
            <div
              className={`flex cursor-pointer px-2 gap-2 py-2 items-center hover:bg-secondary rounded transition ease-in duration-300 ${
                activeItem === item.name ? "bg-tertiary" : ""
              }`}
              onClick={() => handleItemClick(item.name, item.path)}
            >
              {item.icon}
              {isExpanded && (
                <div className="text-base md:none font-bold">{item.name}</div>
              )}
            </div>
          ) : (
            <Accordion
              icon={item.icon}
              title={item.name}
              items={item.subItems}
              onItemClick={(subItem) =>
                handleItemClick(subItem.text, subItem.path)
              }
              isExpanded={isExpanded}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
