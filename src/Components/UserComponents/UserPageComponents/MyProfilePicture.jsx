import React, {useEffect, useState } from 'react'
import { useUpdateExistingUserImageMutation } from '../../../Reduxstore/Slices/users/UsersSlice'
import axios from "axios"
import { publicFolder } from '../../../data'
import { UserInfoHeading, isFecthingStyle } from '../../SharedAsset/SharedAssets'


const MyProfilePicture = ({user, userAction, isFetching}) => { 
  // Redux function to update user profile pictur changes
  const [userProfilePicture, {isLoading}] = useUpdateExistingUserImageMutation()

  
  const [errorText, setErrorText] = useState(false) /// text used to indicate that your update didn't save or there is an erro
  const [errorText2, setErrorText2] = useState(false) /// text used to indicate that your update didn't save or there is an erro
  const [onChangeMade, setOnChangeMade] = useState(false) // make sure a change is made before allowing the button to save

  
  const [profileImage, setProfileImage] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState("")
  const [data, setData] = useState({})



  // handling setting image once selected from the user device
  const handleImage = async (e) => {
    setOnChangeMade(() => true)

    if(e.target.value) {
      setErrorText(() => false)

      const data = new FormData()
      const file = e.target.files[0]
      const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB

      if (fileSizeInMB > 1) {

        setErrorMessage('Image size exceeds 1MB limit');
        setProfileImage(() => "")
      } else {
        setErrorMessage('');

        
        try {
          
          const filename = Date.now() + file.name; // making sure no two file have same name
          
          data.append("name", filename)
          data.append("file", file)
          
          setProfileImage(() => filename)
          setFile(() => file)
  
          setData(() => data);
          
        } catch (err) {

          setErrorText(() => true)
          console.error(err)
        }
     }
    }
  }


  const canSave = [profileImage, onChangeMade].every(Boolean) && !isLoading && !errorText


  //handle form submmition and api calling
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(canSave) {

      setErrorText2(() => false)

      try{

        await axios.post("/upload", data)
          
        if ( user?.profileImage) {
          
          await axios.delete(`/delete-image/${ user?.profileImage}`)
        }

        await userProfilePicture({userId: user._id, profileImage})
  
        setFile(() => "")
      } catch (err) {

        setErrorText2(() => true)
        console.error(err)
      }
    }
  }

  useEffect(() => {

    if(userAction) {

      setProfileImage(() =>  user?.profileImage)
    }

  }, [user, userAction])

  return (
    <div className={`px-3 mb-12 bg-gray-200/40 pb-5 pt-5 rounded-md ${isFecthingStyle(isFetching)}`}>

      {/* Head Introduction */}
      <div className='font-semibold px-3 mb-9'>

        <UserInfoHeading 
          head={"My Profile picture"}
          text={"Add a photo of you to be easily recognized"}
        />
        
        {errorText2 && <p className='text-xs text-rose-500 mb-1 tracking-wider font-lora'>Failed to save the image</p>}
      </div>

      {/* Image and image form */}
      <div className="max-w-[200px] mx-auto h-full max-h-52 border-4 border-inherit overflow-hidden rounded-full text-white text group cursor-pointer shadow-md shadow-[rgba(0,0,0,.25)] relative mb-7">

        <div className='relative after:absolute after:inset-0 after:bg-white/10 after:z-10 w-ful h-screen max-h-52'>

          {userAction ? 
          <>
            {file ? 
              <img  src={URL?.createObjectURL(file)} alt="userprofileimage" className='max-h-52' loading="lazy"/> 
              :
              <img src={publicFolder + profileImage} alt="userprofileimage" className='max-h-52' loading="lazy"/>
            }
          </>
          :
          <div className='skeleton rounded-sm h-screen w-screen'></div>
          }
        </div>      

        {userAction && 

          <form id='profileImage'  onSubmit={handleSubmit}>

            <label htmlFor="userimage" className='text-xs uppercase tracking-widest absolute inset-x-0 z-20 group-hover:top-2/3 bg-neutral-400/40 drop-shadow bottom-0 pt-3 
            TextHeadertransition opacity-0 group-hover:opacity-100'>Upload Image</label>

            <input 
              type="file" 
              id="userimage" 
              name='userimage'
              accept="image/*" 
              required
              hidden 
              onChange={handleImage}
            />
          </form>
        }
      </div>

      {/* errorMessage notification  */}
      {errorMessage && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errorMessage}</p>}
      {errorText && <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to upload image the image</p>}        
      
      {/* user name and full name*/}
      <div className='px-3 pb-5'>

        {userAction ?
          <>
            <h3 className='text-xl font-semibold text-[#282a35] capitalize'>{user?.fullName}</h3>
            <label htmlFor="usernickname" className="text-sm capitalize italic hover:text-red-400 text-red-700 
            tracking-widest underline underline-offset-2 block">{user?.username}</label>
          </>
          :
          <>
            <div className='skeleton w-[80%] mx-auto h-6 mb-1.5 rounded-sm'></div>
            <div className='skeleton w-[60%] mx-auto h-4 mb-0.5 rounded-sm'></div>
          </>
        }

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
    </div>  
  )
}

export default MyProfilePicture
