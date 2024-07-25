"use client";
import { useEffect, useState } from "react";
import ProductTable from "../components/productTable";
import { getProducts } from "../utils";
import Spinner from "@/common/spinner";
import Table from "../components/table";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      setAdminId(decodedToken.id);
    }
    if (adminId) {
      setLoading(true);
      getProducts(adminId, setProducts, setLoading);
    }
  }, [adminId]);

  return (
    <div className="section overflow-hidden">
      <div className="container ">
        <h1 className="text-2xl font-bold mb-4 w-fit pl-6">Product List</h1>
        <div className="overflow-hidden">
          {loading ? (
            <Spinner />
          ) : (
            <Table products={products} setProducts={setProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
