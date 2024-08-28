"use client";
import React, { useEffect, useState } from "react";
import withAuthAdmin from "../utils/adminHoc/page";
import { getProductSales } from "./API";
import { SoldProducts } from "./components/soldProducts";
import { UnsoldProducts } from "./components/unSoldProducts";
import Spinner from "@/common/spinner";
import { useAdminData } from "./createproduct/hooks";
import { TotalSales } from "./components/totalSales";
import { MemberJoinDate } from "./components/memberJoinDate";

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
    <>
      {loading && <Spinner />}
      <div className="section  py-8">
        <div className="container ">
          <div className="flex flex-col flex-wrap gap-16">
            <div className="flex flex-wrap w-full gap-10 ">
              <MemberJoinDate totalProducts={totalProducts} />
              <TotalSales soldItems={soldItems} />
            </div>
            <div className="flex flex-wrap w-full justify-between">
              <SoldProducts soldItems={soldItems} />
              <UnsoldProducts unsoldItems={unsoldItems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthAdmin(Dashboard);
