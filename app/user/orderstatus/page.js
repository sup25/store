"use client";

import { useRouter } from "next/navigation";

import { FiMail } from "react-icons/fi";

export default function OrderStatus() {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/products");
  };
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <FiMail className="text-primary w-20 h-20 mb-4" />
              <h1 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600 font-others mb-6 text-center">
                We've sent an order confirmation to your email. Please check
                your inbox for the details of your purchase.
              </p>
              <button
                onClick={handleContinueShopping}
                className="px-4 py-2 text-white bg-primary  font-others rounded hover:bg-secondary transition duration-300 ease-in-out"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
