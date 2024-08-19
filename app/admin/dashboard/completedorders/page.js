"use client";
import React, { useState, useEffect } from "react";
import Spinner from "@/common/spinner";

import { getCompletedOrder } from "../API";
import Table from "@/common/table";
import withAuthAdmin from "../../utils/adminHoc/page";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnLabels = {
    id: "ID",
    name: "Name",
    total_price: "Total Price",
    user_name: "User Name",
    user_email: "User Email",
  };

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      try {
        const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
        const fetchOrders = async () => {
          setLoading(true);
          try {
            const response = await getCompletedOrder(decodedToken.id);
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

  const completedOrders = orders
    .filter((order) =>
      order.statuses.some((status) => status.type === "completed")
    )
    .map((order) => ({
      ...order,
      user_name: `${order.user.first_name} ${order.user.last_name}`,
      user_email: order.user.email,
    }));

  return (
    <div className="section overflow-hidden">
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Completed Orders</h2>
        {loading ? (
          <Spinner />
        ) : (
          <Table
            data={completedOrders}
            setData={setOrders}
            columns={["id", "name", "total_price", "user_name", "user_email"]}
            columnLabels={columnLabels}
            showSearch={false}
            uniqueKey="id"
            showActions={false}
            excludeKeys={[
              "addressId",
              "net_price",
              "user",
              "notes",
              "products",
              "statuses",
              "userId",
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default withAuthAdmin(CompletedOrders);
