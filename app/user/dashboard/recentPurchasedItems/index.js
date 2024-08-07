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
    <div className="section">
      <div className="container">
        <h2 className="text-black font-atf text-3xl mb-5 w-fit">
          Recently Purchased Items
        </h2>
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="">
                <List data={product} />
              </div>
            ))}
            {products.length > 3 && (
              <div className="mt-4">
                {products.slice(3).map((product) => (
                  <div key={product.id} className="">
                    <List data={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPurchasedItem;
