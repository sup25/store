"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import appConfig from "@/config";
import axios from "axios";
import Spinner from "@/common/spinner";
import Link from "next/link";
import BtnAddToCart from "@/common/btnAddToCart";

const CompletedOrder = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handle } = useParams();
  console.log(product);
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `/${appConfig.basePath}/admin/auth/product/public/${handle}`
        );
        setProduct(response.data.returnedData);
      } catch (error) {
        console.log(error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [handle]);

  const [showMore, setShowMore] = useState({});

  const toggleShowMore = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };

  if (loading) return <Spinner />;
  if (!product.length)
    return (
      <p className="text-center font-heading text-gray-600 text-xl">
        No products found.
      </p>
    );

  return (
    <div className="section bg-gray-50 min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-screen-lg">
        <h1 className="font-heading font-bold text-center text-3xl text-gray-800 mb-12">
          Order Details
        </h1>
        {product.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden mb-10 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="relative w-full h-96 bg-gray-100 flex items-center justify-center">
                  <img
                    src={item.images[0].original_url}
                    alt={item.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              {/* Product Details */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-others font-semibold text-gray-800 mb-4">
                    {item.title}
                  </h2>
                  <p className="title-heading">
                    SKU: <span className="text-gray-500">{item.sku}</span>
                  </p>
                  <p className="title-heading">
                    Type: <span className="text-gray-500">{item.type}</span>
                  </p>
                  <p className="title-heading">
                    Price:{" "}
                    <span className="bg-green-100 text-green-700 px-2 py-[1px] rounded-lg">
                      ${item.price.toFixed(2)}
                    </span>
                  </p>
                  {/*  <p className="title-heading">
                    Quantity:{" "}
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                      {item.quantity}
                    </span>
                  </p> */}
                  <p className="title-heading">
                    Tags:{" "}
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-[1px] rounded-lg">
                      {item.tags.join(", ")}
                    </span>
                  </p>
                  <p className="title-heading mb-4">Short Description:</p>
                  <p className="text-base text-gray-600 font-others mb-6 bg-gray-100 p-4 rounded-lg">
                    {item.short_desc}
                  </p>
                  <p className="title-heading mb-2">Description:</p>
                  <p className="text-base font-others  text-gray-600 bg-gray-100 p-4 rounded-lg">
                    {showMore[item.id]
                      ? item.desc
                      : truncateText(item.desc, 200)}
                    {item.desc.length > 200 && (
                      <button
                        onClick={() => toggleShowMore(item.id)}
                        className="text-secondary hover:underline ml-1 "
                      >
                        {showMore[item.id] ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </p>
                </div>
                <div className="flex justify-end items-center mt-8 space-x-4">
                  <Link
                    href={"/user/dashboard"}
                    className="bg-gray-100 text-gray-700 px-6 py-3 font-others rounded-md shadow hover:bg-gray-200 transition duration-300"
                  >
                    Back to Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrder;
