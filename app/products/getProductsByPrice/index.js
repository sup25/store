"use client";
import React from "react";
import Slider from "@/common/RangeSlider";

const GetProductsByPrice = ({ setPriceRange, Range }) => {
  const onSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="title-heading"> Price Range</p>
      <Slider onSliderChange={onSliderChange} initialPriceRange={Range} />
    </div>
  );
};

export default GetProductsByPrice;
