"use client";
import React, { useState, useEffect } from "react";
import constants from "./constants";
import SearchBar from "./components/searchBar";
import { LoadingMessage, NoItemsFoundMessage } from "./components/tableMessage";
import TableBody from "./components/tableBody";
import Pagination from "./components/pagination";
import { useSortedData } from "./hooks";

const Table = ({
  data,
  setData,
  columns,
  columnLabels,
  showSearch = true,
  uniqueKey,
  showActions = true,
  excludeKeys = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    setLoading(true);
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      return columns.some((column) =>
        item[column].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredData(filtered);
    setLoading(false);
    setCurrentPage(1);
  }, [searchTerm, data, columns]);

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
    <div className="text-white flex flex-col gap-5 w-full overflow-hidden">
      {showSearch && (
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
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
            setData={setData}
            columns={columns}
            uniqueKey={uniqueKey}
            showActions={showActions}
            excludeKeys={excludeKeys}
            columnLabels={columnLabels}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Table;
