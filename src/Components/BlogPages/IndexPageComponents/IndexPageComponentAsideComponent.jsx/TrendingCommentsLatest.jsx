import React, { useRef, useState } from 'react'
import { JustTimeComponet } from '../SharedComponents'

const TrendingCommentsLatest = ({posts}) => {
  const [newPosts, setNewPosts] = useState(posts.slice(1, 5))
  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()

  const handleClick = (e) => {
    ref.current.classList.remove("activeTitle")
    ref2.current.classList.remove("activeTitle")
    ref3.current.classList.remove("activeTitle")
    e.target.classList.add("activeTitle")

    if(e.target.textContent === "Trending") {
      setNewPosts(() => posts.slice(0, 4))
    }
    if(e.target.textContent === "Comments") {
      setNewPosts(() => posts.slice(4, 8)) 
    }
    if(e.target.textContent === "Latest") {
      setNewPosts(() => posts.slice(8, 12))
    }
  }
  return (
    <>
    <ul className='grid grid-cols-3 text-center mt-7 mb-6 p-0 divide-x border border-solid boreder-[#eee]'>
        <li ref={ref} className="text-sm font-medium leading-9 hover:bg-gray-200/30 cursor-pointer text-[#212121] activeTitle" 
        onClick={handleClick}>Trending</li>
        <li ref={ref2} className="text-sm font-medium leading-9 hover:bg-gray-200/30 cursor-pointer text-[#212121]"
        onClick={handleClick}>Comments</li>
        <li ref={ref3} className="text-sm font-medium leading-9 hover:bg-gray-200/30 cursor-pointer text-[#212121]"
        onClick={handleClick}>Latest</li>
      </ul>   
      
      <div className='mb-5'>
        <JustTimeComponet Posts={newPosts ? newPosts : posts.slice(0, 4)}/>
      </div>
    </>
  )
}

export default TrendingCommentsLatest
