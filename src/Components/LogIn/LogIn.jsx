import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../Reduxstore/Slices/authSlice/authApiSlic'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Reduxstore/Slices/authSlice/AuthSlice'
import { handleEmailPattern, handleUserPassword, textAndNumberOnly } from '../SharedAsset/Vaidations/RegularExpression'
import { CorrectTick, PasswordDisplay, isFecthingStyle } from '../SharedAsset/SharedAssets'

const LogIn = () => {
  // Redux toolkit that calls the back end for a log in
  const [login, { isLoading, isSuccess }] = useLoginMutation()

  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [primary, setPrimary] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error
  const [showPassword, setShowPassword] = useState(false); // show the password when user click the eye
  const [isValid, setIsValid] = useState(false); // regular expressions
  const [passWordIsValid, setPassWordIsValid] = useState(false); // regular expressions
  const [emailIsValid, setEmailIsValid] = useState(false); // regular expressions

  const navigate = useNavigate()  
  const dispatch = useDispatch()

  // handling setting the value of Username
  const handleUserName = (e) => {
    // close the error message(if any), once the user change any input
    if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = textAndNumberOnly(value); // function for texting the entered text format
    setIsValid(isValid);
    setUsername(() => value)
  }

   // handling save the email content
   const handleEmail = (event) => {
    // close the error message(if any), once the user change any input
     if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = event.target;
    const { isValid } = handleEmailPattern(value);// function for texting the entered text format
    setEmailIsValid(isValid)
    setPrimary(() => value)
   }

   // handing getting and setting users password 
  const handleUserpassword = (e) => {
    // close the error message(if any), once the user change any input
    if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUserPassword(value);// function for texting the entered text format    
    setPassWordIsValid(isValid);
    setConfirmPassword(() => value)
  }


  // LOGIN FUNCTION
  const canSave = [username, confirmPassword, primary, isValid, emailIsValid, passWordIsValid].every(Boolean) && !isLoading && !errMsgOn

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(canSave) {

      try {
          const userData = await login({ username, confirmPassword, email: {primary}}).unwrap()

          dispatch(setCredentials(userData)) // send the update to redux store

          // get the access token and user id set back from the server and save it to the local storage
          localStorage.setItem('userToken', userData.accessToken) 
          localStorage.setItem('userId', userData._id)

          setUsername(() => "")
          setConfirmPassword(() => "")
          setPrimary(() => "")
      } catch (err) {
        
        if (!err?.originalStatus) {
          
          // isLoading: true until timeout occurs
          setErrMsg('No Server Response');
          setErrMsgOn(() => true)
        } else if (err.originalStatus === 400) {

          setErrMsg('fill all the input form');
          setErrMsgOn(() => true)
        } else if (err.originalStatus === 401) {

          setErrMsg('Unauthorized');
          setErrMsgOn(() => true)
        } else {

          setErrMsg('Login Failed');
          setErrMsgOn(() => true)
        }
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      
     navigate("/userpage", {replace: true}, [navigate])
     window.history.replaceState({}, document.title)
    }
  }, [isSuccess, navigate])

  return (
    <div className={`pb-10 pt-3 text-left bg-gradient-to-b from-neutral-100 via-gray-50 to-neutral-100 ${isFecthingStyle(isLoading)}`}>
      
      <div className="md:w-[28rem] max-w-sm font-lora px-6 pb-3 rounded mx-auto">
        {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}

        {/* login title */}
        <h3 className='text-2xl font-light text-center py-2 mb-2'>Sign in</h3>

        <div className='border border-solid border-neutral-200 w-full p-3 rounded-md shadow shadow-neutral-400 bg-blue-100/30'>

          {/* login form */}
          <form onSubmit={handleSubmit}>

            {/* User Name */}
            <label htmlFor="userloginusername" className='text-sm tracking-wide font-light'>

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">
                Username
              </span>

              <div className='relative'>  

                <input 
                  type="text" 
                  name='userloginusername'
                  id='userloginusername'
                  placeholder='Enter your username...' 
                  className={`bg-white ${(!isValid && username) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""}`}
                  value={username}
                  onChange={handleUserName}
                  aria-label='text' 
                  maxLength={19}
                  autoFocus={true}              
                  required
                />

                <CorrectTick 
                  IsValid={isValid}
                  positionTop={"top-[20%]"}
                />
              </div>
            </label>

            {/* User Email */}
            <label htmlFor="userloginemail" className='text-sm tracking-wide font-light'>

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">
                email address
              </span>

              <div className='relative'>

                <input 
                  type="email" 
                  name='userloginemail'
                  id='userloginemail'
                  placeholder='Enter your email...' 
                  className={`bg-white ${(!emailIsValid && primary) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`}
                  value={primary}
                  onChange={handleEmail}
                  required/> 

                <CorrectTick 
                  IsValid={emailIsValid}
                  positionTop={"top-[20%]"}
                />               
              </div>
            </label>
            
            {/* User Password */}
            <label htmlFor="userloginpassword" className='text-sm tracking-wide font-light'>

              <div className='grid grid-flow-col justify-between'>

                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">
                  Password
                </span>

                <span className='text-xs text-blue-600 cursor-pointer'>
                  Forgot password?
                </span>
              </div>

              <div className='relative'>

                <input 
                  type={`${showPassword ? "text" : "password"}`} 
                  name='userloginpassword'
                  id='userloginpassword'
                  placeholder='Enter your password...' 
                  className={`bg-white ${(!passWordIsValid && confirmPassword) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                  ""}`}
                  value={confirmPassword}
                  onChange={handleUserpassword}
                  required
                />

                <PasswordDisplay 
                  showPassword={showPassword}
                  handle={() => setShowPassword((change) => !change)}
                />
              </div>
            </label>

            {/* login button */}
            <button
            type='submit'
            className='cursor-pointer w-full text-sm py-1 bg-rose-500 border-0 text-white rounded-md tracking-wide
            hover:bg-rose-600 TextHeadertransition shadow-md shadow-gray-400 disabled:opacity-40'
            disabled={!canSave}
            >Sign In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn
