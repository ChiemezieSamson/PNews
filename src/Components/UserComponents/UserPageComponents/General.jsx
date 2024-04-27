import React from 'react'
import { UserInfoHeading, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner'
import MyPosts from './GeneralComponents/MyPosts'
import AdditionalResources from './GeneralComponents/AdditionalResources'
import { WritePostButton } from '../../ButtonAndOthers/Buttons'

const General = () => {
  const {userAction, isFetching} = useFetchedUserById()  

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>

      <UserInfoHeading head={"Your activities"} text={"Manage your post."}/>

      <WritePostButton isFecthingStyle={isFecthingStyle} isFetching={isFetching} userAction={userAction}/>
    
    <div className={`divide-y divide-solid divide-neutral-400 mt-8 relative ${isFecthingStyle(isFetching)}`}>
      
      <MyPosts userAction={userAction}/>
      
      <AdditionalResources />
    </div> 
   
  </div>
  )
}

export default General
