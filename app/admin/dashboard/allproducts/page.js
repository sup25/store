"use client";
import { useEffect, useState } from "react";
import ProductTable from "../components/productTable";
import { CgSpinnerTwo } from "react-icons/cg";
import { getProducts } from "../utils";

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
    <div className="section">
      <div className="container mx-auto">
        {loading ? (
          <CgSpinnerTwo size={30} className="animate-spin" />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="overflow-x-auto">
              <ProductTable products={products} setProducts={setProducts} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
