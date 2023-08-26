import React from 'react'
import useFetchedCategories from '../../../SharedAsset/Spinners/categoriesSpinner'
import { Link } from 'react-router-dom'

const Categories = () => {
  const {categoriesContent, categoriesaction, isFetching} = useFetchedCategories()
  let categories 

  if (categoriesaction) {
    categories = categoriesContent.map((title, id) => ({id: id, title: title}))
  }
  
  return (
    <section className='lg:pb-8 pb-4 lg:mt-2 disabled:opacity-40' disabled={isFetching}>
      <b className='inline-block text-[#f93d53] font-bold lg:mb-5 mb-3 text-lg'>Browse by Category</b>

      <ul className='xxs:grid xxs:grid-rows-8 xxs:grid-flow-col overflow-hidden text-left md:text-center lg:text-left text-white m-0 p-0'>
        <>
        {categoriesaction ? 
          categories.map((cat) => {
            return (
              <li key={cat.id} className="text-sm inline-block px-1">
                <Link 
                  to={`/categories?category=${cat.title}`}
                 className='font-bold inline-block hover:mainColor py-1 TextHeadertransition'>{cat.title}</Link>
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
