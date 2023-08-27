import React from 'react'

const NewsLetter = () => {
  return (
    <section className='mt-2'>
      <b className='inline-block text-[#f93d53] font-bold mb-5 text-lg'>NewsLetter</b>

      <div>
        <p className='font-round text-neutral-300 md:text-xs text-sm lg:text-sm tracking-normal my-0.5'>Subscribe to our mailing list to receives daily updates direct to your inbox!</p>

        <form className='my-4'>

          <input type="email" placeholder='Your email address' name='email' 
            className='bg-neutral-600 focus:outline-none caret-[#f70d28] placeholder:text-neutral-100 
            w-full sm:w-auto focus:ring-0 lg:w-[60%] py-[9px] focus:border-none border-none
              shadow-inner text-center lg:text-left rounded-none'/>

          <input type="button" value={"sing up"} name='email' 
            className='uppercase block w-full sm:w-auto lg:mt-2 sm:inline-block text-xs font-bold 
              pt-[14.2px] pb-3 px-6 text-neutral-100 bg-[#f93d53]'/>

        </form>

        <small className="text-neutral-200 block text-[11px] tracking-wide before:content-['*'] before:ml-0.5 before:text-white before:px-px">
          we hate spam as much as you do
        </small>
      </div>
      
    </section>
  )
}

export default NewsLetter
