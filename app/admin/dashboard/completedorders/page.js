"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/common/spinner";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/admin/auth/order");
        if (response.status === 200) {
          setOrders(response.data.returnedData);
        } else {
          console.error("Failed to fetch completed orders");
        }
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="section">
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Completed Orders</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">ID</th>
                  <th className="border border-gray-400 px-4 py-2">Address</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Total Price
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Net Price
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Sale ID</th>
                  <th className="border border-gray-400 px-4 py-2">User ID</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-400 px-4 py-2">
                      {order.id}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {order.address}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      ${order.total_price}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      ${order.net_price}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {order.saleId}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {order.userId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedOrders;
