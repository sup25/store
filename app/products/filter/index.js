import Accordion from "@/common/accordion";
import React, { useState } from "react";

const sortingOptions = [
  { label: "Alphabetical: A-Z", value: "asc" },
  { label: "Alphabetical: Z-A", value: "desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const Filter = ({ handleSortChange }) => {
  const handleItemClick = (item) => {
    handleSortChange(item.value);
  };

  return (
    <div className="w-full max-w-52 border rounded">
      <Accordion
        title="Sort By"
        items={sortingOptions.map((option) => ({
          text: option.label,
          value: option.value,
        }))}
        onItemClick={handleItemClick}
        isExpanded={true}
      />
    </div>
  );
};

export default Filter;
