import React, { useEffect, useState } from "react";
import {  publicFolder } from "../../data";
import { HanbugarTwo } from "../ButtonAndOthers/Buttons";
import { FaRegEnvelope } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../Reduxstore/Slices/authSlice/authApiSlic";
import { SocialMediaLinks, isFecthingStyle } from "../SharedAsset/SharedAssets";
import { handleEmailPattern } from "../SharedAsset/Vaidations/RegularExpression";


const SocialNewsletter = ({opensidebar, user, userAction, isFetching, userisSuccess, isError, refetch}) => {
  // logout call to the server
  const [sendLogout, {isLoading, isSuccess}] = useSendLogoutMutation()
  const [buttonText, setButtonText] = useState("Login") 
  const [Email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState('')

  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error  
  const [showLogoutModal, setShowLogoutModal] = useState(false); // chose what to dispaly when in userpage and when not in userpage
  const [navigateTo, setNavigateTo] = useState(false) // safe to navigate

  const [emailIsValid, setEmailIsValid] = useState(false); // regular expressions

  const navigate = useNavigate()
  const location = useLocation()

  // getting the second path after home
  const presentLocation = location.pathname.split("/")[1]; 

  // handling save the email content
  const handleEmail = (event) => {
    // close the error message(if any), once the user change any input
    if(errMsgOn) {
      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = event.target;    
    const { isValid } = handleEmailPattern(value); // function for texting the entered text format

    setEmailIsValid(isValid)
    setEmail(() => value)
   }


   // handle log in log out button click
   const handleLogOutConfirmation = () => {
    
    if(buttonText !== "LogOut" && presentLocation !== "userpage") {
      
      navigate('/login')
    } else if (buttonText !== "LogIn" && buttonText !== "") {
      
      setShowLogoutModal(() =>  true)
    }
  }
  
  
  useEffect(() => {
    setShowLogoutModal(() =>  false)
    setButtonText(() => "Login")
    if (presentLocation === "userpage") {// makeSure we are in the userPage

      setButtonText(() => "LogOut")
    } else if (presentLocation === "login"){ // check if we are in the login Page

      setButtonText(() => "")
    } else {
      
      setButtonText(() => "LogIn")
    }
  }, [presentLocation])


  // LOGOUT
  const canLogout = presentLocation === "userpage" && buttonText === "LogOut" && !isLoading


  const handleLogOut = async () => {
   
    if(canLogout){ 

      try  {
        await sendLogout() // send request to the server to clear cookies used or refresh

        setShowLogoutModal(() =>  false)
        setNavigateTo(() => true)
        setButtonText(() => "Login")

      } catch (err) {

        console.error('Failed to logout: ', err)
        setErrMsg('Failed to logout');
        setErrMsgOn(() => true)
      }   
    }
   }

   useEffect(() => {

    if (isSuccess && navigateTo) {
      setNavigateTo(() => false)

      window.history.replaceState({}, document.title)
      navigate('/', {replace: true}, [navigate])
      refetch() // refetch the single user    
      return   
    } 


  }, [isSuccess, navigate, refetch, navigateTo])

  
  //Logout button confirmation modal
  const LogOutConfirmation = (
    <div className="modal-content">
        {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}
        <p className="text-neutral-400 text-sm">Are you sure you want to logout?</p>

        <div className="px-3 grid grid-flow-col justify-between">
          <button 
            type='button' 
            name="LogoutButton"
            id="LogoutButton"
            onClick={handleLogOut} 
            className="cursor-pointer text-sm py-px px-4 bg-neutral-200 border-0 text-stone-700 rounded-md tracking-wide
            hover:bg-neutral-300 hover:text-tone-900 TextHeadertransition shadow-sm shadow-gray-400">Logout</button>

          <button 
            type='button' 
            name="cancleButton"
            id="cancleButton"
            onClick={() => setShowLogoutModal(() => false)} 
            className="cursor-pointer text-sm py-px px-4 bg-neutral-200 border-0 text-stone-700 rounded-md tracking-wide
            hover:bg-neutral-300 hover:text-tone-900 TextHeadertransition shadow-sm shadow-gray-400">Cancel</button>
        </div>
      </div>
    )

  return (
    <div className="shadow-md py-2 font-josefin">
      <div className="grid grid-flow-col justify-between max-w-[98%] mx-auto">

        {/* Login, logout and user Button*/} 
        <div className="relative">  

          {/* Login and logout Button (display if the we are not in the userpage and the user is not logged in before or if we are in the user page)*/} 
          <div>
            {((buttonText === "LogIn" && isError) || (buttonText === "LogOut" && userisSuccess)) && 

              <button  
                type='button' 
                name="loginLogoutButton"
                id="loginLogoutButton"
                title={buttonText}
                className="cursor-pointer w-full text-sm py-px px-4 bg-neutral-200 border-0 text-stone-700 rounded-md tracking-wide
                hover:bg-neutral-300 hover:text-tone-900 TextHeadertransition shadow-sm shadow-gray-400 disabled:opacity-40"
                disabled={isLoading}
                onClick={handleLogOutConfirmation}>
                {buttonText}
              </button>
            }
          </div>

          {/* user profile image serving as a linke to he user page */}
          {(userisSuccess &&  buttonText !== "LogOut") &&
            <Link to={"/userpage"} className={`rounded-full m-0 inline-block fixed left-px top-2 lg:inset-auto z-[500] bg-stone-100  ${isFecthingStyle(isFetching)}`}
              title="user profile">
                {userAction ?
                  <img src={publicFolder + user?.profileImage} alt="userImage" className="rounded-full border border-solid
                  border-rose-400 p-px m-0 object-cover object-center cursor-pointer max-w-[3rem] w-auto max-h-[3rem] mx-auto"/>
                  :
                  <div className='skeleton h-screen w-screen rounded-full border border-solid
                  border-rose-400 p-px m-0 object-cover object-center cursor-pointer max-w-[3rem] max-h-[3rem] mx-auto'></div>
                }
           </Link>
          }

          {/* Logout confirmation modal */}
          {(buttonText === "LogOut" && presentLocation === "userpage") &&
            <div className={`absolute top-full z-[200] min-w-[16rem] py-2 px-2 bg-stone-100 rounded shadow-[#444] shadow-sm mt-2.5 prose font-medium
            ${showLogoutModal ? "translate-y-0 opacity-100 block" : "-translate-y-full opacity-0 hidden"}`}>
              {LogOutConfirmation}
            </div>
          }
        </div>

        {/* ====== newsletter start here ===== */}
        <form className="border-x-0 border-t-0 border-b border-solid border-stone-700 md:inline-block p-0 hidden text-stone-800 outline-0 underline">

          <label htmlFor="newsletter" className="inline-block">
            <input 
              type="email" 
              id="newsletter" 
              className={`border-0 focus:border-0 placeholder:text-stone-400 ring-0 focus:ring-0 shadow-none py-0 m-0 px-1 ${(!emailIsValid && Email) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`} 
              placeholder="Enter your email" 
              name="mail" 
              value={Email}
              aria-required="true" 
              autoFocus={true}
              onChange={handleEmail}
              required
            />
          </label>
   
          <button 
          type="submit" 
          className="border-0 focus:border-0 ring-0 focus:ring-0 shadow-none bg-transparent inline-block text-[1rem] py-0 mb-0 px-1">
            <span>Subscribe Newsletter 
              <FaRegEnvelope  className="inline-block mx-2 text-stone-800 mb-0.5"/>
            </span>
          </button>
        </form>

        {/* ===== social start here ==== */}
        <div>
          <SocialMediaLinks />

          {/*Hanbuger button use to open the side bar for instagram feed on large screen*/}
          <div className="text-stone-800 text-lg pl-7 md:inline-block leading-3 hidden align-bottom">
            <HanbugarTwo openSidebar={opensidebar}/>
          </div>
        </div> 
      </div>      
    </div> 
  )
}

export default SocialNewsletter