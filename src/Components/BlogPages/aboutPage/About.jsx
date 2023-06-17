import React from 'react'
import Chinonye from "../../../asset/images/chinonye.jpg"
import { NavDirectionAndPageName, NewsLetter } from '../../SharedAsset/SharedAssets'

const About = () => {
  return (
    <section className='text-left'>
      <NavDirectionAndPageName />

      <article className='grid grid-flow-row md:grid-cols-5 md:gap-x-4 mt-20'>
        
        <div className='md:col-span-3 order-last md:order-first'>

          <h6 className='font-round mb-5 tracking-widest'>Hello & Welcome</h6>
          
          <h2 className='xl:text-[50px] text-4xl lg:text-[42px] lg:leading-none font-bold font-lora 
          mb-5'>Hi, I'm Umeh Chinonye</h2>
          
          <div>
            <div  className='py-4 prose text-lg'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laudantium, culpa quam voluptates vel ullam officiis officia tempore voluptatibus quia! Perspiciatis fugiat officia illo quaerat labore deleniti odio saepe veniam. 
              </p>

              <p>              
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic reprehenderit, earum exercitationem quas aliquam enim vitae quaerat, dolores quos iure debitis doloremque voluptatum magnam alias tempora quisquam eum dolor autem.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laudantium, culpa quam voluptates vel ullam officiis officia tempore voluptatibus quia! Perspiciatis fugiat officia illo quaerat labore deleniti odio saepe veniam.
              </p>

              <p>              
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic reprehenderit, earum exercitationem quas aliquam enim vitae quaerat, dolores quos iure debitis doloremque voluptatum magnam.
              </p>
              
            </div>                     
          </div>
        </div>

        <div className='mb-7 md:col-span-2 max-h-[750px]'>
          <img src={Chinonye} alt="ChinonyeUmeh" className=''/>
        </div>
      </article>

      <div className='md:w-1/2 mt-8'>
        <div className='border-y-2 border-solid  border-gray-400/70 py-4'>
          <p className='imgxs:text-lg sxs:text-base text-sm font-lora italic font-bold'>
            For More Stories Like this,
            <span className='text-[#f70d28] underline underline-offset-4 inline-block mx-2'> sing up for our newsletter.</span>
          </p>
        </div>

        <NewsLetter />
      </div>    
    </section>
  )
}

export default About
