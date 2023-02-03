import React from 'react'

const NewsLetter = () => {
  return (
    <section className='mt-2'>
      <b className='inline-block text-[#f93d53] font-bold mb-5 text-lg'>NewsLetter</b>

      <div className='shadow-sm rounded-sm'>
        <p className='font-round text-[#a8a8aa] md:text-xs text-sm lg:text-sm tracking-normal my-0.5'>Subscribe to our mailing list to receives daily updates direct to your inbox!</p>
        <form className='my-4'>
          <input type="email" placeholder='Your email address' name='email' 
          className='bg-zinc-600/50 focus:outline-none caret-[#f70d28] placeholder:text-[#eee] w-full sm:w-auto focus:ring-0 lg:w-[60%] py-[9px] focus:border-none border-none shadow-inner text-center lg:text-left'/>
          <input type="button" value={"sing up"} name='email' className='uppercase block w-full sm:w-auto lg:mt-2 sm:inline-block text-xs font-bold pt-[14.2px] pb-3 px-6 text-[#eee] bg-[#f93d53]'/>
        </form>
        <small className='text-[#a8a8aa] block text-[11px] tracking-wide pb-7'>
          <sup>*</sup>
          we hate spam as much as you do
        </small>
      </div>
      
    </section>
  )
}

export default NewsLetter
