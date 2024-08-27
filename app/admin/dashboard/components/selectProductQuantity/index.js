import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const SelectProductQuantity = ({
  quantity,
  setQuantity,
  maxQuantity,
  title = true,
}) => {
  const [inputValue, setInputValue] = useState(quantity || 0);

  useEffect(() => {
    setInputValue(quantity || 0);
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const numericValue = parseInt(value, 10);
      if (numericValue >= 1 && numericValue <= maxQuantity) {
        setQuantity(numericValue);
        setInputValue(numericValue);
      } else if (value === "") {
        setQuantity(0);
        setInputValue("");
      }
    }
  };

  const handleQuantityIncrease = () => {
    if (inputValue < maxQuantity) {
      const newQuantity = inputValue + 1;
      setQuantity(newQuantity);
      setInputValue(newQuantity);
    }
  };

  const handleQuantityDecrease = () => {
    if (inputValue > 1) {
      const newQuantity = inputValue - 1;
      setQuantity(newQuantity);
      setInputValue(newQuantity);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full max-w-[150px]">
      {title && <p className="title-heading">Quantity</p>}
      <div className="flex gap-3 w-full border px-2 py-2 items-center">
        <button
          onClick={handleQuantityDecrease}
          disabled={inputValue === 1}
          className={inputValue === 1 ? "cursor-not-allowed text-gray-300" : ""}
        >
          <FaMinus size={15} />
        </button>
        <input
          type="text"
          value={inputValue || ""}
          onChange={handleQuantityChange}
          className="w-full text-center"
        />
        <button
          onClick={handleQuantityIncrease}
          disabled={inputValue === maxQuantity}
          className={
            inputValue === maxQuantity ? "cursor-not-allowed text-gray-300" : ""
          }
        >
          <FaPlus size={15} />
        </button>
      </div>
    </div>
  );
};

export default SelectProductQuantity;
