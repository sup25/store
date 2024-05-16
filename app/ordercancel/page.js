"use client";
import Link from "next/link";
import React from "react";

const OrderCancel = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            viewBox="0 0 24 24"
            className="fill-current text-red-500 animate-wiggle"
          >
            <path d="M20 6.41l-1.41-1.41-6.18 6.18-6.18-6.18-1.41 1.41 6.18 6.18-6.18 6.18 1.41 1.41 6.18-6.18 6.18 6.18 1.41-1.41-6.18-6.18z" />
          </svg>

          <div className="text-center flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">
              Your order could not be placed!
            </h2>
            <p className="text-base">
              There was an error processing your order. Please try again later.{" "}
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

export default OrderCancel;
