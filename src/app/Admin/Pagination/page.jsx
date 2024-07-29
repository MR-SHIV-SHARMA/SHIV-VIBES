import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  productsPerPage,
  totalProducts,
  paginate,
}) => {
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  return (
    <div className="flex justify-between mt-4">
      <div>
        Showing {indexOfFirstProduct + 1}-
        {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts}{" "}
        products
      </div>
      <div className="flex space-x-2">
        <button
          className={`bg-gray-400 text-white px-2 py-1 rounded flex items-center ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="mr-2" />
          Prev
        </button>
        <button
          className={`bg-gray-400 text-white px-2 py-1 rounded flex items-center ${
            indexOfLastProduct >= totalProducts
              ? "pointer-events-none opacity-50"
              : ""
          }`}
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastProduct >= totalProducts}
        >
          Next
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
