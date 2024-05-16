"use client";
import Link from "next/link";
import React from "react";

const OrderSuccess = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            viewBox="0 0 24 24"
            className="fill-current text-green-500 animate-wiggle  "
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>

          <div className="text-center flex flex-col">
            <h2 className="text-2xl font-semibold mb-2 ">
              Your order has been placed successfully!
            </h2>
            <p className="text-base">
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
