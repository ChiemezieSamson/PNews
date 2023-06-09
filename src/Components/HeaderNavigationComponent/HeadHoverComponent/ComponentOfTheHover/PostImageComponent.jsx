import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../../data'
import { useWindowSize } from '../../../SharedAsset/SharedAssets'

const PostImageComponent = ({blogPost, Parentlink, handleCloseHoverlinks}) => {
  const [posts, setPosts] = useState([])
  const size = useWindowSize()
  
  useEffect(() => {
  if(Parentlink === "favorite" || Parentlink === "quotes") {
    setPosts(() => blogPost.slice(0, 4))
  } else if (size.width < 1024) {
    setPosts(() => blogPost.slice(0, 3))
  } else {
    setPosts(() => blogPost)
  }
  }, [size, Parentlink, blogPost])

  return (
    <div>
      <ul className={`${(Parentlink === "favorite" || Parentlink === "quotes") ? "grid-flow-col" : "grid-cols-3"} 
        grid list-none m-0 py-2`}>
        {posts.map((post) => {
          return(
            <li key={post._id} className='px-1 py-1'>
              <Link to={`/single/${post._id}`} className='lg:max-h-32 max-h-24' onClick={handleCloseHoverlinks}> 
                <img src={publicFolder + post.postImage} alt={post.postTitle} loading="lazy"
                className={`cursor-pointer object-cover object-center rounded  ${(Parentlink === "favorite" || Parentlink === "quotes") ? "lg:h-32 max-h-24" : "lg:h-28 max-h-24"}`}/>
              </Link>
              <h5 className='capitalize font-lora tracking-wide font-extrabold text-stone-800 text-sm  mt-1 pb-1'>
                <Link 
                to={`/single/${post._id}`} 
                className="inline-block hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear" 
                title='title' onClick={handleCloseHoverlinks}>
                  {size.width < 1024 ? post.postTitle.substring(0, 30) : post.postTitle.substring(0, 50)}...
                </Link>
              </h5>
            </li>
          )
        })}        
      </ul>

     {(Parentlink === "favorite" || Parentlink === "quotes") && 
      <div className='grid grid-cols-2 max-w-[90px] gap-1 text-[#54595f] text-xs p-2 mx-auto'>
        <span className='py-2 px-2.5 border border-solid border-gray-300/50'>
          <FaChevronLeft />
        </span>

        <span className='py-2 px-2.5 border border-solid border-gray-300/50'>
        <FaChevronRight />
        </span>
      </div>}
    </div>
   
  )
}

export default PostImageComponent
