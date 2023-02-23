import React from "react";
import { SocialMediaIcons } from "../../data";
import { HanbugarTwo } from "../ButtonAndOthers/Buttons";



const SocialNewsletter = ({opensidebar}) => {

  return (
  <section className="hidden shadow-md md:flex py-2 justify-between mb-2">
    <div className="flex justify-between mx-auto w-[1280px] px-8">

    {/* ====== newsletter start here ===== */}
    <form action="">
      <div className="border-x-0 border-t-0 border-b border-solid border-black inline-block p-0">
        <div className="inline-block">
          <label htmlFor="newsletter"></label>
          <input type="email" id="newsletter" className="border-0 focus:border-0 ring-0 focus:ring-0 shadow-none py-0 m-0 px-1" placeholder="Enter your email" name="mail" aria-required="true" required/>
        </div>
        <div className="inline-block">
          <button type="submit" className="border-0 focus:border-0 ring-0 focus:ring-0 shadow-none bg-transparent text-[1rem] py-0 m-0 px-1">
            <span>Subscribe Newsletter &rarr;</span>
          </button>
        </div>
      </div>
    </form>

    {/* ===== social start here ==== */}
    <ul className="pt-1 list-none m-0 p-0 flex gap-4">
      {SocialMediaIcons.slice(0, 5).map((icon) => {
        return (
          <li key={icon.id}>
            <span className="no-underline text-black text-lg">{icon.icon}</span>
          </li>
        )
      })}
    </ul>
    
    </div>
    <div className="text-black text-lg pr-4">
      <HanbugarTwo openSidebar={opensidebar}/>
    </div>
    
  </section> 
  )
}

export default SocialNewsletter