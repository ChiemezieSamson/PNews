import React, { useRef, useState } from 'react'
import { JustTimeComponet, JustTimeComponetStar } from '../SharedComponents'

const TrendingCommentsLatest = ({posts, Comments}) => {
  const [newPosts, setNewPosts] = useState("")
  const [text, setText] = useState("")

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
      setText(() => "Trending")
    }
    if(e.target.textContent === "Comments") {

      if(Comments?.length) {
        const uniqueItems = new Map();
        let allComment = []
        let allNewPost = []
        for(const Comment of Comments) {
           allComment.push(posts.filter(post => post._id === Comment.postId))
          }

          allComment.forEach(item => {
            allNewPost.push(item[0]);
          })
         
          // Iterate through the array and add items with unique IDs to the map
          for (let i = 0; i < allNewPost.length; i++) {
            const item = allNewPost[i];
            const id = item._id;
            uniqueItems.set(id, item);
          }

          // Convert the map values to an array
          const uniqueItemsArray = Array.from(uniqueItems.values());

          setNewPosts(() => uniqueItemsArray?.length ? uniqueItemsArray : "")
      
          setText(() => "Comments") 
      }
    }
    if(e.target.textContent === "Latest") {
      setNewPosts(() => posts.slice(8, 12))
      setText(() => "Latest")
    }
  }
  
  return (
    <>
      <ul className='grid grid-cols-3 text-center mt-7 mb-6 p-0 divide-x border border-solid boreder-neutral-100'>
        <li ref={ref} className="text-sm font-medium leading-9 hover:bg-neutral-50 cursor-pointer text-stone-700 activeTitle" 
        onClick={handleClick}>Trending</li>
        <li ref={ref2} className="text-sm font-medium leading-9 hover:bg-neutral-50 cursor-pointer text-stone-700"
        onClick={handleClick}>Comments</li>
        <li ref={ref3} className="text-sm font-medium leading-9 hover:bg-neutral-50 cursor-pointer text-stone-700"
        onClick={handleClick}>Latest</li>
      </ul>   
      
      <div className='mb-5'>
        {text !== "Comments" ? 
          <JustTimeComponetStar Posts={newPosts.length ? newPosts : posts.slice(0, 4)}/> :
          <JustTimeComponet Posts={newPosts} Comments={Comments}/>
        }
      </div>
    </>
  )
}

export default TrendingCommentsLatest
