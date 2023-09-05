import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ currentPage , totalPages }) => {
  const { pathname, search } = useLocation()
  const routePathName = "/" + pathname.split("/")[1]
  const pageNumbers = [];
  let route 
  let pageToNumber = parseInt(currentPage)
  let totalPagesToNumber = parseInt(totalPages)

  let categoryRoute
  
  if(pathname.split("/")[2] === "categories" 
  || pathname.split("/")[2] === "tags" 
  || routePathName === "/categories" 
  || routePathName === "/search") {

    categoryRoute = `${pathname}${search.split("&")[0]}`
  }

  let numberLink

  if(routePathName === "/pages" || routePathName === "/") {

    route = "/pages?page="

    numberLink = "/"
  } else {

    if (categoryRoute) {

      route = `${categoryRoute}&page=`
      numberLink = categoryRoute

    } else {
      route = `${routePathName}/pages?page=`
  
      numberLink = routePathName
    }
  }

  for (let i = 1; i <= totalPagesToNumber; i++) {
    pageNumbers.push(i);
  }

  let urlLink

  if(pageToNumber - 1 !== 1) {

    if(categoryRoute) {

      urlLink = `${categoryRoute}&page=${(pageToNumber - 1)}`
    } else {

      urlLink = `${route}${(pageToNumber - 1)}`
    }  
  } else {
    let newRoute 

    if (routePathName !== "/pages") {

      newRoute = routePathName
    } else {

        newRoute = "/"
    }

    if(categoryRoute) {

      newRoute = categoryRoute
    } 

    urlLink = newRoute
  }


  // determine which page numbers to show
  let startPage, endPage;

  if (totalPagesToNumber <= 4) {

    // show all pages if there are 4 or fewer
    startPage = 1;
    endPage = totalPagesToNumber;

  } else {

    // otherwise show current page and 2 pages before/after
    if (pageToNumber <= 3) {

      startPage = 1;
      endPage = 4;

    } else if (pageToNumber + 2 >= totalPagesToNumber) {

      startPage = totalPagesToNumber - 3;
      endPage = totalPagesToNumber;

    } else {

      startPage = pageToNumber - 2;
      endPage = pageToNumber + 1;
    }
  }

  return (
    <nav className=" my-4">

      <ul className="max-w-[355px] p-1">

        {/* previous button */}
        {pageToNumber > 1 && (

          <li className="inline-block">

            <Link to={urlLink}>

              <button
                className="text-sm px-2.5 py-1 border border-solid border-gray-300 mx-1 shadow-sm shadow-slate-400 hover:bg-slate-200
                TextHeadertransition">
                &lt;
              </button>
            </Link>
          </li>
        )}

          {/* more post from the left button start here */}
        {startPage > 1 && (

          <li className="inline-block">

            <Link to={`${route}${startPage - 1}`}>

              <button type='button' className="text-sm px-2 pt-1 mx-0.5">
                &hellip;
              </button>
            </Link>
          </li>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) =>{ 
          
          return (
            <li key={pageNumber} className="inline-block">

              <Link to={`${pageNumber === 1 ? numberLink : route + pageNumber}`}>

                <button
                  type='button'
                  className={`text-sm px-2.5 py-1 border border-solid border-gray-400 mx-1 shadow-sm shadow-slate-400 transition-all duration-200 ease-linear ${
                    pageToNumber === pageNumber ? "bg-rose-500 text-white border-rose-400 hover:bg-rose-500" : "hover:bg-slate-200"
                  }`}>
                  {pageNumber}
                </button>
              </Link>
            </li>
        )})}

          {/* more post from the left button start here */}
        {(endPage < totalPagesToNumber && startPage <= 1) && (

          <li className="inline-block">

            <Link to={`${route}${endPage + 1}`}>

              <button
                className="text-sm px-2 pt-1 mx-0.5">
                &hellip;
              </button>
            </Link>
          </li>
        )}

        {/* next button */}
        {pageToNumber < totalPagesToNumber && (

          <li className="inline-block">

            <Link to={`${route}${pageToNumber + 1}`}>     
                     
              <button
                className="text-sm px-2.5 py-1 border border-solid border-gray-300 mx-1 shadow-sm shadow-slate-400 hover:bg-slate-200
                transition-all duration-200 ease-linear">
                &gt;
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination
