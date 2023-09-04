import React, { useState } from 'react'
import { Hanbugar3 } from '../../ButtonAndOthers/Buttons'
import { PasswordDisplay } from '../SharedAssets';

const UserValidation = ({openValidation, onSubmitValidation, onWrongUserPassword, handleClose, canDelete,
  Userpassword, handleSetGetUserpassword, ButtonRef, textContentOfTheClickedButton, message, isValid}) => {
    const [showPassword, setShowPassword] = useState(false); // show the password when user click the eye
  
  return (
    <div className={`${openValidation ? "fixed z-50 inset-0 p-0.5 -translate-x-[0] translate-y-0 grid place-content-center"
        : "-translate-x-[200%] translate-y-full hidden transition-all duration-500 ease-linear"}`}>

      <div className='shadow-md font-poppins shadow-neutral-400 max-w-[300px] bg-white py-7 px-5 rounded-md relative'>

        <h6 className='font-bold text-lg text-stone-800 mb-4'>Enter Password</h6>

        <p className='text-sm text-stone-700'>{message}</p>

        {/* The form to get the user inputed password */}

        <form className='mt-4' onSubmit={onSubmitValidation}>
          
          {onWrongUserPassword ? <p className='text-xs text-rose-500 tracking-wider font-lora'>wrong credentials!</p> : "" }

          <label htmlFor="userpasswordformakeprimary" className='text-xs font-light'>
          
            <span className="text-xs text-left tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block">
              password
            </span>

            <div className='relative'>

              <input 
                type={`${showPassword ? "text" : "password"}`}
                name='userpassword' 
                maxLength={11}
                placeholder={"Enter password"}
                value={Userpassword}
                className={`placeholder:text-neutral-500 ${(!isValid && Userpassword) ? 
                  "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500 shadow-inner shadow-red-400" : ""}`}
                onChange={handleSetGetUserpassword}
                required
              />

              <PasswordDisplay 
                showPassword={showPassword}
                handle={() => setShowPassword((change) => !change)}
              />
            </div>
          </label>
            
          <div className='grid grid-flow-col justify-between'>

            <button type='submit' 
              name='userpasswordBtn' 
              className='mx-1 pt-px cursor-pointer bg-neutral-300 tracking-wider px-1 rounded-sm shadow shadow-neutral-400 text-sm
              TextHeadertransition hover:bg-red-500 hover:text-neutral-50 disabled:opacity-40 font-medium'
              ref={ButtonRef}
              disabled={!canDelete}
            >{textContentOfTheClickedButton}</button>

            <button 
              type='submit' 
              name='forgetPassword'
              className='px-1 mx-1 cursor-pointer tracking-wider text-blue-400 text-sm 
              TextHeadertransition hover:text-blue-700 disabled:opacity-40'
              >Forgot password</button>
          </div>
        </form>

          {/* cancle button used on the Enter Password box */}
        <div title='close' className="absolute top-4 right-1.5 text-base text-stone-500 p-0.5 hover:text-stone-800 TextHeadertransition">
          <Hanbugar3 closesidebar={handleClose}/>
        </div>
      </div>                
    </div> 
  )
}

export default UserValidation
