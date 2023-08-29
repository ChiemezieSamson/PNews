import React from 'react'
import { ReadmoreButton, StarComponent } from '../../ButtonAndOthers/Buttons'
import { AdminComponentColor, CategoriesComponentBotton, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import PaginationFunctions from '../PaginationComponents/PaginationControl/PaginationFunctions/PaginationFunctions'
import { SearchPostSpinner, SmallPostImageLeftTitleDateRightSpinner } from '../../SharedAsset/Spinners/Spinner'


export const JustTimeComponet = ({Posts, Comments, action}) => {
  
  return (    

    <>
      {action ?
        <ul className="min-w-[200px]">
            {/* featured posts other post start here */}
          {Posts?.map((post) => {

            return (
              <li key={post?._id} className="grid grid-cols-4 sm:grid-cols-5 mb-2">

                <div className="col-span-1 max-h-16 sm:max-h-24 sm:col-span-2 mb-1 mr-1">
                  <Link to={`/single/${post?._id}`}>
                    <img src={publicFolder + post?.postImage} alt={"posts"} className="max-h-16 sm:max-h-24" loading="lazy"/>
                  </Link>
                </div>

                <div className="col-span-3 ml-1 pt-px">
                  <PostTitleSmall post={post?.postTitle} postId={post?._id}/>

                  <span className='inline-block'>
                    <span className='mr-4'>
                      <CommentComponetColor postId={post?._id} Comments={Comments}/>
                    </span>
                      <TimeComponentColor time={post?.createdAt}/>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
        :
        <SmallPostImageLeftTitleDateRightSpinner
          groupStyle={`min-w-[200px]`}
          listStyle={"grid grid-cols-4 sm:grid-cols-5 mb-2"}
          imageStyle={"col-span-1 max-h-16 sm:max-h-24 sm:col-span-2 mb-1 mr-1"}
          textStyle={"col-span-3 ml-1 pt-px"}
        />
      }
    </>
  )
}


export const JustTimeComponetStar = ({Posts, grid, action}) => {

  return (    
    <>
      {action ?
        <ul className={`min-w-[200px] ${grid ? grid: ""}`}>

          {/* featured posts other post start here */}
          {Posts?.map((post) => {

            return (
              <li key={post?._id} className="grid grid-cols-4 sm:grid-cols-5 mb-2">

                <div className="col-span-1 max-h-16 sm:max-h-24 sm:col-span-2 mb-1 mr-1">
                  <Link to={`/single/${post?._id}`}>
                    <img src={publicFolder + post?.postImage} alt={"posts"} 
                      className="max-h-16 sm:max-h-24" 
                      loading="lazy"/>
                  </Link>
                </div>

                <div className="col-span-3 ml-1 pt-px">
                  <PostTitleSmall post={post?.postTitle} postId={post?._id}/>

                  <span className='inline-block'>
                  {post?.optional?.favourite === false ? "" : <span className='mr-4'>
                      <StarComponent color={"text-[#f7c90d]"} favourite={post?.optional?.favourite}/>
                    </span>}
                      <TimeComponentColor time={post?.createdAt}/>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
        :
        <SmallPostImageLeftTitleDateRightSpinner
          groupStyle={`w-full`}
          listStyle={"grid grid-cols-4 sm:grid-cols-5 mb-2"}
          imageStyle={"col-span-1 max-h-16 sm:max-h-24 sm:col-span-2 mb-1 mr-1"}
          textStyle={"col-span-3 ml-1 pt-px"}
        />
      }
    </>
  )
}

export const JustTimeComponetCatBlockStar = ({Posts, grid}) => {
  const size = useWindowSize()

  return (
    <ul className={`min-w-[200px] ${grid ? grid: ""}`}>
        {/* featured posts other post start here */}
      {Posts?.map((post) => {

        return (
          <li key={post?._id} className="mb-5">

            <div className="mb-1 relative topRetangleImage">

              <Link to={`/single/${post?._id}`}>
                <img src={publicFolder + post?.postImage} alt={"posts"} className="topRetangleImage" loading="lazy"/>
              </Link>

              <CategoriesComponentBotton cat={post?.postCategory[0]} />
            </div>

            <div className="pt-2">
              {size.width < 768 && size.width > 480 ? <PostTitleSmall post={post?.postTitle} postId={post?._id}/> : <PostTitleMedium post={post?.postTitle} postId={post?._id}/> }

              <span className='mt-1'>
                {post?.optional?.favourite === false ? "" : <span className='mr-4 inline-block'>
                  <StarComponent color={"text-[#f7c90d]"} favourite={post?.optional?.favourite}/>
                </span>}
                  <TimeComponentColor time={post?.createdAt} />
              </span>              
            </div>
          </li>
        )
     })}
   </ul>
  )
}

export const PagesBlogPostComponent = ({Posts, users, Comments, currentPage, totalPages, canOpen}) => {
  const size = useWindowSize()

  return (
    <div>
      {canOpen ?
        <ul className='mt-5 text-left'>

          {Posts?.map((post) => {

            return (
              <li key={post?._id} className="grid grid-cols-5 md:grid-cols-2 mt-3 first:mt-0 last:pb-0 pb-3">

                <div className="mr-[2%] col-span-2 md:col-span-1 max-h-36 sm:max-h-48 lg:max-h-60">
                  <Link to={`/single/${post?._id}`}>
                    <img src={publicFolder + post?.postImage} alt={"game"} className="max-h-36 sm:max-h-48 lg:max-h-60" loading="lazy"/>
                  </Link>
                </div>

                <div className='ml-[2%] col-span-3 md:col-span-1'>
                  <PostTitleMedium2 post={post?.postTitle} postId={post?._id}/>

                  <span className="mb-2 inline-block">
                    {post?.optional?.favourite === false ? "" : 
                      <span className='mr-4 inline-block'>
                        <StarComponent color={"text-[#f7c90d]"} favourite={post?.optional?.favourite}/>  
                      </span>
                    }
                    <span className='mr-4'>
                      <AdminComponentColor user={post?.postAuthor} users={users}/>
                    </span>
                    <span className='mr-4'>
                      <TimeComponentColor time={post?.createdAt}/>
                    </span>
                      <CommentComponetColor Comments={Comments} postId={post?._id}/>
                  </span>

                  {size.width > 519 && 
                  <>
                    <PostsShortInfoComponent post={post?.postContent} />

                    <ReadmoreButton postId={post?._id}/>
                  </>}
                </div>          
              </li>
            )
          })}
        </ul>
        :
        <SearchPostSpinner
          groupStyle={"grid grid-cols-5 md:grid-cols-2 mt-3 first:mt-0 last:pb-0 pb-3"}
          imageStyle={"mr-[2%] col-span-2 md:col-span-1 max-h-36 sm:max-h-48 lg:max-h-60"}
          textStyle={"ml-[2%] col-span-3 md:col-span-1 pt-4"}
        />
        }

      <div className='grid grid-flow-col justify-center w-full mt-8'>      
        <PaginationFunctions 
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}



