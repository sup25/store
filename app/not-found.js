"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
export default function Custom404() {
  return (
    <div className="flex items-center justify-center  px-6 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-16 text-center">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-yellow-500 text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <div className="group flex items-center text-primary text-lg underline hover:text-secondary transition">
            <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Go Back Home
          </div>
        </Link>
      </div>
    </div>
  );
}
