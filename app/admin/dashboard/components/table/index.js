"use client";
import React, { useState, useEffect } from "react";
import constants from "./constants";
import SearchBar from "./components/searchBar";
import { LoadingMessage, NoItemsFoundMessage } from "./components/tableMessage";
import TableBody from "./components/tableBody";
import Pagination from "./components/pagination";
import { useSortedData } from "./hooks";

const Table = ({ products, setProducts }) => {
  console.log("products", products);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const lowercasedFilter = searchTerm.toLowerCase();
  const filtered = products.filter(
    (item) => item.sku && item.sku.toLowerCase().includes(lowercasedFilter)
  );

  useEffect(() => {
    setLoading(true);
    setFilteredData(filtered);
    setLoading(false);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(
    filteredData.length / constants.pagination.perPage
  );
  const startIdx = (currentPage - 1) * constants.pagination.perPage;
  const paginatedData = filteredData.slice(
    startIdx,
    startIdx + constants.pagination.perPage
  );

  const sortedPaginatedData = useSortedData(paginatedData, sortConfig);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="text-white flex flex-col gap-5 w-full overflow-hidden">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="overflow-x-scroll min-h-80">
            {loading ? (
              <LoadingMessage />
            ) : filteredData.length === 0 ? (
              <NoItemsFoundMessage />
            ) : (
              <TableBody
                data={sortedPaginatedData}
                setIsLoading={setLoading}
                handleSort={handleSort}
                sortConfig={sortConfig}
                setProducts={setProducts}
                products={products}
              />
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
