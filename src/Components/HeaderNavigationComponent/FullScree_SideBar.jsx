import React from "react";
import { SocialMediaIcons, publicFolder} from "../../data"
import { useFetchedPosts } from "../SharedAsset/Spinners/postsSpinner";
import { FaRegCircle } from "react-icons/fa";
import { isFecthingStyle } from "../SharedAsset/SharedAssets";
import ImageBg from "./../../asset/images/imagebg.jpg"


const FullSreenSidebar = ({closesidebar}) => {
  const {content , action, isFetching} = useFetchedPosts()
  const Posts = content
  
  const Words = ["Get in touch", "Instagram Feeds", "Live events"]
  const texts = Words?.map((text,i) => ({id: i, name: text}))

  return (
    <section className={`overflowScrollSmallScreen hidden md:block h-screen overflow-y-scroll ${isFecthingStyle(isFetching)}
      scroll-py-4 overscroll-y-contain snap-mandatory p-8 px-12 bg-neutral-100 font-lora text-stone-800`}>

      {/* === Site owner image and name === */}
      <div className="mb-14 text-center">

      {action ?
        <img src={(Posts.length > 0 && Posts[0]?.postImage) ? publicFolder + (Posts.length > 0 && Posts[0]?.postImage) : ImageBg} alt="FirstImage" className="rounded max-w-[160px] max-h-[160px] mx-auto" loading="lazy"/>
        : 
        <div className="skeleton rounded-sm h-screen max-w-[160px] max-h-[160px] mx-auto"></div>
       }

       <div className="text-3xl font-josefin font-semibold capitalize mt-2">PNews</div>
      </div> 
    
      <p className="mt-4">Pnews is available across multiple platforms, including our user-friendly website and social media channels.</p>
  
        {/* === Company instagram account name === */}
      <div className="mb-4 mt-8 text-4xl mx-auto w-60 text-center">  
         {SocialMediaIcons[0]?.icon }     
        <span className="inline-block text-2xl mx-2">
          @PNews
        </span>
      </div>

      {/* ==== the Instagram Image start here ==== */}
      {action ? 
        <ul className="grid grid-cols-3 gap-0 mb-4 mx-0">
          {Posts?.slice(0, 9)?.map((post) => {
              return (
              <li key={post?._id} className="relative max-h-28 group">
                <img src={post?.postImage ? publicFolder + post?.postImage : ImageBg} alt={"social"}  className="m-0" loading="lazy"/>

                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 TextHeadertransition"/>
              </li>
              )
            })
          }
        </ul>
      :
        <div className="skeleton rounded-sm h-[40vh] mx-auto"></div>
      }

      {/* === Ways to get in touch to the company === */}
      <ul className="m-0 list-none grid grid-cols-2 text-center mb-7">
        {texts?.map((text) => {
          return (
            <li key={text?.id} className="last:col-span-2">
              <FaRegCircle className="text-sm inline-block p-0.5 mx-2.5 text-stone-800"/>
                <span className="">
                  {text?.name}
                </span>                
            </li>
          )
        })}
      </ul>

     {/* ===== sidebar social links start here ===== */}
      <ul className="mx-auto">
        {SocialMediaIcons?.map((icon) => {
          return (
            <li key={icon?.id} className={`group cursor-pointer inline-block mx-2`} title={icon?.name}
              onClick={closesidebar}>
              <a 
                href={icon?.link} 
                target="_blank" 
                rel={"noreferrer"} 
                className={`no-underline text-lg ${icon?.socialLinks} group-hover:text-stone-100 inline-block TextHeadertransition ease-linear border 
                border-solid border-stone-800 rounded-full px-1 pb-px`}>{icon?.icon}</a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FullSreenSidebar