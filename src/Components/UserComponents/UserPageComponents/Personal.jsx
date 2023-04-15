import React, { useState } from 'react'
import { FaCheckDouble } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { userPersonalInfoUpdated } from '../../../Reduxstore/Slices/users/UsersSlice';
import { UserInfoHeading } from '../../SharedAsset/SharedAssets';

const Personal = () => {
  const user = useSelector(state => state.users)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();

    const userId = user[1] ? user[1].id : user[0].id

    dispatch(userPersonalInfoUpdated({userId, firstName, lastName, location}))
  };


  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>

      {/* User first name and last name are inside the form tag  */}
      <UserInfoHeading head={"User Name"} text={"For Account and Public Profile"}/>
      
      <form id='userinformation' name='userinfoform' className='py-3 my-0.5' onSubmit={handleSubmit}>

         {/* UserFirst Name */}
        <label htmlFor="userfirstname" className='tracking-wide font-medium'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
            First Name
          </span>
          <div className='relative'>
            <input type="text" name="userfirstname" id="userfirstname"  className='peer mb-0' onChange={(e) => setFirstName(() => e.target.value)}
            required value={firstName}  placeholder={user[0].name.firstName}/>
            <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
                Please provide your first name.
            </p>
            <span className='absolute top-1/3 peer-invalid:top-[20%] right-4 p-px peer-invalid:hidden'>
              <FaCheckDouble className="inline-block text-xs text-green-500" />
            </span>
          </div>          
        </label>
        
          {/* UserLastName */}
        <label htmlFor="userlastname" className='tracking-wide font-medium'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
            Last Name
          </span>
          <div className='relative'>
            <input type="text" name="userlastname" id="userlastname" className='peer mb-0' onChange={(e) => setLastName(() => e.target.value)}
            required placeholder={user[0].name.LastName} value={lastName}/>
            <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
              Please provide your last name.
            </p>
            <span className='absolute top-1/3 peer-invalid:top-[20%] right-4 p-px peer-invalid:hidden'>
              <FaCheckDouble className="inline-block text-xs text-green-500" />
            </span>
          </div>          
        </label>

          {/* UserLocation */}
        <label htmlFor="userlocation" className='tracking-wide font-medium'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
            Location
          </span>
          <div className='relative'>
            <input type="text" name="userlocation" id="userlocation"  className='peer mb-0'
            required placeholder={user[0].name.location} value={location} onChange={(e) => setLocation(() => e.target.value)}/>
            <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
              Please provide your location.
            </p>
            <span className='absolute top-1/3 peer-invalid:top-[20%] right-4 p-px peer-invalid:hidden'>
              <FaCheckDouble className="inline-block text-xs text-green-500" />
            </span>
          </div>             
        </label>  


         {/* The login password and email are outside the tag but connected with the ' form ' attribute */}
        <div className='mt-5'>
          <h3 className='text-3xl font-normal my-1 pr-2 text-[#282a35]  capitalize'>Login</h3>
          <small className='text-sm font-normal text-[#798488] my-1'><p>Your Login Credentials</p></small>
        </div>

        <div className='py-3 my-0.5'>
        
          {/* UserEmail */}
          <label htmlFor="useremail" className='tracking-wide font-medium'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
              Email
            </span>
            <div className='relative'>
              <input type="email" name="useremail" id="useremail"  className='peer mb-0'
               placeholder="{thisUser.email.primary}" readOnly/>
              <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
                Please provide a valid email address.
              </p>
              <span className='absolute top-1/3 peer-invalid:top-[20%] right-4 p-px peer-invalid:hidden'>
                <FaCheckDouble className="inline-block text-xs text-green-500" />
              </span>
            </div>          
          </label>          


            {/* UserPassorw */}
          <label htmlFor="userpassword" className='tracking-wide font-medium'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
              Password
            </span>
            <div className='relative'>
              <input type="password" name="userpassword" id="userpassword"  className='peer mb-0'
              placeholder="⁕⁕⁕⁕⁕⁕⁕⁕" readOnly/>
              <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
              Please provide a valid password.
              </p>
              <span className='absolute top-1/3 peer-invalid:top-[20%] right-4 p-px peer-invalid:hidden'>
                <FaCheckDouble className="inline-block text-xs text-green-500" />
              </span>
            </div>             
          </label>           
        </div>

        <div className='mt-5 p-2 grid place-items-end'>
          <button className='text-[#798488] bg-gray-300 capitalize border-0 py-2.5 px-8 rounded-full cursor-pointer text-base shadow-[#444] 
            shadow-sm' type='submit' form='userinformation'>Save</button>
        </div>               
      </form>        
    </div>
  )
}

export default Personal
