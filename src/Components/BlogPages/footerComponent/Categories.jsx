import React from 'react'
import { selectAllCategories } from '../../../Reduxstore/Slices/categories/Categories'
import { useSelector } from 'react-redux'


const Categories = () => {
  const categories = useSelector(selectAllCategories)
  return (
    <section className='lg:pb-8 pb-4 lg:mt-2'>
      <b className='inline-block text-[#f93d53] font-bold lg:mb-5 mb-3 text-lg'>Browse by Category</b>

      <ul className='grid grid-rows-8 grid-flow-col text-left md:text-center lg:text-left text-[#eee] m-0 p-0 '>
        {categories.categories.map((cat, index) => {
          return (
            <li key={index} className="text-sm py-1">
              <span className='font-bold inline-block '>{cat}</span>
            </li>
          )
        } )}
      </ul>
      
    </section>
  )
}

export default Categories
