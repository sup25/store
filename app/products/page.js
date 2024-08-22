"use client";
import React, { useEffect, useState, Suspense } from "react";

import Card from "@/common/card";
import Spinner from "@/common/spinner";
import { DEFAULT_PRICE_RANGE } from "@/constants";
import { useDebounce } from "use-debounce";
import GetProductsByTags from "./getProductsByTags";
import GetProductsByPrice from "./getProductsByPrice";
import Pagination from "@/common/table/components/pagination";
import { useSearchParams } from "next/navigation";
import { fetchProducts, showProductsByTag } from "./utils";

const Products = () => {
  const range = DEFAULT_PRICE_RANGE;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState(range);
  const [debouncedPriceRange] = useDebounce(priceRange, 500);
  const [tag, setTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const searchParams = useSearchParams();

  const combinedFilter = () => {
    const filteredByPrice = products.filter((product) => {
      return (
        product.price >= debouncedPriceRange[0] &&
        product.price <= debouncedPriceRange[1]
      );
    });

    if (tag) {
      const filteredByTag = filteredProducts.filter((product) => {
        return (
          product.price >= debouncedPriceRange[0] &&
          product.price <= debouncedPriceRange[1]
        );
      });
      return filteredByTag;
    }
    return filteredByPrice;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProducts(
      setProducts,
      setFilteredProducts,
      setLoading,
      searchParams,
      setTag
    );
  }, []);

  const handleTagSubmit = (tag) => {
    setTag(tag);
    showProductsByTag(tag, setLoading, setFilteredProducts);
  };

  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return combinedFilter().slice(startIndex, endIndex);
  };

  return (
    <div className="section">
      <div className="container">
        {loading && <Spinner />}
        <h1 className="font-heading mb-10  text-center">Search for Product</h1>
        <div className="flex flex-col w-full my-10">
          <div className="flex items-end w-full gap-5 flex-wrap">
            <GetProductsByPrice
              setPriceRange={setPriceRange}
              loading={loading}
              Range={range}
            />
            <GetProductsByTags handleTagSubmit={handleTagSubmit} />
          </div>
        </div>
        <div className="flex flex-col gap-6  items-center">
          <div className="flex flex-wrap gap-20 justify-between my-10">
            {paginatedProducts().length > 0
              ? paginatedProducts().map((product) => (
                  <div key={product.id}>
                    <Card product={product} />
                  </div>
                ))
              : "No products found"}
          </div>
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={Math.ceil(combinedFilter().length / productsPerPage)}
          />
        </div>
      </div>
    </div>
  );
};

const ProductsWrapper = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Products {...props} />
  </Suspense>
);

export default ProductsWrapper;
