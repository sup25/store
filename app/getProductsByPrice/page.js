"use client";
import React from "react";
import PriceRangeSlider from "@/common/priceRangeSlider";

const GetProductsByPrice = ({ setPriceRange, Range }) => {
  const onSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div>
      <PriceRangeSlider
        onSliderChange={onSliderChange}
        initialPriceRange={Range}
      />
    </div>
  );
};

export default GetProductsByPrice;
