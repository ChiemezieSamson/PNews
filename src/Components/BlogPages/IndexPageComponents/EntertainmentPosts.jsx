import React from 'react'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, isFecthingStyle, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from './SharedComponents'
import { StarComponent } from '../../ButtonAndOthers/Buttons'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import useParentcategories from './useParentcategories/UseParentcategories'
import { HomeFeaturedArroundSpinner, SearchPostSpinner } from '../../SharedAsset/Spinners/Spinner'

const EntertainmentPosts = ({Posts, categories, users, Comments, canOpen, isFetching}) => {
  const size = useWindowSize()
  const parent = "business"
  
  const {allPost} = useParentcategories(parent, categories, Posts, canOpen)

  return (
    <section className={`pb-10 ${isFecthingStyle(isFetching)}`}>                     

      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar 
        initial={categories} 
        canOpen={canOpen}
        parent={parent}
        blackletters={"Entertainment"} 
        redletters={"News"}
      />
   
     {/* === Posts image and title start here === */}

      {/* first component start here */}
      {canOpen ?
        <ul className="md:grid md:grid-cols-2 pt-2">

          {allPost?.slice(0, 2)?.map((post) => {

            return (
              <li key={post?._id} className="first:md:mr-[2%] last:md:ml-[2%] first:mb-7 md:first:mb-0">

                <div className="relative mb-2 topRetangleImage">

                  <Link to={`/single/${post?._id}`}>
                    <img src={publicFolder + post?.postImage} alt={"game"} className="topRetangleImage" loading="lazy"/>
                  </Link>

                  <CategoriesComponentBotton cat={post?.postCategory[0]} />
                </div>

                <PostTitleMedium post={post?.postTitle} postId={post?._id}/>

                <span className="inline-block mt-2 mb-2">

                  {post?.optional?.favourite === false ? "" : 
                    <span className='mr-4 inline-block'>
                      <StarComponent color={"text-[#f7c90d]"} favourite={post?.optional?.favourite}/>  
                    </span>
                  }

                  <span className='mr-4 inline-block'>
                    <AdminComponentColor user={post?.postAuthor} users={users}/>
                  </span>

                  <TimeComponentColor time={post?.createdAt} />          
                </span>

                <PostsShortInfoComponent post={post?.postContent} />  
              </li>
            )
          })}
        </ul>
        :
        <HomeFeaturedArroundSpinner
          groupStyle={"md:grid md:grid-cols-2 pt-2"}
          listgroupStyle={"first:md:mr-[2%] last:md:ml-[2%] first:mb-7 md:first:mb-0"}
          imageStyle={"mb-2 topRetangleImage"}
          num={2}
          buttonStyle={"hidden"}
        />
      }

      {/* Second component start here */}
      <div className="my-7">
   
        <JustTimeComponetStar 
          Posts={canOpen && allPost?.slice(3, 7)}
          grid={"md:grid md:grid-cols-2 gap-x-[2%]"}
          action={canOpen} 
        />
 
      </div>

      {/* Third component start here */}
      {canOpen ? 
        <ul className='mt-4'>
          
          {allPost?.slice(7, 11)?.map((post) => {

            return (

              <li key={post?._id} className="grid imgxs:grid-cols-5 grid-cols-3 mb-3.5">

                <div className="imgxs:col-span-2 col-span-1 mr-[2%] max-h-24 imgxs:max-h-32 sm:max-h-40 lg:max-h-44">

                  <Link to={`/single/${post?._id}`}>
                    <img src={publicFolder + post?.postImage} alt={"game"} className="max-h-24 imgxs:max-h-32 sm:max-h-40 lg:max-h-44" loading="lazy"/>
                  </Link>

                </div>

                <div className='imgxs:col-span-3 col-span-2 md:max-w-md text-stone-800 ml-[2%]'>

                {size.width > 768 ? 

                  <PostTitleMedium2 post={post?.postTitle}  postId={post?._id}/> 
                  : 
                  <span className='inline-block'> <PostTitleSmall post={post?.postTitle}  postId={post?._id}/> </span>
                }

                  <span className="mt-2 mb-4 inline-block">

                    <span className='mr-4'>
                      <AdminComponentColor user={post?.postAuthor} users={users}/>
                    </span>

                    <span className='mr-4'>
                      <TimeComponentColor time={post?.createdAt}/>
                    </span>

                    <CommentComponetColor Comments={Comments} postId={post._id}/>
                  </span>

                  {size.width > 519 && <PostsShortInfoComponent post={post.postContent} />}
                </div>          
              </li>
            )
          })}
        </ul>
        :
         <SearchPostSpinner
          groupStyle={"mt-4"}
          listgroupStyle={"grid imgxs:grid-cols-5 grid-cols-3 mb-3.5"}
          imageStyle={"imgxs:col-span-2 col-span-1 mr-[2%] max-h-24 imgxs:max-h-32 sm:max-h-40 lg:max-h-44"}
          textStyle={"imgxs:col-span-3 col-span-2 md:max-w-md text-stone-800 ml-[2%]"}
          numb={5}
        />
      }      
    </section>
  )
}

export default EntertainmentPosts
