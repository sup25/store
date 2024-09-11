import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import constants from "../constants";

const Pagination = ({ currentPage, handlePageChange, totalPages }) => {
  const [pageRange, setPageRange] = useState(constants.pagination.pageRange);

  const updatePageRange = () => {
    setPageRange(
      window.innerWidth < 640
        ? constants.pagination.mobilePageRange
        : constants.pagination.pageRange
    );
  };

  useEffect(() => {
    updatePageRange();
    window.addEventListener("resize", updatePageRange);
    return () => window.removeEventListener("resize", updatePageRange);
  }, []);

  const getPageNumbers = () => {
    const pageNumbers = [1];

    if (currentPage > 2) pageNumbers.push(currentPage - 1);
    if (currentPage > 1 && currentPage < totalPages)
      pageNumbers.push(currentPage);
    if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 1);
    if (totalPages > 1) pageNumbers.push(totalPages);

    const uniquePages = [...new Set(pageNumbers)];

    if (uniquePages.length > pageRange) {
      if (currentPage <= 2) return [1, 2, 3, totalPages];
      if (currentPage >= totalPages - 1)
        return [1, totalPages - 2, totalPages - 1, totalPages];
      return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
    }

    return uniquePages;
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="inline-flex space-x-2 p-1 bg-white rounded-md">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border transition duration-300 text-center ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-primary border-secondary hover:bg-secondary hover:text-white"
          }`}
        >
          <FaChevronLeft size={14} />
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-others rounded-lg border transition duration-300 text-center ${
              page === currentPage
                ? "bg-secondary text-white font-bold"
                : "bg-white text-primary border-secondary hover:bg-secondary hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border transition duration-300 text-center ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-primary border-secondary hover:bg-secondary hover:text-white"
          }`}
        >
          <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
