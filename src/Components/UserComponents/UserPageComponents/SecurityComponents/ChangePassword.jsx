import React, { useState } from 'react'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'

const ChangePassword = () => {
  const [openCat, setOpenCat] = useState(false)

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }


  return (
    <div className='font-poppins relative'>
      <WritePostAsideOpenClosebar BarName={"Change Password"} handle={handleOpenCloseChild}/>

      <div className={`${openCat? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
        <SinginAndSecurityIntro text={"Create a new password that is at least 8 characters long."} />

          <div>
            <form className='text-sm text-[#aeaeae] py-4 mt-4'>

              {/* User current password input box start here */}
              <label htmlFor="">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">Type your current password</span>
                <input 
                type="password" 
                id='changeusercurrentpassword' 
                name='changeusercurrentpassword' 
                placeholder='Current password' 
                className='placeholder:text-[#aeaeae] placeholder:text-sm'/>
              </label>

               {/* User new password input box start here */}
              <label htmlFor="">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">Type your new password</span>
                <input 
                type="password" 
                id='usernewpassword' 
                name='usernewpassword' 
                placeholder='New password' 
                className='placeholder:text-[#aeaeae] placeholder:text-sm'/>
              </label>

               {/* User retype password input box start here */}
              <label htmlFor="">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">Retype your new password</span>
                <input 
                type="password" 
                id='retypeusernewpassword' 
                name='retypeusernewpassword'  
                placeholder='Retype password' 
                className='placeholder:text-[#aeaeae] placeholder:text-sm'/>
              </label>

              <div className='grid grid-flow-col justify-between mt-8'>
                <button 
                type='submit' 
                id='saveusernewpassword' 
                name='saveusernewpassword' 
                className='mx-1 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
                text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600'
                >Save password</button>
                <button 
                type='button' 
                id='forgotpassword' 
                name='forgotpassword' 
                className='mx-1 cursor-pointer hover:bg-[#e4e4e4] text-neutral-600 tracking-wider px-2 py-1 rounded-md hover:shadow 
                hover:shadow-gray-400 text-sm transition-all duration-200 ease-linear'>Forgot password</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default ChangePassword
