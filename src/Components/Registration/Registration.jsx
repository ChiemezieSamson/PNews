import React, { useState } from "react";
import { useCreateNewUserMutation } from "../../Reduxstore/Slices/users/UsersSlice";
import useFetchedUsers from "../SharedAsset/Spinners/userSpinner";
import { Link, useNavigate } from "react-router-dom";
import { handleEmailPattern, handleUserPassword, textAndNumberOnly, textOnly } from "../SharedAsset/Vaidations/RegularExpression";
import { CorrectTick, PassWordTextStructure, PasswordDisplay, isFecthingStyle } from "../SharedAsset/SharedAssets";

const RegistrationForm = () => {
  // Redux toolkit that calls the back end to create a user account
  const [addNewUser, { isLoading } ] = useCreateNewUserMutation()
  // Redux toolkit that calls the back end to fetch all the existing..
  // users in order to make sure we dont have same username or email
  const {userContent, useraction, isFetching} = useFetchedUsers()

  const users = useraction ? userContent : []

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [primary, setPrimary] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState('')

  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error
  const [userNameExist, setUserNameExist] = useState(false) // notify the user that the entered Username already exist
  const [emailExist, setEmailExist] = useState(false) // notify the user that the entered email already exist
  const [showPassword, setShowPassword] = useState(false); // show the password when user click the eye
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // show the password when user click the eye
   // notify when if the enterend retyped password is not same with the password
  const [passwordNotSame, setPasswordNotSame] = useState(false); 

  const [isValid, setIsValid] = useState(false); // regular expressions
  const [firstNameIsValid, setFirstNameIsValid] = useState(false); // regular expressions
  const [lastNameIsValid, setLastNameIsValid] = useState(false); // regular expressions
  const [emailIsValid, setEmailIsValid] = useState(false); // regular expressions
  const [passWordIsValid, setPassWordIsValid] = useState(false); // regular expressions
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false); // regular expressions

  const navigate = useNavigate();  

  // handling setting the value of first name
  const handleFirstName = (e) => {

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = textOnly(value); // function for texting the entered text format
    setFirstNameIsValid(isValid);
    setFirstName(() => value)
  }

  // handling setting the value of last name
  const handleLastName = (e) => {

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = textOnly(value); // function for texting the entered text format
    setLastNameIsValid(isValid);
    setLastName(() => value)
  }

  // handling setting the value of Username
  const handleUserName = (e) => {
    setUserNameExist(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const checkUserName = users?.map((user) => user.username);// get all the exiting user name
    const { value } = e.target;
    const { isValid } = textAndNumberOnly(value); // function for texting the entered text format

    setIsValid(isValid);
    setUsername(() => value)

    if (checkUserName?.includes(value?.toLowerCase())){ // checke if the entered value is in existence
      
      setUserNameExist(() => true)
    }
  }

  // handling save the email content
  const handleEmail = (event) => {
    setEmailExist(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const checkUserEmail = users?.map((user) => user?.email?.primary); // get all the exiting email
    const { value } = event.target;    
    const { isValid } = handleEmailPattern(value);// function for texting the entered text format

    setEmailIsValid(isValid)
    setPrimary(() => value)

    if (checkUserEmail?.includes(value)){ // checke if the entered value is in existence
      
      setEmailExist(() => true)
    }
   }

   // handing getting and setting users password 
  const handleUserpassword = (e) => {
    setPasswordNotSame(() => false)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value);// function for texting the entered text format    
    setPassWordIsValid(isValid);
    setPassword(() => value)

    if(confirmPassword && value !== confirmPassword) {

      setPasswordNotSame(() => true)
    }
  }

   // handing getting and setting users password 
  const handleUserConFirmPassword = (e) => {
    setPasswordNotSame(() => false)

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


  // CREATE A NEW USERR
  const canSave = [firstname, lastname, username, primary, password, confirmPassword,
       isValid, firstNameIsValid, lastNameIsValid, emailIsValid, passWordIsValid, 
       confirmPasswordIsValid].every(Boolean) && !isLoading && !passwordNotSame 
       && !emailExist && !userNameExist


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (canSave) {
      
      try {

        await addNewUser({firstname, lastname, username, primary, password, confirmPassword}).unwrap()

        navigate("/login")
      } catch (err) {

        console.error('Failed to register: ', err)
        setErrMsg('Failed to register');
        setErrMsgOn(() => true)
      }     
   }   

    setFirstName(() => "")
    setLastName(() => "")
    setPrimary(() => "")
    setPassword(() => "")
    setUsername(() => "")
    setConfirmPassword(() => "")
  };


  return (
    <div className={`pb-10 pt-3 text-left bg-gradient-to-b from-neutral-100 via-gray-50 to-neutral-100 ${isFecthingStyle(isFetching)}`}>
      
      <div className="md:w-[28rem] max-w-sm font-lora px-6 pb-3 rounded mx-auto">
        
        {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}

        {/* Register title */}
        <h3 className='text-2xl font-light text-center py-3 mb-2'>Register</h3>

        <div className='border border-solid border-neutral-200 w-full p-3 rounded-md shadow shadow-neutral-400 bg-blue-100/30'>

          {/* Register form */}
          <form onSubmit={handleSubmit}>

            {/* First Name */}
            <label className="text-gray-700" htmlFor="firstname">

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block text-sm">
                First Name
              </span>

              <div className='relative'>

                <input
                  className={`${(!firstNameIsValid && firstname) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""} disabled:opacity-40`}
                  id="firstname"
                  name="userregisteredfirstname"
                  type="text"
                  placeholder="First Name"
                  aria-label='text' 
                  maxLength={20}
                  autoFocus={true}              
                  required
                  disabled={!useraction}                 
                  value={firstname}
                  onChange={handleFirstName}
                />

                <CorrectTick 
                  IsValid={firstNameIsValid}
                  positionTop={"top-[18%]"}
                />                
              </div>
            </label>
  
            {/* Last Name */}
            <label className="text-gray-700" htmlFor="lastname">

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block text-sm">
                Last Name
              </span>

              <div className='relative'>

                <input
                  className={`${(!lastNameIsValid && lastname) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""} disabled:opacity-40`}
                  id="lastname"
                  name="userregisteredlastname"
                  type="text"
                  placeholder="Last Name"
                  aria-label='text' 
                  maxLength={20}             
                  required
                  disabled={!useraction}
                  value={lastname}
                  onChange={handleLastName}
                />

                <CorrectTick 
                  IsValid={lastNameIsValid}
                  positionTop={"top-[18%]"}
                />   
              </div>              
            </label>

            {/* User Name */}
            <label className="text-gray-700" htmlFor="username">

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block text-sm">
                User Name
              </span>

              <div className='relative'>

                <input
                  className={`${userNameExist && "mb-0"} ${(!isValid && username) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""} disabled:opacity-40`}
                  id="username"
                  name="userregisteredusername"
                  type="text"
                  placeholder="User Name"
                  aria-label='text' 
                  maxLength={19}             
                  required
                  disabled={!useraction}
                  value={username}
                  onChange={handleUserName}
                />

                {userNameExist && <p className='text-xs text-rose-500 tracking-wider font-lora mb-5'>Already have a user with this email!</p>}

                <CorrectTick 
                  IsValid={isValid}
                  positionTop={"top-[18%]"}
                /> 
              </div>              
            </label>

             {/* Email */}
            <label className="text-gray-700" htmlFor="primary">

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block text-sm">
                Email
              </span>

              <div className='relative'>

                <input
                  id="primary"
                  name="userregisteredprimary"
                  type="email"
                  className={`mb-0 ${(!emailIsValid && primary) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} disabled:opacity-40`}
                  placeholder="Email"
                  value={primary}
                  onChange={handleEmail}
                  required
                  disabled={!useraction}
                />  

                {emailExist && <p className='text-xs text-rose-500 tracking-wider font-lora'>Already have a user with this email!</p>}  

                <CorrectTick 
                  IsValid={emailIsValid && !emailExist}
                  positionTop={"top-[18%]"}
                /> 
              </div>             
            </label>
            
            {/* Password */}
            <label className="text-gray-700 block mt-5" htmlFor="password">

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block text-sm">
                Password
              </span>

              <div className='relative'>

                <input
                  className={`${(!passWordIsValid && password) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""} disabled:opacity-40`}
                  id="password"
                  name="userregisteredpassword"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="********"
                  value={password}
                  onChange={handleUserpassword}
                  required
                  disabled={!useraction}
                />

                <PasswordDisplay 
                  showPassword={showPassword}
                  handle={() => setShowPassword((change) => !change)}
                />
              </div>             
            </label>


            <PassWordTextStructure />

             {/* Confirm Password */}
            <label className="text-gray-700" htmlFor="confirmPassword">

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-bold block text-sm">
                Confirm Password
              </span>

              <div className='relative'>

                <input
                  className={`mb-0 ${(!confirmPasswordIsValid && confirmPassword) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""} disabled:opacity-40`}
                  id="confirmpassword"
                  name="userregisteredconfirmpassword"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={handleUserConFirmPassword}
                  required
                  disabled={!useraction}
                />

                {passwordNotSame && <p className='text-xs text-rose-500 tracking-wider font-lora'>Passwords not same</p>}

                <PasswordDisplay 
                  showPassword={showConfirmPassword}
                  handle={() => setShowConfirmPassword((change) => !change)}
                />
              </div>             
            </label>

            {/* registere user button */}
            <button
              type="submit"
              className="cursor-pointer w-full text-sm py-2 mt-5 bg-rose-500 border-0 text-white rounded-md tracking-wide
            hover:bg-rose-600 TextHeadertransition shadow-md shadow-gray-400 disabled:opacity-40" 
              disabled={!canSave}>
              Register
            </button>
          </form>
        </div>

        <div className='border border-solid border-gray-400 rounded-md text-center p-4 text-sm tracking-wide mt-5 
          shadow shadow-gray-500'>
          <span>Already registered</span>
          <Link to={"/login"} className='cursor-pointer border-0 inline-block text-blue-500 mx-2'>
            <span className='hover:text-blue-700 TextHeadertransition'>Sign in?</span>
          </Link>        
        </div>
      </div>
    </div>
   );
  }
  
  
export default RegistrationForm