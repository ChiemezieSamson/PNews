import React from 'react'
import {  SocialMediaIcons } from '../../../data'

const FollowUs = () => {
  
  return (
    <section className='lg:pb-8 pb-4'>
      <div className='relative'>
        <strong className='text-7xl font-bold italic whitespace-nowrap text-white relative after:absolute after:h-2.5 after:w-2.5 after:bg-[#f70d28]
        after:bottom-5 after:not-italic'>
          CUmeh
          <small className='text-neutral-300 text-[10px] absolute top-7 right-9 italic'>news,blog &amp; magazine</small>
        </strong> 
      </div>

      <p className='font-round text-neutral-300 md:text-xs text-sm lg:text-sm my-4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        mollitia ea adipisci sequi ipsam pariatur iusto tempore
        dignissimos perspiciatis.
      </p>
      
      <b className='my-3 inline-block capitalize text-neutral-300 font-bold'>Follow Us</b>
      <ul className='whitespace-nowrap'>
       {SocialMediaIcons.slice(0, 5).map((icon) => {
        return (
          <li key={icon.id} className="m-1 inline-block">
            <span className='text-lg w-[38px] leading-9 whitespace-nowrap inline-block text-center
             text-white bg-stone-500 rounded hover:bg-[#f70d28] transition-all duration-400 delay-100 ease-linear'>
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
