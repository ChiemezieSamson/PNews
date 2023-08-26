import React, { useEffect, useRef, useState } from 'react'
import { useUpdateExistingUserMakePrimaryMutation, useUpdateExistingUserRemoveSecondaryMutation, useUpdateExistingUserSecondaryEmailMutation} from '../../../../Reduxstore/Slices/users/UsersSlice'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { CorrectTick, PasswordDisplay, SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'
import { handelPassWordValidation } from '../../../SharedAsset/Vaidations/bcrypt'
import UserValidation from '../../../SharedAsset/Vaidations/UserValidation'
import { handleEmailPattern, handleUserPassword } from '../../../SharedAsset/Vaidations/RegularExpression'
import { UserSecondaryEmailSpinner } from '../../../SharedAsset/Spinners/Spinner'


const Email = ({user, userAction}) => {
  // updating user email change to the database
  const [userEmailUpdate, {isLoading}] = useUpdateExistingUserSecondaryEmailMutation()
  // changing the primary email on the database
  const [userEmailMakePrimary, {isLoading: makePrimary}] = useUpdateExistingUserMakePrimaryMutation()
  // deleting the user secondary email
  const [userEmailRemoveSecondary, {isLoading: removeSecondary}] = useUpdateExistingUserRemoveSecondaryMutation()
  
  const [newEmail, setNewEmail] = useState("")
  const [message, setMessage] = useState("")
  const [getUserpassword, setGetUserpassword] = useState("") 
  const [password, setPassword] = useState(""); 
  const [emailOfTheClickedButton, setEmailOfTheClickedButton] = useState("")
  const [textContentOfTheClickedButton, setTextContentOfTheClickedButton] = useState("Make primary")
  const [errMsg, setErrMsg] = useState('')
  const [userEmail, setUserEmail] = useState([])

  const [showPassword, setShowPassword] = useState(false); // show the password when user click the eye
  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error
  const [openEmail, setOpenEmail] = useState(false) // use to open and close the Email section
  const [openAddnewEmail, setOpenAddnewEmail] = useState(false) // use to open and close the add new Email section
  const [wrongPassword, setWrongPassword] = useState(false) // notify when if the enterend password is wrong
  const [wrongPassword2, setWrongPassword2] = useState(false) // notify when if the enterend password is wrong
  const [emailExist, setEmailExist] = useState(false) // notify the user that the entered email already exist
  // use to open and close the comfirmation box
  const [openGetUserPasswordForMakeAndRemove, setOpenGetUserPasswordForMakeAndRemove] = useState(false)

  const [isValid, setIsValid] = useState(false) // regular expressions
  const [emailIsValid, setEmailIsValid] = useState(false); // regular expressions
  const [passWordIsValid, setPassWordIsValid] = useState(false); // regular expressions
  
  const ButtonRef = useRef();

  // handling the display or hidden of the whole Email component
  const handleOpenCloseChild = () => {
    
    setOpenEmail((change) => !change)
    setOpenAddnewEmail(() => false)


    setNewEmail(() => "")
    setPassword(() => "")
    setEmailExist(() => false)
    setEmailIsValid(() => false)
    setPassWordIsValid(() => false);
  }

  // handling the display or hidden of add new Email component
  const handleOpenAddEmail = () => {
    setOpenAddnewEmail((change) => !change)

    setNewEmail(() => "")
    setPassword(() => "")
    setEmailExist(() => false)
    setEmailIsValid(() => false)
    setPassWordIsValid(() => false);
  }

  // handling the display or hidden of comfirmation box
  const handleCloseGetUserPasswordForMakeAndRemove = () => {
    setOpenGetUserPasswordForMakeAndRemove(() => false)

    setGetUserpassword(() => "")
    setMessage(() => "")
    setWrongPassword2(() => false)
    setIsValid(() => false);   
    setEmailOfTheClickedButton(() => "")
    setTextContentOfTheClickedButton(() => "Make primary")
  }

  // getting the email clicked on, command clicked on and opening the comfirmation box
  const handleMakePrimaryButton = (e) => {
     // close the error message(if any), once the user change any input
     if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }  

    const emailClicked = e.target.id
    const commandClicked = e.target.textContent

    setEmailOfTheClickedButton(() => emailClicked.toLowerCase())
    setTextContentOfTheClickedButton(() => commandClicked)
    setOpenGetUserPasswordForMakeAndRemove(() => true)  
    
    
    if (commandClicked === "Make primary") {
      setMessage(() => "Enter your password to make this the primary email")
    } else {
      setMessage(() => "Enter your password to delete this email")
    }
  }

  // handing getting and setting create  new email password 
  const handleUserpassword = (e) => {
    // close the error message(if any), once the user change any input
    if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value);// function for texting the entered text format 

    setPassWordIsValid(isValid);
    setPassword(() => value)
  }

   // handing getting and setting users password for before a user can make changes
   const handleSetGetUserpassword = (e) => {
    setWrongPassword2(() => false)
     // close the error message(if any), once the user change any input
     if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value)

    if(!isValid && value) {
      setWrongPassword2(() => true)
    }

    setIsValid(isValid);
    setGetUserpassword(() => value)
  }


  // handling save the email content
  const handleEmail = (event) => {
    setEmailExist(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const checkUserEmail = user?.email?.secondary // get all the exiting secondary email
    const { value } = event.target;    
    const { isValid } = handleEmailPattern(value);// function for texting the entered text format

    setEmailIsValid(isValid)
    setNewEmail(() => value)

    if (checkUserEmail?.includes(value)){ // checke if the entered value is in existence
      
      setEmailExist(() => true)
    }
   }
  
  
  // CREATE NEW EMAIL
  const canSave = [password, newEmail, emailIsValid, passWordIsValid].every(Boolean) && !isLoading && !emailExist

  const handleOnSubmit = async  (e) => {
    e.preventDefault(); 

    // check if the password entered is same as the user password 
    if (!handelPassWordValidation(password, user)){
      setWrongPassword(() => true)
      // empty the input boxs
      setNewEmail(() => "")
      setPassword(() => "")
    }
     
    if(canSave && handelPassWordValidation(password, user)) {
      try {
        
        await userEmailUpdate({userId: user?._id, newEmail, password})

        setOpenAddnewEmail(() => false)
      } catch (err) {

        console.error("Something went wrong!", err)
        setErrMsg('Failed to update!');
        setErrMsgOn(() => true)
      }
    } 

    // empty the input boxs and close the tab
    setNewEmail(() => "")
    setPassword(() => "")
    setWrongPassword(() => false)
    setEmailIsValid(() => false)
    setPassWordIsValid(() => false)
  }


  const canMakeChanges = [emailOfTheClickedButton, getUserpassword, isValid].every(Boolean) && !makePrimary && !wrongPassword2 && !removeSecondary

   // DELETE EMAIL OR MAKE IT THE PRIMARY EMAIL
   const handleMakePrimaryORDeleteEmailAfterUserEnterPassword = async (e) => {
    e.preventDefault();

    const canMakePrimary = textContentOfTheClickedButton === "Make primary" && 
    textContentOfTheClickedButton === ButtonRef?.current?.textContent 

    const canRemove = textContentOfTheClickedButton === "Remove" && 
    textContentOfTheClickedButton === ButtonRef?.current?.textContent 

    // validating password with bycrpt
    if (!handelPassWordValidation(getUserpassword, user)){
      setWrongPassword2(() => true)
      setGetUserpassword(() => "")
    }

    if (canMakeChanges) {

      if (canMakePrimary && handelPassWordValidation(getUserpassword, user)) {
  
        try {
  
          await userEmailMakePrimary({userId: user?._id, primaryEmail: user?.email?.primary, emailOfTheClickedButton})
          
          setOpenGetUserPasswordForMakeAndRemove(() => false)
        } catch (err) {
  
          console.error("Something went wrong!", err)
          setErrMsg('Failed to update!');
          setErrMsgOn(() => true)
        }
      } 
  
     
      if(canRemove && handelPassWordValidation(getUserpassword, user)) {
  
        try {
  
          await userEmailRemoveSecondary({userId: user?._id, emailOfTheClickedButton})
          
          setOpenGetUserPasswordForMakeAndRemove(() => false)
        } catch (err) {
  
          console.error("Something went wrong!", err)
          setErrMsg('Failed to update!');
          setErrMsgOn(() => true)
        }
      }
    }


    setWrongPassword2(() => false)
    setIsValid(() => false)
    setGetUserpassword(() => "")
    setEmailOfTheClickedButton(() => "")
    setTextContentOfTheClickedButton(() => "")
    setMessage(() => "")
  }


  useEffect(() => {
     
   if(userAction) {
      // Change each array to object with id for keys
      let userEmail = user?.email?.secondary?.map((title, id) => ({id: id, title: title}))
      setUserEmail(() => userEmail)
   }

  }, [user, userAction])

  
  return (
    <div className='font-poppins relative'>

      <WritePostAsideOpenClosebar BarName={"Email addresses"} handle={handleOpenCloseChild}/>
      {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}

      <div className={`${openEmail? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>

        <SinginAndSecurityIntro text={"Emails you've added"} />

        {/* the primary and secondary emails display starts here */}
        <div className='mt-5 py-1 tracking-wide'>

          <div className='py-0.5 mb-10'>
            <h6 className='text-sm font-bold text-stone-800 mb-4'>Primary email</h6>
            {userAction ? <p>{user?.email?.primary}</p> : <p className='skeleton w-1/3 h-4 mb-0.5 rounded-sm'></p>}
          </div>

          {/* secondary emails display here */}
          {userAction ?
            <ul className={`${user?.email?.secondary?.length <= 0 ? "hidden" : "block"}`}>

              <h6 className='text-sm font-bold text-stone-800 mb-4'>Secondary email</h6>
                              
              {userEmail.map((email) => {

                return (

                  <li className='sm:grid sm:grid-flow-col sm:justify-between mt-5' key={email.id}> 

                    <p>{email.title}</p>          

                    <span className='text-sm text-gray-400 inline-block'>   

                      {/* Make this email the primary email button section is here */}
                      <button 
                        type='button' 
                        id={email.title}
                        name='makeprimaryemailbutton'
                        className='sm:mx-2 mr-2 cursor-pointer hover:bg-[#e4e4e4] tracking-wider sm:px-1 pr-1 inline-block rounded-md
                          hover:shadow hover:shadow-gray-400 transition-all duration-200 ease-linear disabled:opacity-40'
                          onClick={handleMakePrimaryButton}>Make primary</button>
                      
                      {/* Remove this email from secondary email button section is here */}
                      <button 
                        type='button' 
                        id={email.title}
                        name='removeemailbutton'
                        className='mx-2 cursor-pointer hover:bg-[#e4e4e4] tracking-wider px-1 inline-block rounded-md
                        hover:shadow hover:shadow-gray-400 transition-all duration-200 ease-linear' 
                        onClick={handleMakePrimaryButton}>Remove</button>
                    </span>
                  </li>   
                )
              })}                       
            </ul> :
            <UserSecondaryEmailSpinner />
          }          

          {/* add new email address section start here */}
          <div className='mt-14 py-1'>
            <button 
              type='button' 
              id='addemailaddressbutton'
              name="addemailaddressbutton"
              className="text-blue-400  mt-3 mb-3 inline-block text-base cursor-pointer border border-solid border-blue-400
              hover:text-blue-500 py-1 px-3 rounded-full hover:border-blue-600 hover:bg-blue-100 transition-all 
                duration-200 ease-linear" onClick={handleOpenAddEmail}>
                {openAddnewEmail ? "Close" : "Add email address"}
            </button>
          </div>

          {/* The hidden part where you add your new email section start here */}
          <div className={`${openAddnewEmail? "block" : "hidden"}`}>

            <div className='mb-5 py-1'>
              <h6 className='text-sm font-bold text-stone-800 mb-4'>Add a new email</h6>
            </div>
              
            <form onSubmit={handleOnSubmit}>

              {wrongPassword && <p className='text-xs text-rose-500 tracking-wider font-lora'>wrong credentials!</p>}

              <label htmlFor="newemailaddress">

                <span className="text-xs tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block">
                  Enter new email address
                </span>
                
                <div className='relative mb-5'>

                  <input 
                    type="email" 
                    name='newemailaddress' 
                    id='newemailaddress' 
                    value={newEmail}
                    placeholder='myemailexample@email.com' 
                    className={`placeholder:text-neutral-400 disabled:opacity-40 mb-0 ${(!emailIsValid && newEmail) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`}
                    onChange={handleEmail}
                    required
                    disabled={!userAction}
                  />   

                  {emailExist && <p className='text-xs text-rose-500 tracking-wider  font-lora'>Email already exist!</p>} 

                  <CorrectTick 
                    IsValid={emailIsValid && !emailExist}
                    positionTop={"top-[27%]"}
                  />               
                </div>
              </label>

              <label htmlFor="newemailuserpassword">

                <span className="text-xs tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block">
                  Enter your account password
                </span>

                <div className='relative'>

                  <input 
                    type={`${showPassword ? "text" : "password"}`}
                    name='newemailuserpassword' 
                    id='newemailuserpassword'
                    maxLength={11}
                    placeholder='●●●●●●●●●' 
                    value={password}
                    className={`placeholder:text-neutral-400 disabled:opacity-40 ${(!passWordIsValid && password) ? 
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


              <div className='grid grid-flow-col justify-between mt-14'>
                <button 
                type='submit' 
                id='addnewemailbutton' 
                name='addnewemailbutton' 
                className='mx-1 cursor-pointer bg-[#e4e4e4] tracking-wider px-2 py-1 rounded-md shadow shadow-gray-400 
                text-sm hover:bg-rose-500 hover:text-white transition-all duration-200 ease-linear text-neutral-600 disabled:opacity-40'
                disabled={!canSave}
                >Add email</button>

                <button 
                type='button' 
                id='emailforgotpassword' 
                name='emailforgotpassword'
                disabled={!userAction} 
                className='mx-1 cursor-pointer hover:bg-[#e4e4e4] text-neutral-600 tracking-wider px-2 py-1 rounded-md hover:shadow 
                hover:shadow-gray-400 text-sm transition-all duration-200 ease-linear disabled:opacity-40'>Forgot password</button>
              </div>
            </form>
          </div>
        </div>
      </div> 


      {/* The box to enter user password before the secondary email will be made your primary email is here */}
      <UserValidation 
        openValidation={openGetUserPasswordForMakeAndRemove}
        onSubmitValidation={handleMakePrimaryORDeleteEmailAfterUserEnterPassword}
        onWrongUserPassword={wrongPassword2}
        handleClose={handleCloseGetUserPasswordForMakeAndRemove}
        canDelete={canMakeChanges && handelPassWordValidation(getUserpassword, user)}          
        Userpassword={getUserpassword}
        handleSetGetUserpassword={handleSetGetUserpassword}
        ButtonRef={ButtonRef}
        textContentOfTheClickedButton={textContentOfTheClickedButton}
        message={message}
        isValid={isValid}
      />
    </div>
  )
}

export default Email