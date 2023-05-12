import React, { useLayoutEffect, useState } from 'react'
import { FaEnvelopeOpen, FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTwitter, FaYoutubeSquare } from 'react-icons/fa';
import { useUpdateExistingUserPublicProFileMutation } from '../../../Reduxstore/Slices/users/UsersSlice';
import { UserInfoHeading } from '../../SharedAsset/SharedAssets'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner';

const MyPublicProfile = () => {
  const {singleUser, userAction, isFetching} = useFetchedUserById()
  const [userPublicProfile, {isLoading}] = useUpdateExistingUserPublicProFileMutation()
  const [nickname, setNickname] = useState("")
  const [biography, setBiography] = useState("")
  const [secondaryEmail, setSecondaryEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [twitter, setTwitter] = useState("")
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youTube, setYouTube] = useState("")
  const [website, setWebsite] = useState("")
  const [emailExist, setEmailExist] = useState(false)


  const user = singleUser

  const canSave = [nickname, biography, secondaryEmail, phone, linkedIn, twitter, facebook, instagram, youTube, website].every(Boolean) && !isLoading


  const handleSetSecondaryEmail = (e) => {
    if(user.email.secondary.includes(e.target.value)) {
      setEmailExist(() => true)
      setSecondaryEmail(() => e.target.value)
    } else {
      setSecondaryEmail(() => e.target.value)
      setEmailExist(() => false)
    }    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(canSave) {
      await userPublicProfile({userId: user._id, nickname, biography, secondaryEmail, phone, linkedIn, twitter, facebook, instagram, youTube, website})

    setNickname(() => "")
    setBiography(() => "")
    setSecondaryEmail(() => "")
    setPhone(() => "")
    setLinkedIn(() => "")
    setTwitter(() => "")
    setFacebook(() => "")
    setInstagram(() => "")
    setYouTube(() => "")
    setWebsite(() => "")
    }
  }

  useLayoutEffect(() => {
    if (userAction) {
      setNickname(() => user.username)
      setBiography(() => user.bio)
      setSecondaryEmail(() => user.email.secondary[user.email.secondary.length - 1])
      setPhone(() => user.phonenumber)
      setLinkedIn(() => user.socialLinks.linkedin)
      setTwitter(() => user.socialLinks.twitter)
      setFacebook(() => user.socialLinks.facebook)
      setInstagram(() => user.socialLinks.instagram)
      setYouTube(() => user.socialLinks.youtube)
      setWebsite(() => user.socialLinks.website)
    }
  },[userAction, user])
 

  return (
    <>
    {
      userAction ? 
      <div className='text-left px-5 mt-8 font-source pt-7 pb-5 disabled:opacity-40' disabled={isFetching}>
      <div>
        <UserInfoHeading head={"Public URL"} text={"Share your accomplishments with the world"}/>
        <small className='text-sm font-normal my-1 italic text-[#f93d53]'>
          <p className='p-px pl-0 mt-2'>Provide a <span className='text-[#f70d28] font-semibold'>"Nickname"</span>, to create your public admin profile</p></small>
      </div>


      {/* User Contact and Social media contact section start here */}
      <div>
        <UserInfoHeading head={"Contact Me"} text={"How visitors will get in touch with you"}/>
        
        <form className='my-7' onSubmit={handleSubmit}>

           {/* Nickname for the user start here */}
          <div className='py-2 mt-3'>
            <label htmlFor="usernickname" className='sm:flex sm:gap-x-2.5'>
              <span className='text-[#282a35] sm:text-lg font-semibold mt-3'>NickName:</span>
                <div className='w-full'>
                  <input 
                  type="text" 
                  id='usernickname' 
                  name='usernickname' 
                  className='rounded-full invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488] px-1.5 mb-1.5 capitalize' 
                  placeholder={user.username}
                  value={nickname}
                  onChange={(e) => setNickname(() => e.target.value)}
                  />
                  <p className='text-sm font-normal text-[#798488] mx-4 italic'>No use of  
                    <span className='text-sm sm:text-base px-1 font-semibold'>&#91; &#8208; &#64; &#33; &#35; &#36; &#37; &#43; &#x204E; &#38; 
                    &#60; &#62; &#8242; &#8243; &#8260; &#8901; &#93;</span> etc on Nick name.</p>
                </div>
            </label>
          </div>

          {/* User Bio section start here */}
          <div className='my-10'>
            <UserInfoHeading head={"Bio"} text={"write a short introduction to best describe yourself to visitors"}/>

            <textarea 
            name="userbio" 
            id="userbio" 
            cols="30" 
            rows="3" 
            placeholder={user.bio} 
            value={biography}
            className=''
            onChange={(e) => setBiography(() => e.target.value)}
            >
            </textarea>
          </div>
         
            {/* User Secondary Email  */}
          <label htmlFor="usercontactemail" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
               <FaEnvelopeOpen className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Email
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="email" 
              id="usercontactemail" 
              name="usercontactemail"  
              placeholder={user.email.secondary[user.email.secondary.length - 1]}
              value={secondaryEmail}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488] mb-0"
              onChange={handleSetSecondaryEmail}
              />
              {emailExist ? <p className='text-xs text-rose-500 tracking-wider font-lora'>This email already exist</p> : ""}
            </div>
          </label>

              {/* User Phone Number  */}
          <label htmlFor="usercontactphone" className="sm:grid sm:grid-cols-4 sm:gap-x-4 mt-5">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
                <FaPhoneAlt className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Phone
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="tel" 
              id="usercontactphone" 
              name="usercontactphone"  
              placeholder={user.phonenumber}
              value={phone}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setPhone(() => e.target.value)}
              />
            </div>
          </label>

              {/* User LinkedIn contact */}
          <label htmlFor="usercontactlinkedin" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
              <FaLinkedinIn className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Linkedin
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="url" 
              id="usercontactlinkedin" 
              name="usercontactlinkedin"  
              placeholder={user.socialLinks.linkedin}
              value={linkedIn}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setLinkedIn(() => e.target.value)}
              />
            </div>
          </label>

              {/* User Twitter contact */}
          <label htmlFor="usercontacttwitter" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
              <FaTwitter className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Twitter
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="url"
              id="usercontacttwitter" 
              name="usercontacttwitter"  
              placeholder={user.socialLinks.twitter}
              value={twitter}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setTwitter(() => e.target.value)}
              />
            </div>
          </label>

              {/* User Facebook contact */}
          <label htmlFor="usercontactfacebook" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
                <FaFacebookF className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Facebook
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="url" 
              id="usercontactfacebook" 
              name="usercontactfacebook"  
              placeholder={user.socialLinks.facebook}
              value={facebook}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setFacebook(() => e.target.value)}
              />
            </div>
          </label>

              {/* User Instagram contact */}
          <label htmlFor="usercontactinstagram" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
                <FaInstagram className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Instagram
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="url" 
              id="usercontactinstagram" 
              name="usercontactinstagram"  
              placeholder={user.socialLinks.instagram}
              value={instagram}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setInstagram(() => e.target.value)}
              />
            </div>
          </label>

              {/* User YouTube contact */}
          <label htmlFor="usercontactyoutube" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
                <FaYoutubeSquare className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                YouTube
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="url" 
              id="usercontactyoutube" 
              name="usercontactyoutube"  
              placeholder={user.socialLinks.youtube}
              value={youTube}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setYouTube(() => e.target.value)}
              />
            </div>
          </label>

              {/* User Website contact */}
          <label htmlFor="usercontactwebsite" className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
                <FaGlobe className="inline-block align-text-top" />
              <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                Website
              </span>
            </span>

            <div className='w-full sm:col-span-3'>
              <input 
              type="url" 
              id="usercontactwebsite" 
              name="usercontactwebsite"  
              placeholder={user.socialLinks.website}
              value={website}
              className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
              onChange={(e) => setWebsite(() => e.target.value)}
              />
            </div>
          </label>


          <div className='mt-5 p-2 grid place-items-end'>
            <button className='text-[#798488] bg-gray-300 capitalize border-0 py-2.5 px-8 rounded-full cursor-pointer text-base shadow-[#444] 
              shadow-sm disabled:opacity-40' type='submit' name="submit" disabled={!canSave}>Save</button>
          </div>
        </form>
      </div>
    </div> :
      singleUser
    }
    </>
    
  )
}

export default MyPublicProfile