import React, { useState } from "react";
import Pagination from "../Pagination";


const PaginationFunctions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PaginationFunctions;
