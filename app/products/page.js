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
import LoginPopUp from "@/common/loginPopup";

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
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const searchParams = useSearchParams();

  const handleReload = () => {
    window.location.reload();
  };

  const combinedFilter = () => {
    const filteredByPrice = products.filter((product) => {
      return (
        product.price >= debouncedPriceRange[0] &&
        product.price <= debouncedPriceRange[1]
      );
    });

    if (tag) {
      return filteredProducts.filter((product) => {
        return (
          product.price >= debouncedPriceRange[0] &&
          product.price <= debouncedPriceRange[1]
        );
      });
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

  const handleClose = () => {
    setLoginPopupVisible(false);
  };

  return (
    <>
      {loginPopupVisible && <LoginPopUp handler={handleClose} />}
      <div className="section">
        <div className="container">
          {loading && <Spinner />}
          <h1 className="font-heading mb-10 text-center">All Products</h1>
          <div className="flex flex-col w-full my-10">
            <div className="flex md:flex-row flex-col md:justify-start justify-center items-center md:items-end w-full gap-10 flex-wrap">
              <GetProductsByPrice
                setPriceRange={setPriceRange}
                loading={loading}
                Range={range}
              />
              <GetProductsByTags handleTagSubmit={handleTagSubmit} />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="flex w-full flex-wrap md:gap-16 gap-12 md:justify-start justify-center my-10">
              {paginatedProducts().length > 0
                ? paginatedProducts().map((product) => (
                    <div key={product.id}>
                      <Card
                        product={product}
                        setLoginPopupVisible={setLoginPopupVisible}
                      />
                    </div>
                  ))
                : !loading && (
                    <p className="font-heading text-xl">No products found</p>
                  )}
            </div>

            {paginatedProducts().length > 0
              ? ""
              : !loading && (
                  <p
                    className=" p-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 font-others transition duration-300 ease-in-out"
                    onClick={handleReload}
                  >
                    Back to products
                  </p>
                )}

            {products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                totalPages={Math.ceil(
                  combinedFilter().length / productsPerPage
                )}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsWrapper = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Products {...props} />
  </Suspense>
);

export default ProductsWrapper;
