import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import MyProfilePicture from './UserPageComponents/MyProfilePicture';



const UserPage = () => {
  // const [user, setUser] = useState();

  // const handleInputChange = e => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const handleSocialLinksChange = e => {
  //   setUser({
  //     ...user,
  //     socialLinks: {
  //       ...user.socialLinks,
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // };
  const UserPages = [
    {
    id: 1,
    name: "My Profile",
    toUrl: "/userpage"
    },
    {
    id: 2,
    name: "My Public Profile",
    toUrl: "/userpage/publicprofile"
    },
    {
    id: 3,
    name: "Sign in & security",
    toUrl: "/userpage/security"
    },
  ]
  const style = `border-l-[10px] border-solid bg-[#eee] mt-2.5 mb-2.5 pl-3 text-[#282a35] transition-all 
  duration-200 ease-linear cursor-pointer hidden sm:block py-2 tracking-wider`

  return (
    <div className='grid grid-cols-4 gap-x-4 font-poppins'>
      <div className='col-span-1 mt-6 text-left'>
        {UserPages.map((page) => {
            return (
              <span key={page.id}>
                <NavLink to={page.toUrl} end className={({ isActive }) => isActive ? `${style} border-[#f70d28] font-semibold` : style}>{page.name}</NavLink>
              </span>              
            )
          })
        }                
      </div>
      <div className='col-span-2 bg-gray-200/40 overflow-x-hidden rounded-md'>
        <Outlet/>
      </div>
      <div className='col-span-1 rounded-md'>
        <MyProfilePicture />
      </div>            
    </div>
  )
}


export default UserPage