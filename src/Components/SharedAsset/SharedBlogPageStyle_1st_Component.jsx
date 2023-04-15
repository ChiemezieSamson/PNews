import React from 'react'
import Aside from '../BlogPages/asidePage/Aside'
import StickyBox from "react-sticky-box";
import { PagesBlogPostComponent } from '../BlogPages/IndexPageComponents/SharedComponents'
import { AdminComponent, CategoriesComponent, NavDirectionAndPageName, overLay, PostTitleLarge, TimeComponent, useWindowSize } from './SharedAssets'
import { Link } from 'react-router-dom';

export const SharedBlogPageStyleOne = ({Posts}) => {
  const size = useWindowSize()
  return (
    <section>
       <div className="md:grid grid-cols-2 gap-2">
        <div className={`relative my-2 md:my-0 snap-start ${overLay()} m-0 p-0 group overflow-clip`}>
          <img src={Posts[0].postImage} alt="Post" className="max-h-44 imgxs:max-h-[260px] sm:min-h-full w-full object-cover group-hover:scale-110
            transition-all duration-500 delay-200 ease-linear scale-100" loading="lazy"/>
            
          <div className="absolute bottom-[12%] inset-x-0 text-white flex content-center justify-center z-20 transition-all duration-500 delay-200 ease-linear translate-y-10
           group-hover:translate-y-0 ">             
            <div className="w-[90%] text-left">
              <CategoriesComponent cat={Posts[0].postCategory[0]}/>
              <PostTitleLarge post={Posts[0].postTitle} postId={Posts[0].id}/>
              {size.width >= 480 && <span className="mt-2 inline-block transition-all duration-500 delay-200 ease-linear translate-y-32 opacity-0 invisible cursor-pointer
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <span className='mr-4'>
                  <AdminComponent />
                </span>                  
                  <TimeComponent time={Posts[0].date} />
              </span>}
            </div>
          </div>
        </div>

        <div className="overflowScroll myimage:mt-0 lg:mt-0 overflow-x-auto scroll-px-4 overscroll-x-contain snap-mandatory lg:overflow-x-hidden">
        <ul className="w-[854px] md:w-full grid md:grid-cols-2 gap-x-2 grid-cols-3 md:gap-2">
        {Posts.slice(1,4).map((post) => {
          return (
            <li key={post.id} className={`relative snap-start ${overLay()} m-0 p-0 group overflow-clip h-32 imgxs:h-[180px] md:first:h-[180px] md:h-36 lg:first:h-52 lg:h-44
            md:first:col-span-2 first:max-h-64 xl:first:h-64 xl:h-52`}>
              <img src={post.postImage} alt="IndexImage"  className="w-full h-full object-cover group-hover:scale-110
                  transition-all duration-500 delay-200 ease-linear scale-100" loading="lazy"/>
              
              <div className="absolute bottom-[35%] imgxs:bottom-[20%] md:bottom-[25%] text-white inset-x-0 flex content-center justify-center z-20 transition-all duration-500 delay-200 ease-linear translate-y-10 
               group-hover:translate-y-0">
                <div className="w-[90%] text-left">
                  <CategoriesComponent cat={post.postCategory[0]}/>
                  <h3 className="capitalize tracking-wide w-full font-lora group-first:md:text-lg group-first:lg:text-xl md:text-base text-base imgxs:text-xl lg:text-lg font-bold cursor-pointer">
                    <Link to={`/single/${post.id}`} className='inline-block' title='title'>
                    {post.postTitle}
                    </Link>
                  </h3>
                  <span className="nline-block transition-all duration-500 delay-200 ease-linear translate-y-32 opacity-0 invisible cursor-pointer
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                   {size.width >= 1024 && <TimeComponent time={post.date} />}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
        </ul>
        </div>
      </div>
    </section>
  )
}


export const SharedBlogPageStyleTwo = ({Posts}) => {
  let Postarry = [Posts[0],Posts[2],Posts[3],Posts[4]]
  const size = useWindowSize()
  return (
    <section>
      <div className="md:grid grid-cols-2 gap-x-2">
        <div className={`relative my-2 md:my-0 snap-start ${overLay()} m-0 p-0 overflow-clip`}>
            <img src={Posts[1].postImage} alt="Post" className="max-h-44 imgxs:max-h-[260px] sm:min-h-full w-full object-cover" loading="lazy"/>

          <span className='absolute z-20 -top-2 left-3 text-white'>
          <CategoriesComponent  cat={Posts[1].postCategory[0]}/>
          </span>

          <div className="absolute bottom-[8%] inset-x-0 flex content-center justify-center z-20">             
            <div className="w-[90%] text-left">
              <h2 className="tracking-wide capitalize font-lora text-lg imgxs:text-xl md:text-lg lg:text-3xl font-bold">
                <Link to={`/single/${Posts[1].id}`} className='hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear bg-white' title='title'>
                  {Posts[1].postTitle}
                </Link>
              </h2>
                
              {size.width >= 480 && <span className="mt-2 inline-block px-1 bg-white">
                <span className='mr-4'>
                  <AdminComponent />
                </span>                  
                  <TimeComponent time={Posts[1].date}/>
              </span>}
            </div>
          </div>
        </div>

        <div className="overflowScroll myimage:mt-0 lg:mt-0 overflow-x-auto scroll-px-4 overscroll-x-contain snap-mandatory lg:overflow-x-hidden">
        <ul className="w-[1000px] md:w-full grid md:grid-cols-2  grid-flow-col gap-x-2">
        {Postarry.map((post) => {
          return (
            <li key={post.id} className={`relative snap-start ${overLay()} m-0 p-0 overflow-clip 
            md:first:row-span-3 md:[&:nth-child(2)]:mb-2  md:last:mt-2`}>
              <img src={post.postImage} alt="IndexImage"  className="w-full h-32 imgxs:h-[180px] md:h-full object-cover" loading="lazy"/>

              <span className='absolute z-20 -top-2 left-3 text-white'>
                <CategoriesComponent  cat={post.postCategory[0]}/>
              </span>
              
              <div className="absolute -bottom-4 inset-x-0 flex content-center justify-center z-20">
                <div className="w-[90%] text-left">
                  <h3 className="capitalize tracking-wide w-full font-lora group-first:md:text-lg group-first:lg:text-xl md:text-base text-base imgxs:text-xl lg:text-lg font-bold">
                    <Link to={`/single/${post.id}`} className='bg-white hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear' title='title'>
                      {post.postTitle}
                    </Link>
                  </h3>
                  <span className="inline-block bg-white px-2">
                    {size.width >= 1024 && <TimeComponent time={post.date} />}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
        </ul>
        </div>
      </div>
    </section>
  )
}


export const GeneralCategorisePages = ({ThreeFirstPost, DriectionName, PagePost}) => {
  return (
    <section className="text-left">

      <SharedBlogPageStyleOne Posts={ThreeFirstPost} />
      
      <div className='md:grid md:grid-cols-3'>
        <div className="col-span-2 md:mr-[3%]">
          <NavDirectionAndPageName page={DriectionName} />
        
          <PagesBlogPostComponent Posts={PagePost} />
        </div>
        <aside className="col-span-1 mt-8 md:ml-[3%]">
          <StickyBox
            offsetTop={0} offsetBottom={0}>
            <Aside />
          </StickyBox>
        </aside>
      </div>
      
    </section>
  )
}