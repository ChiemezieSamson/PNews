import React from "react";
import StickyBox from "react-sticky-box";
import { Posts } from "../../../data";
import { CategoriesComponent, NavDirectionAndPageName, overLay, TimeComponent } from "../../ButtonAndOthers/SharedAssets";
import { SharedBlogPageStyleTwo } from "../../ButtonAndOthers/SharedBlogPageStyle_1st_Component";
import Aside from "../asidePage/Aside";
import { PagesBlogPostComponent } from "../IndexPageComponents/SharedComponents";



const Favorite = () => {

  return (
    <section className="text-left">

      <ul className="md:grid gap-x-2 grid-cols-3 mb-4 hidden ">
        {Posts.slice(8, 13).map((post) => {
          return (
            <li key={post.id} className={`[&:nth-child(2)]:row-span-3 first:mb-2 last:mt-2 relative ${overLay()}`}>
              <img src={post.image} alt="post" className="h-full w-full object-cover" loading="lazy"/>

              <div className="absolute bottom-[10%] inset-x-0 flex content-center justify-center z-20">
                <div className="w-[90%] text-left">
                  <span className="text-white">
                    <CategoriesComponent cat={post.cat} />
                  </span>
                  
                  <h4 className="capitalize tracking-wide font-lora text-base imgxs:text-xl md:text-lg lg:text-xl font-extrabold">
                    <span className="bg-white px-1 hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear">
                      <span className="" title='title'>{post.title}</span>
                    </span>
                  </h4>
                    <span className="inline-block bg-white px-2">
                      <TimeComponent time={post.date}/>
                    </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="md:hidden">
         <SharedBlogPageStyleTwo Posts={Posts.slice(8, 13)} />
      </div>

      <div className='grid grid-flow-row md:grid-cols-3'>
        <aside className="col-span-1 mt-8 md:mr-[3%] order-last md:order-first">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Aside />
          </StickyBox>
        </aside>
        <div className="col-span-2 md:ml-[3%]">
          <NavDirectionAndPageName page={"LifeStyle"} />
        
          <PagesBlogPostComponent Posts={Posts.slice(0, 10)} />
        </div>
      </div>
    </section>
  )
}

export default Favorite