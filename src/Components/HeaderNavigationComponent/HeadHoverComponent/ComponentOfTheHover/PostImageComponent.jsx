import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../../data'

const PostImageComponent = ({blogPost, Parentlink}) => {
  const favoriteAndQuotes = blogPost.slice(0, 4)
  let Data 
  (Parentlink === "favorite" || Parentlink === "quotes") ? Data = favoriteAndQuotes : Data = blogPost
  return (
    <div>
      <ul className={`${(Parentlink === "favorite" || Parentlink === "quotes") ? "grid-flow-col" : "grid-cols-3"} 
        grid gap-4 list-none m-0 py-2`}>
        {Data.map((post) => {
          return(
            <li key={post._id}>
              <span> 
                  <img src={publicFolder + post.postImage} alt={post.postTitle} loading="lazy"
                  className={`w-full cursor-pointer  ${(Parentlink === "favorite" || Parentlink === "quotes") ? "h-32" : "h-28"}`} />
                <Link to={`/single/${post._id}`} className="mt-1 cursor-pointer inline-block">
                  {post.postTitle}
                </Link>
              </span>
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
