"use client";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";

export default function OrderSuccessPage() {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <FiCheckCircle className="text-green-500 w-20 h-20 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been successfully
                placed.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleContinueShopping}
                  className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary transition duration-300 ease-in-out"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
