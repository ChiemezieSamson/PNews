import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPassword } from '../../../../Reduxstore/Slices/users/UsersSlice'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'

const ChangePassword = () => {
  const user = useSelector(state => state.users)
  const [openCat, setOpenCat] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("⁕⁕⁕⁕⁕⁕⁕");
  const [password, setPassword] = useState("⁕⁕⁕⁕⁕⁕⁕");
  const [confirmPassword, setConfirmPassword] = useState("⁕⁕⁕⁕⁕⁕⁕");
  const [requiredText, setRequiredText] = useState(false)
  const [notSamePassword, setNotSamePassword] = useState(false)


  const dispatch = useDispatch()

  const userId = user[1] ? user[1].id : user[0].id

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(currentPassword !== user[0].password) {
      setRequiredText(() => true)
      setNotSamePassword(() => false)
    } else if (confirmPassword !== password) { 
      setNotSamePassword(() => true)
      setRequiredText(() => false)
    }else {
      setRequiredText(() => false)
      setNotSamePassword(() => false)
      dispatch(changeUserPassword({userId, currentPassword, password, confirmPassword}))
    }

    setConfirmPassword(() => "")
    setPassword(() => "")
    setCurrentPassword(() => "")
  }

  return (
    <div className='font-poppins relative'>
      <WritePostAsideOpenClosebar BarName={"Change Password"} handle={handleOpenCloseChild}/>

      <div className={`${openCat? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
        <SinginAndSecurityIntro text={"Create a new password that is at least 8 characters long."} />

          <div>
            <form className='text-sm text-[#aeaeae] py-4 mt-4' onSubmit={handleSubmit}>

              {/* User current password input box start here */}
              <label htmlFor="changeusercurrentpassword">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">Type your current password</span>
                <input 
                type="password" 
                id='changeusercurrentpassword' 
                name='changeusercurrentpassword' 
                value={currentPassword} 
                className='placeholder:text-[#aeaeae] placeholder:text-sm mb-0'
                onChange={(e) => setCurrentPassword(() => e.target.value)}
                />
              </label>
              {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Wrong password!</p> : "" }

               {/* User new password input box start here */}
              <label htmlFor="usernewpassword" className='mt-5 block'>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">Type your new password</span>
                <input 
                type="password" 
                id='usernewpassword' 
                name='usernewpassword' 
                value={password} 
                className='placeholder:text-[#aeaeae] placeholder:text-sm'
                onChange={(e) => setPassword(() => e.target.value)}
                />
              </label>

               {/* User retype password input box start here */}
              <label htmlFor="retypeusernewpassword">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">Retype your new password</span>
                <input 
                type="password" 
                id='retypeusernewpassword' 
                name='retypeusernewpassword'  
                value={confirmPassword}
                className='placeholder:text-[#aeaeae] placeholder:text-sm mb-0'
                onChange={(e) => setConfirmPassword(() => e.target.value)}
                />
              </label>
              {notSamePassword ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Wrong confirmPassword!</p> : "" }

              <div className='grid grid-flow-col justify-between mt-14'>
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
