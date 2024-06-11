"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch("/api/v1/order/webhook");
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      } else {
        console.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            viewBox="0 0 24 24"
            className="fill-current text-green-500 animate-wiggle"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>

          <div className="text-center flex flex-col">
            <h2 className="text-2xl font-semibold mb-2 ">
              Your order has been placed successfully!
            </h2>

            {orderDetails && (
              <>
                <p className="text-base">
                  Order ID:{" "}
                  <span className="font-semibold">{orderDetails.orderId}</span>
                </p>
                <p className="text-base">
                  Items Purchased:{" "}
                  <span className="font-semibold">{orderDetails.items}</span>
                </p>
                <p className="text-base">
                  Total Amount:{" "}
                  <span className="font-semibold">
                    {orderDetails.totalAmount}
                  </span>
                </p>
              </>
            )}

            <p className="text-base mt-4">
              Thank you for shopping with us.{" "}
              <Link href="/" className="font-semibold">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
