import React from 'react'
import { Link } from 'react-router-dom'

const TrendingTagscomponent = ({TagsLinks, Parentlink, handleCloseHoverlinks}) => {
  return (
    <ul className="list-none m-0 p-0">
      <span className="py-2 text-stone-800 uppercase font-normal text-sm mb-1.2 inline-block">Trending tags</span>
      {TagsLinks.map((tag) => {
        return(
            <li key={tag.id} className="py-1.5 capitalize text-xs">
              <Link 
              onClick={handleCloseHoverlinks}
              to={`/${Parentlink}/tags?tag=${tag.title}`}
              className={`text-rose-600 hover:text-stone-600 transition duration-200 ease-linear`}>
                {tag.title}
              </Link>
            </li>
        )
      })}
    </ul>
  )
}

export default TrendingTagscomponent
