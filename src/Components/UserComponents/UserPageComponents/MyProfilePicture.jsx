import React, { useState } from 'react'
import { Posts } from '../../../data'


const MyProfilePicture = () => {
  const [addNickName, setAddNickName] = useState(false)
  const [nickName, setNickName] = useState('No Public@"nickname"')
  const [userProfileImage, setUserProfileImage] = useState(true)

  const handleNickNameInput = () => {
    setAddNickName(change => !change)
    setUserProfileImage(true)
  }

  const handleUpdateNickName = (e) => {
   e.target.value === "" ? setNickName(() => 'No Public@"nickname"') : setNickName(() => e.target.value) 
  }

  return (
    <div className='px-3 mb-12 bg-gray-200/40 pb-5 pt-5 rounded-md'>
      <div className='font-semibold px-3 mb-9'>
        <p className='text-[#282a35] text-2xl capitalize'>My Profile picture</p>
        <small className='text-xs text-[#798488]'>Add a photo of you to be easily recognized</small>
      </div>
      <div>
        <div className={`max-w-[200px] mx-auto h-[200px] bg-[#aaacb0] border border-solid border-[#e7e9eb] rounded-full
        text-white group cursor-default shadow-md shadow-[rgba(0,0,0,.25)] ${!userProfileImage && "grid place-items-center px-3"} relative overflow-clip  mb-7`}>
          {userProfileImage ? 
          <div className='relative after:absolute after:inset-0 after:bg-white/10 after:z-10 w-ful h-full'>
            <img src={Posts[11].image} alt="userprofileimage" className='w-full h-full object-cover'/>
          </div>  : 
          <p>Add Your Photo</p>}          
          <div className='absolute inset-x-0 z-20 group-hover:top-2/3 bg-gray-900/30 bottom-0 pt-3 transition-all duration-500 ease-linear opacity-0 group-hover:opacity-100'>
            <label htmlFor="userimage" className='text-xs uppercase tracking-widest'>Upload Image</label>
            <input type="file" id="userimage" name='userimage' hidden/>
          </div>
        </div>

        
      </div>
        
        <div className='px-3 pb-5'>
          <h3 className='text-xl font-semibold text-[#282a35] capitalize'>Nebeolisa Chiemezie Samson</h3>
          <label htmlFor="usernickname" className={`text-sm capitalize italic hover:text-red-400 text-red-700 
          tracking-widest underline underline-offset-2 ${addNickName && "hidden"}`} 
          onClick={handleNickNameInput}>{nickName}</label>
          <input type="text" id='usernickname' name='usernickname' className={`border-0 outline-0 ring-0 focus:border-0 
          focus:outline-0 focus:ring-0 shadow-none focus:shadow-none text-center ${addNickName ? "inline" : "hidden"}`} 
          onChange={handleUpdateNickName}/>
        </div>
      
    </div>
  )
}

export default MyProfilePicture
