import React, { useState } from 'react'
import { useUpdateExistingUserPasswordMutation } from '../../../../Reduxstore/Slices/users/UsersSlice'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { PassWordTextStructure, PasswordDisplay, SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'
import { handelPassWordValidation } from '../../../SharedAsset/Vaidations/bcrypt'
import { handleUserPassword } from '../../../SharedAsset/Vaidations/RegularExpression'

const ChangePassword = ({user, userAction}) => {
  // updating user password changes to the database
  const [changeUserPassword, { isLoading }] = useUpdateExistingUserPasswordMutation()
 
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState('')

  const [showPassword, setShowPassword] = useState(false); // show the password when user click the eye
  const [showNewPassword, setShowNewPassword] = useState(false); // show the password when user click the eye
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // show the password when user click the eye
  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error
  const [openPassword, setOpenPassword] = useState(false) // use to open and close the password section
  const [requiredText, setRequiredText] = useState(false) // notify when if the enterend password is wrong
  // notify when if the enterend retyped password is not same with the password
  const [passwordNotSame, setPasswordNotSame] = useState(false); 
  // notify the user that new password can't be same as the existing password
  const [passwordCanNotSame, setPasswordCanNotSame] = useState(false); 

  const [passWordIsValid, setPassWordIsValid] = useState(false); // regular expressions
  const [newPassWordIsValid, setNewPassWordIsValid] = useState(false); // regular expressions
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false); // regular expressions

  // handling the display or hidden of the whole password component
  const handleOpenCloseChild = () => {
    setOpenPassword((change) => !change)

    setPassWordIsValid(() => false)
    setNewPassWordIsValid(() => false)
    setConfirmPasswordIsValid(() => false)
    setPasswordCanNotSame(() => false)
     
    setConfirmPassword(() => "")
    setPassword(() => "")
    setCurrentPassword(() => "")   
  }


  // handing getting and setting create new user password 
  const handleUserpassword = (e) => {
    setRequiredText(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value);// function for texting the entered text format 

    setPassWordIsValid(isValid);
    setCurrentPassword(() => value)
  }


  // handing getting and setting users password 
  const handleNewpassword = (e) => {
    setPasswordCanNotSame(() => false)
    setPasswordNotSame(() => false)
    setRequiredText(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }
    
    const { value } = e.target;
    const { isValid } = handleUserPassword(value);// function for texting the entered text format    
    setNewPassWordIsValid(isValid);
    setPassword(() => value)

    if(handelPassWordValidation(value, user) || value === currentPassword) {

      setPasswordCanNotSame(() => true)
    }

    if(confirmPassword && value !== confirmPassword) {

      setPasswordNotSame(() => true)
    }
  }


  // handing getting and setting users password 
  const handleUserConFirmPassword = (e) => {
    setPasswordNotSame(() => false)
    setRequiredText(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value);// function for texting the entered text format    

    setConfirmPasswordIsValid(isValid);
    setConfirmPassword(() => value)

    if(value !== password) {

      setPasswordNotSame(() => true)
    }
  }


  // UPDATE USER PASSWORD
  const canSave = [currentPassword, password, confirmPassword, passWordIsValid, newPassWordIsValid, confirmPasswordIsValid].every(Boolean) 
                && !isLoading && !passwordNotSame && !passwordCanNotSame


  const handleSubmit = async (event) => {
    setPasswordNotSame(() => false)
    event.preventDefault();

    if(!handelPassWordValidation(currentPassword, user)) {

      setRequiredText(() => true)
    } 
    
    if(canSave && handelPassWordValidation(currentPassword, user)){

      try {

        await changeUserPassword({userId: user?._id, currentPassword, password, confirmPassword})

        setRequiredText(() => false)
       
      } catch (err) {

        console.error('Failed to update password: ', err)
        setErrMsg('Failed to update password');
        setErrMsgOn(() => true)
      }   
    }

    setPassWordIsValid(() => false)
    setNewPassWordIsValid(() => false)
    setConfirmPasswordIsValid(() => false)
    setPasswordCanNotSame(() => false)
     
    setConfirmPassword(() => "")
    setPassword(() => "")
    setCurrentPassword(() => "")    
  }

  return (
    <div className='font-poppins relativ'>

      <WritePostAsideOpenClosebar BarName={"Change Password"} handle={handleOpenCloseChild}/>

      {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}

      <div className={`${openPassword? "block" : "hidden"} mt-2 mb-10 px-3 text-stone-800`}>

        <SinginAndSecurityIntro text={"Create a new password that is at least 8 characters long."} />

        {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Wrong credentials!</p> : "" }
 
        <form className='text-sm text-neutral-600 py-4 mt-4' onSubmit={handleSubmit}>

          {/* User current password input box start here */}
          <label htmlFor="changeusercurrentpassword">

            <span className="text-xs tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block">
              Type your current password
            </span>
            
            <div className='relative'>

              <input 
                type={`${showPassword ? "text" : "password"}`}
                id='changeusercurrentpassword' 
                name='changeusercurrentpassword'
                maxLength={11}
                placeholder={'●●●●●●●●●'} 
                value={currentPassword} 
                className={`placeholder:text-neutral-400 disabled:opacity-40 ${(!passWordIsValid && currentPassword) ? 
                  "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500 shadow-inner shadow-red-400" : ""}`}
                onChange={handleUserpassword}
                required
                disabled={!userAction}
              />

              <PasswordDisplay 
                showPassword={showPassword}
                handle={() => setShowPassword((change) => !change)}
              />
            </div>
          </label>

            {/* User new password input box start here */}
          <label htmlFor="usernewpassword">

            <span className="text-xs tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block">
              Type your new password
            </span>
            
            {passwordCanNotSame && <p className='text-xs text-rose-500 tracking-wider font-lora'>Password can not be same with the existing password!</p> }

            <div className='relative'>

              <input 
                type={`${showNewPassword ? "text" : "password"}`}
                id='usernewpassword' 
                name='usernewpassword' 
                maxLength={11}
                placeholder={'●●●●●●●●●'} 
                value={password} 
                className={`placeholder:text-neutral-400 disabled:opacity-40 ${(!newPassWordIsValid && password) ? 
                  "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500 shadow-inner shadow-red-400" : ""}`}
                onChange={handleNewpassword}
                required
                disabled={!userAction}
              />

              <PasswordDisplay 
                showPassword={showNewPassword}
                handle={() => setShowNewPassword((change) => !change)}
              />
            </div>
          </label>

          <PassWordTextStructure groupStyle={"sxs:grid sxs:grid-cols-2"} />

          {/* User retype password input box start here */}
          <label htmlFor="retypeusernewpassword">

            <span className="text-xs tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block">
              Retype your new password
            </span>
            
            {passwordNotSame && <p className='text-xs text-rose-500 tracking-wider font-lora'>Passwords not same</p>}
            
            <div className='relative'>
              
              <input 
                  type={`${showConfirmPassword ? "text" : "password"}`}
                id='retypeusernewpassword' 
                name='retypeusernewpassword'
                maxLength={11}
                placeholder={'●●●●●●●●●'}   
                value={confirmPassword}
                className={`placeholder:text-neutral-400 disabled:opacity-40 ${(!confirmPasswordIsValid && confirmPassword) ? 
                  "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500 shadow-inner shadow-red-400" : ""}`}
                onChange={handleUserConFirmPassword}
                required
                disabled={!userAction}
              />

              <PasswordDisplay 
                showPassword={showConfirmPassword}
                handle={() => setShowConfirmPassword((change) => !change)}
              />
            </div>
          </label>

          <div className='grid grid-flow-col justify-between mt-14'>
            
            <button 
              type='submit' 
              id='saveusernewpassword' 
              name='saveusernewpassword' 
              className='mx-1 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
              text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600 disabled:opacity-40'
              disabled={!canSave}
            >Save password</button>

            <button 
              type='button' 
              id='forgotchangepassword' 
              name='forgotchangepassword' 
              disabled={!userAction}
              className='mx-1 cursor-pointer hover:bg-[#e4e4e4] text-neutral-600 tracking-wider px-2 py-1 rounded-md hover:shadow disabled:opacity-40
              hover:shadow-gray-400 text-sm transition-all duration-200 ease-linear'>Forgot password</button>
          </div>
        </form>     
      </div>
    </div>
  )
}

export default ChangePassword
