import React from 'react'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, isFecthingStyle, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { ReadmoreButton } from '../../ButtonAndOthers/Buttons';
import { publicFolder } from '../../../data';
import { Link } from 'react-router-dom';
import useParentcategories from './useParentcategories/UseParentcategories';
import { HomeFeaturedArroundSpinner } from '../../SharedAsset/Spinners/Spinner';

const ArroundTheWorldPosts = ({Posts, categories, users, Comments, canOpen, isFetching}) => {
  const size = useWindowSize()
  const parent = "lifestyle"
  
  const {allPost} = useParentcategories(parent, categories, Posts, canOpen, isFetching)

  return (
    <section className="mt-7">
      <hr />
      
      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar  
        initial={categories} 
        canOpen={canOpen}
        parent={parent}
        blackletters={"Arround the"} 
        redletters={"world"}
        isFetching={isFetching} 
      />

      {/* === Posts image and title start here === */}
      <div className={`md:grid md:grid-cols-2 pb-7 pt-2 ${isFecthingStyle(isFetching)}`}>

        {canOpen ?

          <div className='mt-0.5 text-black md:mr-[2%]'>
            {allPost[0] && 
              <>
                <div className="relative mb-2 max-h-44 imgxs:max-h-52 sm:max-h-60 md:min-h-[420px] lg:min-h-[500px] xl:min-h-[600px]">

                  <Link to={`/single/${allPost[0]?._id}`}>
                    <img src={publicFolder + allPost[0]?.postImage} alt="game" className="max-h-44 imgxs:max-h-52 sm:max-h-60 md:min-h-[420px] lg:min-h-[500px] xl:min-h-[600px]" loading="lazy"/>
                  </Link>

                    <CategoriesComponentBotton cat={allPost[0]?.postCategory[0]} />
                </div>

                <PostTitleMedium2 post={allPost[0]?.postTitle} postId={allPost[0]?._id}/>

                <span className="mt-2 mb-2 inline-block">

                  <span className='mr-4 inline-block'>
                    <AdminComponentColor user={allPost[0]?.postAuthor} users={users}/>
                  </span>
                  
                  <TimeComponentColor time={allPost[0]?.createdAt}/>
                </span>

                {size.width > 519 && 
                  <>
                    <PostsShortInfoComponent post={allPost[0]?.postContent}/>
                    <ReadmoreButton postId={allPost[0]?._id}/>
                  </>
                }
              </>
            }
          </div>
        :
          <HomeFeaturedArroundSpinner
            groupStyle={"mt-0.5 md:mr-[2%]"}
            imageStyle={"mb-2 max-h-44 imgxs:max-h-52 sm:max-h-60 md:min-h-[420px] lg:min-h-[500px] xl:min-h-[600px]"}
            num={1}
          />
        }

        {canOpen ? 

          <ul className='mt-0.5 p-0 md:ml-[2%]'>

            {allPost?.slice(2, 4)?.map((post) => {

              return (
                <li key={post?._id} className="mb-1.5 last:mb-0">
                  
                  <div className="relative mb-2 topRetangleImage">

                    <Link to={`/single/${post?._id}`}>
                      <img src={publicFolder + post?.postImage} alt={"game"} className="topRetangleImage" loading="lazy"/>
                    </Link>
                    
                      <CategoriesComponentBotton cat={post?.postCategory[0]}/>
                  </div>

                  <PostTitleMedium post={post?.postTitle} postId={post?._id}/>

                  <span className="mt-2 mb-2 inline-block">

                    <span className='mr-4'>
                      <AdminComponentColor user={post?.postAuthor} users={users}/>
                    </span>

                    <span className='mr-4'>
                      <TimeComponentColor time={post?.createdAt}/>
                    </span>

                      <CommentComponetColor postId={post?._id} Comments={Comments}/>
                  </span>

                  {size.width > 519 && 
                    <>
                      <PostsShortInfoComponent post={post?.postContent}/>
                      <ReadmoreButton postId={post?._id}/>
                    </>
                  }
                </li>
              )
            })}
          </ul>
        :
          <HomeFeaturedArroundSpinner
            groupStyle={"mt-0.5 p-0 md:ml-[2%]"}
            listgroupStyle={"mb-1.5 last:mb-0"}
            imageStyle={"topRetangleImage"}
            num={2}
          />
        }
      </div>    
    </section>
  )
}

export default ArroundTheWorldPosts
