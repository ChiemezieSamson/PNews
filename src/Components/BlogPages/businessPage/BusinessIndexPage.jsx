import React from "react";
import StickyBox from "react-sticky-box";
import { AdminComponent, CategoriesComponent, NavDirectionAndPageName, overLay, TimeComponent, useWindowSize } from "../../SharedAsset/SharedAssets";
import Aside from "../asidePage/Aside";
import { PagesBlogPostComponent } from "../IndexPageComponents/SharedComponents";
import { Link } from "react-router-dom";
import { useFetchedPosts } from "../../SharedAsset/Spinners/postsSpinner";
import { publicFolder } from "../../../data";

const BusinessIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content
  const size = useWindowSize()


  return (
    <div>

      <div className="md:grid grid-cols-2 gap-x-2">
        <div className={`relative my-2 md:my-0 snap-start ${overLay()} m-0 p-0 overflow-clip`}>
            {action ? 
            <img src={publicFolder + Posts[1].postImage} alt="Post" className="max-h-44 imgxs:max-h-[260px] sm:min-h-full w-full object-cover" loading="lazy"/> :
            content}
              
          <span className='absolute z-20 -top-2 left-5 text-white'>
          {action && <CategoriesComponent  cat={Posts[1].postCategory[0]}/>}
          </span>

          <div className="absolute bottom-[8%] inset-x-0 flex content-center justify-center z-20 text-white">             
            <div className="w-[90%] text-left">
              <h2 className="tracking-wide capitalize font-lora text-lg imgxs:text-xl md:text-lg lg:text-3xl font-bold">
                {action && 
                <Link to={`/single/${Posts[1]._id}`} className='cursor-pointer transition-all duration-200 ease-linear' title='title'>
                  {Posts[1].postTitle}
                </Link>}
              </h2>
                
              {size.width >= 480 && <span className="mt-2 inline-block px-1">
                <span className='mr-4'>
                  <AdminComponent />
                </span>                  
                  {action && <TimeComponent time={Posts[1].createdAt}/>}
              </span>}
            </div>
          </div>
        </div>

        <div className="overflowScroll myimage:mt-0 lg:mt-0 overflow-x-auto scroll-px-4 overscroll-x-contain snap-mandatory lg:overflow-x-hidden">
        <ul className="w-[800px] md:w-full grid md:grid-cols-2  grid-flow-col gap-x-2">
        {action && Posts.slice(2, 5).map((post) => {
          return (
            <li key={post._id} className={`relative snap-start ${overLay()} m-0 p-0 overflow-clip 
            md:first:row-span-3 md:[&:nth-child(2)]:mb-1 md:last:mt-1`}>
              <img src={publicFolder + post.postImage} alt="IndexImage"  className="w-full h-32 imgxs:h-[180px] md:h-full object-cover" loading="lazy"/>

              <span className='absolute z-20 -top-2 left-3 text-white'>
                <CategoriesComponent  cat={post.postCategory[0]}/>
              </span>
              
              <div className="absolute -bottom-4 lg:bottom-1 inset-x-0 flex content-center justify-center z-20 text-white">
                <div className="w-[90%] text-left">
                <h3 className="capitalize tracking-wide w-full font-lora group-first:md:text-lg group-first:lg:text-xl md:text-base text-base imgxs:text-xl lg:text-lg font-bold">
                  <Link to={`/single/${post._id}`} className='cursor-pointer' title='title'>
                    {post.postTitle}
                  </Link>
                </h3>
                    <span className="inline-block text-white">
                    {size.width >= 1024 && <TimeComponent time={post.createdAt} />}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
        </ul>
        </div>
      </div>


      <div className='grid grid-flow-row md:grid-cols-3'>
        <aside className="col-span-1 mt-8 md:mr-[3%] order-last md:order-first">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Aside />
          </StickyBox>
        </aside>
        <div className="col-span-2 md:ml-[3%]">
          <NavDirectionAndPageName page={"LifeStyle"} />
        
          {action && <PagesBlogPostComponent Posts={Posts.slice(3, 13)} />}
        </div>
      </div>
    </div>
  )
}

export default BusinessIndexPage