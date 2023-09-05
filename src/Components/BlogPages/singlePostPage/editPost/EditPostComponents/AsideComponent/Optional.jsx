import React, { useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { WritePostAsideOpenClosebar } from '../../../../../ButtonAndOthers/Buttons'
import { isFecthingStyle } from '../../../../../SharedAsset/SharedAssets'


const Optional = ({handlesetViewed, handlessetShared, handleCheckedTrendig, trending, shared, viewed, userAction, isFetching}) => {
  const [openCat, setOpenCat] = useState(false) // use to open and close the category section

 // handling the display or hidden of the whole optional component
  const handleOpenCloseChild = () => {
    
    setOpenCat((change) => !change)
  }  

  return (
    <div className='text-sm bg-white lg:bg-[#eee]'>

      {/* This is just the button for changing the diplay and hidden of the whole optional component */}
      <WritePostAsideOpenClosebar BarName={"Excerpt (Optional)"} handle={handleOpenCloseChild}/>

      {/* form to add the share, view and trending post start here*/}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 pb-16 ${isFecthingStyle(isFetching)}`}>
        
        <label htmlFor="sharedPost" className="inline-block text-sm text-stone-700">SHARES</label>

        <input 
          type="number" 
          name='shares'
          value={shared}
          min={0}
          max={50000}
          id='sharedPost' 
          form="post_form" 
          className='disabled:opacity-40'
          disabled={!userAction}
          onChange={handlessetShared}
        />
      
        <label htmlFor="viewedPost" className="inline-block text-sm text-stone-700">VIEWS</label>

        <input 
          type="number" 
          name='views' 
          id='viewedPost'
          value={viewed}
          min={0}
          max={50000} 
          form="post_form"
          className='disabled:opacity-40'
          disabled={!userAction} 
          onChange={handlesetViewed}
        />

        <span className='inline-block mt-4'>

          <input 
            type="checkbox" 
            name='trendinpost' 
            id='trending' 
            form="post_form" 
            className='disabled:opacity-40 hidden'
            disabled={!userAction}            
            onChange={handleCheckedTrendig}
          />

          <label htmlFor="trending" className="inline-block text-sm text-stone-700">

            <div className='pr-0.5 mr-4'>Add to trending posts:</div>

            {trending && userAction ? 

              <span className='px-2 inline-block text-2xl text-blue-400'>
                <FaToggleOn  className='inline-block cursor-pointer'/>
              </span> 
              :
              <span className='px-2 inline-block text-2xl text-[#444]'>
                <FaToggleOff className='inline-block cursor-pointer'/>
              </span> 
            }  
          </label>
        </span>
      </div>
    </div>
  )
}

export default Optional
