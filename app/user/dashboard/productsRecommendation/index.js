"use client";
import { getAllProducts } from "@/app/utils";
import Card from "@/common/card";
import Spinner from "@/common/spinner";
import React, { useEffect, useState } from "react";

const ProductRecommendation = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      const random = response.sort(() => 0.5 - Math.random());
      const seleectedProduct = random.slice(0, 6);
      setProducts(seleectedProduct);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h2 className="font-heading mb-12 "> For You </h2>
        <div className="flex flex-wrap w-full justify-between gap-20">
          {loading && <Spinner />}
          {products &&
            products.map((product) => (
              <div key={product.id} className="flex md:flex-nowrap flex-wrap">
                <Card product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendation;
