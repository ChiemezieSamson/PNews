import React from 'react'
import { FaEnvelopeOpen, FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTwitter, FaYoutubeSquare } from 'react-icons/fa'
import { UserInfoHeading } from '../../ButtonAndOthers/SharedAssets'

const MyPublicProfile = () => {


  const UserContacts = [
    {
      id: 1,
      icon: <FaEnvelopeOpen />,
      name: "Email",
      inputtype: "email",
      inputid: "usercontactemail",
      placeholder: "example@email.com"
    },
    {
      id: 2,
      icon: <FaPhoneAlt />,
      name: "Phone",
      inputtype: "tel",
      inputid: "usercontactphone",
      placeholder: "(+)number"
    },
    {
      id: 3,
      icon: <FaLinkedinIn />,
      name: "Linkedin",
      inputtype: "url",
      inputid: "usercontactlinkedin",
      placeholder: "https://www.example.com"
    },
    {
      id: 4,
      icon: <FaTwitter />,
      name: "Twitter",
      inputtype: "url",
      inputid: "usercontacttwitter",
      placeholder: "https://www.example.com"
    },
    {
      id: 5,
      icon: <FaFacebookF />,
      name: "Facebook",
      inputtype: "url",
      inputid: "usercontactfacebook",
      placeholder: "https://www.example.com"
    },
    {
      id: 6,
      icon: <FaInstagram />,
      name: "Instagram",
      inputtype: "url",
      inputid: "usercontactinstagram",
      placeholder: "https://www.example.com"
    },
    {
      id: 7,
      icon: <FaYoutubeSquare />,
      name: "YouTube",
      inputtype: "url",
      inputid: "usercontactyoutube",
      placeholder: "https://www.example.com"
    },
    {
      id: 8,
      icon: <FaGlobe />,
      name: "Website",
      inputtype: "url",
      inputid: "usercontactwebsite",
      placeholder: "https://www.example.com"
    },
  ]

  console.log(UserContacts)

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-12'>
      <div>
        <UserInfoHeading head={"Public URL"} text={"Share your accomplishments with the world"}/>
        <small className='text-sm font-normal my-1 italic text-[#f93d53]'>
          <p className='p-px pl-0 mt-2'>Provide a <span className='text-[#f70d28] font-semibold'>"Nickname"</span>, to create your public admin profile</p></small>
      </div>

        {/* Nickname for the user start here */}
      <div className='py-2 mt-3'>
        <label htmlFor="usernickname" className='flex gap-x-2.5'>
          <span className='text-[#282a35] text-lg font-semibold mt-3'>NickName:</span>
          <div className='w-full'>
            <input 
            type="email" 
            id='usernickname' 
            name='usernickname' 
            className='rounded-full invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488] px-1.5 mb-1.5' 
            placeholder='@"nickname"'
            form='userpublicinformation'/>
            <p className='text-sm font-normal text-[#798488] mx-4 italic'>No use of  
              <span className='text-base px-1 font-semibold'>&#91; &#8208; &#64; &#33; &#35; &#36; &#37; &#43; &#x204E; &#38; 
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
        form='userpublicinformation'
        placeholder='text here...' 
        className=''></textarea>
      </div>

      {/* User Contact and Social media contact section start here */}
      <div>
        <UserInfoHeading head={"Contact Me"} text={"How visitors will get in touch with you"}/>
        
        <form id='userpublicinformation' name='userpublicinformation'>

        </form>

      </div>


    </div>
  )
}

export default MyPublicProfile
