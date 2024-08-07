"use client";
import React, { useEffect, useState } from "react";
import withAuthAdmin from "../utils/adminHoc/page";
import { getProductSales } from "./API";
import { SoldProducts } from "./components/soldProducts";
import { UnsoldProducts } from "./components/unSoldProducts";
import Spinner from "@/common/spinner";
import { useAdminData } from "./createproduct/hooks";

const Dashboard = () => {
  const [soldItems, setSoldItems] = useState([]);
  const [unsoldItems, setUnsoldItems] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const adminId = useAdminData();

  const getSales = async () => {
    if (!adminId) {
      console.error("Admin ID is not available");
      return;
    }
    try {
      setLoading(true);
      const response = await getProductSales(adminId);
      if (response && response.returnedData) {
        const sortedProducts = response.returnedData.sort(
          (a, b) => b.sold - a.sold
        );
        const sold = sortedProducts.filter((item) => item.sold > 0);
        const unsold = sortedProducts.filter((item) => item.sold === 0);
        setSoldItems(sold);
        setUnsoldItems(unsold);
        setTotalProducts(response.returnedData.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminId) {
      getSales();
    }
  }, [adminId]);

  return (
    <div className="section bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Total Products ({totalProducts})
        </h2>
        {loading && <Spinner />}
        <SoldProducts soldItems={soldItems} />
        <UnsoldProducts unsoldItems={unsoldItems} />
      </div>
    </div>
  );
};

export default withAuthAdmin(Dashboard);
