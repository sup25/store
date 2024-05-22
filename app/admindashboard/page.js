"use client";

import withAuthAdmin from "../api/utils/adminHoc/page";
import { FiPackage } from "react-icons/fi";
import AllProducts from "../allproducts/page";
import { MdDashboard } from "react-icons/md";
import Accordion from "../accordion";
import { useState } from "react";
import CreateProductAdmin from "../createproduct/page";

const AdminDashboard = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const handleItemClick = (item) => {
    if (item.url === "/allproducts") {
      setShowAllProducts(true);
      setShowCreateProduct(false);
    } else if (item.url === "/createproduct") {
      setShowCreateProduct(true);
      setShowAllProducts(false);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex">
          <div className="w-[300px] flex flex-col shadow py-2 px-2 justify-between">
            <div className="flex w-full justify-between items-center flex-col gap-2">
              <div className="flex w-full items-center gap-2 hover:bg-slate-200">
                <MdDashboard size={20} />
                <p className="text-base md:text-lg font-bold">Dashboard</p>
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
            </div>
          </div>
          <div className="w-3/4">
            {showAllProducts && <AllProducts />}
            {showCreateProduct && <CreateProductAdmin />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* export default withAuthAdmin(AdminDashboard); */
export default AdminDashboard;
