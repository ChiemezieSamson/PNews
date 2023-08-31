import React, { useState } from 'react'
import { CategoriesComponentBotton, CatSidebarHanbugar, isFecthingStyle, PostTitleMedium, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import { ImageTopTitleTimeDownSpinner } from '../../SharedAsset/Spinners/Spinner'
import useParentcategories from './useParentcategories/UseParentcategories'
import { HomePageSlideNextAndPreviousButton } from '../../ButtonAndOthers/Buttons'



const FashionAndTrendsPosts = ({Posts, categories, canOpen, isFetching}) => {
  const size = useWindowSize()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)

  const parent = "favorite"
  
  const {allPost} = useParentcategories(parent, categories, Posts, canOpen)

  const handleNext = () => {
    if(end < 10 && start < 4) {
      setEnd(() => end + 1)
      setStart(() => start + 1)
    } else {
      setEnd(() => 6)
      setStart(() => 0)
    }
  }

  const handleBackward = () => {
    if(start === 0 && end === 6) {
      setEnd(() => 10)
      setStart(() => 4)
    } else {
      setEnd(() => end - 1)
      setStart(() => start - 1)
    }
  }

  return (
    <>
      <hr />

      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar 
        initial={categories}
        canOpen={canOpen} 
        parent={parent}        
        blackletters={"Fashion &"} 
        redletters={"Trends"}
        isFetching={isFetching}
      />
        
      {/* === Posts image and title start here === */}
      <div className={`overflowScroll overflow-x-auto scroll-px-0 overscroll-x-contain snap-mandatory mb-2 pt-1.5 ${isFecthingStyle(isFetching)}`}>

        {canOpen ?
          <ul className="grid grid-flow-col snap-start w-[800px]">

            {/* featured posts other post start here */}
            {allPost?.slice(start, end)?.map((post) => {

              return (
                <li key={post?._id} className="mx-1 first:ml-0 last:mr-0 last:mb-0 md:mb-0">

                  <div className="mb-2 relative topRetangleImage min-w-[250px] imgxs:min-w-[280px]">
                    
                    <Link to={`/single/${post?._id}`}>
                      <img src={publicFolder + post?.postImage} alt={"posts"} className="topRetangleImage max-h-44 imgxs:h-52 sm:h-60 md:h-44 lg:h-52" loading="lazy"/>
                    </Link>

                    <CategoriesComponentBotton cat={post?.postCategory[0]} />
                  </div>

                  <div className="pt-1">

                    {size.width > 768 ? 
                      <PostTitleSmall post={post?.postTitle} postId={post?._id}/> 
                      : 
                      <PostTitleMedium post={post?.postTitle} postId={post?._id}/>
                    }

                    <TimeComponentColor time={post?.createdAt}/>
                  </div>
                </li>
              )
            })}
          </ul>
        :
        <ImageTopTitleTimeDownSpinner
          groupStyle={"mb-2 pt-1.5 grid grid-flow-col snap-start w-[800px]"}
          listStyle={"mx-1 first:ml-0 last:mr-0 last:mb-0 md:mb-0"}
          imageStyle={"mb-2 topRetangleImage min-w-[250px] imgxs:min-w-[280px]"}
          titleStyle={"mt-1 h-5"}
          num={6}
        /> 
        }
      </div>

      {/* === arrow navigate start here === */}
      <div className='relative isolate mt-5 after:absolute after:h-px after:w-full after:bg-neutral-300
      after:top-1/2 after:-z-10'>
      
        <span className='grid grid-flow-col justify-center text-stone-400 text-xs'>

          <span className={`bg-white rounded-md ${isFecthingStyle(isFetching)}`}>
            <HomePageSlideNextAndPreviousButton 
              isSuccess={canOpen}
              handleBackward={handleBackward}
              handleNext={handleNext}
            />
          </span>

        </span>
      </div>
    </>
  )
}

export default FashionAndTrendsPosts
