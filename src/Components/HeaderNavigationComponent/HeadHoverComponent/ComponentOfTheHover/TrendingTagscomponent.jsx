import React from 'react'
import { Link } from 'react-router-dom'
import { HeroOneBussinessFavoriteImageSpinner } from '../../../SharedAsset/Spinners/Spinner'
import { isFecthingStyle } from '../../../SharedAsset/SharedAssets'

const TrendingTagscomponent = ({TagsLink, Parentlink, handleCloseHoverlinks, tagsaction, isFetchingTags}) => {
  let TagsLinks = []

  if(TagsLink?.length > 0 && Parentlink) {

    TagsLinks = TagsLink?.map((title, id) => ({id: id, title: title}))
  }

  return (
    <ul className={`list-none m-0 p-0 disabled:opacity-40 ${isFecthingStyle(isFetchingTags)}`}>
      <span className="py-2 text-stone-800 uppercase font-normal text-sm mb-1.2 inline-block">Trending tags</span>

      {(tagsaction && !isFetchingTags) ?
        TagsLinks?.slice(0,8)?.map((tag) => {

          return(
            <li key={tag?.id} className="py-1.5 capitalize text-xs">
              <Link 
              onClick={handleCloseHoverlinks}
              to={`/${Parentlink}/tags?tag=${tag?.title}`}
              className={`text-rose-600 hover:text-stone-600  TextHeadertransition`}>
                {tag?.title}
              </Link>
            </li>
          )
        })
        :
        <HeroOneBussinessFavoriteImageSpinner 
            groupStyle={"list-none m-0 py-3 px-4"}
            imageStyle={"h-5 w-[70%] mx-auto my-2 "}
            image={5}
          />      
      }
    </ul>
  )
}

export default TrendingTagscomponent
