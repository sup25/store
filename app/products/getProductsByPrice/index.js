"use client";
import React from "react";
import PriceRangeSlider from "@/common/priceRangeSlider";

const GetProductsByPrice = ({ setPriceRange, Range }) => {
  const onSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="title-heading"> Price Range</p>
      <PriceRangeSlider
        onSliderChange={onSliderChange}
        initialPriceRange={Range}
      />
    </div>
  );
};

export default GetProductsByPrice;
