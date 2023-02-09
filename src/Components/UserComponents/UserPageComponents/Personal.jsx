import React from 'react'
import { FaCheckDouble } from "react-icons/fa";
import { UserInfoHeading } from '../../ButtonAndOthers/SharedAssets';

const Personal = () => {

  const userPersonalInfor = [
    {
      id: "1",
      name: "First Name",
      type: "text",
      inputid: "userfirstname",
      text: "Please provide your first name."
    },
    {
      id: "2",
      name: "Last Name",
      type: "text",
      inputid: "userlastname",
      text: "Please provide your last name."
    },
    {
      id: "3",
      name: "Location",
      type: "text",
      inputid: "userlocation",
      text: "Please provide your location."
    },
    {
      id: "4",
      name: "Email",
      type: "email",
      inputid: "useremail",
      text: "Please provide a valid email address.",
      form: "userinformation"
    },
    {
      id: "5",
      name: "Password",
      type: "password",
      inputid: "userpassword",
      text: "Please provide a valid password.",
      form: "userinformation"
    }
  ]

  const UserInput = ({userInformations}) => {
    return (
      <>
        {userInformations.map((userInfo) => {
          return (
            <label htmlFor={userInfo.inputid} className='tracking-wide font-medium' key={userInfo.id}>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block mt-4 text-sm font-medium text-slate-700 capitalize">
                {userInfo.name}
              </span>
              <div className='relative'>
                <input type={userInfo.type} name={userInfo.inputid} id={userInfo.inputid} form={userInfo.form ? userInfo.form : "" } className='peer mb-0'
                required/>
                <p className="mt-0.5 hidden peer-invalid:block text-red-400 text-sm">
                 {userInfo.text}
                </p>
                <span className='absolute top-1/3 peer-invalid:top-[20%] right-4 p-px peer-invalid:hidden'>
                  <FaCheckDouble className="inline-block text-xs text-green-500" />
                </span>
              </div>
             
            </label>    
            )
          })          
        }              
      </>
    )
  }

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>

      {/* User first name and last name are inside the form tag  */}
      <UserInfoHeading head={"User Name"} text={"For Account and Public Profile"}/>
      
      <form id='userinformation' name='userinfoform' className='py-3 my-0.5'> 
        <UserInput userInformations={userPersonalInfor.slice(0, 3)}/>                 
      </form> 

        {/* The login password and email are outside the tag but connected with the ' form ' attribute */}
      <div className='mt-5'>
        <h3 className='text-3xl font-normal my-1 pr-2 text-[#282a35]  capitalize'>Login</h3>
        <small className='text-sm font-normal text-[#798488] my-1'><p>Your Login Credentials</p></small>
      </div>

      <div className='py-3 my-0.5'>
        <UserInput userInformations={userPersonalInfor.slice(3, 5)}/>        
      </div>

      <div className='mt-5 p-2 grid place-items-end'>
      <button className='text-[#798488] bg-gray-300 capitalize border-0 py-2.5 px-8 rounded-full cursor-pointer text-base shadow-[#444] 
        shadow-sm' type='submit' form='userinformation'>Save</button>
      </div>
    </div>
  )
}

export default Personal
