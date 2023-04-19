import React from 'react'
import { CategoriesComponentBotton, PagesDivider, PostTitleMedium, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../../SharedAsset/SharedAssets'
import { SocialMediaIcons } from '../../../../data'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPosts } from '../../../../Reduxstore/Slices/posts/PostsSlice'


const PreviousNextPost = ({postId}) => {
  const Posts = useSelector(selectAllPosts)
  const size = useWindowSize()

  const Id = parseInt(postId)
  const start = Id + 6 > Posts.length ? 0 : Id 
  const end = Id + 6 > Posts.length ? 6 : Id + 6
  return (
    <>
      <div className='border-y border-solid border-[#eee] mb-[30px] py-5 mt-3 text-center sm:text-left grid grid-cols-2'>
            <Link to={`/single/${Id - 1 < 1 ? Posts.length : Id - 1}`} className='group'>
              <span className='text-[#a0a0a0] font-bold'>
                Previous Post
              </span>
              <h3 className='border-l-[10px] border-solid border-[#eee] mt-2.5 mb-2.5 pl-3 text-[#212121]
              font-bold transition-all duration-200 ease-linear group-hover:border-[#f70d28] cursor-pointer
              hidden sm:block'>               
               {Posts[Id - 1 < 0 ? Posts.length : Id - 1].postTitle }             
              </h3>
            </Link>

            <Link to={`/single/${Id + 1 > Posts.length ? 1 : Id + 1}`} className='group'>
              <span className='text-[#a0a0a0] font-bold'>
                Next Post
              </span>
              <h3 className='border-l-[10px] border-solid border-[#eee] mt-2.5 mb-2.5 pl-3 text-[#212121]
              font-bold transition-all duration-200 ease-linear group-hover:border-[#f70d28] cursor-pointer
              hidden sm:block'>          
                {Posts[Id + 1 > Posts.length -1 ? 0 : Id + 1].postTitle}                
              </h3>
            </Link>
          </div>

          <section className='lg:grid-cols-6 lg:grid p-7 mb-7 border border-solid border-[#eee] text-center sm:text-left'>
            <span className='w-[80px] h-20 inline-block rounded-full align-bottom mr-2 col-span-1'>
              <img loading='lazy' src={Posts[10].postImage} alt="AdminImage" className='h-full w-full object-cover rounded-full cursor-pointer'/>
            </span>
            <div className='col-span-5'>
              <h3 className='mb-2.5 text-lg font-bold'>
                <span className='text-[#f70d28] cursor-pointer'>John Doe</span>
              </h3>
              <p className='text-[#a0a0a0] text-[15px] leading-5'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam ex consequuntur quod molestias nulla repellendus.
              </p>

              <ul className='m-0 pt-4'>
                {
                  SocialMediaIcons.map((icon) => {
                    return (
                      <li key={icon.id} className="inline-block mr-2.5 mt-2.5 mb-5 text-[#999] text-base transition-all duration-200 ease-linear cursor-pointer hover:text-[#212121]">{icon.icon}</li>
                    )
                  })
                }
              </ul>
            </div>
          </section>
       
        <div className= "mb-5">
          <PagesDivider text={"Similar News"} />
        </div>

        <ul className="mb-2 pt-1.5 min-w-[200px] md:grid md:grid-cols-3">
        {/* featured posts other post start here */}
        {Posts.slice(start , end).map((post) => {
          return (
            <li key={post.id} className="md:mr-[6%] mb-7 last:mb-0 md:mb-0">

              <div className="basis-1/6 md:basis-1/3 mb-1 min-w-[90px] relative">
                <img src={post.postImage} alt={"posts"} className="w-full h-44 imgxs:h-[240px] md:h-36 lg:h-44 object-cover cursor-pointer" loading="lazy"/>
                <CategoriesComponentBotton cat={post.postCategory[0]} />
              </div>

              <div className="basis-5/6 md:basis-2/3 pt-1">
                {size.width > 768 ? <PostTitleSmall post={post.postTitle} postId={post.id}/> : <PostTitleMedium post={post.postTitle} postId={post.id}/>}
                <TimeComponentColor time={post.date}/>
              </div>
            </li>
          )
          })}
        </ul>

    </>
  )
}

export default PreviousNextPost
