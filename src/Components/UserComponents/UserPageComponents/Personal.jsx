import React, { useEffect, useState } from 'react'
import { useUpdateExistingUserMutation } from '../../../Reduxstore/Slices/users/UsersSlice';
import { CorrectTick, UserInfoHeading } from '../../SharedAsset/SharedAssets';
import { livingaddress, textOnly } from '../../SharedAsset/Vaidations/RegularExpression';
import { useOutletContext } from 'react-router-dom';

const Personal = () => {
  // fetching the user from the parent
  const [user, userAction, isFetching] = useOutletContext();
  // Redux toolkit function use to update user personal information
  const [userPersonalInfoUpdated, {isLoading}] = useUpdateExistingUserMutation()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [errMsg, setErrMsg] = useState('')

  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error

  const [firstNameIsValid, setFirstNameIsValid] = useState(true); // regular expressions
  const [lastNameIsValid, setLastNameIsValid] = useState(true); // regular expressions
  const [locationIsValid, setLocationIsValid] = useState(true); // regular expressions


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

  // handling setting the value of  living addresses
  const handlelivingaddresses = (e) => {
    // close the error message(if any), once the user change any input
    if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = livingaddress(value); // function for texting the entered text format
    setLocationIsValid(isValid);
    setLocation(() => value)
  }


  // UPDATE USER INFOR
  const canSave = [firstName, lastName, location, firstNameIsValid, lastNameIsValid, locationIsValid].every(Boolean) && !isLoading

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (canSave) {

      try{

        await userPersonalInfoUpdated({userId: user._id, name: {firstname: firstName, lastname: lastName}, location})

        setFirstName(() => "")
        setLastName(() => "")
        setLocation(() => "")
      } catch (err) {

        console.error('Failed to update: ', err)
        setErrMsg('Failed to update!');
        setErrMsgOn(() => true)
      } 
    }
  };

  useEffect(() =>{ // update the input once fetch is complete

    if(userAction) {

      setFirstName(() => user.name.firstname)
      setLastName(() => user.name.lastname)
      setLocation(() => user.location)
    }
  },[userAction, user])


  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5 disabled:opacity-40' disabled={isFetching}>

      {/* User first name and last name are inside the form tag  */}
      <UserInfoHeading head={"User Name"} text={"For Account and Public Profile"}/>
      {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}
    
      <form id='userinformation' name='userinfoform' className='py-3 my-0.5' onSubmit={handleSubmit}>

        {/* UserFirst Name */}
        <label htmlFor="userfirstname" className='tracking-wide font-medium'>

          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
            First Name
          </span>

          <div className='relative'>

            <input 
              type="text" 
              name="userfirstname" 
              id="userfirstname"  
              className={`peer mb-0 disabled:opacity-40 ${(!firstNameIsValid && firstName) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
              ""}`} 
              onChange={handleFirstName}
              aria-label='text'
              maxLength={20}
              autoFocus={true}
              required 
              disabled={!userAction}
              value={firstName}  
              placeholder={user?.name?.firstname ? user?.name?.firstname : ""}
            />

            <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
                Please provide your first name.
            </p>

            <CorrectTick 
              IsValid={firstName && firstNameIsValid}
              positionTop={"top-[25%]"}
            />
          </div>          
        </label>
        
        {/* UserLastName */}
        <label htmlFor="userlastname" className='tracking-wide font-medium'>

          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
            Last Name
          </span>

          <div className='relative'>

            <input 
              type="text" 
              name="userlastname" 
              id="userlastname" 
              className={`peer mb-0 disabled:opacity-40 ${(!lastNameIsValid && lastName) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
              ""}`} 
              onChange={handleLastName}
              aria-label='text' 
              maxLength={20} 
              required 
              disabled={!userAction}
              placeholder={user?.name?.lastname ? user?.name?.lastname : ""} 
              value={lastName}
            />

            <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
              Please provide your last name.
            </p>

            <CorrectTick 
              IsValid={lastName && lastNameIsValid}
              positionTop={"top-[25%]"}
            /> 
          </div>          
        </label>

        {/* UserLocation */}
        <label htmlFor="userlocation" className='tracking-wide font-medium'>

          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
            Location
          </span>

          <div className='relative'>

            <input 
              type="text" 
              name="userlocation" 
              id="userlocation"  
              className={`peer mb-0 disabled:opacity-40 ${(!locationIsValid && location) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
              ""}`}
              required 
              disabled={!userAction}
              aria-label='text' 
              maxLength={180}
              placeholder={user?.location ? user?.location : ""} 
              value={location} 
              onChange={handlelivingaddresses}
            />

            <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
              Please provide your location.
            </p>

            <CorrectTick 
              IsValid={location && locationIsValid}
              positionTop={"top-[25%]"}
            />
          </div>             
        </label>  


        {/* The login password and email  */}
        <div className=' mt-5'>
          <UserInfoHeading head={"Login"} text={"Your Login Credentials"}/>
        </div>

        <div className='py-3 my-0.5'>
        
          {/* UserEmail */}
          <label htmlFor="useremail" className='tracking-wide font-medium'>

            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
              Email
            </span>

            <div className='relative'>

              <input 
                type="email" 
                name="useremail" 
                id="useremail"  
                className='peer mb-0 disabled:opacity-40'
                placeholder={user?.email?.primary ? user?.email?.primary : ""} 
                readOnly
                disabled={!userAction}
              />

              <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
                Please provide a valid email address.
              </p>

              <CorrectTick 
                IsValid={user?.email?.primary && lastNameIsValid}
                positionTop={"top-[25%]"}
              /> 
            </div>          
          </label>          


            {/* UserPassorw */}
          <label htmlFor="userpassword" className='tracking-wide font-medium'>

            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
              Password
            </span>

            <div className='relative'>
              <input 
                type="password" 
                name="userpersonalpassword" 
                id="userpersonalpassword"  
                className='peer mb-0 disabled:opacity-40'
                placeholder="⁕⁕⁕⁕⁕⁕⁕⁕" 
                readOnly
                disabled={!userAction}
              />

              <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
              Please provide a valid password.
              </p>

              <CorrectTick 
                IsValid={user?.password && lastNameIsValid}
                positionTop={"top-[25%]"}
              /> 
            </div>             
          </label>           
        </div>

        <div className='mt-5 p-2 grid place-items-end'>
          <button 
            className='text-neutral-600 bg-neutral-200 capitalize border-0 py-2.5 px-8 rounded-full TextHeadertransition
            cursor-pointer text-base shadow-neutral-400 shadow-sm disabled:opacity-40 hover:bg-neutral-300' 
            type='submit' 
            form='userinformation' 
            disabled={!canSave}>Save</button>
        </div>               
      </form>        
    </div> 
  )
}

export default Personal
