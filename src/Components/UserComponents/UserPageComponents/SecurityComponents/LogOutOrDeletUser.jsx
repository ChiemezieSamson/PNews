import React, { useEffect, useRef, useState } from 'react'
import {  WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'
import { useDeleteExistingUserMutation } from '../../../../Reduxstore/Slices/users/UsersSlice'
import { handelPassWordValidation } from '../../../SharedAsset/Vaidations/bcrypt'
import { useNavigate } from 'react-router-dom'
import UserValidation from '../../../SharedAsset/Vaidations/UserValidation'
import { handleUserPassword } from '../../../SharedAsset/Vaidations/RegularExpression'
import { useSendLogoutMutation } from '../../../../Reduxstore/Slices/authSlice/authApiSlic'

const LogOutOrDeletUser = ({user, refetch, userAction}) => {
  // use in deleting the user and any of the user posts
  const [deleteUser, { isLoading }] = useDeleteExistingUserMutation()
  const [loggingOut, { isLoading: isLoggingOut, isSuccess }] = useSendLogoutMutation()

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [errMsg, setErrMsg] = useState('')

  const [openLogOut, setOpenLogOut] = useState(false) // use to open and close the LogOut section
  const [wrongPassword, setWrongPassword] = useState(false)// notify when if the enterend password is wrong
  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error

  const [textContentOfTheClickedButton, setTextContentOfTheClickedButton] = useState("LogOut")
  // use to open and close the comfirmation box
  const [openGetUserPasswordForMakeAndRemove, setOpenGetUserPasswordForMakeAndRemove] = useState(false) 
 

  const [isValid, setIsValid] = useState(false) // regular expressions

  const navigate = useNavigate();
  const ButtonRef = useRef();

  // handling the display or hidden of the whole log out component
  const handleOpenCloseChild = () => {
    setOpenLogOut((change) => !change)
  }


  // handling the display or hidden of comfirmation box
  const handleCloseGetUserPasswordForMakeAndRemove = () => {
    setOpenGetUserPasswordForMakeAndRemove(() => false)

    setPassword(() => "")
    setMessage(() => "")
    setWrongPassword(() => false)
    setIsValid(() => false);   
    setTextContentOfTheClickedButton(() => "LogOut")
  }


 // getting the email clicked on, command clicked on and opening the comfirmation box
  const handleMakePrimaryButton = (e) => {
     // close the error message(if any), once the user change any input
     if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }  

    const commandClicked = e.target.textContent

    setTextContentOfTheClickedButton(() => commandClicked)
    setOpenGetUserPasswordForMakeAndRemove(() => true)  
    
    
    if (commandClicked !== "Delete Account") {
      setMessage(() => "Enter your password for logout")
    } else {
      setMessage(() => "Enter your password to delete your account")
    }
  }


  // handing getting and setting users password for before a user can make changes
  const handleSetGetUserpassword = (e) => {
    setWrongPassword(() => false)

     // close the error message(if any), once the user change any input
     if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value)

    if(!isValid && value) {
      setWrongPassword(() => true)
    }

    setIsValid(isValid);
    setPassword(() => value)
  }

  // LOGOUT OR DELETE START HERE
  const canMakeChanges = [password, isValid].every(Boolean) && !isLoading && !wrongPassword

  const handleDelete = async (e) => {
    e.preventDefault();

    const canDelete = textContentOfTheClickedButton === "Delete Account" && 
    textContentOfTheClickedButton === ButtonRef?.current?.textContent 

    const canLogOut = textContentOfTheClickedButton === "LogOut" && 
    textContentOfTheClickedButton === ButtonRef?.current?.textContent 

    
    if (!handelPassWordValidation(password, user)){
      setWrongPassword(() => true)
      setPassword(() => "")
    }
    
    
    if(canMakeChanges) {

      if(canDelete && handelPassWordValidation(password, user)){
  
        try {
          
          await deleteUser({userId: user?._id, password})

          await loggingOut()
        } catch (err) {
  
          console.error("Something went wrong!", err)
          setErrMsg('Failed to delete!');
          setErrMsgOn(() => true)
        }
      } 

      if (canLogOut && handelPassWordValidation(password, user)) {

        try {

          await loggingOut()

        } catch (err) {
  
          console.error("Something went wrong!", err)
          setErrMsg('Failed to logout!');
          setErrMsgOn(() => true)
        }
      }
    }


    setPassword(() => "")
    setPassword(() => "")
    setMessage(() => "")
    setWrongPassword(() => false)
    setIsValid(() => false);   
  }

  useEffect(() => {
    if (isSuccess){ 
      refetch()
      return navigate("/", {replace: true}, [navigate])}
  }, [isSuccess, navigate, refetch])


  return (
    <div className='font-poppins relative'>

      <WritePostAsideOpenClosebar BarName={"Log Out Or Delete Account"} handle={handleOpenCloseChild}/>
      {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}
      
      <div className={`${openLogOut ? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
        <SinginAndSecurityIntro text={"Deleting your account also delete all your posts and previous activities."} />


        {/* Log out or delete button section start here */}
        <div className={`grid grid-flow-col justify-between mt-12 py-5 ${isLoggingOut && "opacity-40 after:absolute after:inset-0 after:z-10"}`}>
          <button 
            type='submit' 
            id='saveusernewpassword' 
            name='saveusernewpassword' 
            className="mx-1 cursor-pointer text-sm sm:text-xl bg-[#bbbbbb] hover:bg-[#e4e4e4] text-neutral-600 tracking-wider px-5 py-2 rounded-md shadow 
            shadow-gray-400 transition-all duration-200 ease-linear capitalize font-extrabold disabled:opacity-40"
            onClick={handleMakePrimaryButton}
            disabled={!userAction}
          >LogOut</button>
            
          <button 
            type='submit' 
            id='saveusernewpassword' 
            name='saveusernewpassword' 
            className='mx-1 cursor-pointer text-sm bg-rose-600 tracking-wider px-5 py-2 rounded-md shadow shadow-gray-400 
            sm:text-xl hover:bg-rose-400 text-white transition-all duration-200 ease-linear capitalize font-bold disabled:opacity-40'
            onClick={handleMakePrimaryButton}
            disabled={!userAction}
          >Delete Account</button>
        </div>


        {/* The box to enter user password before user can delete account */}
        <UserValidation 
          openValidation={openGetUserPasswordForMakeAndRemove}
          onSubmitValidation={handleDelete}
          onWrongUserPassword={wrongPassword}
          handleClose={handleCloseGetUserPasswordForMakeAndRemove}
          canDelete={canMakeChanges &&  handelPassWordValidation(password, user)}          
          Userpassword={password}
          handleSetGetUserpassword={handleSetGetUserpassword}
          ButtonRef={ButtonRef}
          textContentOfTheClickedButton={textContentOfTheClickedButton}
          message={message}
          isValid={isValid}
        />        
      </div>
    </div>
  )
}

export default LogOutOrDeletUser
