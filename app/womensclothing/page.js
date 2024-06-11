import React from "react";
import ProductCategoryList from "../admin/dashboard/components/productCategoryList";

export default function page() {
  return (
    <ProductCategoryList categoryUrl="https://fakestoreapi.com/products/category/women's%20clothing" />
  );
}
