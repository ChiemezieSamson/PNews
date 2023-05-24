import React from "react";
import { NavLink } from "react-router-dom";
import MainTagComponent from "./ComponentOfTheHover/MainTagComponent";
import PostImageComponent from "./ComponentOfTheHover/PostImageComponent";
import TrendingTagscomponent from "./ComponentOfTheHover/TrendingTagscomponent";

export const HoverLinsks = ({CategoriesLink, TagsLink, blogPost, Parentlink}) => {
 
  const CategoriesLinks = CategoriesLink.map((title, id) => ({id: id, title: title}) )
  const TagsLinks = TagsLink.map((title,id) => ({id:id,title:title}))
  return (
    <div className="text-left max-w-6xl mx-auto shadow-md shadow-black hidden lg:block bg-slate-50 text-xs font-poppins
     tracking-wide">
      <div className="grid grid-cols-6">
        <div className={`${(Parentlink === "quotes") ? "hidden" : "block"} col-span-1`}>
          <MainTagComponent CategoriesLinks={CategoriesLinks} Parentlink={Parentlink}/>
        </div>

        <div className={`${(Parentlink === "favorite") ? 
        "col-span-5" : "col-span-4"} 
        ${(Parentlink === "quotes") ? "col-span-6"
         : "col-span-4"} p-4`}>
          <PostImageComponent blogPost={blogPost} Parentlink={Parentlink}/>
        </div>
        
        <div className={`${(Parentlink === "favorite" || Parentlink === "quotes") ? "hidden" : "block"} 
        p-4 border-l border-solid border-gray-200/60 col-span-1`}>
          <TrendingTagscomponent TagsLinks={TagsLinks} Parentlink={Parentlink}/>
        </div>
        
      </div>
    </div>
  )
}


export const SmallScreenHoverLinsks = ({CategoriesLink, Parentlink}) => {
  const CategoriesLinks = CategoriesLink.map((title, id) => ({id: id, title: title}) )
  return (
    <nav className="overflowScrollSmallScreen bg-gradient-to-b max-h-40 md:h-auto pb-2 from-gray-300/50 to-transparent text-center md:text-left overflow-y-scroll md:overflow-visible">
      <ul className="list-none m-0 font-semibold ">
        <li>
        <NavLink 
        to={`/${Parentlink}`}
        className="py-1.5 px-1 text-[#757575] uppercase font-normal text-xs hover:bg-white block hover:text-[#444] transition duration-200 ease-linear"
        >All</NavLink>
        </li>
        {CategoriesLinks.map((category) => {
          return(
            <li key={category.id}>
              <NavLink
                to={`/${Parentlink}/categories?category=${category.title}`}
                className="py-1.5 px-1 text-[#757575] uppercase font-normal text-xs hover:bg-white 
               hover:text-[#444] transition duration-200 ease-linear block">
                  {category.title}
                </NavLink>
            </li>
          )
        })}
      </ul>
    </nav> 
  )
}