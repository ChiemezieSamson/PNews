import React from 'react'
import { FaBehance, FaDribbble, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
// import MyLogo from "../../../asset/images/LogoMakr-4rVg69.png"

const FollowUs = () => {
  const social = [<FaFacebookF className='inline'/>, <FaTwitter className='inline'/>, 
  <FaInstagram className='inline'/>, <FaBehance className='inline'/>, <FaDribbble  className='inline'/>]
  return (
    <section className='lg:pb-8 pb-4'>
      <div className='relative'>
        <strong className='text-7xl font-bold italic whitespace-nowrap text-white relative after:absolute after:h-2.5 after:w-2.5 after:bg-[#f70d28]
        after:bottom-5 after:not-italic'>
          CUmeh
          <small className='text-[#a8a8aa] text-[10px] absolute top-7 right-[15%] italic'>news,blog &amp; magazine</small>
        </strong> 
      </div>

      <p className='font-round text-[#a8a8aa] md:text-xs text-sm lg:text-sm my-4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        mollitia ea adipisci sequi ipsam pariatur iusto tempore
        dignissimos perspiciatis.
      </p>
      
      <b className='my-3 inline-block capitalize text-[#a8a8aa] font-bold'>Follow Us</b>
      <ul className='whitespace-nowrap'>
       {social.map((icon, index) => {
        return (
          <li key={index} className="m-1 inline-block">
            <span className='text-base w-[38px] inline-block leading-9 whitespace-nowrap text-center
             text-[#eee] bg-zinc-600/50 rounded hover:bg-[#f70d28] transition-all duration-500 delay-200 ease-linear'>
              {icon}
            </span>
          </li>
        )
       })}
      </ul>
      
    </section>
  )
}

export default FollowUs
