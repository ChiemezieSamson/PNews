import React from "react";
import { SocialMediaIcons, publicFolder} from "../../data"
import { useFetchedPosts } from "../SharedAsset/Spinners/postsSpinner";
import { FaRegCircle } from "react-icons/fa";


const FullSreenSidebar = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content
  
  const Words = ["Get in touch", "Instagram Feeds", "Live events"]
  const texts = Words.map((text,i) => ({id: i, name: text}))

  return (
    <section className="overflowScrollSmallScreen hidden md:block h-screen overflow-y-scroll 
    scroll-py-4 overscroll-y-contain snap-mandatory p-8 px-12 bg-zinc-400 font-lora text-white">

      {/* === Site owner image and name === */}
      {action ?
      <div className="mb-14 text-center">
       <img src={publicFolder + Posts[0].postImage} alt="FirstImage" className="rounded cursor-pointer object-cover 
       object-center max-w-[160px] max-h-[160px] mx-auto" loading="lazy"/>
       <div className="text-3xl font-josefin capitalize mt-2">Chinonye</div>
      </div> : content}
    
      <p className="mt-4">Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur</p>
  
        {/* === Company instagram account name === */}
      <div className="mb-4 mt-8 text-4xl mx-auto w-60 text-center">  
         { SocialMediaIcons[0].icon }     
        <span className="inline-block text-2xl mx-2">
          @chinonye.Umeh
        </span>
      </div>

      {/* ==== the Instagram Image start here ==== */}
      <ul className="grid grid-cols-3 gap-0 mb-4 mx-0">
        {action &&
          Posts.slice(0, 9).map((post) => {
            return (
            <li key={post._id} className="relative max-h-28 group">
              <img src={publicFolder + post.postImage} alt={"social"}  
              className="cursor-pointer object-cover object-center m-0" loading="lazy"/>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20
              transition-all duration-200 ease-linear" />
            </li>
            )
          })
        }
      </ul>

        {/* === Ways to get in touch to the company === */}
      <ul className="m-0 list-none grid grid-cols-2 text-center mb-7">
        {texts.map((text) => {
          return (
            <li key={text.id} className="px-2 last:col-span-2">
              <FaRegCircle className="text-sm inline-block p-0.5 mx-1 text-stone-100"/>
                <span className="">
                  {text.name}
                </span>                
            </li>
          )
        })}
      </ul>

     {/* ===== sidebar social links start here ===== */}

      <ul className="mx-auto w-3xl">
        {SocialMediaIcons.map((icon) => {
          return (
            <li key={icon.id} className={`group cursor-pointer inline-block mx-2`} title={icon.name}>
              <span className={`no-underline text-lg ${icon.socialLinks} group-hover:text-stone-100 inline-block
              transition-all duration-200 ease-linear border border-solid border-stone-100
              rounded-full px-1 pb-px`}>{icon.icon}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FullSreenSidebar