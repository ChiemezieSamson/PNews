import React from 'react'
import { UserContacts } from '../../../data'
import { UserInfoHeading } from '../../SharedAsset/SharedAssets'

const MyPublicProfile = () => {

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>
      <div>
        <UserInfoHeading head={"Public URL"} text={"Share your accomplishments with the world"}/>
        <small className='text-sm font-normal my-1 italic text-[#f93d53]'>
          <p className='p-px pl-0 mt-2'>Provide a <span className='text-[#f70d28] font-semibold'>"Nickname"</span>, to create your public admin profile</p></small>
      </div>

        {/* Nickname for the user start here */}
      <div className='py-2 mt-3'>
        <label htmlFor="usernickname" className='sm:flex sm:gap-x-2.5'>
          <span className='text-[#282a35] sm:text-lg font-semibold mt-3'>NickName:</span>
          <div className='w-full'>
            <input 
            type="email" 
            id='usernickname' 
            name='usernickname' 
            className='rounded-full invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488] px-1.5 mb-1.5' 
            placeholder='@"nickname"'
            form='userpublicinformation'/>
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
        form='userpublicinformation'
        placeholder='text here...' 
        className=''></textarea>
      </div>

      {/* User Contact and Social media contact section start here */}
      <div>
        <UserInfoHeading head={"Contact Me"} text={"How visitors will get in touch with you"}/>
        
        <form id='userpublicinformation' name='userpublicinformation' className='my-7'>
          {UserContacts.map((userPublicInfo) => {
            return (
              <label htmlFor={userPublicInfo.inputid} key={userPublicInfo.id} className="sm:grid sm:grid-cols-4 sm:gap-x-4">
                <span className='text-[#282a35] sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>
                  {userPublicInfo.icon}
                  <span className='text-[#282a35] min-w-fit p-1 ml-4 font-semibold inline-block'>
                    {userPublicInfo.name}
                  </span>
                </span>

                <div className='w-full sm:col-span-3'>
                  <input 
                  type={userPublicInfo.inputtype} 
                  id={userPublicInfo.inputid} 
                  name={userPublicInfo.inputid}  
                  placeholder={userPublicInfo.placeholder}
                  className="invalid:border-red-400 invalid:shadow-red-400 placeholder:text-[#798488]"
                  />
                </div>
              </label>
            )
          })}

          <div className='mt-5 p-2 grid place-items-end'>
            <button className='text-[#798488] bg-gray-300 capitalize border-0 py-2.5 px-8 rounded-full cursor-pointer text-base shadow-[#444] 
              shadow-sm' type='submit' form='userinformation'>Save</button>
          </div>
        </form>

      </div>


    </div>
  )
}

export default MyPublicProfile
