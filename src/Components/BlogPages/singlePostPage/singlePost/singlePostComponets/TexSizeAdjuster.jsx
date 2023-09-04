import { useHover } from '@uidotdev/usehooks';
import React from 'react'
import { BiFontFamily } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa';



// { /* Text size adjuster and comment number */}
const TexSizeAdjuster = ({fontSizeButton, sizeLine, comments}) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <span className='align-top text-lg sm:mt-0.5 inline-block'>

    {/* Text size adjuster */}
    <span className='relative mx-3'>

      <span title='text size' ref={hoverRef}>

        <BiFontFamily  className='inline-block text-neutral-500'/>

        {isHovered &&
        
          <div className='absolute top-full -translate-x-[50%] pt-4 z-20 whitespace-nowrap w-48 max-h-[104px] text-center'>

            <div className='bg-neutral-50 relative rounded -translate-x-[30%] shadow-sm shadow-neutral-300 grid grid-cols-2 grid-rows-2 after:absolute after:right-2
              after:bottom-full after:bg-white after:-ml-1.5 after:border-b-[12px] after:border-x-[10px] after:border-solid after:border-b-white  after:border-x-[rgba(0,0,0,2%)]
              after:border-t-[rgba(0,0,0,2%)]'>

              {fontSizeButton.map((bnt) => {

                return (

                  <button 
                    key={bnt.id} 
                    name='textsizeButton'
                    className="last:col-span-2 text-sky-500 last:text-neutral-300 last:hover:text-neutral-500 py-1.5
                    last:border-t-2 last:border-solid last:border-sky-500 first:border-r first:border-solid first:border-neutral-300 
                    relative isolate after:absolute  after:inset-0 after:z-30" 
                    title={bnt.title ? bnt.title : ""} 
                    onClick={bnt.onClick}
                  >
                    {bnt.icon}
                  </button>
                )
              })}                  
            </div> 

            <div className="absolute inset-x-0 z-30 h-[2px] top-[58%] -left-[30%] bg-red-500" style={{width:`${sizeLine}%`}}></div>
          </div>                                 
        }
      </span>                     
    </span>

    {/* Comment number */}
    <span className='hidden sm:inline-block'>
      
      <FaRegComment className="text-[#2e9fff] inline-block mr-1.5 align-middle"/> 
        <span className='mb-0.5 text-[#7a7a7a]/80 leading-4 align-middle inline-block font-medium'>{comments?.length ? comments?.length : 0}</span>
    </span>
  </span>
  )
}

export default TexSizeAdjuster
