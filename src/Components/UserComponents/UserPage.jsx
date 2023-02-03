import React from 'react';
import MyProfilePicture from './MyProfilePicture';
import Personal from './Personal';

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
      <div className='col-span-2 bg-gray-200/40'>
        <Personal />
      </div>
      <div className='col-span-1'>
        <MyProfilePicture />
      </div>            
    </div>
  )
}


export default UserPage