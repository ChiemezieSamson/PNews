import React from 'react'
import { CategoriesComponent, NavDirectionAndPageName, TimeComponent, overLay } from '../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { SharedBlogPageStyleOne } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import Aside from '../asidePage/Aside'
import StickyBox from "react-sticky-box";
import { PagesBlogPostComponent } from '../IndexPageComponents/SharedComponents'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'
import { publicFolder } from '../../../data'
import useFetchedUsers from '../../SharedAsset/Spinners/userSpinner'
import useFetchedComments from '../../SharedAsset/Spinners/commentSpinner'

const FavoriteIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent


  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <>
      {canOpen && 
        <div>
          <ul className="hidden md:grid md:gap-1 md:grid-rows-6 md:grid-cols-7 mb-4 md:max-h-[450px] lg:max-h-[500px]">

            {Posts.slice(8, 13).map((post) => {
              return (
                <li key={post._id} className="md:first:col-start-3 md:first:col-end-6 md:first:row-start-1 md:first:row-end-7 
                    md:[&:nth-child(2)]:col-start-1 md:[&:nth-child(2)]:col-end-3 md:[&:nth-child(2)]:row-start-1 md:[&:nth-child(2)]:row-end-4  
                    md:[&:nth-child(3)]:col-start-6 md:[&:nth-child(3)]:col-end-8 md:[&:nth-child(3)]:row-start-1 md:[&:nth-child(3)]:row-end-4  
                    md:[&:nth-child(4)]:col-start-1 md:[&:nth-child(4)]:col-end-3 md:[&:nth-child(4)]:row-start-4 md:[&:nth-child(4)]:row-end-7  
                    md:last:col-start-6 md:last:col-end-8 md:last:row-start-4 md:last:row-end-7 relative group">

                  <Link to={`/single/${post._id}`}  className={overLay()}>
                    <img src={publicFolder + post.postImage} alt="post"  loading="lazy"/>
                  </Link>

                  <span className="text-white absolute -bottom-[3px] right-0 z-30 max-w-fit inset-x-auto">
                    <CategoriesComponent cat={post.postCategory[0]} />
                  </span>                    

                  <Link to={`/single/${post._id}`} className="absolute bottom-[10%] max-w-fit inset-x-auto z-30 mx-1">

                      <h4 className="group-first:text-lg group-first:lg:text-2xl HeroImageMultipleListH3" title='title'>
                        <span className="bg-white px-1 hover:text-[#f70d28] TextHeadertransition">
                          {post.postTitle}
                        </span>
                      </h4>

                      <span className="inline-block bg-white px-2">
                        <TimeComponent time={post.createdAt}/>
                      </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="md:hidden">
            <SharedBlogPageStyleOne 
              Posts={Posts.slice(8, 12)} 
              users={users}/>
          </div>

          <div className='grid grid-flow-row md:grid-cols-3'>

            <aside className="md:col-span-1 mt-8 md:mr-[3%] order-last md:order-first">
              <StickyBox offsetTop={0} offsetBottom={0}>
                <Aside Comments={Comments}/>
              </StickyBox>
            </aside>

            <div className="md:col-span-2 md:ml-[3%]">
              <NavDirectionAndPageName />
            
              <PagesBlogPostComponent 
                users={users}
                Comments={Comments}
                Posts={Posts.slice(0, 10)}/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default FavoriteIndexPage
