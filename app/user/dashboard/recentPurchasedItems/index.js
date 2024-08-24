"use client";

import { getPurchasedProducts } from "@/app/utils";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import List from "../list";
import { EmptyState } from "../components/emptyState";

const RecentPurchasedItem = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const PurchasedProduct = async () => {
    try {
      setLoading(true);
      const response = await getPurchasedProducts({ userId: user.id });
      setProducts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    PurchasedProduct();
  }, []);

  return (
    <div className="shadow p-10 w-full max-w-[750px] h-full  md:max-h-[570px] ">
      <h2 className="font-heading mb-5 ">Recently Purchased Items</h2>
      {loading && products && (
        <div className="text-lg font-others animate-bounce">Loading items</div>
      )}
      <div className="w-full h-auto  max-h-[415px]   overflow-y-scroll">
        {!loading && products.length === 0 ? (
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
