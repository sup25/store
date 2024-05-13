"use client";

import ProductTable from "@/components/productTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      setAdminId(decodedToken.id);
    }
    if (adminId) {
      getProducts(adminId);
    }
  }, [adminId]);

  const getProducts = async (adminId) => {
    try {
      const response = await axios.get(`/api/v1/admin/auth/product/${adminId}`);
      setProducts(response.data.returnedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="section">
      <div className="container mx-auto">
        {loading ? (
          <CgSpinnerTwo size={30} className="animate-spin" />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="overflow-x-auto">
              <ProductTable products={products} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
