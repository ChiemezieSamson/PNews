import React, { useRef, useState } from 'react'
import { Hanbugar3, WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'


const secondaryEmails = [
  {
    id: 1,
    email: "myemailexample@email.com"
  },
  {
    id: 2,
    email: "myemailexample1@email.com"
  },
]

const Email = () => {
  const [openCat, setOpenCat] = useState(false)
  const [openAddnewCat, setOpenAddnewCat] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [getUserpassword, setGetUserpassword] = useState("")
  const [secondaryEmaillist, setsecondaryEmaillist] = useState(secondaryEmails)
  const [primaryEmail, setPrimaryEmail] = useState("myemailexample@email2.com")
  const [openGetUserPasswordForMakeAndRemove, setOpenGetUserPasswordForMakeAndRemove] = useState(false)
  const [emailOfTheClickedButton, setEmailOfTheClickedButton] = useState("")
  const [textContentOfTheClickedButton, setTextContentOfTheClickedButton] = useState("")
  const ButtonRef = useRef();
  
  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)
  }

  const handleOpenAddNewCat = () => {
    setOpenAddnewCat((change) => !change)
  }

  const handleNewEmail = (e) => {
    setNewEmail(() => e.target.value)
  }

  const handleGetUserpassword = (e) => {
    setGetUserpassword(() => e.target.value)
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


  const handleMakePrimaryORDeleteEmailAfterUserEnterPassword = (e) => {
    e.preventDefault();

    // this block of code checkes if the use click to make a primary email or not 
    // if true 
    if (textContentOfTheClickedButton === "Make primary" && textContentOfTheClickedButton === ButtonRef.current.textContent && getUserpassword === "Da123456") {

      // First get the lenght of the whole secondary email if any and create new id 
      let id = secondaryEmaillist.length - 1
      let newId
      id > 0 ? newId = secondaryEmaillist[id].id : newId = 1

      // using the id create an object for the already existing primary email
      let addedTag = {id: newId + 1, email: primaryEmail.toLowerCase()}
      const checkemail = secondaryEmaillist.map(email => email.email)

      // Add the existing primary email to the secorday email
      checkemail.includes(primaryEmail.toLowerCase()) || primaryEmail === "" ? 
      setsecondaryEmaillist( list => [...list]) :
      setsecondaryEmaillist(list => [...list, addedTag])
      
       // Set a new primary email
      setPrimaryEmail(() => emailOfTheClickedButton)

      // using the cliked email. Then filter out the new primary email from the secondary email.
      checkemail.includes(emailOfTheClickedButton) &&
      setsecondaryEmaillist((list) => {
        let newlist = list.filter(item => item.email !==  emailOfTheClickedButton)
        return newlist})
    }

    // this block of code checkes if the use click to Remove a secondary email or not 
    // if true 
    if(textContentOfTheClickedButton === "Remove" && textContentOfTheClickedButton === ButtonRef.current.textContent && getUserpassword === "Da123456") {

      // using the cliked email. Then filter out the email from the secondary email.
      const checkemail = secondaryEmaillist.map(email => email.email)
      checkemail.includes(emailOfTheClickedButton) &&
      setsecondaryEmaillist((list) => {
      let newlist = list.filter(item => item.email !==  emailOfTheClickedButton)
      return newlist})  
    }

    // After each action close the input box and empty the input box
    setOpenGetUserPasswordForMakeAndRemove(() => false)
    setGetUserpassword(() => "")
  }


  // hadles adding new email once submit button is clicked
  const handleOnSubmit = (e) => {

    e.preventDefault();  

    // check if the password entered is same as the user password
    if(getUserpassword === "Da123456") {
      
      // If true, First get the lenght of the whole secondary email if any and create new id 
      let id = secondaryEmaillist.length - 1
      let newId
      id > 0 ? newId = secondaryEmaillist[id].id : newId = 1

       // using the id create an object for the new  email
      let addedTag = {id: newId + 1, email: newEmail.toLowerCase()}
      const checkemail = secondaryEmaillist.map(email => email.email)

      // Add to the existing secondary email if not already in it
      checkemail.includes(newEmail.toLowerCase()) || newEmail === "" ? 
      setsecondaryEmaillist( list => [...list]) :
      setsecondaryEmaillist(list => [...list, addedTag])

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
          <div className='font-medium tracking-wide font-josefin'>
            <p>Emails you've added</p>
          </div>

            {/* the primary and secondary emails display starts here */}

          <div className='mt-5 py-1 tracking-wide'>
            <div className='py-0.5 mb-10'>
              <h6 className='text-sm font-bold text-[#282a35] mb-4'>Primary email</h6>
              <p>{primaryEmail}</p>
            </div>

            {/* secondary emails display here */}
            
            <div className={`${secondaryEmaillist.length <= 0 ? "hidden" : "block"}`}>              
             <h6 className='text-sm font-bold text-[#282a35] mb-4'>Secondary email</h6>                
                {secondaryEmaillist.map(email => {
                  return (
                    <div className='flex justify-between mt-5' key={email.id}>    
                      <p>{email.email}</p>          
                      <span className='text-sm text-gray-400 inline-block'>   

                        {/* Make this email the primary email button section is here */}

                        <button 
                        type='button' 
                        id='makeprimaryemailbutton'
                        name='makeprimaryemailbutton'
                        className='mx-2 cursor-pointer hover:bg-[#e4e4e4] tracking-wider px-1 inline-block rounded-md
                          hover:shadow hover:shadow-gray-400'
                          onClick={handleMakePrimaryButton}>
                          Make primary
                        </button>
                        
                         {/* Remove this email from secondary email button section is here */}

                        <button 
                        type='button' 
                        id='removeemailbutton'
                        name='removeemailbutton'
                        className='mx-2 cursor-pointer hover:bg-[#e4e4e4] tracking-wider px-1 inline-block rounded-md
                        hover:shadow hover:shadow-gray-400' 
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
                  onChange={handleNewEmail}
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
                  onChange={handleGetUserpassword}
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

        <div className={`${openGetUserPasswordForMakeAndRemove ? "fixed inset-0 p-0.5 -translate-x-[0] translate-y-0 grid place-content-center"
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
              onChange={handleGetUserpassword}
              required/>
              <span >
                <button type='submit' 
                id='usermakeordeletemail' 
                name='usermakeordeletemail' 
                className='mx-2 cursor-pointer bg-[#e4e4e4] tracking-wider px-1 rounded-md shadow shadow-gray-400 text-sm'
                ref={ButtonRef}
                >{textContentOfTheClickedButton}</button>
                <button 
                type='submit' 
                id='forgetPassword' 
                name='forgetPassword'
                className='px-1 mx-2 cursor-pointer tracking-wider text-blue-500 text-sm'>Forgot password</button>
              </span>
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