import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userEmailMakePrimary, userEmailRemoveSecondary, userEmailUpdate } from '../../../../Reduxstore/Slices/users/UsersSlice'
import { Hanbugar3, WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'


const Email = () => {
  const user = useSelector(state => state.users)
  const [openCat, setOpenCat] = useState(false)
  const [openAddnewCat, setOpenAddnewCat] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [getUserpassword, setGetUserpassword] = useState("")
  const [openGetUserPasswordForMakeAndRemove, setOpenGetUserPasswordForMakeAndRemove] = useState(false)
  const [emailOfTheClickedButton, setEmailOfTheClickedButton] = useState("")
  const [textContentOfTheClickedButton, setTextContentOfTheClickedButton] = useState("Make primary")
  const ButtonRef = useRef();


  const dispatch = useDispatch()

  const userId = user[1] ? user[1].id : user[0].id


  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)
  }

  const handleOpenAddNewCat = () => {
    setOpenAddnewCat((change) => !change)
  }

  const handleCloseGetUserPasswordForMakeAndRemove = () => {
    setOpenGetUserPasswordForMakeAndRemove(() => false)
  }


  const handleMakePrimaryButton = (e) => {
    setEmailOfTheClickedButton(() => e.target.parentElement.parentElement.firstChild.textContent.toLowerCase())
    setTextContentOfTheClickedButton(() => e.target.textContent)
    setOpenGetUserPasswordForMakeAndRemove(() => true)   
  }


  const handleRemoveEmailButton = (e) => {
    setEmailOfTheClickedButton(() => e.target.parentElement.parentElement.firstChild.textContent.toLowerCase())
    setTextContentOfTheClickedButton(() => e.target.textContent)
    setOpenGetUserPasswordForMakeAndRemove(() => true)   
  }

  // DELETE EMAIL OR MAKE IT THE PRIMARY EMAIL
  const handleMakePrimaryORDeleteEmailAfterUserEnterPassword = (e) => {
    e.preventDefault();

    if (textContentOfTheClickedButton === "Make primary" && 
    textContentOfTheClickedButton === ButtonRef.current.textContent 
    && getUserpassword === user[0].password) {

      dispatch(userEmailMakePrimary({userId, primaryEmail: user[0].email.primary, emailOfTheClickedButton}))
    }

   
    if(textContentOfTheClickedButton === "Remove" && 
    textContentOfTheClickedButton === ButtonRef.current.textContent 
    && getUserpassword === user[0].password) {

      dispatch(userEmailRemoveSecondary({userId, emailOfTheClickedButton}))
    }

    // After each action close the input box and empty the input box
    setOpenGetUserPasswordForMakeAndRemove(() => false)
    setGetUserpassword(() => "")
  }


  //CREATE NEW EMAIL
  const handleOnSubmit = (e) => {

    e.preventDefault();  
    
    dispatch(userEmailUpdate({userId, newEmail, getUserpassword}))

    // check if the password entered is same as the user password
    if(getUserpassword === "Da123456") {
      // empty the input boxs
      setNewEmail(() => "")
      setGetUserpassword(() => "")
      setOpenAddnewCat(() =>false)
    }    

     // either way empty the input boxs
    setNewEmail(() => "")
    setGetUserpassword(() => "")
  }
  

  return (
    <div className='font-poppins relative'>
      <WritePostAsideOpenClosebar BarName={"Email addresses"} handle={handleOpenCloseChild}/>

        <div className={`${openCat? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
          <SinginAndSecurityIntro text={"Emails you've added"} />

            {/* the primary and secondary emails display starts here */}

          <div className='mt-5 py-1 tracking-wide'>
            <div className='py-0.5 mb-10'>
              <h6 className='text-sm font-bold text-[#282a35] mb-4'>Primary email</h6>
              <p>{user[0].email.primary}</p>
            </div>

            {/* secondary emails display here */}
            
            <div className={`${user[0].email.secondary.length <= 0 ? "hidden" : "block"}`}>              
             <h6 className='text-sm font-bold text-[#282a35] mb-4'>Secondary email</h6>                
                {user[0].email.secondary.map((email, index) => {
                  return (
                    <div className='sm:grid sm:grid-flow-col sm:justify-between mt-5' key={index}>    
                      <p>{email}</p>          
                      <span className='text-sm text-gray-400 inline-block'>   

                        {/* Make this email the primary email button section is here */}

                        <button 
                        type='button' 
                        id='makeprimaryemailbutton'
                        name='makeprimaryemailbutton'
                        className='sm:mx-2 mr-2 cursor-pointer hover:bg-[#e4e4e4] tracking-wider sm:px-1 pr-1 inline-block rounded-md
                          hover:shadow hover:shadow-gray-400 transition-all duration-200 ease-linear'
                          onClick={handleMakePrimaryButton}>
                          Make primary
                        </button>
                        
                         {/* Remove this email from secondary email button section is here */}

                        <button 
                        type='button' 
                        id='removeemailbutton'
                        name='removeemailbutton'
                        className='mx-2 cursor-pointer hover:bg-[#e4e4e4] tracking-wider px-1 inline-block rounded-md
                        hover:shadow hover:shadow-gray-400 transition-all duration-200 ease-linear' 
                        onClick={handleRemoveEmailButton}>
                          Remove
                        </button>
                      </span>
                    </div>   
                  )
                })}                       
            </div>

            {/* add new email address section start here */}

            <div className='mt-14 py-1'>
              <button 
              type='button' 
              id='addemailaddressbutton'
              name="addemailaddressbutton"
              className='text-blue-400  mt-3 mb-3 inline-block text-base cursor-pointer border border-solid border-blue-400
              hover:text-blue-500 py-1 px-3 rounded-full hover:border-blue-600 hover:bg-blue-100 transition-all 
                duration-200 ease-linear' onClick={handleOpenAddNewCat}>
                Add email address
              </button>
            </div>

              {/* The hidden part where you add your new email section start here */}
            <div className={`${openAddnewCat? "block" : "hidden"}`}>
              <div className='mb-5 py-1'>
                <h6 className='text-sm font-bold text-[#282a35] mb-4'>Add a new email</h6>
              </div>
               
              <form onSubmit={handleOnSubmit}>

                <label htmlFor="newemailaddress">
                  <span className='text-xs tracking-wider'>Enter new email address</span>
                  <input 
                  type="email" 
                  name='newemailaddress' 
                  id='newemailaddress' 
                  value={newEmail}
                  placeholder='myemailexample@email.com' 
                  className='placeholder:text-[#798488] invalid:border-red-400 invalid:shadow-red-400'
                  onChange={(e) => setNewEmail(() => e.target.value)}
                  required/>                  
                </label>

                <label htmlFor="newemailuserpassword">
                  <span className='text-xs tracking-wider'>Enter your account password</span>
                  <input 
                  type="password" 
                  name='newemailuserpassword' 
                  id='newemailuserpassword'
                  placeholder='●●●●●●●●●' 
                  value={getUserpassword}
                  className='placeholder:text-[#798488]'
                  onChange={(e) => setGetUserpassword(() => e.target.value)}
                  required/>
                </label>

                <button 
                type='submit' 
                id='addnewemailbutton'
                name='addnewemailbutton'
                className='w-full rounded-full text-center text-white bg-blue-500 text-sm py-1.5 tracking-wide
                font-semibold mt-4 mb-0.5 shadow shadow-gray-400 hover:bg-blue-600 transition-all 
                duration-200 ease-linear'>Submit</button>

              </form>
            </div>
          </div>
        </div> 

         {/* The box to enter user password before the secondary email will be made your primary email is here */}

        <div className={`${openGetUserPasswordForMakeAndRemove ? "fixed z-50 inset-0 p-0.5 -translate-x-[0] translate-y-0 grid place-content-center"
            : "-translate-x-[200%] translate-y-full hidden transition-all duration-500 ease-linear"}`}>
          <div className='shadow-md shadow-gray-400 max-w-[300px] bg-white py-7 px-5 rounded-md relative '>
            <h6 className='font-bold text-lg text-[#444] mb-4'>Enter Password</h6>
            <p className='text-xs text-[#282a35]'>Enter your password to make this the primary email</p>

            {/* The form to get the user inputed password */}

            <form className='mt-4' onSubmit={handleMakePrimaryORDeleteEmailAfterUserEnterPassword}>
              <label htmlFor="userpasswordformakeprimary" className='text-xs font-light '>Password</label>
              <input 
              type="password" 
              name='userpasswordformakeprimary' 
              id='userpasswordformakeprimary'
              value={getUserpassword}
              className='placeholder:text-[#798488] invalid:border-red-400 invalid:shadow-red-400'
              onChange={(e) => setGetUserpassword(() => e.target.value)}
              required/>
              <div className='grid grid-flow-col justify-between'>
                <button type='submit' 
                id='usermakeordeletemail' 
                name='usermakeordeletemail' 
                className='mx-1 cursor-pointer bg-[#e4e4e4] tracking-wider px-1 rounded-md shadow shadow-gray-400 text-sm
                transition-all duration-200 ease-linear hover:bg-blue-400 hover:text-white'
                ref={ButtonRef}
                >{textContentOfTheClickedButton}</button>
                <button 
                type='submit' 
                id='forgetPassword' 
                name='forgetPassword'
                className='px-1 mx-1 cursor-pointer tracking-wider text-blue-500 text-sm 
                transition-all duration-200 ease-linear hover:text-blue-700'>Forgot password</button>
              </div>
            </form>

              {/* cancle button used on the Enter Password box */}
            <div className="absolute top-4 right-1.5 text-base text-[#8b8b8b] p-0.5 hover:text-[#444]">
              <Hanbugar3 closesidebar={handleCloseGetUserPasswordForMakeAndRemove}/>
            </div>
          </div>                
        </div>   
      </div>
  )
}

export default Email