import React, { useState } from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import { useWindowSize } from '../SharedAsset/SharedAssets';
import MyProfilePicture from './UserPageComponents/MyProfilePicture';

const UserPage = () => {
  const size = useWindowSize()
  const [navlinkTextContene, setNavlinkTextContene] = useState("")

  const handleNavlinkTextContene = (e) => {
    setNavlinkTextContene(() => e.target.textContent)
  }

  const UserPages = [
    {
      id: 1,
      name: "My Profile",
      toUrl: "/userpage",
    },
    {
      id: 2,
      name: "My Public Profile",
      toUrl: "/userpage/publicprofile",
    },
    {
      id: 3,
      name: "Sign in & security",
      toUrl: "/userpage/security",
    },
  ];  

  let hideshowProfilePicture 
  if (size.width < 1316 && navlinkTextContene === "My Profile") { hideshowProfilePicture = true }
  if (size.width >= 1316) {hideshowProfilePicture = true}

  const style = `border-l-[10px] border-solid bg-[#eee] mt-2.5 mb-2.5 px-3 text-[#282a35] transition-all 
  duration-200 ease-linear cursor-pointer block py-2 h-[50px] sm:h-auto tracking-wider text-sm sm:text-base`

  return (
    <div className={`${size.width >= 1316 ? "grid grid-cols-4 gap-x-4" : "grid grid-flow-row "} font-poppins`}>

      <div className={`mt-6 text-left  
      ${size.width >= 1316 ? "col-span-1" : "order-first grid grid-flow-col justify-evenly"}`}>
        {UserPages.map((page) => {
            return (
              <div key={page.id} className = "pb-7 sm:mt-2 sm:mb-4">
                <NavLink 
                to={page.toUrl} end 
                className={({ isActive }) => isActive ? `${style} border-[#f70d28] font-semibold` : style}
                onClick={handleNavlinkTextContene}
                >{page.name}</NavLink>
              </div>              
            )
          })
        }                
      </div>

      <div className={`${size.width >= 1316 ? "col-span-2" : "order-last"} bg-gray-200/40 overflow-x-hidden rounded-md`}>
        <Outlet/>
      </div>

      <div className={`${hideshowProfilePicture ? "block" : "hidden"}`}>
        <div className={`${size.width >= 1316 ? "col-span-1" : "order-2"}`}>
         <MyProfilePicture />
        </div>
      </div>            
    </div>
  )
}


export default UserPage