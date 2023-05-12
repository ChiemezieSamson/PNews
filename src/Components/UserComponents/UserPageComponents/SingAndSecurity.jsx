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
      <UserInfoHeading head={"Account access"} text={""}/>

      {userAction ? 
      <div className='divide-y divide-solid divide-slate-500 mt-8 disabled:opacity-40' disabled={isFetching}>
        <Email user={user}/>
        <ChangePassword user={user}/>
        <LogOutOrDeletUser user={user}/>
      </div> : singleUser}
    </div>
  )
}

export default SingAndSecurity
