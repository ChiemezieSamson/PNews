import React from 'react'

const Pagination = ({ currentPage , totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // determine which page numbers to show
  let startPage, endPage;

  if (totalPages <= 4) {
    // show all pages if there are 5 or fewer
    startPage = 1;
    endPage = totalPages;
  } else {
    // otherwise show current page and 2 pages before/after
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 4;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 1;
    }
  }

  return (
    <nav className=" my-4">
      <ul className="max-w-[355px] p-1">

        {/* previous button */}
        {currentPage > 1 && (
          <li className="inline-block">
            <button
              className="text-sm px-2.5 py-1 border border-solid border-gray-300 mx-1 shadow-sm shadow-slate-400 hover:bg-slate-200
              transition-all duration-200 ease-linear"
              onClick={() => onPageChange(currentPage - 1)}
            >
              &lt;
            </button>
          </li>
        )}

          {/* more post from the left button start here */}
        {startPage > 1 && (
          <li className="inline-block">
            <button
              className="text-sm px-2 pt-1 mx-0.5"
              onClick={() => onPageChange(startPage - 1)}
            >
              &hellip;
            </button>
          </li>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <li key={pageNumber} className="inline-block">
            <button
              className={`text-sm px-2.5 py-1 border border-solid border-gray-400 mx-1 shadow-sm shadow-slate-400 transition-all duration-200 ease-linear ${
                currentPage === pageNumber ? "bg-rose-500 text-white border-rose-400 hover:bg-rose-500" : "hover:bg-slate-200"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

          {/* more post from the left button start here */}
        {(endPage < totalPages && startPage <= 1) && (
          <li className="inline-block">
            <button
              className="text-sm px-2 pt-1 mx-0.5"
              onClick={() => onPageChange(endPage + 1)}
            >
              &hellip;
            </button>
          </li>
        )}

        {/* next button */}
        {currentPage < totalPages && (
          <li className="inline-block">
            <button
              className="text-sm px-2.5 py-1 border border-solid border-gray-300 mx-1 shadow-sm shadow-slate-400 hover:bg-slate-200
              transition-all duration-200 ease-linear"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination
