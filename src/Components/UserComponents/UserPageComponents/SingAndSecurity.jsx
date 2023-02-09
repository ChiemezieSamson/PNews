import { UserInfoHeading } from '../../ButtonAndOthers/SharedAssets'
import Email from './SecurityComponents/Email'
import ChangePassword from './SecurityComponents/ChangePassword'

const SingAndSecurity = () => {

  return (
    <div className='text-left px-5 mt-8 font-source pt-7 pb-5'>
      <UserInfoHeading head={"Account access"} text={""}/>

      <div className='divide-y divide-solid divide-slate-500 mt-8'>
        <Email />
        <ChangePassword />
        

      </div>
    </div>
  )
}

export default SingAndSecurity
