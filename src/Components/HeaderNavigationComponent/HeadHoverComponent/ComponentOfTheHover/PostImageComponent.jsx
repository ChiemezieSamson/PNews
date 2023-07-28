import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../../data'
import { useWindowSize } from '../../../SharedAsset/SharedAssets'
import { SkeletonTextTwo } from '../../../SharedAsset/Spinners/Spinner'

const PostImageComponent = ({blogPost = [], Parentlink, handleCloseHoverlinks, isFetchingHoverPosts, isSuccess}) => {
  const [posts, setPosts] = useState([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(4)
  const size = useWindowSize()

  const handleNext = () => {
    if(end < 6 && start < 2) {
      setEnd(() => end + 1)
      setStart(() => start + 1)
    } else {
      setEnd(() => 4)
      setStart(() => 0)
    }
  }

  const handleBackward = () => {
    if(start === 0 && end === 4) {
      setEnd(() => 6)
      setStart(() => 2)
    } else {
      setEnd(() => end - 1)
      setStart(() => start - 1)
    }
  }
  
  useEffect(() => {
    if (blogPost?.length > 0 && Parentlink) {

      if(Parentlink === "favorite" || Parentlink === "quotes") {
        setPosts(() => blogPost?.slice(start, end))
      } else if (size.width < 1024) {
    
        setPosts(() => blogPost?.slice(0, 3))      
      } else {
    
        setPosts(() => blogPost)
      }
    }
  }, [size, Parentlink, blogPost, start, end])


  return (
    <div className='disabled:opacity-40' disabled={isFetchingHoverPosts}>
      <ul className={`${(Parentlink === "favorite" || Parentlink === "quotes") ? "grid-flow-col" : "grid-cols-3"} 
        grid list-none m-0 py-2`}>

        {posts?.map((post) => {
          return(
            <li key={post?._id} className='px-1 py-1'>
              <Link to={`/single/${post?._id}`} className='lg:max-h-32 max-h-24' onClick={handleCloseHoverlinks}> 
                {(isSuccess && !isFetchingHoverPosts) ? 
                  <img src={publicFolder + post?.postImage} alt={post?.postTitle} loading="lazy"
                  className={`cursor-pointer object-cover object-center rounded  ${(Parentlink === "favorite" || Parentlink === "quotes") ? "lg:h-32 max-h-24" : "lg:h-28 max-h-24"}`}/>
                  :
                  <div className='h-screen lg:max-h-32 max-h-24 skeleton'></div>                  
                }
              </Link>

              <h5 className='capitalize font-lora tracking-wide font-extrabold text-stone-800 text-sm  mt-1 pb-1'>                
                {(isSuccess && !isFetchingHoverPosts) ? 
                  <Link 
                    to={`/single/${post?._id}`} 
                    className="inline-block hover:mainColor cursor-pointer TextHeadertransition" 
                    title='title' onClick={handleCloseHoverlinks}>                    
                      {size.width < 1024 ? post?.postTitle?.substring(0, 30) : post?.postTitle?.substring(0, 50)}...
                  </Link>
                  :
                  <SkeletonTextTwo />
                }
              </h5>
            </li>
          )
        })}        
      </ul>

     {(Parentlink === "favorite" || Parentlink === "quotes") && 
      <div className='lg:grid grid-cols-2 max-w-[90px] gap-1 text-neutral-500 text-xs p-2 mx-auto hidden'>
        <span 
          className='py-2 px-2.5 border border-solid border-neutral-300 hover:border-neutral-400 
          hover:text-neutral-600 cursor-pointer TextHeadertransition' onClick={handleBackward}>
          <FaChevronLeft />
        </span>

        <span className='py-2 px-2.5 border border-solid border-neutral-300 hover:border-neutral-400 
        hover:text-neutral-600 cursor-pointer TextHeadertransition' onClick={handleNext}>
        <FaChevronRight />
        </span>
      </div>}
    </div>
   
  )
}

export default PostImageComponent
