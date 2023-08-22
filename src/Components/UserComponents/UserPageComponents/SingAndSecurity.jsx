import { UserInfoHeading } from '../../SharedAsset/SharedAssets'
import Email from './SecurityComponents/Email'
import ChangePassword from './SecurityComponents/ChangePassword'
import LogOutOrDeletUser from './SecurityComponents/LogOutOrDeletUser'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner'

const SingAndSecurity = () => {
  const {singleUser, userAction, isFetching} = useFetchedUserById()
  const user = singleUser

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>
      <UserInfoHeading head={"Security and account access"} text={"Manage your account's security and keep track of your account's usage."}/>
      
      <div className='divide-y divide-solid divide-neutral-400 mt-8 disabled:opacity-40' disabled={isFetching}>
        <Email user={user} userAction={userAction}/>

        <ChangePassword user={user} userAction={userAction}/>
          {userAction &&
          <LogOutOrDeletUser user={userAction && user}/>
          }
      </div> 
     
    </div>
  )
}

export default SingAndSecurity
