import React, { useState } from 'react'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'

const ChangePassword = () => {
  const [openCat, setOpenCat] = useState(false)

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }


  return (
    <div className='font-poppins relative'>
      <WritePostAsideOpenClosebar BarName={"Change Password"} handle={handleOpenCloseChild}/>

      <div className={`${openCat? "block" : "hidden"} mt-2 mb-10 px-3 text-[#444]`}>
          <div className='font-medium tracking-wide font-josefin'>
            <p>Create a new password that is at least 8 characters long.</p>
          </div>

          <div>

          </div>
      </div>
    </div>
  )
}

export default ChangePassword
