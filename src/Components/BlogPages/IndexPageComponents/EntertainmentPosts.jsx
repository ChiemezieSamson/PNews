import React from 'react'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from './SharedComponents'
import { StarComponent } from '../../ButtonAndOthers/Buttons'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'

const EntertainmentPosts = ({Posts, categories, users, Comments}) => {
  const size = useWindowSize()

  return (
    <section className='pb-10'>
      {/* Section title and nav categories start here */}                     

      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar initial={categories.business.category}
        blackletters={"Entertainment"} redletters={"News"}/>
   
     {/* === Posts image and title start here === */}

      {/* first component start here */}
      <ul className="md:grid md:grid-cols-2 pt-2">
        {Posts.slice(9, 11).map((post) => {
          return (
            <li key={post._id} className="first:md:mr-[2%] last:md:ml-[2%] first:mb-7 md:first:mb-0">

              <div className="relative mb-2 topRetangleImage">

                <Link to={`/single/${post._id}`}>
                  <img src={publicFolder + post.postImage} alt={"game"} 
                  className="topRetangleImage" loading="lazy"/>
                </Link>
                <CategoriesComponentBotton cat={post.postCategory[0]} />
              </div>

              <PostTitleMedium post={post.postTitle} postId={post._id}/>

              <span className="inline-block mt-2 mb-2">
                {post.optional.Trending === false ? "" : <span className='mr-4 inline-block'>
                  <StarComponent color={"text-[#f7c90d]"} favourite={post.optional.Trending}/>  
                </span>}
                <span className='mr-4 inline-block'>
                  <AdminComponentColor user={post.postAuthor} users={users}/>
                </span>
                  <TimeComponentColor time={post.createdAt} />          
              </span>
              <PostsShortInfoComponent post={post.postContent} />  
            </li>
          )
        })}
      </ul>

      {/* Second component start here */}

      <div className="my-7">
   
        <JustTimeComponetStar 
          Posts={Posts.slice(7, 11)}
          grid={"md:grid md:grid-cols-2 gap-x-[2%]"} />
 
      </div>

        {/* Third component start here */}

      <ul className='mt-4'>
        {Posts.slice(4, 8).map((post) => {
          return (
          <li key={post._id} className="grid imgxs:grid-cols-5 grid-cols-3 mb-3.5">
            <div className="imgxs:col-span-2 col-span-1 mr-[2%] max-h-24 imgxs:max-h-32 sm:max-h-40 lg:max-h-44">

              <Link to={`/single/${post._id}`}>
                <img src={publicFolder + post.postImage} alt={"game"} 
                className="max-h-24 imgxs:max-h-32 sm:max-h-40 lg:max-h-44" loading="lazy"/>
              </Link>
            </div>

            <div className='imgxs:col-span-3 col-span-2 md:max-w-md text-stone-800 ml-[2%]'>
             {size.width > 768 ? <PostTitleMedium2 post={post.postTitle}  postId={post._id}/> : <span className='inline-block'> <PostTitleSmall post={post.postTitle}  postId={post._id}/> </span>}

              <span className="mt-2 mb-4 inline-block">
                <span className='mr-4'>
                  <AdminComponentColor user={post.postAuthor} users={users}/>
                </span>
                <span className='mr-4'>
                  <TimeComponentColor time={post.createdAt}/>
                </span>
                  <CommentComponetColor Comments={Comments} postId={post._id}/>
              </span>

              {size.width > 519 && <PostsShortInfoComponent post={post.postContent} />}
            </div>          
          </li>
          )
        })}
      </ul>
      
    </section>
  )
}

export default EntertainmentPosts
