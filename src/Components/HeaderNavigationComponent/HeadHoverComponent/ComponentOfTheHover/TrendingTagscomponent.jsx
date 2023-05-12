import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const TrendingTagscomponent = ({TagsLinks, Parentlink}) => {
  const [clickedTag, setclickedTag] = useState("")

  const handleclickedCategory = (e) => {
    setclickedTag(() => e.target.textContent)
  }
  return (
    <ul className="list-none m-0 p-0">
      <span className="py-2 text-[#444] uppercase font-normal text-sm mb-1.2 inline-block">Trending tags</span>
      {TagsLinks.map((tag) => {
        return(
            <li key={tag.id} className="py-1.5 capitalize text-xs">
              <NavLink 
              to={`/${Parentlink}/${clickedTag}`}
              className={`text-rose-600 hover:text-[#444] transition duration-200 ease-linear`}
              onMouseOver={handleclickedCategory}
              >
                {tag.title}
              </NavLink>
            </li>
        )
      })}
    </ul>
  )
}

export default TrendingTagscomponent
