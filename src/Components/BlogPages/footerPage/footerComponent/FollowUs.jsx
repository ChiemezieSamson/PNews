import React from 'react'
import { SocialMediaIcons } from '../../../../data'
import { Link } from 'react-router-dom'

const FollowUs = () => {
  
  return (
    <section className='lg:pb-8 pb-4'>

      <strong className="text-[20vw] xxs:text-7xl font-bold italic text-white relative after:absolute after:h-2.5 after:w-2.5 after:bg-[#f70d28]
        after:bottom-4">
          PNews
        <small className='text-neutral-300 xxs:text-[10px] absolute xxs:top-3 xxs:right-[20px] 
        text-[8px] -top-[5px] right-2 italic'> news, blog &amp; magazine</small>
      </strong> 


      <p className='font-round text-neutral-300 md:text-xs text-xs xxs:text-sm lg:text-sm my-4'>
        Our mission is to provide you with a comprehensive and reliable source of information, delivering the latest news, insightful analysis, and captivating stories from across the globe.
      </p>
      
      <b className='my-3 inline-block capitalize text-neutral-300 font-bold'>Follow Us</b>

      <ul>

       {SocialMediaIcons.slice(0, 5).map((icon) => {

        return (          
          <li key={icon.id} className="xxs:mx-1 mt-0.5 sxs:mt-0 first:ml-0 xxs:last:mr-0 xxs:last-ml-1 mx-px inline-block">

            <Link to={icon.link} className='text-2xl w-8 xxs:w-[38px] leading-9 inline-block text-center
             text-white bg-stone-500 rounded hover:bg-[#f70d28] TextHeadertransition'>
              <div className='align-text-top pb-1'>{icon.icon}</div>
            </Link>
          </li>
        )
       })}
      </ul>      
    </section>
  )
}

export default FollowUs
