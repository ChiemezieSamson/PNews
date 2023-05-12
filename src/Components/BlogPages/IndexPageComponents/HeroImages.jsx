import React, { useEffect, useState } from 'react'
import { FaMapPin, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import { StarComponent } from '../../ButtonAndOthers/Buttons';
import { CategoriesComponent, overLay, PostTitleLarge, TimeComponent, useWindowSize } from '../../SharedAsset/SharedAssets';
import { Link } from 'react-router-dom';


const HeroImages = ({Posts}) => {
  const [nextTrendingPost, setNextTrendingPost] = useState(1)
  const size = useWindowSize()

  const trendingPostArry = Posts.slice(0, 6)
 

  const length = trendingPostArry.length -1
 
  if (nextTrendingPost === length) {
    setNextTrendingPost(() => 1)
  }

  const handleNextPost = () => {
    setNextTrendingPost((next) => next + 1)
  }

  const handlePreviousPost = () => {
    setNextTrendingPost((previous) => previous - 1 )
    if (nextTrendingPost === 1) {
      setNextTrendingPost(() => length )
    }
  }

  useEffect(() => { 
    let interval = setInterval(() => {
      setNextTrendingPost((next) => next + 1)
    }, 4000)

    return () => clearInterval(interval)
  },[])

  return (
    <>

      {/* Trending Post Block change every 4s */}

      <section aria-label="admin main post" className="pt-5">

        {/* trending now post */}

        <div className="grid grid-cols-5 sm:grid-cols-8 border border-solid border-black/10">

          <div className="grid xs:grid-cols-5 grid-cols-10 col-span-4 sm:col-span-7">
            <span className="bg-black inline-block text-center col-span-1 text-white py-2 pr-2 md:text-sm text-xs whitespace-nowrap tracking-wider font-bold uppercase">
              <FaMapPin className="inline-block mr-1 mb-1" title='Trending posts'/>
             {size.width > 520 && "Trending" }
            </span>
            <div className="mt-[6px] xs:col-span-4 relative bg-white col-span-9 md:text-sm text-base lg:text-base prose ">
              {Posts.slice(0, 6).map((post) => {
                return (
                  <span key={post._id} className="capitalize pl-[2%] font-lora tracking-wide truncate font-bold text-sm -mt-1.5 pb-1 w-[97%] sm:w-full
                       absolute -top-[20%] overflow-y-hidden -z-1 trending text-white opacity-0 transition-all duration-500 delay-500 ease-linear 
                       whitespace-nowrap" title='title' data-visible={nextTrendingPost}>                   
                       <Link to={`/single/${post._id}`} className='hover:text-[#f70d28] cursor-pointer'>
                          {post.postTitle}
                        </Link> 
                        <time dateTime='2022-11-3 4:45' className="whitespace-nowrap ml-3 text-gray-400/60 cursor-pointer  text-ellipsis">{new Date(post.createdAt).toDateString()}</time>
                  </span>
                )
              })}
             </div>
          </div>

          <ul className="grid relative z-30 grid-cols-2 divide-x border-l border-solid col-span-1">
            <li className="pt-2.5 pl-1.5 imgxs:pl-2.5 md:pl-3.5 lg:pl-5 xl:pl-7 text-gray-400/60 hover:bg-gray-200/30"
            onClick={handlePreviousPost}
            >
              <FaChevronLeft className=''/>
            </li>
            <li className="pt-2.5 pl-1.5 imgxs:pl-2.5 md:pl-3.5 lg:pl-5 xl:pl-7 text-gray-400/60 hover:bg-gray-200/30"
            onClick={handleNextPost}
            >
              <FaChevronRight className=''/>
            </li>
          </ul>
        </div>

        {/* Index Image block start here */}

        <div className="md:grid grid-cols-3 gap-[5px] my-10 text-white">

          {/* First Big Image */}

          <div className={`col-span-2 relative my-2 md:my-0 snap-start ${overLay()} m-0 p-0 group overflow-clip`}>
            <img src={Posts[4].postImage} alt="Mostrecent" className="md:min-h-[394px] lg:min-h-[490px] xl:min-h-full max-h-44 imgxs:max-h-[260px] w-full object-cover group-hover:scale-110
            transition-all duration-500 delay-200 ease-linear scale-100" loading="lazy"/>
            <span className="absolute lg:-top-1.5 -top-2 left-6 z-20">
              <CategoriesComponent cat={Posts[4].postCategory[0]}/>
            </span>
            <div className="absolute bottom-[8%] inset-x-0 text-white flex content-center justify-center z-20">
              <div className="w-[90%] text-left">
                  <PostTitleLarge post={Posts[4].postTitle} postId={Posts[4]._id}/>
                {size.width > 480 &&
                  <span className="mt-2 inline-block">
                    <span className='mr-4'>
                      <StarComponent color={"text-[#fff]"}/>
                    </span>                 
                      <TimeComponent time={Posts[4].createdAt} />
                </span>}
              </div>
            </div>
          </div>

          {/* The three list image start here */}

          <div className="overflowScroll myimage:mt-0 lg:mt-0 overflow-x-auto scroll-px-4 overscroll-x-contain snap-mandatory lg:overflow-x-hidden">
            <ul className="w-[800px] md:w-full grid md:grid-flow-row grid-flow-col gap-[5px]">
            {Posts.slice(1,4).map((post) => {
              return (
            <li key={post._id} className={`relative max-h-44 snap-start ${overLay()} m-0 p-0 group overflow-clip`}>
              <img src={post.postImage} alt="IndexImage"  className="h-32 imgxs:h-[180px] md:h-32 lg:h-40 w-full object-cover group-hover:scale-110
                  transition-all duration-500 delay-200 ease-linear scale-100" loading="lazy"/>
                  <span className='absolute lg:-top-1.5 -top-2 left-4 z-20'>
                    <CategoriesComponent cat={post.postCategory[0]}/>
                  </span>
              <div className="absolute bottom-[10%] text-white inset-x-0 flex content-center justify-center z-20">
                <div className="w-[90%] text-left">
                  <h3 className="capitalize tracking-wide w-full font-lora md:text-base text-base imgxs:text-xl lg:text-lg font-bold cursor-pointer">
                    <Link to={`/single/${post._id}`} className='inline-block'>
                      {post.postTitle}
                    </Link>
                  </h3>
                  {size.width > 1024 && <TimeComponent time={post.createdAt} />}
                </div>
              </div>
            </li>
              )
            })}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroImages
