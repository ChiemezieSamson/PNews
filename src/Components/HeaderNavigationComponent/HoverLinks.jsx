import React from "react";

export const HoverLinsks = ({sublink, blogPost, trendingTags}) => {

  const sublinkObj = sublink.map((title,id) => ({id:id,title:title}))
  const trendingTagsObj = trendingTags.map((title,id) => ({id:id,title:title}))

  return (
    <section className="max-w-6xl mx-auto shadow-md shadow-black hidden lg:block bg-slate-200">
    <div className="flex">

    <div className="w-[18%] py-4 bg-gradient-to-b from-gray-300/50 to-transparent">
      <ul className="list-none m-0">
        <span className="uppercase text-md py-1 font-medium mb-4 block bg-white mt-2">All</span>
        {sublinkObj.map((data) => {
          return(
              <li key={data.id} className="py-2"><a href="ff">{data.title}</a></li>
          )
        })}
      </ul>
      </div> 

      <div className="w-[68%] p-4">
      <ul className="grid grid-cols-3 gap-4 list-none m-0 py-2">
        {blogPost.map((post) => {
          return(
              <li key={post.id}>
                <span> 
                    <img src={post.image} alt={post.title} className="w-full h-28" loading="lazy"/>
                  <p>
                    Note that the development build is not optimized.
                  </p>
                </span>
              </li>
          )
        })}
      </ul>
      </div> 

      <div className="w-[16%] p-4 border-l border-solid border-zinc-700/50 ">
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
    </section>
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