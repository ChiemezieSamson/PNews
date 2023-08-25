import { UserInfoHeading, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import Email from './SecurityComponents/Email'
import ChangePassword from './SecurityComponents/ChangePassword'
import LogOutOrDeletUser from './SecurityComponents/LogOutOrDeletUser'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner'
import { useOutletContext } from 'react-router-dom'

const SingAndSecurity = () => {
  // fetching the user from the parent
  const [user, userAction, isFetching] = useOutletContext();
  const { refetch } = useFetchedUserById()

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>
      <UserInfoHeading head={"Security and account access"} text={"Manage your account's security and keep track of your account's usage."}/>
      
      <div className={`divide-y divide-solid divide-neutral-400 mt-8 relative ${isFecthingStyle(isFetching)}`}>
        <Email user={user} userAction={userAction}/>

        <ChangePassword user={user} userAction={userAction}/>

        <LogOutOrDeletUser user={userAction && user} refetch={refetch} userAction={userAction}/>
      </div> 
     
    </div>
  )
}

export default SingAndSecurity
