import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { JustTimeComponet, JustTimeComponetStar} from './SharedComponents'
import { StarComponent } from '../../ButtonAndOthers/Buttons'
import { publicFolder } from '../../../data'

const EntertainmentPosts = ({Posts}) => {
  const size = useWindowSize()

  return (
    <section className='pb-10'>

      {/* arrow navigate start here */}

      <div className='relative'>
        <hr />
        <span className='absolute left-[40%] imgxs:left-[42%] -top-[22px] flex gap-1 text-[#54595f] text-xs bg-white p-2'>

          <span className='py-2 px-2.5 border border-solid border-gray-300/50'>
            <FaChevronLeft />
          </span>

          <span className='py-2 px-2.5 border border-solid border-gray-300/50'>
           <FaChevronRight />
          </span>

        </span>
      </div>

      {/* Section title and nav categories start here */}

      <div className='pt-12'>
        <CatSidebarHanbugar 
        blackletters={"Entertainment"} 
        redletters={"News"} 
        initial={["All", "Gaming", "Movie", "Music", "Sports"]}
        />
      </div>

      {/* first component start here */}

      <ul className="md:grid md:grid-cols-2 pt-2">
        {Posts.slice(11, 13).map((post) => {
          return (
            <li key={post._id} className="md:first:mr-[3%] md:last:ml-[3%] first:mb-7 md:first:mb-0">
              <div className="relative mt-1.5 mb-4">
                <img src={publicFolder + post.postImage} alt={"game"} className="w-full h-44 imgxs:h-[240px] object-cover cursor-pointer md:h-36 lg:h-48 xl:h-[250px]" loading="lazy"/>
                <CategoriesComponentBotton cat={post.postCategory[0]} />
              </div>

              <PostTitleMedium post={post.postTitle} postId={post._id}/>

              <span className="inline-block mt-2 mb-4">
                <span className='mr-4 inline-block'>
                  <StarComponent color={"text-[#f7c90d]"} />  
                </span>
                <span className='mr-4 inline-block'>
                  <AdminComponentColor />
                </span>
                  <TimeComponentColor time={post.createdAt} />          
              </span>
              <PostsShortInfoComponent post={post.postContent} />  
            </li>
          )
        })}
      </ul>

      {/* Second component start here */}

      <ul className="min-w-[200px] md:grid md:grid-cols-2 mt-10 ">
        <li className='md:mr-[3%]'>
          <JustTimeComponetStar Posts={Posts.slice(10, 11)} />

          <JustTimeComponet Posts={Posts.slice(9, 10)} />
        </li>
       
        <li className='md:ml-[3%]'>
          <JustTimeComponet Posts={Posts.slice(8, 9)} />
          
          <JustTimeComponet Posts={Posts.slice(7, 8)} />
        </li>
      </ul>

        {/* Third component start here */}

      <ul className='mt-7'>
        {Posts.slice(4, 8).map((post) => {
          return (
          <li key={post._id} className="grid imgxs:grid-cols-5 grid-cols-3 mb-3.5">
            <div className="my-2 imgxs:col-span-2 col-span-1 mr-[3%]">
              <img src={publicFolder + post.postImage} alt={"game"} className="w-full imgxs:h-36 md:min-h-[140px] lg:min-h-[176px] xl:min-h-full object-cover cursor-pointer" loading="lazy"/>
            </div>

            <div className='pt-1 imgxs:col-span-3 col-span-2 md:max-w-md text-black ml-[3%]'>
             {size.width > 768 ? <PostTitleMedium2 post={post.postTitle}  postId={post._id}/> : <span className='pt-2 inline-block'> <PostTitleSmall post={post.postTitle}  postId={post._id}/> </span>}

              <span className="mt-2 mb-4 inline-block">
              <span className='mr-4'>
                    <AdminComponentColor />
                  </span>
                  <span className='mr-4'>
                    <TimeComponentColor time={post.createdAt}/>
                  </span>
                <CommentComponetColor />
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
