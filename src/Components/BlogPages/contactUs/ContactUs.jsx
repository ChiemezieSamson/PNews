import React from 'react'
import { ContactInfo, Map } from '../../../data'

const ContactUs = () => {
 
  return (
    <section className='text-left pt-20'>

      <h2 className='text-3xl font-round font-extrabold mb-3 capitalize'>Contact Pnews</h2>
      <p className='prose-base ml-3'>
        We value our readers and welcome your feedback, inquiries, and suggestions. Whether you have a story idea, 
        a question about our coverage, or want to share your thoughts, we're here to listen. For general inquiries or 
        comments about our website, content, or services, please email us at info@pnews.com. We strive to respond to all inquiries within 24-48 hours.
      </p>

      <h5 className='font-bold text-xl font-round mt-10 mb-3 capitalize'>News Tips and Story Ideas</h5>
      <p className='prose-base ml-3'>
        If you have a news tip, story idea, or information that you believe is newsworthy, please contact our news desk at newstips@pnews.com. 
        Our team of editors and reporters will review your submission and follow up if necessary.
      </p>

      <h5 className='font-bold text-xl font-round mt-10 mb-3 capitalize'>Advertising and Partnerships</h5>
      <p className='prose-base ml-3'>
        Pnews offers various advertising and partnership opportunities. If you're interested in exploring these options, please reach out to our advertising team at advertising@pnews.com. They will be happy to discuss your requirements and provide more information.
      </p>

      <h5 className='font-bold text-xl font-round mt-10 mb-3 capitalize'>Press and Media Inquiries</h5>
      <p className='prose-base ml-3'>
        For press and media inquiries, including interview requests, press releases, or media partnerships, please contact our media relations team at press@pnews.com.
      </p>

      <div className='py-5 my-20'>
        <h5 className='font-bold text-xl font-round mb-5 capitalize'>Location</h5>
        <span dangerouslySetInnerHTML={{__html: Map ? Map :""}} className="p-1 shadow-sm w-full shadow-slate-500 inline-block"/>
      </div>

      <article>   

        <h5 className='font-bold text-xl font-round mb-3 capitalize'>Career Opportunities</h5>
        <p className='prose-base ml-3'>
          Pnews is always on the lookout for talented journalists, writers, and media professionals. If you're interested in joining our team, please visit our Careers page at pnews.com/careers to explore current job openings and submit your application.
        </p>

        <h5 className='font-bold text-xl font-round mt-10 mb-3 capitalize'>Get in touch</h5>
        <p className='prose-base ml-3'>
          While we prefer electronic communication for efficiency and convenience, you can also reach us by phone at +1 (555) 123-4567 during regular business hours.
          We appreciate your interest in Pnews and look forward to hearing from you.
        </p>

        <div className='my-20 bg-white grid md:grid-cols-2 md:gap-x-4'>          

          <form className='mt-8 md:mt-0 order-last md:order-first'>

            <h5 className='font-bold text-xl font-round mb-8 capitalize'>Your message</h5>

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
              shadow-gray-400/60 hover:border-[#f70d28]/70 outline-none TextHeadertransition'>Send</button>
          </form>

          <div>

            <h5 className='font-bold text-xl font-round capitalize'>Contact Info</h5>

            <ul className='mt-8 prose-lg m-0 p-0'>

              {ContactInfo.map((info) => {

                return (
                  <li key={info.id} className="inline-block md:block mx-3">
                    
                    <span className='text-[#f70d28] inline-block hover:text-gray-400 TextHeadertransition'>{info.icon}</span>
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
