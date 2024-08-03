"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/common/spinner";
import Table from "../components/table";
import appConfig from "@/config";

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${appConfig.baseUrl}/${appConfig.basePath}/admin/auth/order/${decodedToken.id}`
          );
          if (response.status === 200) {
            setOrders(response.data.returnedData);
          } else {
            console.error("Failed to fetch cancelled orders");
          }
        } catch (error) {
          console.error("Error fetching cancelled orders:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, []);
  const cancelledOrders = orders.filter((order) =>
    order.statuses.some((status) => status.type === "canceled")
  );

  return (
    <div className="section">
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Cancelled Orders</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <Table
              data={cancelledOrders}
              setData={setOrders}
              columns={["id", "name", "net_price", "total_price"]}
              showSearch={false}
              uniqueKey="id"
              showActions={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelledOrders;
