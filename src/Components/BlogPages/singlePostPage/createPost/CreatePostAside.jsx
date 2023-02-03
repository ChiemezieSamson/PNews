import React, { useEffect, useState } from 'react'
import { FaGripHorizontal, FaGripVertical } from 'react-icons/fa'
import { useWindowSize } from '../../../ButtonAndOthers/SharedAssets'
import { Hanbugar3 } from "../../../ButtonAndOthers/Buttons"
import Author from './CreatePostAsideComponents/Author'
import Category from './CreatePostAsideComponents/Category'
import Optional from './CreatePostAsideComponents/Optional'
import Tag from './CreatePostAsideComponents/Tag'

const CreatePostAside = () => {
  const [showSideBar, setShowSideBar] = useState(false)
  const size = useWindowSize()

  const handleShowBar = () => {
    setShowSideBar((change) => !change)
  }

  const handleCloseSidebar = () => {
    setShowSideBar(() => false)
  }

  useEffect(() => {
    size.width >= 1024 ? setShowSideBar(() => true) : setShowSideBar(() => false)
  },[size])
  return (
    <div className="lg:border border-solid border-slate-500 lg:shadow-[#444] lg:shadow lg:ml-[4%] lg:pb-20 bg-white lg:bg-[#eee]">

       {/* write submit */}
      <div className={`grid grid-cols-5 xl:grid-cols-7 gap-x-2 justify-between p-2 ${showSideBar && "mb-10"} max-w-sm ml-auto`}>
        <span className={`col-span-4 xl:col-span-6 grid grid-cols-2 gap-x-2`}>
          <button className='text-[#444] bg-gray-300  hover:bg-gray-400 hover:text-[#eee] border-0 p-2.5 rounded-sm cursor-pointer text-base 
          shadow-[#444] shadow-sm'>Preview</button>

          <button className='text-white bg-[rgba(0,128,128,0.8)] hover:bg-[rgb(0,128,128)] border-0 p-2.5 rounded-sm cursor-pointer text-base
          shadow-[#444] shadow-sm' 
          type='submit' form="post_form">Publish</button>
        </span>

        <button className={`text-[#444] ${showSideBar ? "bg-[#afacac]" : "bg-slate-200"} hover:bg-gray-400 col-span-1 hover:text-[#eee] border-0 p-2.5 rounded-sm cursor-pointer text-base 
          shadow-[#444] shadow-sm`} onClick={handleShowBar}>
            {showSideBar ?
            
                <FaGripVertical className={`${showSideBar && "text-white" } inline-block`}/>
              : 
                            
                <FaGripHorizontal className='inline-block'/>
           
            }
          </button>
      </div>

      <div className={`${showSideBar ? "block" : "hidden"} absolute z-30 inset-0 lg:static bg-white lg:bg-[#eee]
       divide-y divide-solid divide-slate-500`}>
        <span className={`${showSideBar ? "block" : "hidden"} lg:hidden grid grid-flow-col justify-between mb-1`}>
          <span>
            {"(no title)"}
          </span>
          <span className='hover:bg-red-400 px-1'>
            <Hanbugar3 closesidebar={handleCloseSidebar}/>
          </span>
        </span>
        <Author />
        <Category />  
        <Tag />    
        <Optional />
      </div>       
    </div>
  )
}

export default CreatePostAside
