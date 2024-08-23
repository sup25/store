"use client";

import { getPurchasedProducts } from "@/app/utils";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

import List from "../list";
import { EmptyState } from "../components/emptyState";

const RecentPurchasedItem = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  const PurchasedProduct = async () => {
    try {
      const response = await getPurchasedProducts({ userId: user.id });
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    PurchasedProduct();
  }, []);

  return (
    <div className="shadow p-10 w-full max-w-[750px] h-auto  md:max-h-[570px] ">
      <h2 className="font-heading mb-5 ">Recently Purchased Items</h2>
      <div className="w-full h-auto  max-h-[415px]   overflow-y-scroll">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="">
            {products.map((product) => (
              <div key={product.id} className="">
                <List data={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPurchasedItem;
