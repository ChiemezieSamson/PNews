import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const HoverLinsks = ({sublink, blogPost,hostCat}) => {
  const [clickedCategory, setclickedCategory] = useState("")


  const handleclickedCategory = (e) => {
    setclickedCategory(() => e.target.textContent)
  }

  const MaintagObj = sublink.mainTags.map((title, id) => ({id: id, title: title}) )
  const trendingTagsObj = sublink.trendingtag.map((title,id) => ({id:id,title:title}))

  return (
    <div className="text-left max-w-6xl mx-auto shadow-md shadow-black hidden lg:block bg-slate-50 text-xs font-poppins
     tracking-wide">
      <div className="grid grid-cols-6">

        <nav className="py-6 bg-gradient-to-b from-gray-300/50 to-transparent col-span-1">
          <ul className="list-none m-0 font-semibold ">
            {MaintagObj.map((data) => {
              return(
                <li key={data.id} className="py-2 px-4 text-[#757575] uppercase font-normal text-xs hover:bg-white 
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

        <div className="p-4 col-span-4">
          <ul className="grid grid-cols-3 gap-4 list-none m-0 py-2">
            {blogPost.map((post) => {
              return(
                  <li key={post.id}>
                    <span> 
                        <img src={post.image} alt={post.title} className="w-full h-28 cursor-pointer" loading="lazy"/>
                      <span className="mt-1 cursor-pointer inline-block">
                        Note that the development build is not optimized.
                      </span>
                    </span>
                  </li>
              )
            })}
          </ul>
        </div> 

        <div className="p-4 border-l border-solid border-gray-200/60 col-span-1">
          <ul className="list-none m-0 p-2">
            <span className="uppercase text-sm font-medium pb-4 inline-block">Trending tags</span>
            {trendingTagsObj.map((data) => {
              return(
                  <li key={data.id} className="py-2"><a href="ff">{data.title}</a></li>
              )
            })}
          </ul>
        </div>
        
      </div>
    </div>
  )
}


export const SmallScreenHoverLinsks = ({sublink}) => {
  return (
    <section className="mx-auto relative lg:hidden">
       <div className="overflowScrollSmallScreen w-full py-4 bg-pink-600 absolute h-40 overflow-y-scroll md:h-auto md:overflow-visible">
      <ul className="list-none m-0 p-0">
        <span className="uppercase text-md py-1 font-medium mb-4 block bg-white mt-2">All</span>
        {sublink.map((data) => {
          return(
              <li key={data.id} className="py-2">
                <span>{data.cat}</span>
              </li>
          )
        })}
      </ul>
      </div> 
    </section>
  )
}