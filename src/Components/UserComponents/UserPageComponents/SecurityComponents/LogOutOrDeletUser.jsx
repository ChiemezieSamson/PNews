import React, { useState } from 'react'
import { Hanbugar3, WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'

const LogOutOrDeletUser = () => {
  const [openCat, setOpenCat] = useState(false)
  const [textContentOfTheClickedButton, setTextContentOfTheClickedButton] = useState("LogOut")
  const [openGetUserPasswordForMakeAndRemove, setOpenGetUserPasswordForMakeAndRemove] = useState(false)

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }

  const handleCloseGetUserPasswordForMakeAndRemove = () => {
    setOpenGetUserPasswordForMakeAndRemove(() => false)
  }

  const handleLogOutbuttonClicked = (e) => {
    setTextContentOfTheClickedButton(() => e.target.textContent)
    setOpenGetUserPasswordForMakeAndRemove(() => true) 
  }
  const handleDeletbuttonClicked = (e) => {
    setTextContentOfTheClickedButton(() => e.target.textContent)
    setOpenGetUserPasswordForMakeAndRemove(() => true) 
  }

  return (
    <div className='font-poppins relative'>
      <WritePostAsideOpenClosebar BarName={"Log Out Or Delete Account"} handle={handleOpenCloseChild}/>
      <div className={`${openCat? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
        <SinginAndSecurityIntro text={"Deleting your account also delete all your posts and previous activities."} />


        {/* Log out or delete button section start here */}
        <div className='grid grid-flow-col justify-between mt-12 py-5'>
            <button 
              type='submit' 
              id='saveusernewpassword' 
              name='saveusernewpassword' 
              className='mx-1 cursor-pointer text-sm sm:text-xl bg-[#bbbbbb] hover:bg-[#e4e4e4]  text-neutral-600 tracking-wider px-5 py-2 rounded-md shadow 
              shadow-gray-400 transition-all duration-200 ease-linear capitalize font-extrabold'
              onClick={handleLogOutbuttonClicked}
              >LogOut</button>
              
            <button 
              type='submit' 
              id='saveusernewpassword' 
              name='saveusernewpassword' 
              className='mx-1 cursor-pointer text-sm bg-rose-600 tracking-wider px-5 py-2  rounded-md shadow shadow-gray-400 
              sm:text-xl hover:bg-rose-400 text-white transition-all duration-200 ease-linear capitalize font-bold'
              onClick={handleDeletbuttonClicked}
              >Delete Account</button>
          </div>

        <div className={`${openGetUserPasswordForMakeAndRemove ? "fixed z-50 inset-0 p-0.5 -translate-x-[0] translate-y-0 grid place-content-center"
            : "-translate-x-[200%] translate-y-full hidden transition-all duration-500 ease-linear"}`}>

          {/* the hidden box for user password Auth  */}
          <div className='shadow-md shadow-gray-400 max-w-[300px] bg-white py-7 px-5 rounded-md relative '>
            <h6 className='font-bold text-lg text-[#444] mb-4'>Enter Password</h6>
            <p className='text-xs text-[#282a35]'>Enter your password to make this the primary email</p>

            {/* The form to get the user inputed password */}

            <form className='mt-4' >
              <label htmlFor="userpasswordformakeprimary" className='text-xs font-light '>Password</label>
              <input 
              type="password" 
              name='userpasswordforAuth' 
              id='userpasswordforAuth'
              className='placeholder:text-[#798488] invalid:border-red-400 invalid:shadow-red-400'
              required/>
              <div className='grid grid-flow-col justify-between'>
                <button type='submit' 
                id='logoutordeletuserButton' 
                name='logoutordeletuserButton' 
                className='mx-1 cursor-pointer bg-[#e4e4e4] tracking-wider px-1 rounded-md shadow shadow-gray-400 text-sm
                transition-all duration-200 ease-linear hover:bg-blue-400 hover:text-white'
                >{textContentOfTheClickedButton}</button>
                <button 
                type='submit' 
                id='forgetPasswordforLoguot' 
                name='forgetPasswordforLoguot'
                className='px-1 mx-1 cursor-pointer tracking-wider text-blue-500 text-sm 
                transition-all duration-200 ease-linear hover:text-blue-700'>Forgot password</button>
              </div>
            </form>

              {/* cancle button used on the Enter Password box */}
            <div className="absolute top-4 right-1.5 text-base text-[#8b8b8b] p-0.5 hover:text-[#444]">
              <Hanbugar3 closesidebar={handleCloseGetUserPasswordForMakeAndRemove}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LogOutOrDeletUser
