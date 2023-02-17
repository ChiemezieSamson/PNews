import React from 'react'
import Chinonye from "../../../asset/images/chinonye.jpg"
import { NavDirectionAndPageName, NewsLetter } from '../../SharedAsset/SharedAssets'

const About = () => {
  return (
    <section className='text-left'>
      <NavDirectionAndPageName page={"About"} />

      <article className='grid grid-flow-row md:grid-cols-5 mt-20'>
        <div className='md:col-span-3 order-last md:order-first w-[94%] mx-auto md:w-full md:pr-[10%]'>
          <h6 className='font-round mb-5 tracking-widest'>Hello & Welcome</h6>
          <h2 className='xl:text-[50px] text-4xl  lg:text-[42px] lg:leading-none font-bold font-lora mb-5'>Hi, I'm Umeh Chinonye</h2>
          <div className='xl:grid grid-cols-2 gap-x-8'>
            <div>
              <p className='py-4 prose text-lg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laudantium, culpa quam voluptates vel ullam officiis officia tempore voluptatibus quia! Perspiciatis fugiat officia illo quaerat labore deleniti odio saepe veniam. 
               </p>
              <p className='py-4 prose text-lg'>              
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic reprehenderit, earum exercitationem quas aliquam enim vitae quaerat, dolores quos iure debitis doloremque voluptatum magnam alias tempora quisquam eum dolor autem.
              </p>
            </div>

            <div>
              <p className='py-4 prose text-lg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laudantium, culpa quam voluptates vel ullam officiis officia tempore voluptatibus quia! Perspiciatis fugiat officia illo quaerat labore deleniti odio saepe veniam.
              </p>
              <p className='py-4 prose text-lg'>              
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic reprehenderit, earum exercitationem quas aliquam enim vitae quaerat, dolores quos iure debitis doloremque voluptatum magnam.
              </p>
            </div>                     
          </div>
        </div>

        <div className='mb-7 md:col-span-2'>
          <img src={Chinonye} alt="ChinonyeUmeh" className='w-full h-auto'/>
        </div>
      </article>

      <div className='md:w-1/2 mt-8'>
        <div className='border-y-2 border-solid  border-gray-400/70 py-4'>
          <p className='imgxs:text-lg sxs:text-base text-sm font-lora italic font-bold'>
            For More Stories Like this,
            <span className='text-[#f70d28] underline underline-offset-4'> sing up for our newsletter.</span>
          </p>
        </div>

        <NewsLetter />
      </div>

      
      
    </section>
  )
}

export default About
