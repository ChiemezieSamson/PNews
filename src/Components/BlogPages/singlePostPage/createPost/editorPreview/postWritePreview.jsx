
import { useHover } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react'
import { BiFontFamily } from 'react-icons/bi';
import { FaEnvelope, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaMinus, FaPlus, FaRedo, FaRegComment, FaRegStar, FaShare, FaTwitter } from 'react-icons/fa';
import Preview from './Preview';
import { publicFolder } from '../../../../../data';
import { useWindowSize } from '../../../../SharedAsset/SharedAssets';


const PostWritePreview = ({editorText, postTitle, postImage, postAuthor, User, userAction, postTags, optional, postCategory, file}) => {
  const [hoverRef, isHovered] = useHover();
  const [sizeLine, setSizeLine] = useState(20)
  const [textSize, setTextSize] = useState("prose-base")
  const [otherShare, setOtherShare] = useState(false)

  

  const size = useWindowSize()

  // changing the tag arrary to object with id for keys
  const TagsLinks = postTags?.map((title, id) => ({id: id, title: title}))

  // handle substraction of the textsize
  const handleMinus = () => {
    sizeLine !== 20 && setSizeLine((size) => size - 20)
  }

  // handle addission of the textsize
  const handlePlus = () => {
    sizeLine !== 100 && setSizeLine((size) => size + 20)
  }

  // handle reset of the textsize
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

  useEffect(() => {
    if(size.width) {
      setOtherShare(() => false)
    }
  }, [size])

 // Text size Buttons
 const fontSizeButton = [
  {
    id: 1,
    icon: <FaMinus className='inline-block mx-2'/>,
    onClick: handleMinus
  },
  {
    id: 2,
    icon: <FaPlus className='inline-block mx-2'/>,
    onClick: handlePlus
  },
  {
    id: 3,
    icon: <FaRedo className='inline-block mx-2'/>,
    title: 'reset',
    onClick: handleResetFontSize
  },
]

  return (
    <div>
       <article>
        {/* navigation display */}

        <div className="lg:mb-8 lg:mt-8 mb-4 grid grid-flow-col justify-between text-stone-800">
          <small>Home &gt; preview</small>

          {/* user make favourite, edit post and delete post buttons */}
            <div className='px-2 mx-0.5'>

              {/* Favourite */}
              <button
                type='button'
                className="text-[#f7c90d] cursor-pointer whitespace-nowrap font-lora tracking-wide 
                font-semibold lg:text-base text-base md:text-sm mx-2" 
                title="favourite">                    
                  <FaRegStar className='p-[1px] -mt-0.5 inline-block'/>
              </button>

              {/* Edit */}
              <button 
                type='button' 
                className='mx-1 uppercase rounded-md text-xs font-bold tracking-widest text-gray-400 hover:text-gray-700 
                transition-all duration-200 ease-linear'>edit</button>

              {/* Delete */}
              <button 
                type='button' 
                className='mx-1 uppercase rounded-md text-xs font-bold tracking-widest text-rose-400 hover:text-rose-700 
                transition-all duration-200 ease-linear'>delete</button>
            </div>
        </div>

        {/* Post Title start here */}   
        <h1 
          className="my-1.5 text-stone-900 tracking-wide lg:text-4xl text-3xl font-bold font-lora first-letter:capitalize" 
          title='title'>
            <strong>
              {postTitle}
            </strong>
        </h1>

        {/*Admin image , name, post date and category , text size adjuster and comment number start here  */}
        <div className='mt-5 grid grid-flow-col content-center justify-between'>
          
          
          <div className='text-neutral-400'>

            {/* Admin Image */}
            <span className="max-w-[40px] max-h-10 inline-block rounded-full align-bottom mr-2">
              {userAction ?
                <img loading='lazy' src={publicFolder + User?.profileImage} alt="AdminImage" className='rounded-full'/> 
                :
                <div className='w-[40px] h-10 skeleton rounded-full inline-block'></div>
              }
            </span>


            {/* Admin name, Post date and category */}
            {(userAction) ?
              <address className='align-top mt-1.5 inline-block'>

                <small className="text-neutral-500 mt-[3px] font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-sm md:text-[11px] leading-4 inline-block"
                  title='post-admin'>
                    By 
                      <span  className="text-[#f70d28] cursor-pointer"> {User?.username}</span>
                </small>

                <span className='mx-2 align-text-top inline-block'>&#9473;</span>

                <span className="mt-1 font-lora tracking-wide whitespace-nowrap" title='date'>                      
                  <time 
                    dateTime={new Date().toDateString()} 
                    className="whitespace-nowrap cursor-pointer mt-0.5 ml-0.5 inline-block text-xs lg:text-sm md:text-xs"
                    >{new Date().toDateString()}</time>                    

                  <span className='mx-2 text-sm md:text-sm lg:text-base text-neutral-500 cursor-pointer'>
                    in 
                    <span className='font-extrabold hover:text-neutral-700'>
                      &nbsp;{postCategory[0]}
                    </span>              
                  </span>                      
                </span>                      
              </address>           
              : 
              <div className='skeleton h-3 w-60 inline-block'></div>
            }
          </div>
          
          
          {/* Text size adjuster and comment number */}
          <span className='align-top text-lg sm:mt-0.5 inline-block'>

            {/* Text size adjuster */}
            <span className='relative mx-3'>
              <span title='text size' ref={hoverRef}>
                <BiFontFamily  className='inline-block text-neutral-500'/>

                {isHovered &&
                  <div className='absolute top-full -translate-x-[50%] pt-4 z-20 whitespace-nowrap w-48 max-h-[104px] text-center'>
                    <div className='bg-neutral-50 relative rounded -translate-x-[30%] shadow-sm shadow-neutral-300 grid grid-cols-2 grid-rows-2 after:absolute after:right-2
                      after:bottom-full after:bg-white after:-ml-1.5 after:border-b-[12px] after:border-x-[10px] after:border-solid after:border-b-white  after:border-x-[rgba(0,0,0,2%)]
                      after:border-t-[rgba(0,0,0,2%)]'>

                      {fontSizeButton.map((bnt) => {
                        return (

                          <button key={bnt.id} 
                            className="last:col-span-2 text-sky-500 last:text-neutral-300 last:hover:text-neutral-500 py-1.5
                            last:border-t-2 last:border-solid last:border-sky-500 first:border-r first:border-solid first:border-neutral-300 
                            relative isolate after:absolute  after:inset-0 after:z-30" 
                            title={bnt.title ? bnt.title : ""} 
                            onClick={bnt.onClick}>
                            {bnt.icon}
                          </button>
                        )
                      })}                  
                    </div> 

                    <div className="absolute inset-x-0 z-30 h-[2px] top-[58%] -left-[30%] bg-red-500" style={{width:`${sizeLine}%`}}></div>
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
        <div className='lg:mt-7 mt-3 lg:mb-7 mb-4 rounded-sm max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]'>
           { file ? 
            <img  
              src={URL.createObjectURL(file)} 
              alt="postImage" 
              className='rounded-sm max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]' 
              loading="lazy"/> :
            postImage  && 
            (<img 
              src={publicFolder + postImage} 
              alt="postImage" 
              className='rounded-sm max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]' 
              loading="lazy"/>)
          }
        </div>
            
        {/* post share component start here */}
        <div className='grid grid-cols-10 xs:grid-cols-12 gap-x-[1%] lg:mb-8 mb-4 w-full'>

          {/* share number and views number */}
          <div className='col-span-2 hidden xs:block'>
            <div className="whitespace-nowrap relative pt-1 lg:mx-0 grid grid-flow-col justify-around px-0.5 after:w-0.5 after:h-full
              after:bg-neutral-300 after:block after:absolute after:right-0 after:-top-0.5 after:rotate-[15deg] after:z-0">
                <span className='font-extrabold text-[#f70d28] font-round text-2xl leading-none text-center'>
                 {optional?.shared >= 1000 ? optional?.shared + "k" : optional?.shared}               

                  <div className='text-neutral-500 uppercase text-xs font-lora font-normal -mt-0.5'>shares</div>
                </span>        

              <span className='hidden font-extrabold lg:inline-block text-slate-500 font-round text-2xl leading-none text-center'>
                  {optional?.viewed >= 1000 ? optional?.viewed + "k" : optional?.viewed}           
               
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

        {/* post text start here */}
        <div className={`${textSize} tracking-wide text-stone-800`}>
          <Preview editorText={editorText}/>           
        </div>

        {/* post tags start here */}
        <span className='inline-block lg:py-5 mb-3 lg:text-sm text-xs'>
          <b className='mr-2 text-neutral-800'>Tags:</b>
          {TagsLinks?.map((tag) => {
            return (
              <span 
              key={tag?.id} className="text-stone-700 bg-neutral-100 inline-block py-0.5 px-2.5 hover:bg-[#f70d28]
              hover:text-neutral-50 mb-1.5 mr-[3px] last:mr-0 tracking-wider TextHeadertransition cursor-pointer">{tag?.title}</span>
            )
          })}
        </span>
      </article>
    </div>
  )
}

export default PostWritePreview
