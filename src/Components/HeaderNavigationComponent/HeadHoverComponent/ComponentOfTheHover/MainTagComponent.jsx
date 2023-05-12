import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const MainTagComponent = ({CategoriesLinks, Parentlink}) => {
  const [clickedCategory, setclickedCategory] = useState("")

  const handleclickedCategory = (e) => {
    setclickedCategory(() => e.target.textContent)
  }
  return (
    <nav className="py-6 bg-gradient-to-b from-gray-300/50 to-transparent ">
      <ul className="list-none m-0 font-semibold ">
        <li>
        <NavLink 
        to={`/${Parentlink}`} 
        className="py-1.5 px-4 text-[#757575] uppercase font-normal text-xs hover:bg-white 
            hover:text-black transition duration-200 ease-linear block"
        >All</NavLink>
        </li>
        {CategoriesLinks.map((category) => {
          return(
            <li key={category.id}>
              <NavLink
                to={`/${Parentlink}/${clickedCategory}`}
                className="py-1.5 px-4 text-[#757575] uppercase font-normal text-sm hover:bg-white 
                 hover:text-black transition duration-200 ease-linear block"
                onMouseOver={handleclickedCategory}>
                  {category.title}
                </NavLink>
            </li>
          )
        })}
      </ul>
    </nav> 
  )
}

export default MainTagComponent
