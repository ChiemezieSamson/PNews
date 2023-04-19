import React from "react";
import { Hanbugar3 } from "../ButtonAndOthers/Buttons";
import { SocialMediaIcons} from "../../data"
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../Reduxstore/Slices/posts/PostsSlice";


const FullSreenSidebar = ({closesidebar}) => {
  const Posts = useSelector(selectAllPosts)
  
  const Words = ["Get in touch", "Adventure journal", "Live events"]
  const texts = Words.map((text,i) => ({id: i, name: text}))

  return (
    <section className="overflowScrollSmallScreen hidden md:block h-screen overflow-y-scroll scroll-py-4 overscroll-y-contain snap-mandatory p-8 px-12 relative bg-gray-200">

      <figure className="w-40 mx-auto p-4">
       <img src={Posts[9].postImage} alt="FirstImage" className="w-full h-auto" loading="lazy"/>
       <figcaption>Chinonye</figcaption>
      </figure>

      <span className="my-4">
        <p>Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur</p>
      </span>
      
      <div className="mb-4 mt-8 text-4xl flex gap-x-2 mx-auto w-60">  
         { SocialMediaIcons[0].icon }     
        <span className="inline-block text-2xl">
          @travely.together
        </span>
      </div>

      {/* ==== the Instagram Image start here ==== */}
  
      <ul className="grid grid-cols-3 gap-0 mb-4 shadow-sm shadow-black ">
        {
          Posts.slice(0, 9).map((data) => {
            return (
            <li key={data.id} className="p-0 m-0 h-28 relative InstagramImage">
              <img src={data.postImage} alt={"social"}  className="w-full h-28 p-0 m-0" loading="lazy"/>
              <div className="absolute top-0 right-0 left-0 bottom-0 bg-black opacity-0 Instacover"></div>
            </li>
            )
          })
        }
      </ul>

      <ul className="px-0 py-4 m-0 list-none">
        {texts.map((text) => {
          return (
            <li key={text.id} className="p-2 inline-block last:block last:px-4">
              <span className="text-black"> 
                <span className="text-[10px] font-black inline-block px-2">&#9675;</span>
                {text.name}
              </span>
            </li>
          )
        })}
      </ul>

     {/* ===== sidebar social links start here ===== */}

      <ul className="list-none m-0 mt-4 p-0 mx-auto w-3xl">
        {SocialMediaIcons.map((icon) => {
          return (
            <li key={icon.id} className="border border-solid border-black rounded-full p-1 inline-block mx-2">
              <span className="no-underline text-black text-lg">{icon.icon}</span>
            </li>
          )
        })}
      </ul>

      <div className="fixed top-10 righ-4 text-lg">
        <Hanbugar3 closesidebar={closesidebar}/>
      </div>
    </section>
  )
}

export default FullSreenSidebar