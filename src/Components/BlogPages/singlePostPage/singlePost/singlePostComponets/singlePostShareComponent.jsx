import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaShare, FaTwitter } from 'react-icons/fa'

const SinglePostShareComponent = ({postAction, Post, size}) => {
  const [otherShare, setOtherShare] = useState(false)

  useEffect(() => {
    if(size.width) {
      setOtherShare(() => false)
    }
  }, [size])

  return (    
    <div className='grid grid-cols-10 xs:grid-cols-12 gap-x-[1%] lg:mb-8 mb-4 w-full'>

      {/* share number and views number */}
      <div className='col-span-2 hidden xs:block'>
        <div className="whitespace-nowrap relative pt-1 lg:mx-0 grid grid-flow-col justify-around px-0.5 after:w-0.5 after:h-full
          after:bg-neutral-300 after:block after:absolute after:right-0 after:-top-0.5 after:rotate-[15deg] after:z-0">
            <span className='font-extrabold text-[#f70d28] font-round text-2xl leading-none text-center'>
              <span className={`${postAction ? "" : "skeleton h-3 w-3 inline-block"}`}>
                {postAction && (Post?.optional?.shared >= 1000 ? Post?.optional?.shared + "k" : Post?.optional?.shared)}
              </span>

              <div className='text-neutral-500 uppercase text-xs font-lora font-normal -mt-0.5'>shares</div>
            </span>        
      
          <span className='hidden font-extrabold lg:inline-block text-slate-500 font-round text-2xl leading-none text-center'>
            <span className={`${postAction ? "" : "skeleton h-3 w-3 inline-block"}`}>
              {postAction && (Post.optional.viewed >= 1000 ? Post.optional.viewed + "k" : Post.optional.viewed)}           
            </span>
            <div className='text-neutral-500 uppercase text-xs font-lora font-normal -mt-0.5'>views</div>
          </span>
        </div>
      </div>

      {/* facebook ,twitter */}
      <div className='col-span-6'>
        <div className='grid grid-cols-2 gap-x-[1%]'>
          <span className='px-3 whitespace-nowrap inline-block bg-[#45629f] hover:bg-[rgba(69,98,159,.9)] text-center text-white rounded
             leading-10 cursor-pointer TextHeadertransition'>
            <FaFacebookSquare className='inline-block text-lg text-white align-middle mb-1'/>
            <span className='ml-2.5 font-bold text-xs md:-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on facebook</span>
          </span>

          <span className='px-3 whitespace-nowrap inline-block bg-[#5db2ef] hover:bg-[rgba(94,178,239,.9)] text-center text-white rounded
             leading-10 cursor-pointer TextHeadertransition'>
            <FaTwitter className='inline-block text-lg text-white align-middle'/>
            <span className='ml-2.5 font-bold text-xs md:text-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on twitter</span>
          </span>
        </div>
      </div>


      {/* share , email, linkedIn, instagram, share button */}
      <div className='col-span-4'>
        <div className='grid grid-flow-col gap-x-[1%]'>     

          <span className='leading-10 whitespace-nowrap inline-block rounded text-center text-white bg-[#eb4d3f]
          cursor-pointer hover:bg-[rgba(235,77,63,.9)] TextHeadertransition' title='mail'>
            <FaEnvelope className='inline-block text-lg text-white align-middle mb-1'/>
          </span>

          <span className={`leading-10 whitespace-nowrap ${otherShare ? "inline-block opacity-100" : "hidden opacity-0"} rounded text-center text-white bg-[#0e78aa]
          cursor-pointer hover:bg-[rgba(14,118,168,.9)] TextHeadertransition`} title='linkedin'>
            <FaLinkedin className='inline-block text-lg text-white align-middle mb-1'/>
          </span>

          <span className={`leading-10 whitespace-nowrap ${otherShare ?  "inline-block opacity-100" : "hidden opacity-0"} rounded text-center text-white bg-[#e4405f]
          cursor-pointer hover:bg-[rgba(228,64,95,.9)] TextHeadertransition`} title='instagram'>
            <FaInstagramSquare className='inline-block text-lg text-white align-middle mb-1'/>
          </span>      

          <button 
            type='button' 
            className='leading-10 whitespace-nowrap inline-block rounded text-center text-white bg-[#bdbdbd] cursor-pointer
          hover:bg-[rgba(189,189,189,.9)] TextHeadertransition' title='share'
            onClick={() => setOtherShare((change) => !change)}>
            <FaShare className={`inline-block text-lg text-white align-middle mb-1 ${otherShare ? "rotate-[180deg]" : "rotate-[0deg]"} TextHeadertransition`}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SinglePostShareComponent
