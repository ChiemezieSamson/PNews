import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const MainTagComponent = ({MaintagObj, hostCat}) => {
  const [clickedCategory, setclickedCategory] = useState("")

  const handleclickedCategory = (e) => {
    setclickedCategory(() => e.target.textContent)
  }
  return (
    <nav className="py-6 bg-gradient-to-b from-gray-300/50 to-transparent ">
      <ul className="list-none m-0 font-semibold ">
        <li className="py-1.5 px-4 text-[#757575] uppercase font-normal text-xs hover:bg-white 
            hover:text-black transition duration-200 ease-linear">
        <NavLink to={hostCat+"/"} >All</NavLink>
        </li>
        {MaintagObj.map((data) => {
          return(
            <li key={data.id} className="py-1.5 px-4 text-[#757575] uppercase font-normal text-sm hover:bg-white 
            hover:text-black transition duration-200 ease-linear">
              <NavLink
                to={hostCat+"/"+clickedCategory}
                className={({isActive}) => isActive ? "" : ""}
                onClick={handleclickedCategory}>
                  {data.title}
                </NavLink>
            </li>
          )
        })}
      </ul>
    </nav> 
  )
}

export default MainTagComponent
