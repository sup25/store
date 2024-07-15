"use client";
import React, { useState } from "react";
import axios from "axios";
import Card from "@/common/card";
import Spinner from "@/common/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsByTag = () => {
  const [tag, setTag] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (tag) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/products`,
        {
          params: { tags: tag },
        }
      );
      console.log(response);
      setProducts(response.data.returnedData);
    } catch (err) {
      if (err.response?.data?.message || err.message) {
        toast.error("error getting products");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tag.trim()) {
      fetchProducts(tag);
    } else {
      toast.error("Tag cannot be empty");
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="text-2xl font-bold ">Search for Product</h1>
        <div className="flex gap-2 my-5">
          <input
            type="text"
            className="py-1 px-1 bg-gray-100"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter tag"
          />
          <button
            className=" bg-tertiary p-2 text-white"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        {loading && <Spinner />}
        <div className="flex w-full flex-wrap gap-1">
          {products.length > 0
            ? products.map((product) => (
                <Card key={product.id} product={product} />
              ))
            : !loading && (
                <p className="text-base font-medum">No products found.</p>
              )}
        </div>
      </div>
    </div>
  );
};

export default ProductsByTag;
