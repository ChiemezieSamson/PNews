import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MainTagComponent from "./ComponentOfTheHover/MainTagComponent";
import PostImageComponent from "./ComponentOfTheHover/PostImageComponent";
import TrendingTagscomponent from "./ComponentOfTheHover/TrendingTagscomponent";

export const HoverLinsks = ({sublink, blogPost, hostCat}) => {
 
  const MaintagObj = sublink.maintags.map((title, id) => ({id: id, title: title}) )
  const trendingTagsObj = sublink.trendingtag.map((title,id) => ({id:id,title:title}))
  return (
    <div className="text-left max-w-6xl mx-auto shadow-md shadow-black hidden lg:block bg-slate-50 text-xs font-poppins
     tracking-wide">
      <div className="grid grid-cols-6">
        <div className={`${(hostCat === "quotes") ? "hidden" : "block"} col-span-1`}>
          <MainTagComponent MaintagObj={MaintagObj} hostCat={hostCat}/>
        </div>

        <div className={`${(hostCat === "favorite") ? 
        "col-span-5" : "col-span-4"} 
        ${(hostCat === "quotes") ? "col-span-6"
         : "col-span-4"} p-4`}>
          <PostImageComponent blogPost={blogPost} hostCat={hostCat}/>
        </div>
        
        <div className={`${(hostCat === "favorite" || hostCat === "quotes") ? "hidden" : "block"} 
        p-4 border-l border-solid border-gray-200/60 col-span-1`}>
          <TrendingTagscomponent trendingTagsObj={trendingTagsObj}/>
        </div>
        
      </div>
    </div>
  )
}


export const SmallScreenHoverLinsks = ({sublink, hostCat}) => {
  const [clickedCategory, setclickedCategory] = useState("")

  const handleclickedCategory = (e) => {
    setclickedCategory(() => e.target.textContent)
  }
  const MaintagObj = sublink.maintags.map((title, id) => ({id: id, title: title}) )
  return (
    <nav className="overflowScrollSmallScreen bg-gradient-to-b max-h-40 md:h-auto pb-2 from-gray-300/50 to-transparent text-center md:text-left overflow-y-scroll md:overflow-visible">
      <ul className="list-none m-0 font-semibold ">
        <li className="py-1.5 px-1 text-[#757575] uppercase font-normal text-xs hover:bg-white hover:text-[#444] transition duration-200 ease-linear">
        <NavLink to={hostCat+"/"}>All</NavLink>
        </li>
        {MaintagObj.map((data) => {
          return(
            <li key={data.id} className="py-1.5 px-1 text-[#757575] uppercase font-normal text-xs hover:bg-white 
            hover:text-[#444] transition duration-200 ease-linear">
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