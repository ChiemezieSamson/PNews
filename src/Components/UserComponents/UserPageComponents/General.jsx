import React from 'react'
import { UserInfoHeading, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner'
import MyPosts from './GeneralComponents/MyPosts'
import { Link } from 'react-router-dom'
import AdditionalResources from './GeneralComponents/AdditionalResources'

const General = () => {
  const {userAction, isFetching} = useFetchedUserById()  

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>
      <UserInfoHeading head={"Your activities"} text={"Manage your post."}/>

      <div className={`${isFecthingStyle(isFetching)} text-right`}>
        <Link to={`/writepost`}>  
          <button className="uppercase cursor-pointer hover:bg-neutral-300 font-medium prose text-stone-700 hover:text-white
           py-1.5 tracking-wider px-4 text-[11px] leading-[16px]  my-4 shadow rounded disabled:opacity-40
          shadow-gray-400/60  hover:border-[#f70d28] outline-none TextHeadertransition" disabled={!userAction}>Write new Post</button>
        </Link>
      </div>
    
    <div className={`divide-y divide-solid divide-neutral-400 mt-8 relative ${isFecthingStyle(isFetching)}`}>
      <MyPosts userAction={userAction}/>
      
      <AdditionalResources />
    </div> 
   
  </div>
  )
}

export default General
