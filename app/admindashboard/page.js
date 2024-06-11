"use client";

import { useState } from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import Accordion from "../accordion";
import AllProducts from "../allproducts/page";
import CreateProductAdmin from "../createproduct/page";
import AdminDashHero from "../admindashhero/page";
import CompletedOrders from "../completedorders";

const AdminDashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item.url);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "/allproducts":
        return <AllProducts />;
      case "/createproduct":
        return <CreateProductAdmin />;
      case "/admindashhero":
        return <AdminDashHero />;
      case "/completedorders":
        return <CompletedOrders />;
      default:
        return null;
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex">
          <div className="w-[300px] flex flex-col shadow py-2 px-2 justify-between">
            <div className="flex w-full justify-between items-center flex-col gap-2">
              <div
                onClick={() => handleItemClick({ url: "/admindashhero" })}
                className="flex w-full items-center gap-2 hover:bg-slate-200 cursor-pointer"
              >
                <MdDashboard size={20} className="cursor-pointer" />
                <p className="text-base md:text-lg font-bold ">Dashboard</p>
              </div>
              <Accordion
                icon={<FiPackage size={20} />}
                title="Products"
                items={[
                  { text: "Create Product", url: "/createproduct" },
                  { text: "All Product", url: "/allproducts" },
                ]}
                onItemClick={handleItemClick}
              />
              <Accordion
                icon={<FiShoppingBag size={20} />}
                title="Orders"
                items={[
                  { text: "Completed Orders", url: "/completedorders" },
                  { text: "Pending Orders", url: "/pendingorders" },
                  { text: "Cancelled Orders", url: "/cancelledorders" },
                ]}
                onItemClick={handleItemClick}
              />
            </div>
          </div>
          <div className="w-3/4">{renderSelectedComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
