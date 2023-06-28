
import { useHover } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react'
import { BiFontFamily } from 'react-icons/bi';
import { FaEnvelope, FaFacebookSquare, FaMinus, FaPlus, FaRedo, FaRegComment, FaShare, FaTwitter } from 'react-icons/fa';
import Preview from './Preview';


const PostWritePreview = ({editorText,  postTitle, postImage, postAuthor, postTags, optional}) => {
  const [hoverRef, isHovered] = useHover();
  const [sizeLine, setSizeLine] = useState(20)
  const [textSize, setTextSize] = useState("prose-base")

  const handleMinus = () => {
    sizeLine !== 20 && setSizeLine((size) => size - 20)
  }

  const handlePlus = () => {
    sizeLine !== 100 && setSizeLine((size) => size + 20)
  }

  const handleResetFontSize = () => {
    setSizeLine(() =>  20)
  }

  useEffect(() => {
    const handleTextSize = () => {
      sizeLine >= 80 && setTextSize(() => "prose-2xl")
      sizeLine === 60 && setTextSize(() => "prose-xl")
      sizeLine === 40 && setTextSize(() => "prose-lg")
      sizeLine === 20 && setTextSize(() => "prose-base")  
    }
    handleTextSize()
  },[sizeLine, textSize])

  const fontSizeButton = [
    {
      id: 1,
      icon: <FaMinus className='inline-block mx-2' onClick={handleMinus } />,
    },
    {
      id: 2,
      icon: <FaPlus className='inline-block mx-2' onClick={handlePlus}/>,
    },
    {
      id: 3,
      icon: <FaRedo className='inline-block mx-2' onClick={handleResetFontSize}/>,
      title: 'reset'
    },
  ]
  return (
    <div>
      <article>
          {/* Post Title start here */}      

          <h1 className=" text-black tracking-wide lg:text-4xl text-3xl font-bold font-lora" title='title'>
            <strong>
              {postTitle}
            </strong>
          </h1>

          {/*Admin image , name, post date and category , text size adjuster and comment number start here  */}

          <div className='mt-5 flex content-center justify-between'>

            {/* Admin Image */}            
            <div className='text-[#7a7a7a]'>
              <span className='w-10 h-10 inline-block rounded-full align-bottom mr-2'>
                <img loading='lazy' src={postImage} alt="AdminImage" className='h-full w-full object-cover rounded-full cursor-pointer'/>                 
              </span>

              {/* Admin name, Post date and category */}

              <address className='align-top mt-1.5 inline-block'>
                <small className="text-[#7a7a7a] mt-[3px] font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-sm md:text-[11px] leading-4 inline-block"
                  title='post admin'>
                    By
                    <span className="text-[#f70d28] cursor-pointer"> username</span>
                </small>
                <span className='mx-2 align-text-top inline-block'>&#9473;</span>
                <span className="mt-1 font-lora tracking-wide whitespace-nowrap text-xs lg:text-sm md:text-xs"
                title='date'>
                  <time dateTime='2022-11-3 4:45' className="whitespace-nowrap cursor-pointer mt-0.5 ml-0.5 inline-block">{new Date().toDateString()}</time>
                </span>
                <span className='mx-2 font-lora text-xs lg:text-sm md:text-xs cursor-pointer'>
                  in 
                  <span className='font-extrabold'>
                  {" Write Post"}
                  </span>              
                </span>
              </address>           
            </div> 

            
            {/* Text size adjuster and comment number */}

            <span className='align-top text-lg sm:mt-0.5 inline-block'>
              <span className='relative mx-3'>
                <span className='' title='text size' ref={hoverRef}>
                  <BiFontFamily  className='inline-block text-[#7a7a7a]' />
                  {isHovered &&
                  <div className='absolute top-full -translate-x-[50%] pt-4 z-20 whitespace-nowrap w-48 text-center'>
                    <div className='bg-white rounded -translate-x-[30%] shadow-[0_6px_20px_0_rgba(0,0,0,19%)] grid grid-cols-2 after:absolute after:right-2
                    after:bottom-full  after:bg-white after:-ml-1.5 after:border-b-[12px] after:border-x-[10px] after:border-solid after:border-b-white  after:border-x-[rgba(0,0,0,2%)]
                    after:border-t-[rgba(0,0,0,2%)]'>
                      {fontSizeButton.map((bnt) => {
                        return (
                          <button key={bnt.id} className="last:col-span-2 text-sky-500 last:text-gray-400/70 last:border-t-2 last:border-solid
                          last:border-sky-500 first:border-r first:border-solid first:border-gray-400/50 py-1.5" title={bnt.title ? bnt.title : ""}>
                            {bnt.icon}
                          </button>
                        )
                      })}                  
                      </div>                   
                      <div className="absolute inset-x-0 z-30 h-[2px] max-w-[192px] top-[57%] -left-[30%] bg-red-400" style={{
                        width: `${sizeLine}%`
                      }}></div>
                  </div>               
                    }
                </span>                     
              </span>

              {/* Comment number */}
              <span className='hidden sm:inline-block'>
                <FaRegComment className="text-[#2e9fff] inline-block mr-1.5 align-middle"/> 
                <span className='mb-0.5 text-[#7a7a7a]/80 leading-4 align-middle inline-block font-medium'>{0}</span>
              </span>
            </span>
          </div>

          {/* post image */}

          <div className='lg:mt-7 mt-3 lg:mb-7 mb-4'>
            <img loading='lazy' src={URL.createObjectURL(postImage)} alt="PostImage" className='w-full max-h-[370px] object-cover cursor-pointer'/>                
         </div>

          {/* share number and views number */}

          <div className='grid md:grid-cols-5 grid-cols-12 lg:mb-8 mb-4'>
            <div className='lg:grid lg:grid-cols-2 whitespace-nowrap max-w-[130px] col-span-1 pt-1 mx-auto lg:mx-0'>
              <span className='font-extrabold text-[#f70d28] font-round text-2xl leading-none text-center'>
                {optional?.shared >= 1000 ? optional?.shared + "k" : optional?.shared}
                <div className='text-[#7a7a7a] uppercase text-xs  font-lora font-normal -mt-0.5'>shares</div>
              </span>      
          
              <span className='font-extrabold relative hidden lg:inline-block text-slate-400 font-round text-2xl leading-none after:w-px after:h-full
              after:bg-[#e0e0e0] after:block after:absolute after:right-0 after:-top-0.5 after:rotate-[15deg] after:z-0 text-center'>
                {optional?.viewed >= 1000 ? optional?.viewed + "k" : optional?.viewed}
                <div className='text-[#7a7a7a] uppercase text-xs pl-1.5 font-lora font-normal -mt-0.5'>views</div>
              </span>
            </div>

            {/* facebook ,twitter share , email, share button*/}

            <div className='md:col-span-4 col-span-11 grid sm:grid-cols-6 grid-flow-col ml-8 sm:ml-4'>
              <span className='px-3 whitespace-nowrap inline-block bg-[#45629f] hover:bg-[rgba(69,98,159,.9)] w-auto text-center text-white rounded mr-1.5 mb-1.5
              h-10 leading-10 sm:col-span-2 cursor-pointer transition-all duration-200 ease-linear'>
                <FaFacebookSquare className='inline-block text-lg text-white align-middle mb-1'/>
                <span className='ml-2.5 font-bold text-xs md:-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on facebook</span>
              </span>
              <span className='px-3 whitespace-nowrap inline-block bg-[#5db2ef] hover:bg-[rgba(94,178,239,.9)] w-auto text-center text-white rounded mr-1.5 mb-1.5
              h-10 leading-10 sm:col-span-2 cursor-pointer transition-all duration-200 ease-linear'>
                <FaTwitter className='inline-block text-lg text-white align-middle'/>
                <span className='ml-2.5 font-bold text-xs md:text-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on twitter</span>
              </span>
              <span className='h-10 col-span-1 leading-10 whitespace-nowrap inline-block px-2.5 rounded text-center text-white bg-[#eb4d3f] mr-1.5 mb-1.5
              cursor-pointer hover:bg-[rgba(235,77,63,.9)] transition-all duration-200 ease-linear'>
                <FaEnvelope className='inline-block text-lg text-white align-middle mb-1'/>
              </span>
              <span className='h-10 col-span-1 leading-10 whitespace-nowrap inline-block px-2.5 rounded text-center text-white bg-[#bdbdbd] mr-1.5 mb-1.5 cursor-pointer
              hover:bg-[rgba(189,189,189,.9)] transition-all duration-200 ease-linear'>
                <FaShare className='inline-block text-lg text-white align-middle mb-1'/>
              </span>
            </div>
          </div>

          {/* post text start here */}
          <div className={`${textSize} tracking-wide text-[#444444]`}>
             <Preview editorText={editorText}/>
          </div>

          <span className='inline-block lg:py-5 mb-3 lg:text-sm text-xs'>
            <b className='mr-1.5 text-[#444444]'>Tags:</b>
            {postTags.map((tag,index) => {
              return (
                <span key={index} className="text-[#616161] bg-[#f5f5f5] inline-block py-0.5 px-2.5 hover:bg-[#f70d28]
                hover:text-white mb-1.5 mr-[3px] tracking-wider transition-all duration-300 ease-linear cursor-pointer">{tag}</span>
              )
            })}
          </span>
        </article>
    </div>
  )
}

export default PostWritePreview
