import React from 'react'
import { SocialMediaIcons } from '../../../../data'

const FollowUs = () => {
  
  return (
    <section className='lg:pb-8 pb-4'>

      <strong className="text-5xl sxs:text-7xl font-bold italic whitespace-nowrap text-white relative after:absolute after:h-2.5 after:w-2.5 after:bg-[#f70d28]
        after:bottom-4">
          CUmeh
        <small className='text-neutral-300 sxs:text-[10px] absolute sxs:top-3 sxs:right-[34px] 
        text-[8px] top-0 right-2 italic'> news,blog &amp; magazine</small>
      </strong> 


      <p className='font-round text-neutral-300 md:text-xs text-sm lg:text-sm my-4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. mollitia ea adipisci sequi ipsam pariatur iusto tempore
        dignissimos perspiciatis.
      </p>
      
      <b className='my-3 inline-block capitalize text-neutral-300 font-bold'>Follow Us</b>

      <ul className='sxs:whitespace-nowrap'>

       {SocialMediaIcons.slice(0, 5).map((icon) => {
        return (
          
          <li key={icon.id} className="mx-1 mt-0.5 sxs:mt-0 first:ml-0 last:mr-0 inline-block">
            <span className='text-2xl w-[38px] leading-9 whitespace-nowrap inline-block text-center
             text-white bg-stone-500 rounded hover:bg-[#f70d28] TextHeadertransition'>
              <div className='align-text-top pb-1'>{icon.icon}</div>
            </span>
          </li>
        )
       })}
      </ul>
      
    </section>
  )
}

export default FollowUs
