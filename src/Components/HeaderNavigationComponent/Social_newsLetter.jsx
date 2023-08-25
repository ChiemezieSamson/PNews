import React, { useEffect, useState } from "react";
import {  publicFolder } from "../../data";
import { HanbugarTwo } from "../ButtonAndOthers/Buttons";
import { FaRegEnvelope } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../Reduxstore/Slices/authSlice/authApiSlic";
import Spinner from "../SharedAsset/Spinners/Spinner";
import { useDispatch } from "react-redux";
import { logOut } from "../../Reduxstore/Slices/authSlice/AuthSlice";
import { SocialMediaLinks } from "../SharedAsset/SharedAssets";


const SocialNewsletter = ({opensidebar, user, userAction, isFetching, userisSuccess, isError, refetch}) => {
  // logout call to the server
  const [sendLogout, {isLoading, isSuccess}] = useSendLogoutMutation()
  const [showLogoutModal, setShowLogoutModal] = useState(false); // chose what to dispaly when in userpage and when not in userpage
  const [buttonText, setButtonText] = useState("Login") 

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.pathname.split("/")[1]);


  useEffect(() => {
    if (isSuccess) {
      navigate('/', {replace: true}, [navigate]) 
      refetch() // refetch the single user
    } 
  }, [isSuccess, navigate, refetch])
  
  
  useEffect(() => {
    if (location?.pathname?.split("/")[1]?.startsWith("user")) {// makeSure we are in the userPage
      setButtonText(() => "LogOut")
    }else if (location?.pathname?.split("/")[1]?.startsWith("login")){ // check if we are in the login Page
      setButtonText(() => "")
    }else {
      setButtonText(() => "LogIn")
    }
  }, [location])
  
  
  const handleLogOutConfirmation = () => {
    if(buttonText === "LogOut") {
      
      setShowLogoutModal(() =>  true)
    }else if (buttonText === "LogIn") {
      
      navigate('/login', {replace: true}, [navigate])
    }
  }


  const handleLogOut = async () => {
    localStorage.setItem("userToken", ""); // clear the user token from localStorage

    if(location.pathname.split("/")[1]?.startsWith("user")){ // makeSure we are in the userPage
      await sendLogout() // send request to the server to clear cookies used or refresh
      dispatch(logOut()) // reset userToke to null
      setShowLogoutModal(() =>  false)
    }
   }
  
  //Logout button confirmation modal
  const LogOutConfirmation = (
    <div className="modal-content">
        <p className="text-neutral-400">Are you sure you want to logout?</p>
        <button onClick={handleLogOut} className='hover:bg-blue-400 hover:text-neutral-100 border-0  px-2.5 mx-2.5 rounded-full cursor-pointer shadow-[#444] 
            shadow-sm transition-all duration-200 ease-linear'>Logout</button>
        <button onClick={() => setShowLogoutModal(() => false)} className='mx-2.5 border-0 px-2.5 rounded-full cursor-pointer shadow-[#444] 
            shadow-sm hover:bg-rose-400 hover:text-neutral-100 transition-all duration-200 ease-linear'>Cancel</button>
      </div>
    )

  return (
    <div className="shadow-md py-2 font-josefin">
      <div className="grid grid-flow-col justify-between max-w-[98%] mx-auto">

        {/* Login, logout and user Button*/} 
        <div className="relative disabled:opacity-40" disabled={isFetching}>  

          {/* Login and logout Button*/} 
          <div>
              {((buttonText === "LogIn" && isError) || (buttonText === "LogOut" && userisSuccess)) && 
              (<button className='text-neutral-500 capitalize border-0 py-0.5 px-4 rounded-full cursor-pointer text-base shadow-[#444] 
                 shadow-sm' type='button' title='Logout' onClick={handleLogOutConfirmation}>
                {isLoading ? <Spinner text=""/> :  buttonText}
              </button>) 
              }
          </div>

  

            {/* user profile image serving as a linke to he user page */}
          {(userisSuccess &&  buttonText !== "LogOut") &&
            (<Link to={"/userpage"} className="rounded-full m-0 inline-block fixed left-px top-2 lg:inset-auto z-[9999] bg-stone-100"
              title="user profile">
              <img src={publicFolder + user?.profileImage} alt="userImage" className="rounded-full border border-solid
               border-rose-400 p-px m-0 object-cover object-center cursor-pointer max-w-[3rem] w-auto max-h-[3rem] mx-auto"/>
           </Link>)
          }

            {/* Logout confirmation modal */}
          <div className={`absolute top-full z-[9999] min-w-[16rem] py-2 px-2 bg-stone-100 rounded shadow-[#444] shadow-sm mt-2.5 prose font-medium
           ${showLogoutModal ? "translate-y-0 opacity-100 visible transition-all duration-200 ease-linear" : "-translate-y-full opacity-0 invisible"}`}>
            {LogOutConfirmation}
          </div>
        </div>

        {/* ====== newsletter start here ===== */}
        <form 
        className="border-x-0 border-t-0 border-b border-solid border-black md:inline-block p-0 hidden "
        action="" 
        >
          <label htmlFor="newsletter" className="inline-block">
            <input 
            type="email" 
            id="newsletter" 
            className="border-0 focus:border-0 ring-0 focus:ring-0 shadow-none py-0 m-0 px-1" 
            placeholder="Enter your email" 
            name="mail" 
            aria-required="true" 
            required
            />
          </label>
   
          <button 
          type="submit" 
          className="border-0 focus:border-0 ring-0 focus:ring-0 shadow-none bg-transparent inline-block text-[1rem] py-0 m-0 px-1">
            <span>Subscribe Newsletter 
              <FaRegEnvelope  className="inline-block mx-2 text-stone-500 mb-1"/>
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