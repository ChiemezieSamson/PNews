import { useState } from 'react';
import { Link } from 'react-router-dom'
import { SkeletonTextFour } from '../../../SharedAsset/Spinners/Spinner';

const MainTagComponent = ({CategoriesLink, Parentlink, handleCloseHoverlinks, isFetching, categoriesaction}) => {
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  const handleBackgroundMove = () => {
    setBackgroundVisible(() => false);
  }

  const handleOnHover = () => {
    setBackgroundVisible(() => false);
  }

  const handleOnHoverOut = () => {
    setBackgroundVisible(() => true);
  }

  let CategoriesLinks = []

  if (CategoriesLink?.length > 0 && Parentlink) {
    CategoriesLinks = CategoriesLink?.map((title, id) => ({id: id, title: title}) )
  }

  return (
    <nav className="py-6 disabled:opacity-40" disabled={isFetching}>
      <ul className="list-none m-0">
        <li  className={`${backgroundVisible ? 'bg-white' : ''} py-1.5 px-4 text-stone-900 
          uppercase text-sm font-bold focus-within:bg-white TextHeadertransition`}>
          <Link to={`/${Parentlink}`} className="block" onClick={handleCloseHoverlinks}>All</Link>
        </li>

        {(categoriesaction && !isFetching) ?
          CategoriesLinks?.map((category) => {
          return(
            <li key={category?.id} className="py-1.5 px-4 text-stone-500 uppercase font-normal 
              text-sm focus-within:bg-white hover:bg-white hover:text-stone-900 TextHeadertransition"
               onClick={handleBackgroundMove} onMouseOver={handleOnHover} onMouseOut={handleOnHoverOut}>

              <Link to={`/${Parentlink}/categories?category=${category?.title}`} className="block"
                onClick={handleCloseHoverlinks}>
                {category?.title}
              </Link>
            </li>
            )
          })
          :
          <SkeletonTextFour />          
        }
      </ul>
    </nav> 
  )
}

export default MainTagComponent
