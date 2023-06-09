import React from 'react'
import Aside from '../BlogPages/asidePage/Aside'
import StickyBox from "react-sticky-box";
import { PagesBlogPostComponent } from '../BlogPages/IndexPageComponents/SharedComponents'
import { AdminComponent, CategoriesComponent, HomeLink, NavDirectionAndPageName, overLay, PostTitleLarge, TimeComponent, useWindowSize } from './SharedAssets'
import { Link } from 'react-router-dom';
import { publicFolder } from '../../data';

export const SharedBlogPageStyleOne = ({Posts, users}) => {
  const size = useWindowSize()

  return (
    <>
    {Posts.length > 0 ?
      <div className="md:grid md:grid-cols-7">

        
         <div className={`HeroImageOneOverFlow group HeroImageOne md:col-span-4`}>

          <Link to={`/single/${Posts[0]?._id}`} className={overLay()}>
            <img src={publicFolder + Posts[0]?.postImage || null} alt="Post" 
            className="Imagetransition HeroImageOne" loading="lazy"/>
          </Link>            
                    
          <span className="bottom-[14%] md:bottom-[14%] lg:bottom-[8%] ImageTextTranslateY">   
            <CategoriesComponent cat={Posts[0]?.postCategory[0]}/>

            <PostTitleLarge post={Posts[0]?.postTitle} postId={Posts[0]?._id}/>

            {size.width >= 480 && <span className="Imagetransition ImageTextTranslateYInvisible">
              <span className='mr-4'>
                <AdminComponent user={Posts[0]?.postAuthor} users={users}/>
              </span>                  
                <TimeComponent time={Posts[0]?.createdAt} />
            </span>}
          </span>
        </div> 

        <div className="overflowScroll md:col-span-3 HeroImageThreeMultipleOverFlow">
          <ul className="w-[900px] md:w-full grid md:grid-rows-2 grid-cols-3 md:grid-cols-2 md:gap-1 HeroImageMultiple">
            {Posts.slice(1,4).map((post) => {
              return (
                <li key={post._id} className="HeroImageMultipleListOverFlow group md:first:col-span-2 md:last:col-span-1 HeroImageMultipleList">

                  <Link to={`/single/${post._id}`} className={overLay()}>
                    <img src={publicFolder + post.postImage} alt="IndexImage"  
                      className="Imagetransition HeroImageMultipleList" 
                      loading="lazy"/>
                  </Link>                  
                 
                  <span className="ImageTextTranslateY bottom-[35%] md:bottom-[14%] lg:bottom-[10%]">
                    <CategoriesComponent cat={post.postCategory[0]}/>

                    <h3 className="HeroImageMultipleListH3 group-first:md:text-lg group-first:lg:text-xl">
                      <Link to={`/single/${post._id}`} className='inline-block' title='title'>
                      {post.postTitle}
                      </Link>
                    </h3>

                    {size.width >= 1024 && 
                    <span className="Imagetransition ImageTextTranslateYInvisible">
                      <TimeComponent time={post.createdAt} />
                    </span>}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      : 
      <div className='max-w-[60%] mx-auto my-10 text-center'> 
        <div className='font-lora text-xl font-medium'>
          No Posts yet
        </div>

        <HomeLink />       
      </div>
      }
    </>
  )
}


export const GeneralCategorisePages = ({ThreeFirstPost, Comments, PagePost, users}) => {
  return (
    <section className="text-left">

      <SharedBlogPageStyleOne 
        users={users} 
        Posts={ThreeFirstPost}/>
      
      <div className='md:grid md:grid-cols-3'>
        <div className="md:col-span-2 md:mr-[3%]">
          <NavDirectionAndPageName/>
        
          <PagesBlogPostComponent 
            users={users}
            Comments={Comments}
            Posts={PagePost} />
        </div>
        <aside className="md:col-span-1 mt-8 md:ml-[3%]">
          <StickyBox
            offsetTop={0} offsetBottom={0}>
            <Aside Comments={Comments}/>
          </StickyBox>
        </aside>
      </div>
      
    </section>
  )
}