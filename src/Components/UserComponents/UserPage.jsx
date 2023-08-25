import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { useWindowSize } from '../SharedAsset/SharedAssets';
import MyProfilePicture from './UserPageComponents/MyProfilePicture';
import { useFetchedUserById } from '../SharedAsset/Spinners/userSpinner';

const UserPage = () => {
   // getting the user for authenticatin, authorisation and security
   const {singleUser, userAction, isSuccess, isError, isFetching} = useFetchedUserById()
  const user = singleUser
   // getting the pathname value from the url through useLocation
   const { pathname } = useLocation();
   // getting the path from the path url
   const path = pathname.split("/")[2]
 

  const size = useWindowSize()
  const navigate = useNavigate();


  // when on small screen open the profile picture only on my profile nav
  let hideshowProfilePicture 
  if (size.width < 1316 && path === undefined) { hideshowProfilePicture = true }
  // on lager screen always keep open
  if (size.width >= 1316) {hideshowProfilePicture = true}

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
      name: "Security and account access",
      toUrl: "/userpage/security",
    },
    {
      id: 4,
      name: "Accessibility",
      toUrl: "/userpage/General",
    },
  ];  

  const style = `border-l-[10px] border-solid bg-gray-200/40 hover:bg-neutral-200 mt-2.5 mb-2.5 px-3 text-stone-800 TextHeadertransition cursor-pointer block py-2 h-[50px] sm:h-auto tracking-wider text-sm sm:text-base`

   // making user that only authorized user can update
   useEffect(() => {
    if(!isSuccess && isError) {
      
      window.history.replaceState({}, document.title)
      navigate("/login", {replace: true}, [navigate])
    }
  },[isSuccess, isError, navigate])


  return (
    <div className={`${size.width >= 1316 ? "grid grid-cols-4 gap-x-4" : "grid grid-flow-row "} font-poppins`}>

      {/* user navigation list */}
      <div className={`mt-6 text-left ${size.width >= 1316 ? "col-span-1 max-h-56" : "order-first grid grid-flow-col justify-evenly"}`}>

        {UserPages?.map((page) => {
            return (
              <div key={page.id} className = "mb-7 sm:mt-2 sm:mb-4">
                <NavLink to={page.toUrl} end className={({ isActive }) => isActive ? `${style} border-[#f70d28] font-semibold` : style}
                >{page.name}</NavLink>
              </div>              
            )
          })
        }                
      </div>

      {/* user information content */}
      <div className={`${size.width >= 1316 ? "col-span-2" : "order-last"} bg-gray-200/40 overflow-x-hidden rounded-md`}>
        <Outlet  context={[user, userAction, isFetching]}/>
      </div>
      
      {/* user image */}
      <div className={`${hideshowProfilePicture ? "block" : "hidden"}`}>
        <div className={`${size.width >= 1316 ? "col-span-1" : "order-2"}`}>
          <MyProfilePicture user={user} userAction={userAction} isFetching={isFetching}/>
        </div>         
      </div>
    </div>
  )
}


export default UserPage