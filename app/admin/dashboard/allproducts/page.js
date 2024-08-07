"use client";
import React, { useEffect, useState } from "react";
import { getProducts } from "../utils";
import Spinner from "@/common/spinner";
import Table from "@/common/table";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      getProducts(decodedToken.id, setProducts, setLoading);
    }
  }, []);

  return (
    <div className="section overflow-hidden">
      <div className="container ">
        <h1 className="text-2xl font-bold mb-4 w-fit pl-6">Product List</h1>
        <div className="overflow-hidden">
          {loading ? (
            <Spinner />
          ) : (
            <Table
              data={products}
              setData={setProducts}
              columns={["id", "sku", "title", "price", "quantity"]}
              showSearch={true}
              uniqueKey="id"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
