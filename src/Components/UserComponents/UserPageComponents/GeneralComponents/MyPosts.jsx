import React, { useState } from 'react'
import { useFetchedPostByUserId } from '../../../SharedAsset/Spinners/postsSpinner'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { SinginAndSecurityIntro, TimeComponentColor } from '../../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { UserPostsSpinner } from '../../../SharedAsset/Spinners/Spinner'

const MyPosts = ({userAction}) => {
  const [page, setPage] = useState(1)
  const [openUserPost, setOpenUserPost] = useState(false) // use to open and close the Posts section
  const {singlePost, postAction, isFetching} = useFetchedPostByUserId(page)
 

  const posts = singlePost?.post
  const currentPage = parseInt(singlePost?.currentPage) 
  const totalPage = parseInt(singlePost?.totalPages)


  // handling the display or hidden of the whole log out component
  const handleOpenCloseChild = () => {
    setOpenUserPost((change) => !change)
  }


  const handleFecthMore = () => {
    if (currentPage < totalPage) {
      setPage(() => currentPage + 1)
    }
  }

  const handleReduceFecthedPosts = () => {
    if (currentPage > 1) {
      setPage(() => currentPage - 1)
    }
  }

  return (
    <div className={`font-poppins relative  ${isFetching && "opacity-40 after:absolute after:inset-0 after:z-10"}`}>

      <WritePostAsideOpenClosebar BarName={"Posts"} handle={handleOpenCloseChild}/>

       <div className={`${openUserPost ? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
        <SinginAndSecurityIntro text={"Manage the information associated with your posts."} />

        <div className='mt-7'>
          {postAction && userAction ? 
            <ul className='w-full max-w-2xl'>
              {posts.map((post) => {
                return (
                  <li key={post?._id} className='my-2'>
                    <h3 className="capitalize tracking-wide text-stone-900 font-lora text-base lg:text-lg font-extrabold">
                      <Link to={`/single/${post?._id}`} className='hover:mainColor cursor-pointer TextHeadertransition' title="title">
                        {post?.postTitle.substring(0, 70)}
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <span className='inline-block align-top -mt-0.5'>
                       <TimeComponentColor time={post?.createdAt}/>
                      </span>
                    </h3>                   
                  </li>
                )
              })}
            </ul>
            :
            <UserPostsSpinner />
          }

          <div className='text-center mt-6'>
            <button 
              type='button' 
              id='reducefetchedpost' 
              name='reducefetchedpost'                
              className={`mx-2 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
              text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600 disabled:opacity-40 
              ${(currentPage > 1) ? "inline-block" : "hidden"}`}
              disabled={!userAction && !postAction}
             onClick={handleReduceFecthedPosts}>previous</button>

            <button 
              type='button' 
              id='fetchmorepost' 
              name='fetchmorepost'
              className={`mx-2 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
              text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600 disabled:opacity-40 
              ${(totalPage > 1 && currentPage < totalPage) ? "inline-block" : "hidden"}`}
              disabled={!userAction && !postAction}
             onClick={handleFecthMore}>next</button>
          </div>
        </div>
       </div>      
    </div>
  )
}

export default MyPosts
