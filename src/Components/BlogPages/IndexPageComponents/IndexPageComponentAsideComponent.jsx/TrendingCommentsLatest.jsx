import React, { useRef, useState } from 'react'
import { JustTimeComponet, JustTimeComponetStar } from '../SharedComponents'
import { isFecthingStyle } from '../../../SharedAsset/SharedAssets'


const TrendingCommentsLatest = ({posts, Comments, action, isFetching}) => {
  const [newPosts, setNewPosts] = useState([])
  const [text, setText] = useState("")

  const TrendingPosts = action && posts?.filter(post => post?.optional?.trending === true)

  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()

  // handling Tab selection
  const handleClick = (e) => {
    const ClickedHead = e.target

    //  first remove the active style from all
    ref.current.parentElement.classList.remove("activeTitle")
    ref2.current.parentElement.classList.remove("activeTitle")
    ref3.current.parentElement.classList.remove("activeTitle")

    // make the clicked button the active
    ClickedHead.parentElement.classList.add("activeTitle")


    // Find only the Trend posts
    if(ClickedHead.textContent === "Trending") {

      setNewPosts(() => TrendingPosts?.slice(0, 4))
      setText(() => "Trending")
    }
    

    // find the post with commments on them
    if(ClickedHead.textContent === "Comments") {

      if (Comments?.length > 0) {

        const uniqueItems = new Map(); // used in making sure that a unqui array is returned
        let allComment = []
        let allNewPost = []

        // Get all post that contense a comment
        for (const Comment of Comments) {

          const post_Comments = posts?.filter(post => post?._id === Comment?.postId)

          allComment?.push(post_Comments)
        }

        // make sure that an empty post is not returned
        allComment?.forEach(item => {

          if (item?.length > 0) {

            allNewPost?.push(item[0]);
          }
        })

        // Iterate through the array and add items with unique IDs to the map
        for (let i = 0; i < allNewPost?.length; i++) {

          const item = allNewPost[i];
          const id = item?._id;

          uniqueItems.set(id, item);
        }

        // Convert the map values to an array
        const uniqueItemsArray = Array.from(uniqueItems.values());

        setNewPosts(() => uniqueItemsArray?.length > 0 ? uniqueItemsArray : "")
      
        setText(() => "Comments") 
      }
    }


    if(ClickedHead.textContent === "Latest") {

      // Convert the updatedAt strings to Date objects
      const postsWithDates = posts.map(post => ({
        ...post,
        updatedAt: new Date(post.updatedAt)
      }));

      // Find the most recent post
      const mostRecentPost = postsWithDates.reduce((acc, curr) => {
        return curr.updatedAt > acc.updatedAt ? curr : acc;
      });

      // Calculate the 30-day threshold
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Filter out posts older than 30 days
      const recentPosts = postsWithDates.filter(post => post.updatedAt >= thirtyDaysAgo);

      const finalResult = mostRecentPost[0] ? mostRecentPost?.slice(0, 4) : recentPosts[0] ? recentPosts?.slice(0, 4) : posts?.slice(0, 4)
      setNewPosts(() => finalResult)
      setText(() => "Latest")
    }
  }
  
  return (
    <>

      <ul className='grid grid-cols-3 mt-7 mb-6 p-0 divide-x border border-solid boreder-neutral-100'>

        <li className="text-sm font-medium leading-9 hover:bg-neutral-50 cursor-pointer text-stone-700 activeTitle">

          <button 
            type="button"
            name="TrendingButton"
            id='TrendingButton'
            onClick={handleClick}
            disabled={!action || isFetching}
            className="disabled:opacity-40 block w-full text-center"
            ref={ref}
          >
            Trending
          </button>
        </li>

        <li className="text-sm font-medium leading-9 hover:bg-neutral-50 cursor-pointer text-stone-700">

          <button 
            type="button"
            name="CommentsButton"
            id='CommentsButton'
            onClick={handleClick}
            disabled={!action || isFetching}
            className="disabled:opacity-40 block w-full text-center"
            ref={ref2}
          >            
            Comments
          </button>
        </li>

        <li className="text-sm font-medium leading-9 hover:bg-neutral-50 cursor-pointer text-stone-700">

           <button 
            type="button"
            name="LatestButton"
            id='LatestButton'
            onClick={handleClick}
            disabled={!action || isFetching}
            className="disabled:opacity-40 block w-full text-center"
            ref={ref3}
          >           
            Latest
          </button>
        </li>
      </ul>   
      

      <div className={`mb-5 ${isFecthingStyle(isFetching)}`}>

        {text !== "Comments" ? 

          <JustTimeComponetStar Posts={newPosts?.length > 0 ? newPosts : action && TrendingPosts?.slice(0, 4)} action={action}/> 
          :
          <JustTimeComponet Posts={newPosts} Comments={Comments} action={action}/>
        }
      </div>
    </>
  )
}

export default TrendingCommentsLatest
