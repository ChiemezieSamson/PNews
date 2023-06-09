import React from 'react'
import useFetchedCategories from '../../SharedAsset/Spinners/categoriesSpinner'
import { Link } from 'react-router-dom'


const Categories = () => {
  const {categoriesContent, categoriesaction, isFetching} = useFetchedCategories()
  const categories = categoriesContent
  return (
    <section className='lg:pb-8 pb-4 lg:mt-2 disabled:opacity-40' disabled={isFetching}>
      <b className='inline-block text-[#f93d53] font-bold lg:mb-5 mb-3 text-lg'>Browse by Category</b>

      <ul className='grid grid-rows-8 grid-flow-col text-left md:text-center lg:text-left text-white m-0 p-0 '>
        <>
        {categoriesaction ? 
          categories.map((cat, index) => {
            return (
              <li key={index} className="text-sm py-1">
                <Link 
                  to={`/categories?category=${cat}`}
                 className='font-bold inline-block hover:text-[#f70d28] 
                 transition-all duration-400 delay-100 ease-linear'>{cat}</Link>
              </li>
            )
          }) :
          categoriesContent
        }
        </>        
      </ul>
      
    </section>
  )
}

export default Categories
