import React, { useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'


const Optional = () => {
  const [openCat, setOpenCat] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleCheckedTrendig = (e) => {
    e.target.checked ? setChecked(() => true) : setChecked(() => false)
  }


  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }
  return (
    <div className='text-sm bg-white lg:bg-[#eee]'>
      <WritePostAsideOpenClosebar BarName={"Excerpt (Optional)"} handle={handleOpenCloseChild}/>

      {/* form to add the share, view and trending post start here*/}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 pb-16`}>
         
          <label htmlFor="sharedPost">SHARES</label>
          <input type="number" name='shares' id='sharedPost' form="post_form"/>
        
          <label htmlFor="viewedPost">VIEWS</label>
          <input type="number" name='views' id='viewedPost' form="post_form"/>

          <span className='inline-block mt-4'>
            <input type="checkbox" name='trendinpost' id='trending' className='hidden' onChange={handleCheckedTrendig}/>
            <label htmlFor="trending" >
            <span className='pr-0.5 mr-4'>Add To Trending</span>
              {checked ? 
              <span className='px-2 inline-block text-2xl text-blue-400' >
                <FaToggleOn  className='inline-block'/>
              </span> :
              <span className='px-2 inline-block text-2xl  text-[#444]'>
                <FaToggleOff className='inline-block'/>
              </span> 
                }  
            </label>
          </span>
           

      </div>
    </div>
  )
}

export default Optional
