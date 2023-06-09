import { useState } from 'react';
import { Link } from 'react-router-dom'

const MainTagComponent = ({CategoriesLinks, Parentlink, handleCloseHoverlinks}) => {
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  const handleBackgroundMove = () => {
    setBackgroundVisible(false);
  }
  return (
    <nav className="py-6">
      <ul className="list-none m-0">
        <li  className={`${backgroundVisible ? 'bg-white' : ''} py-1.5 px-4 text-stone-900 
          uppercase text-sm font-bold focus-within:bg-white transition duration-200 ease-linear`}>
          <Link to={`/${Parentlink}`} className="block" onClick={handleCloseHoverlinks}>All</Link>
        </li>

        {CategoriesLinks.map((category) => {
          return(
            <li key={category.id} className="py-1.5 px-4 text-stone-500 uppercase font-normal 
              text-sm focus-within:bg-white hover:text-stone-900 transition duration-200 ease-linear"
               onClick={handleBackgroundMove}>
              <Link to={`/${Parentlink}/categories?category=${category.title}`} className="block"
              onClick={handleCloseHoverlinks}>
                {category.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav> 
  )
}

export default MainTagComponent
