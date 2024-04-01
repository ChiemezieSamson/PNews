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
          mb-5'>Hi, We're PNews</h2>
          
          <div>
            <div  className='py-4 prose text-lg'>
              <p>
                Pnews is a leading online news and media platform dedicated to delivering accurate, timely, and unbiased information to a global audience. Established in 2021, 
                our mission is to empower people with knowledge and foster a well-informed society.
              </p>

              <h4>Our Team</h4>
              <p>              
                Behind Pnews is a team of passionate journalists, editors, and media professionals who are committed to upholding the highest standards of journalism. 
                Our reporters are based around the world, providing on-the-ground coverage of major events and uncovering stories that matter. With diverse backgrounds 
                and expertise, our team brings a wealth of experience and perspectives to every story we publish
              </p>

              <h4>Our Approach</h4>
              <p>
                At Pnews, we believe in the power of honest and ethical journalism. Our writers and editors strive to present well-researched, fact-based articles that 
                offer multiple viewpoints on complex issues. We value transparency and accountability, and we are committed to correcting any errors or inaccuracies promptly.
              </p>

              <h4>Our Values</h4>
              <ul>
                <li>
                  <strong>Integrity:</strong>We uphold the highest ethical standards in our reporting, ensuring accuracy, fairness, and objectivity.
                </li>
                <li>
                  <strong>Independence:</strong>Our editorial decisions are free from external influences, allowing us to report without fear or favor.
                </li>
                <li>
                  <strong>Credibility:</strong>We strive to be a trusted source of information by consistently delivering high-quality, well-sourced content.
                </li>
                <li>
                  <strong>Innovation:</strong>We embrace technological advancements and continuously explore new ways to enhance our storytelling and reader experience.
                </li>
              </ul>

              <h4>Our Commitment</h4>
              <p>              
                Pnews is dedicated to serving the public interest by providing reliable news and information that empowers individuals to make informed decisions. We aim to foster 
                a well-informed society by promoting transparency, encouraging critical thinking, and facilitating open dialogue on important issues.
              </p>              
            </div>                     
          </div>
        </div>

        <div className='mb-7 md:col-span-2 max-h-[750px] shadow-md shadow-neutral-500 rounded-sm'>
          <img src={Chinonye} alt="ChinonyeUmeh" className='max-h-[750px] rounded-sm'/>
        </div>
      </article>

      <div className='md:w-1/2 mt-8'>

        <div className='border-y-2 border-solid  border-gray-400/70 py-4 inline-block pr-5'>
          
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
