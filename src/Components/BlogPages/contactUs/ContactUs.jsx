import React from 'react'
import { FaClock, FaEnvelope, FaFax, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { NavDirectionAndPageName } from '../../SharedAsset/SharedAssets'

const ContactUs = () => {

  const ContactInfo = [
    {
      id: 1,
      icon: <FaMapMarkerAlt className='inline-block'/>,
      text: "639,Longmei Avenue Jiangning Campus, Nanjing"
    },
    {
      id: 2,
      icon: <FaPhoneAlt className='inline-block'/>,
      text: "(0361) 888 1234"
    },
    {
      id: 3,
      icon: <FaFax className='inline-block'/>,
      text: "(0361) 888 1234"
    },
    {
      id: 4,
      icon: <FaEnvelope className='inline-block'/>,
      text: "contact@yourwebsite.com"
    },
    {
      id: 5,
      icon: <FaClock className='inline-block'/>,
      text: "Opening Days: Mon - Sat"
    },
  ]
 
  return (
    <section className='text-left'>
      <NavDirectionAndPageName page={"Contact Us"} />

      <p className='mt-16 py-4 prose-lg'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Saepe soluta natus consectetur sed quo, quas pariatur 
        ut ipsum optio neque, nemo molestias dignissimos! 
        Quisquam, odit sit. Ullam quod neque sint?
      </p>

      <div className='py-5'>
        <span dangerouslySetInnerHTML={{__html: Map ? Map :""}} className="p-1 shadow-sm w-full shadow-slate-500 inline-block"/>
      </div>

      <article className='mt-8'>      
        <h5 className='font-bold text-lg font-round'>Get in touch</h5>
        <p className='lg:w-[75%] prose-base py-1.5 w-[98%] mx-auto lg:mx-0'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Iusto incidunt, dolor doloremque sunt distinctio 
            soluta et obcaecati, odit rerum ex, enim consequatur
            facere. Laboriosam praesentium sint accusamus repellat,
              voluptatum consectetur!
        </p>
        <div className='mt-6 bg-white md:grid md:grid-cols-2'>
          <form className='md:mr-[4%] pt-8'>
            <label htmlFor="name" className='after:content-["*"] after:ml-0.5 after:text-[#f70d28]'>Name</label>
            <input type="text" name='Name' id='name' placeholder='John Doe'/>
            <label htmlFor="email" className='after:content-["*"] after:ml-0.5 after:text-[#f70d28]'>Email</label>
            <input type="email" name='Email' id='email' placeholder='you@example.com'/>
            <label htmlFor="subject">Subject</label>
            <input type="text" name='Subject' id='subject' placeholder='Subject exmaple'/>
            <label htmlFor="message">Your Message</label>
            <textarea name="Message" id="message" cols="30" rows="10" placeholder='My message ...'></textarea>
            <button className='uppercase cursor-pointer hover:bg-[#f70d28]/70 bg-[#f70d28] font-bold prose-lg text-white hover:text-white border
              border-solid border-[#f70d28] py-2 tracking-widest px-5 text-xs leading-[16px] shadow rounded
              shadow-gray-400/60 hover:border-[#f70d28]/70 outline-none transition-all duration-200 ease-linear'>Send</button>
          </form>

          <div className='md:ml-[4%] mt-8 md:mt-0'>
            <h5 className='font-bold text-xl font-round'>Contact Info</h5>
            <ul className='mt-8 prose-lg m-0 p-0'>
            {ContactInfo.map((info) => {
                return (
                  <li key={info.id} className="mb-12">
                    <span className='text-[#f70d28] inline-block mr-4 hover:text-gray-400'>{info.icon}</span>
                    <span className='text-[#54595f]/80 ml-4'>{info.text}</span>
                  </li>
                )
              })}
            </ul>        
          </div>
        </div>        
      </article>       
    </section>
  )
}

export default ContactUs
