"use client";
import React from "react";

import ProductDetails from "@/components/productdetails";
function page({ params: { id } }) {
  return <ProductDetails id={id} />;
}

export default page;
