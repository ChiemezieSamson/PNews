import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfilePicture } from '../../../Reduxstore/Slices/users/UsersSlice'


const MyProfilePicture = () => {
  const Posts = useSelector(state => state.posts)
  const user = useSelector(state => state.users)
  const [profileImage, setProfileImage] = useState("")


  const dispatch = useDispatch()

  const userId = user[1] ? user[1].id : user[0].id


  const handleSubmit = (event) => {
    event.preventDefault();


    dispatch(userProfilePicture({userId, profileImage}))

    setProfileImage(() => "")
  }
  return (
    <div className='px-3 mb-12 bg-gray-200/40 pb-5 pt-5 rounded-md'>
      <div className='font-semibold px-3 mb-9'>
        <p className='text-[#282a35] text-2xl capitalize'>My Profile picture</p>
        <small className='text-xs text-[#798488]'>Add a photo of you to be easily recognized</small>
      </div>
      <div>
        <div className="max-w-[200px] mx-auto h-[200px] bg-[#aaacb0] border border-solid border-[#e7e9eb] rounded-full
        text-white group cursor-default shadow-md shadow-[rgba(0,0,0,.25)] relative overflow-clip mb-7">
          <div className='relative after:absolute after:inset-0 after:bg-white/10 after:z-10 w-ful h-full'>
            <img src={Posts[11].postImage} alt="userprofileimage" className='w-full h-full object-cover'/>
          </div>      
          <form 
          id='profileImage'
          onSubmit={handleSubmit} 
          className='absolute inset-x-0 z-20 group-hover:top-2/3 bg-gray-900/30 bottom-0 pt-3 transition-all duration-500 ease-linear opacity-0 group-hover:opacity-100'>
            <label htmlFor="userimage" className='text-xs uppercase tracking-widest'>Upload Image</label>
            <input type="file" id="userimage" name='userimage' hidden onChange={(e) => setProfileImage(() => e.target.value)}/>
          </form>
        </div>        
      </div>

        <div className='px-3 pb-5'>
          <h3 className='text-xl font-semibold text-[#282a35] capitalize'>{user[0].name.firstName + " " + user[0].name.LastName}</h3>
          <label htmlFor="usernickname" className="text-sm capitalize italic hover:text-red-400 text-red-700 
          tracking-widest underline underline-offset-2">{user[0].nickname}</label>
          <button 
            type='submit' 
            form='profileImage'
            id='submitProfileImage' 
            name='submitProfileImage' 
            className={`mx-1 mt-8 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
            text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600 
            ${profileImage !== "" ? "inline-block" : "hidden"}`}
            >Save password</button>
        </div>


      
    </div>
  )
}

export default MyProfilePicture
