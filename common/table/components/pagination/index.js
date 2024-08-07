import { useEffect, useState } from "react";
import constants from "../../constants";

const Pagination = ({ currentPage, handlePageChange, totalPages }) => {
  const [pageRange, setPageRange] = useState(constants.pagination.pageRange);

  const updatePageRange = () => {
    if (window.innerWidth < 640) {
      setPageRange(constants.pagination.mobilePageRange);
    } else {
      setPageRange(constants.pagination.pageRange);
    }
  };
  useEffect(() => {
    updatePageRange();
    window.addEventListener("resize", updatePageRange);
    return () => window.removeEventListener("resize", updatePageRange);
  }, []);

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (endPage - startPage < pageRange - 1) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="inline-flex space-x-2 w-full">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`md:px-4 px-2 md:py-2 py-1 border rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white text-black border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
          }`}
        >
          Previous
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`md:px-4 px-2 md:py-2 py-1 border rounded-lg ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-800 border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`md:px-4 px-2 md:py-2 py-1 border rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white text-black border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
