import React from 'react'
import { CategoriesComponent, NavDirectionAndPageName, TimeComponent, overLay } from '../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { SharedBlogPageStyleTwo } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import Aside from '../asidePage/Aside'
import StickyBox from "react-sticky-box";
import { PagesBlogPostComponent } from '../IndexPageComponents/SharedComponents'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'

const FavoriteIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content

  return (
    <div>
       <ul className="md:grid gap-x-2 grid-cols-3 mb-4 hidden ">
        {action && Posts.slice(8, 13).map((post) => {
          return (
            <li key={post._id} className={`[&:nth-child(2)]:row-span-3 first:mb-2 last:mt-2 relative ${overLay()}`}>
              <img src={post.postImage} alt="post" className="h-full w-full object-cover" loading="lazy"/>

              <div className="absolute bottom-[10%] inset-x-0 flex content-center justify-center z-20">
                <div className="w-[90%] text-left">
                  <span className="text-white">
                    <CategoriesComponent cat={post.postCategory[0]} />
                  </span>
                  
                  <h4 className="capitalize tracking-wide font-lora text-base imgxs:text-xl md:text-lg lg:text-xl font-extrabold">
                    <span className="bg-white px-1 hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear">
                      <Link to={`/single/${post._id}`} title='title'>{post.postTitle}</Link>
                    </span>
                  </h4>
                    <span className="inline-block bg-white px-2">
                      <TimeComponent time={post.createdAt}/>
                    </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="md:hidden">
         {action && <SharedBlogPageStyleTwo Posts={Posts.slice(8, 13)} />}
      </div>

      <div className='grid grid-flow-row md:grid-cols-3'>
        <aside className="col-span-1 mt-8 md:mr-[3%] order-last md:order-first">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Aside />
          </StickyBox>
        </aside>
        <div className="col-span-2 md:ml-[3%]">
          <NavDirectionAndPageName page={"LifeStyle"} />
        
         {action && <PagesBlogPostComponent Posts={Posts.slice(0, 10)} />}
        </div>
      </div>
    </div>
  )
}

export default FavoriteIndexPage
