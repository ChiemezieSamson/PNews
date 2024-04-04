import React from 'react'
import useFetchedCategories from '../../../SharedAsset/Spinners/categoriesSpinner'
import { Link } from 'react-router-dom'
import { isFecthingStyle, useWindowSize } from '../../../SharedAsset/SharedAssets'
import { HeroOneBussinessFavoriteImageSpinner } from '../../../SharedAsset/Spinners/Spinner'

const Categories = () => {
  const {categoriesContent, categoriesaction, isFetching} = useFetchedCategories()
  let categories 

  const size = useWindowSize()

  if (categoriesaction) {
    
    categories = categoriesContent?.map((title, id) => ({id: id, title: title}))
  }
  
  return (
    <section className="pb-4 lg:mt-2 max-w-[380px] lg:max-w-[420px] lg:mx-0 md:mx-auto">
      
      <b className='inline-block text-[#f93d53] font-bold lg:mb-5 mb-3 text-lg'>Browse by Category</b>

      {categoriesaction ? 

        <ul className='grid grid-cols-2 xxs:grid-rows-8 xxs:grid-flow-col overflow-hidden text-left md:text-center lg:text-left text-white m-0 p-0'>
      
          {categories?.map((cat) => {

            return (
              <li key={cat?.id} className={`text-sm xxs:inline-block pr-1 tracking-wider ml-px mb-px max-w-[130px] overflow-hidden ${isFecthingStyle(isFetching)}`} title={cat?.title}>

                <Link to={`/categories?category=${cat?.title}`} className='font-bold inline-block hover:mainColor py-1 TextHeadertransition capitalize'>
                  {cat.title ? cat.title : ""}
                </Link>
              </li>
            )
          })}              
        </ul>      
          :
        <HeroOneBussinessFavoriteImageSpinner 
          groupStyle={"list-none m-0 xxs:grid xxs:grid-cols-2 gap-x-4 max-w-[300px] md:mx-auto lg:mx-0 overflow-hidden"}
          imageStyle={"h-5 w-full my-2"}
          image={size.width < 520 ? 8 : 12}
        />          
        }
    </section>
  )
}

export default Categories
