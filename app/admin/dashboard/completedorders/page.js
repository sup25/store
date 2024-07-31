"use client";
import React, { useState, useEffect } from "react";
import Spinner from "@/common/spinner";
import Table from "../components/table";
import { getCompletedOrder } from "../API";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      try {
        const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
        const fetchOrders = async () => {
          setLoading(true);
          try {
            const response = await getCompletedOrder(decodedToken.id);
            console.log("API Response:", response);
            if (response.returnedData) {
              setOrders(response.returnedData || []);
            } else {
              console.error(
                "Failed to fetch completed orders, status code:",
                response.status
              );
            }
          } catch (error) {
            console.error("Error fetching completed orders:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchOrders();
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const completedOrders = orders.filter((order) =>
    order.statuses.some((status) => status.type === "completed")
  );

  return (
    <div className="section">
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Completed Orders</h2>
        {loading ? (
          <Spinner />
        ) : (
          <Table
            data={completedOrders}
            setData={setOrders}
            columns={["id", "name", "net_price", "total_price"]}
            showSearch={false}
            uniqueKey="id"
            showActions={false}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedOrders;
