"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchProductsByTag, getAllProducts } from "../utils";
import Card from "@/common/card";
import Spinner from "@/common/spinner";
import { DEFAULT_PRICE_RANGE } from "@/constants";
import { useDebounce } from "use-debounce";
import GetProductsByTags from "../getProductsByTags";
import GetProductsByPrice from "../getProductsByPrice";
import Pagination from "@/common/table/components/pagination";

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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } finally {
      setLoading(false);
    }
  };

  const showProductsByTag = async (tag) => {
    setLoading(true);
    try {
      const response = await fetchProductsByTag(tag);
      console.log("res", response);
      setFilteredProducts(response);
    } catch (err) {
      if (err.response?.data?.message || err.message) {
        toast.error("Error getting products");
      }
    } finally {
      setLoading(false);
    }
  };

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
    fetchProducts();
  }, []);

  const handleTagSubmit = (tag) => {
    setTag(tag);
    showProductsByTag(tag);
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
        <h1 className="md:text-5xl font-black text-base  font-atf w-full pt-5 pb-8 ">
          Search for Product
        </h1>
        <div className="flex flex-col w-full mb-10">
          <div className="flex items-end w-full gap-5 flex-wrap">
            <GetProductsByPrice
              setPriceRange={setPriceRange}
              loading={loading}
              Range={range}
            />
            <GetProductsByTags handleTagSubmit={handleTagSubmit} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap ">
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

export default Products;
