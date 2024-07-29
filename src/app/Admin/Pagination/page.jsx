// src/pages/admin/pagination.jsx
import React, { useState } from "react";
import Pagination from "../../components/Pagination"; // Adjust the path as needed

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalProducts = 100; // Example total products

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Page content */}
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
        paginate={paginate}
      />
      {/* Other page content */}
    </div>
  );
};

export default PaginationPage;
