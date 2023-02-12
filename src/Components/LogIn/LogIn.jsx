import React from 'react'

const LogIn = () => {
  return (
    <div className='py-10 text-left grid place-content-center h-[70vh] justify-center bg-gradient-to-b from-gray-300/40 to-white/50'>
       <div className="md:w-[28rem] max-w-sm font-lora p-6">

        {/* login title */}
        <h3 className='text-2xl font-light text-center py-3 mb-2'>Sign in to admin account</h3>

        <div className='border border-solid border-gray-300 w-full p-3 rounded-md shadow shadow-gray-500 bg-blue-100/30'>
          {/* login form */}
          <form className=''>
            <label htmlFor="userloginemail" className='text-sm tracking-wide font-light'>Username or email address</label>
            <input 
            type="text" 
            name='userloginemail'
            id='userloginemail'
            placeholder='Enter your username...' 
            className='bg-white'/>
            
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
            className='bg-white'/>

            {/* login button */}
            <button
            type='submit'
            name='userloginsubmitbutton'
            id='userloginsubmitbutton'
            className='cursor-pointer w-full text-sm py-1 bg-rose-500 border-0 text-white rounded-md tracking-wide
            hover:bg-rose-600 transition-all duration-200 ease-linear shadow-md shadow-gray-400'>Sign In</button>
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
