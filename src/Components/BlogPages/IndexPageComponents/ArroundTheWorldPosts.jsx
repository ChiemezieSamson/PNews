import React from 'react'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { ReadmoreButton } from '../../ButtonAndOthers/Buttons';
import { publicFolder } from '../../../data';
import { Link } from 'react-router-dom';

const ArroundTheWorldPosts = ({Posts, categories, users, Comments}) => {
  const size = useWindowSize()
 
  return (
    <section className="mt-7">
      <hr />
      
      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar  initial={categories} parent={"lifestyle"}
        blackletters={"Arround the"} redletters={"world"} 
      />

       {/* === Posts image and title start here === */}
      <div className='md:grid md:grid-cols-2 pb-7 pt-2'>
        <div className='mt-0.5 text-black md:mr-[2%]'>
          <div className="relative mb-2 max-h-44 imgxs:max-h-52 sm:max-h-60 md:min-h-[420px] lg:min-h-[500px] xl:min-h-[600px]">

            <Link to={`/single/${Posts[11]._id}`}>
              <img src={publicFolder + Posts[11].postImage} alt="game" 
                className="max-h-44 imgxs:max-h-52 sm:max-h-60 md:min-h-[420px] lg:min-h-[500px] xl:min-h-[600px]" loading="lazy"/>
            </Link>
              <CategoriesComponentBotton cat={Posts[11].postCategory[0]} />
          </div>

          <PostTitleMedium2 post={Posts[11].postTitle} postId={Posts[11]._id}/>

          <span className="mt-2 mb-2 inline-block">
            <span className='mr-4 inline-block'>
              <AdminComponentColor user={Posts[11].postAuthor} users={users}/>
            </span>
            
            <TimeComponentColor time={Posts[11].createdAt}/>
          </span>

          {size.width > 519 && 
          <>
            <PostsShortInfoComponent post={Posts[11].postContent}/>
            <ReadmoreButton postId={Posts[11]._id}/>
          </>}
        </div>

        <ul className='mt-0.5 p-0 md:ml-[2%]'>
          {Posts.slice(0, 2).map((post) => {
            return (
              <li key={post._id} className="mb-1.5 last:mb-0">
                <div className="relative mb-2 topRetangleImage">

                  <Link to={`/single/${post._id}`}>
                    <img src={publicFolder + post.postImage} alt={"game"} 
                      className="topRetangleImage" loading="lazy"/>
                  </Link>
                  
                    <CategoriesComponentBotton cat={post.postCategory[0]}/>
                </div>

                <PostTitleMedium post={post.postTitle} postId={post._id}/>

                <span className="mt-2 mb-2 inline-block">
                  <span className='mr-4'>
                    <AdminComponentColor user={post.postAuthor} users={users}/>
                  </span>
                  <span className='mr-4'>
                    <TimeComponentColor time={post.createdAt}/>
                  </span>
                    <CommentComponetColor postId={post._id} Comments={Comments}/>
                </span>

                {size.width > 519 && 
                <>
                  <PostsShortInfoComponent post={post.postContent}/>
                  <ReadmoreButton postId={post._id}/>
                </>}
              </li>
            )
          })}
        </ul>
      </div>    
    </section>
  )
}

export default ArroundTheWorldPosts
