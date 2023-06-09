import React from 'react'
import { CategoriesComponentBotton, CatSidebarHanbugar, PostTitleMedium, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


const FashionAndTrendsPosts = ({Posts, categories}) => {
  const size = useWindowSize()

  return (
    <section className="">
      <hr />

        {/* === Header title and possible categories === */}
      <CatSidebarHanbugar initial={categories.favorite.category}
        blackletters={"Fashion &"} redletters={"Trends"}/>
        
        {/* === Posts image and title start here === */}
      <div className='overflowScroll overflow-x-auto scroll-px-0 overscroll-x-contain snap-mandatory'>
        <ul className="mb-2 pt-1.5 grid grid-flow-col snap-start w-[800px]">
          {/* featured posts other post start here */}
          {Posts.slice(0,6).map((post) => {
            return (
              <li key={post._id} className="mx-1 first:ml-0 last:mr-0 last:mb-0 md:mb-0">

                <div className="mb-2 relative topRetangleImage min-w-[250px] imgxs:min-w-[280px]">
                  
                  <Link to={`/single/${post._id}`}>
                    <img src={publicFolder + post.postImage} alt={"posts"} 
                      className="topRetangleImage" loading="lazy"/>
                  </Link>
                  <CategoriesComponentBotton cat={post.postCategory[0]} />
                </div>

                <div className="pt-1">
                  {size.width > 768 ? <PostTitleSmall post={post.postTitle} postId={post._id}/> : <PostTitleMedium post={post.postTitle} postId={post._id}/>}
                  <TimeComponentColor time={post.createdAt}/>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

        {/* === arrow navigate start here === */}
      <div className='relative isolate mt-7 after:absolute after:h-px after:w-full after:bg-neutral-300
      after:top-1/2 after:-z-10'>
      
        <span className='grid grid-flow-col justify-center text-stone-400 text-xs'>

          <span className='py-2 px-2.5 border border-r-2 border-solid cursor-pointer border-neutral-300 
          inline-block bg-white relative after:absolute after:inset-0 after:z-10 hover:bg-neutral-100
          transition-all duration-200 ease-linear'>
            <FaChevronLeft className='inline-block align-text-top mt-0.5'/>
          </span>

          <span className='py-2 px-2.5 border border-l-2 border-solid cursor-pointer border-neutral-300 
          inline-block bg-white relative after:absolute after:inset-0 after:z-10 hover:bg-neutral-100
          transition-all duration-200 ease-linear'>
           <FaChevronRight className='inline-block align-text-top mt-0.5'/>
          </span>

        </span>
      </div>
    </section>
  )
}

export default FashionAndTrendsPosts
