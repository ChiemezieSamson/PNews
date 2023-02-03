import React from 'react';
import MyProfilePicture from './UserPageComponents/MyProfilePicture';
import MyPublicProfile from './UserPageComponents/MyPublicProfile';


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

  return (
    <div className='grid grid-cols-4 gap-x-4 font-source'>
      <div className='col-span-1 bg-gray-200/40'></div>
      <div className='col-span-2 bg-gray-200/40 overflow-x-hidden'>
        <MyPublicProfile />
      </div>
      <div className='col-span-1'>
        <MyProfilePicture />
      </div>            
    </div>
  )
}


export default UserPage