import React from 'react'
import { NavLink } from 'react-router-dom'

const TrendingTagscomponent = ({trendingTagsObj}) => {
  return (
    <ul className="list-none m-0 p-0">
      <span className="py-2 text-[#444] uppercase font-normal text-sm mb-1.2 inline-block">Trending tags</span>
      {trendingTagsObj.map((data) => {
        return(
            <li key={data.id} className="py-1.5 capitalize text-xs">
              <NavLink className={`text-rose-600 hover:text-[#444] transition duration-200 ease-linear`}>{data.title}</NavLink>
            </li>
        )
      })}
    </ul>
  )
}

export default TrendingTagscomponent
