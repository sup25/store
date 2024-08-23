import React from "react";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import LinkWithIcon from "@/common/linkWithIcon";

const OrderErrorPage = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
            <FiAlertTriangle className="text-red-700 text-6xl mb-4" />
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Error Placing Order
            </h1>
            <p className="text-lg text-red-700 mb-8">
              Something went wrong while processing your order. Please try again
              later.
            </p>
            <LinkWithIcon href="/" icon={FiArrowLeft} label="Go Back Home" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderErrorPage;
