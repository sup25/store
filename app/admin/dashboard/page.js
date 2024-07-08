"use client";

import React, { useRef, useEffect, useState } from "react";
import withAuthAdmin from "../utils/adminHoc/page";
import { getProductSales } from "./API";
import useChart from "./hooks/useChart";

const Dashboard = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], soldData: [] });
  const [totalProducts, setTotalProducts] = useState(0);
  const [soldItems, setSoldItems] = useState(0);

  const getSales = async () => {
    try {
      const response = await getProductSales();
      console.log("response", response);

      if (response && response.returnedData) {
        const filteredData = response.returnedData.filter(
          (item) => item.sold > 0
        );
        const labels = filteredData.map((item) => item.title);
        const soldData = filteredData.map((item) => item.sold);
        setChartData({ labels, soldData });
        setTotalProducts(response.returnedData.length);
        setSoldItems(filteredData.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  useChart(chartRef, chartData, soldItems);

  return (
    <div className="section">
      <div className="container flex justify-center">
        <div className="w-full">
          <h2 className="text-center mb-4">Total Products ({totalProducts})</h2>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default withAuthAdmin(Dashboard);
