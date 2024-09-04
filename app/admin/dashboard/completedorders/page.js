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
    sku: "SKU",
    total_price: "Total Price",
    user_name: "User Name",
    user_email: "User Email",
    address: "Address",
    created_at: "Created At",
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
              console.log(response.returnedData);
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

  const completedOrders = orders.map((order) => ({
    id: order.id,
    created_at: new Date(order.created_at).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    name: order.name,
    total_price: `$${(order.total_price / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    sku: order.sale.products.map((product) => product.sku).join(", "),
    user_name: `${order.user.first_name} ${order.user.last_name}`,
    user_email: order.user.email,
    address: `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}, ${order.address.country}`,
  }));

  return (
    <div className="section overflow-hidden">
      <div className="container mx-auto mt-8">
        <h2 className="font-heading  mb-4">Completed Orders</h2>
        {loading ? (
          <Spinner />
        ) : (
          <Table
            data={completedOrders}
            setData={setOrders}
            columns={[
              "id",
              "name",
              "sku",
              "total_price",
              "user_name",
              "user_email",
              "address",
              "created_at",
            ]}
            columnLabels={columnLabels}
            showSearch={true}
            uniqueKey="id"
            showActions={false}
            excludeKeys={["addressId", "net_price", "user", "notes", "userId"]}
          />
        )}
      </div>
    </div>
  );
};

export default withAuthAdmin(CompletedOrders);
