import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainTagComponent from "./ComponentOfTheHover/MainTagComponent";
import PostImageComponent from "./ComponentOfTheHover/PostImageComponent";
import TrendingTagscomponent from "./ComponentOfTheHover/TrendingTagscomponent";

export const HoverLinsks = ({CategoriesLink, TagsLink, blogPost, Parentlink, handleCloseHoverlinks}) => { 
  const CategoriesLinks = CategoriesLink.map((title, id) => ({id: id, title: title}) )
  const TagsLinks = TagsLink.map((title,id) => ({id:id,title:title}))

  return (
    <div className="text-left w-full lg:max-w-6xl lg:rounded-b mx-auto shadow-md shadow-black bg-stone-50 font-poppins tracking-wide">
      <div className="grid grid-cols-6">

        {/* === List of categories in the hover component handler ===*/}
        <div className={`${(Parentlink === "quotes") ? "hidden" : "block"} col-span-1
          bg-neutral-200 `}>
          <MainTagComponent 
            CategoriesLinks={CategoriesLinks} 
            Parentlink={Parentlink} 
            handleCloseHoverlinks={handleCloseHoverlinks}/>
        </div>

          {/* === Posts Images and title component handler === */}
        <div className={`${(Parentlink === "favorite") ? "col-span-5" : "col-span-4"} 
          ${(Parentlink === "quotes") ? "col-span-6" : "col-span-4"} p-4`}>
          <PostImageComponent 
            blogPost={blogPost} 
            Parentlink={Parentlink}
            handleCloseHoverlinks={handleCloseHoverlinks}/>
        </div>
        
        {/* === List of tags in the hover component handler ===*/}
        <div className={`${(Parentlink === "favorite" || Parentlink === "quotes") ? "hidden" : "block"} 
        text-center pt-4 border-l border-solid border-neutral-200 col-span-1`}>
          <TrendingTagscomponent 
            TagsLinks={TagsLinks} 
            Parentlink={Parentlink}
            handleCloseHoverlinks={handleCloseHoverlinks}/>
        </div>
        
      </div>
    </div>
  )
}


export const SmallScreenHoverLinsks = ({CategoriesLink, Parentlink, handleCloseNavLinks}) => {
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const CategoriesLinks = CategoriesLink.map((title, id) => ({id: id, title: title}) )

  const handleBackgroundMove = () => {
    setBackgroundVisible(false);
  }
  
  return (
    <nav className="md:hidden">
      <ul className="list-none m-0 font-semibold overflowScrollSmallScreen bg-gradient-to-b from-gray-300/50 
        to-transparent text-center md:text-left overflow-y-scroll md:overflow-visible max-h-40 md:max-h-full pb-2">

        <li className={`${backgroundVisible ? 'bg-white' : ''} py-1.5 px-1 text-stone-700 uppercase font-normal text-xs
          hover:mainColor transition duration-200 ease-linear focus-within:bg-white`}>
          <Link to={`/${Parentlink}`} className="block"   onClick={handleCloseNavLinks}>All</Link>
        </li>
        
        {CategoriesLinks.map((category) => {
          return(
            <li key={category.id} className="py-1.5 px-1 text-stone-700 uppercase font-normal text-xs
            hover:mainColor transition duration-200 ease-linear focus-within:bg-white" 
            onClick={handleBackgroundMove}
            >
              <Link to={`/${Parentlink}/categories?category=${category.title}`} 
              className="block"   onClick={handleCloseNavLinks}>
                  {category.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav> 
  )
}