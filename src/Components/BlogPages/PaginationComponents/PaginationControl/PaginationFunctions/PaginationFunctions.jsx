import React from "react";
import Pagination from "../Pagination";

const PaginationFunctions = ({currentPage, totalPages}) => {

  return (
    <div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      /> 
    </div>
  );
};

export default PaginationFunctions;
