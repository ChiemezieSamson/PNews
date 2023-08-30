import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainTagComponent from "./ComponentOfTheHover/MainTagComponent";
import PostImageComponent from "./ComponentOfTheHover/PostImageComponent";
import TrendingTagscomponent from "./ComponentOfTheHover/TrendingTagscomponent";
import { HeroOneBussinessFavoriteImageSpinner } from "../../SharedAsset/Spinners/Spinner";
import { isFecthingStyle } from "../../SharedAsset/SharedAssets";

export const HoverLinsks = ({CategoriesLink, TagsLink, blogPost, Parentlink, handleCloseHoverlinks, tagsaction,
  isSuccess, isFetchingHoverPosts, isFetchingTags, isFetching, categoriesaction}) => { 
 
  return (
    <div 
      className="text-left w-[98%] lg:max-w-6xl lg:rounded-b mx-auto shadow-md shadow-black bg-stone-50
       font-poppins tracking-wide">
      <div className={`grid ${Parentlink === "quotes" ? "grid-cols-4" : "grid-cols-6"}`}>

        {/* === List of categories in the hover component handler ===*/}
        <div className={`${(Parentlink === "quotes") ? "hidden" : "block"} col-span-1
          bg-neutral-200 `}>
          <MainTagComponent 
            CategoriesLink={CategoriesLink} 
            Parentlink={Parentlink} 
            handleCloseHoverlinks={handleCloseHoverlinks}
            isFetching={isFetching}
            categoriesaction={categoriesaction}/>
        </div>

        {/* === Posts Images and title component handler === */}
        <div className={`${(Parentlink === "favorite") ? "col-span-5" : "col-span-4"} 
          ${(Parentlink === "quotes") ? "col-span-6" : "col-span-6"} p-4`}>

          <PostImageComponent 
            blogPost={blogPost} 
            Parentlink={Parentlink}
            isFetchingHoverPosts={isFetchingHoverPosts}
            isSuccess={isSuccess}
            handleCloseHoverlinks={handleCloseHoverlinks}
            />
        </div>
        
        {/* === List of tags in the hover component handler ===*/}
        <div className={`${(Parentlink === "favorite" || Parentlink === "quotes") ? "hidden" : "block"} 
        text-center pt-4 border-l border-solid border-neutral-200 col-span-1`}>
          <TrendingTagscomponent 
            TagsLink={TagsLink} 
            Parentlink={Parentlink}
            handleCloseHoverlinks={handleCloseHoverlinks}
            isFetchingTags={isFetchingTags}
            tagsaction={tagsaction}
            />
        </div>        
      </div>
    </div>
  )
}


export const SmallScreenHoverLinsks = ({CategoriesLink, Parentlink, handleCloseNavLinks, isFetching, categoriesaction}) => {
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const [categoriesLinks, setCategoriesLinks] = useState([])

  const handleBackgroundMove = () => {
    setBackgroundVisible(false);
  }

  const handleOnHover = () => {
    setBackgroundVisible(() => false);
  }

  const handleOnHoverOut = () => {
    setBackgroundVisible(() => true);
  }

  
  useEffect(() => {
    
    if (CategoriesLink?.length > 0) {
  
     const  CategoriesLinks = CategoriesLink?.map((title, id) => ({id: id, title: title}))
       setCategoriesLinks(() => CategoriesLinks)
    }
  }, [CategoriesLink])
  
  return (
    <nav className={`md:hidden disabled:opacity-40 ${isFecthingStyle(isFetching)}`}>

      <ul className="list-none m-0 font-semibold overflowScrollSmallScreen bg-gradient-to-b from-gray-300/50 
        to-transparent text-center md:text-left overflow-y-scroll md:overflow-visible max-h-40 md:max-h-full pb-2">

        <li className={`${backgroundVisible && 'bg-white'} py-1.5 px-1 text-stone-700 uppercase font-normal text-xs
          hover:mainColor TextHeadertransition focus-within:bg-white`}>
          <Link to={`/${Parentlink}`} className="block"  onClick={handleCloseNavLinks}>All</Link>
        </li>
        
        {(categoriesaction && !isFetching) ?          
          categoriesLinks?.map((category) => {
            return(
              <li key={category?.id} className="py-1.5 px-1 text-stone-700 uppercase font-normal text-xs
              hover:mainColor TextHeadertransition focus-within:bg-white hover:bg-white" 
              onClick={handleBackgroundMove} onMouseOver={handleOnHover} onMouseOut={handleOnHoverOut}>

                <Link to={`/${Parentlink}/categories?category=${category?.title}`} 
                  className="block"   onClick={handleCloseNavLinks}>
                    {category?.title}
                </Link>
              </li>
            )
          })
          :
          <HeroOneBussinessFavoriteImageSpinner 
            groupStyle={"list-none m-0 py-3 px-4"}
            imageStyle={"h-5 w-[30%] mx-auto my-2 "}
            image={5}
          />    
        }
      </ul>
    </nav> 
  )
}