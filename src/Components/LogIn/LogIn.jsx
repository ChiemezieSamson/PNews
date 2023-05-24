import React from 'react'
import { useState, useRef,  useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../Reduxstore/Slices/authSlice/authApiSlic'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Reduxstore/Slices/authSlice/AuthSlice'

const LogIn = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [primary, setPrimary] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()


  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('')
  }, [username, confirmPassword, primary])


  const canSave = [username, confirmPassword, primary].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
      e.preventDefault()

      if(canSave) {
        try {
            const userData = await login({ username, confirmPassword, email: {primary}}).unwrap()
            dispatch(setCredentials(userData))
            localStorage.setItem('userToken', userData.accessToken)

            setUsername(() => "")
            setConfirmPassword(() => "")
            setPrimary(() => "")
            navigate(`/userpage/${userData._id}`)
        } catch (err) {
            if (!err?.originalStatus) {
              
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {

                setErrMsg('fill all the input form');
            } else if (err.originalStatus === 401) {

                setErrMsg('Unauthorized');
            } else {

                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
      }
  }

  return (
    <div className='py-10 text-left grid place-content-center h-auto lg:h-[70vh] justify-center bg-gradient-to-b from-gray-300/40 to-white/50'>
       <div className="md:w-[28rem] max-w-sm font-lora p-6">

       <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        {/* login title */}
        <h3 className='text-2xl font-light text-center py-3 mb-2'>Sign in to admin account</h3>

        <div className='border border-solid border-gray-300 w-full p-3 rounded-md shadow shadow-gray-500 bg-blue-100/30'>
          {/* login form */}
          <form className='' onSubmit={handleSubmit}>
            <label htmlFor="userloginusername" className='text-sm tracking-wide font-light'>Username</label>
            <input 
            type="text" 
            name='userloginusername'
            id='userloginusername'
            placeholder='Enter your username...' 
            className='bg-white'
            ref={userRef}
            value={username}
            onChange={(e) => setUsername(() => e.target.value)}
            autoComplete="off"
            required
            />

            <label htmlFor="userloginemail" className='text-sm tracking-wide font-light'>email address</label>
            <input 
            type="email" 
            name='userloginemail'
            id='userloginemail'
            placeholder='Enter your email...' 
            className='bg-white'
            value={primary}
            onChange={(e) => setPrimary(() => e.target.value)}
            required/>
            
            <label htmlFor="userloginemail" className='text-sm tracking-wide font-light grid grid-flow-col justify-between'>
              <span>
                Password
              </span>
              <span className='text-xs text-blue-600 cursor-pointer '>
                Forgot password?
              </span>
            </label>
            <input 
            type="password" 
            name='userloginpassword'
            id='userloginpassword'
            placeholder='Enter your password...' 
            className='bg-white'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(() => e.target.value)}
            required/>

            {/* login button */}
            <button
            type='submit'
            name='userloginsubmitbutton'
            id='userloginsubmitbutton'
            className='cursor-pointer w-full text-sm py-1 bg-rose-500 border-0 text-white rounded-md tracking-wide
            hover:bg-rose-600 transition-all duration-200 ease-linear shadow-md shadow-gray-400 disabled:opacity-40'
            disabled={!canSave}
            >Sign In</button>
          </form>
        </div>
        

        {/* login register button */}
        <div className='border border-solid border-gray-400 rounded-md text-center p-4 text-sm tracking-wide mt-5 
          shadow shadow-gray-500'>
          <span>New this place?</span>
          <button className='cursor-pointer border-0 inline-block text-blue-600 mx-2'>
            <span>Create an accont</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogIn
