import React, {useState } from 'react'
import { useUpdateExistingUserImageMutation } from '../../../Reduxstore/Slices/users/UsersSlice'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner'
import axios from "axios"
import { publicFolder } from '../../../data'


const MyProfilePicture = () => {
  const [file, setFile] = useState("")
  const {singleUser, userAction, isFetching} = useFetchedUserById()
  const [userProfilePicture, {isLoading}] = useUpdateExistingUserImageMutation()
  const [profileImage, setProfileImage] = useState("")
  const user = singleUser  

  const canSave = [profileImage].every(Boolean) && !isLoading

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(canSave) {
      await userProfilePicture({userId: user._id, profileImage})
      setProfileImage(() => "")
    }
  }

  const handleImage = async (e) => {
    if(e.target.value) {
      const data = new FormData()
      const filename = Date.now() + e.target.files[0].name;
      
      data.append("name", filename)
      data.append("file", e.target.files[0])
       
      setProfileImage(() => filename)
      setFile(() => e.target.files[0])
     try {
      await axios.post("/upload", data)
     } catch (err) {

     }
    }
  }

  return (
    <>
    {
      userAction ?
      <div className='px-3 mb-12 bg-gray-200/40 pb-5 pt-5 rounded-md disabled:opacity-40' disabled={isFetching}>
      <div className='font-semibold px-3 mb-9'>
        <p className='text-[#282a35] text-2xl capitalize'>My Profile picture</p>
        <small className='text-xs text-[#798488]'>Add a photo of you to be easily recognized</small>
      </div>
      <div>
        <div className="max-w-[200px] mx-auto h-full+ border border-solid border-[#e7e9eb] rounded-full
        text-white group cursor-default shadow-md shadow-[rgba(0,0,0,.25)] relative overflow-clip mb-7">
          <div className='relative after:absolute after:inset-0 after:bg-white/10 after:z-10 w-ful h-full'>
          {file ? <img  src={URL.createObjectURL(file)} alt="postImage" className='w-auto h-auto object-cover' loading="lazy"/> :
            <img src={publicFolder + user.profileImage} alt="userprofileimage" className='w-full h-auto object-cover' loading="lazy"/>}
          </div>      
          <form 
          id='profileImage'
          onSubmit={handleSubmit} 
          className='absolute inset-x-0 z-20 group-hover:top-2/3 bg-gray-900/30 bottom-0 pt-3 transition-all duration-500 ease-linear opacity-0 group-hover:opacity-100'>
            <label htmlFor="userimage" className='text-xs uppercase tracking-widest'>Upload Image</label>
            <input type="file" id="userimage" name='userimage' hidden onChange={handleImage}/>
          </form>
        </div>        
      </div>

      <div className='px-3 pb-5'>
        <h3 className='text-xl font-semibold text-[#282a35] capitalize'>{user.fullName}</h3>
        <label htmlFor="usernickname" className="text-sm capitalize italic hover:text-red-400 text-red-700 
        tracking-widest underline underline-offset-2 block">{user.username}</label>
        <button 
          type='submit' 
          form='profileImage'
          id='submitProfileImage' 
          name='submitProfileImage' 
          className={`mx-1 mt-8 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
          text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600 disabled:opacity-40
          ${!canSave ? "hidden" : "inline-block"}`} disabled={!canSave}
          >Save</button>
      </div>      
    </div> :
      singleUser
    }
    </>
    
  )
}

export default MyProfilePicture
