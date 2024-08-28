"use client";
import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "../styles.css";
const Slider = ({ onSliderChange, initialPriceRange }) => {
  const [sliderValue, setSliderValue] = useState(initialPriceRange);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    onSliderChange(value);
  };

  return (
    <div className="flex gap-4 w-56 items-center flex-col">
      <RangeSlider value={sliderValue} onInput={handleSliderChange} />
      <div className="flex w-full gap-2 mt-2 items-center justify-between">
        <input
          type="text"
          readOnly
          value={sliderValue[0]}
          className="border text-center flex items-center justify-center p-2 rounded w-20"
        />
        <label className="text-xl font-others font-light">to</label>
        <input
          type="text"
          readOnly
          value={sliderValue[1]}
          className="border flex text-center items-center justify-center p-2 rounded w-20"
        />
      </div>
    </div>
  );
};

export default Slider;
