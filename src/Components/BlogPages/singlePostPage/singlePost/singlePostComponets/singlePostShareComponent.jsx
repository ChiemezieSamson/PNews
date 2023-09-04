import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaFacebookSquare, FaLinkedin, FaShare, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { useUpDateSharedPostsMutation, useUpDateViewedPostsMutation } from '../../../../../Reduxstore/Slices/posts/PostsSlice'
import { isFecthingStyle } from '../../../../SharedAsset/SharedAssets'

const SinglePostShareComponent = ({canOpen, Post, size}) => {
  const [updateShared, { isLoading }] = useUpDateSharedPostsMutation() // redux toolkit mutation function
  const [updateViewed, { isLoading: viewedIsLoading }] = useUpDateViewedPostsMutation() // redux toolkit mutation function
  const [otherShare, setOtherShare] = useState(false)
  const [otherView, setOtherView] = useState(true)

  let postId 
  let postTitle
  let shareUrl
  let canShare
  let canUpdateView 

  if (canOpen) {

    postId = Post?._id
    postTitle = Post?.postTitle
    shareUrl = `/single/${Post?._id}`
    
    canShare = [postId, postTitle].every(Boolean) && !isLoading // making sure that every thing is ready
    canUpdateView = [postId, postTitle].every(Boolean) && !viewedIsLoading // making sure that every thing is ready
  }

   
    // making a call to redux api slice
  const handleShareUpdate = async(event) => {

    if (canShare) {

      try {

        await updateShared({postId, postTitle, social: event.target.ariaLabel})
      } catch (err) {

        console.error(err)
      }
    }
  }


  useEffect(() => {
   
    const Viewed = async() => {

      try {

        await updateViewed({postId, postTitle})
        setOtherView(() => false)
      } catch (err) {

        console.error(err)
      }      
    }

    if (canOpen && otherView && canUpdateView) {

      Viewed()
    }

    return () => {

      setOtherView(() => false)
    };
  }, [canOpen, postId, postTitle, updateViewed, otherView, canUpdateView]);


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

              {canOpen ?

                <>
                  { Post?.optional?.shared >= 1000 ? Post?.optional?.shared + "k" : Post?.optional?.shared}
                </>
                :
                <div className='skeleton h-4 w-3.5 inline-block'></div>
              }

              <div className='text-neutral-500 uppercase text-xs font-lora font-normal -mt-0.5'>shares</div>
            </span>        
      
          <span className='hidden font-extrabold lg:inline-block text-slate-500 font-round text-2xl leading-none text-center'>

            {canOpen ?

              <>
                 { Post?.optional?.viewed >= 1000 ? Post?.optional?.viewed + "k" : Post?.optional?.viewed }           
              </>
              :
              <div className='skeleton h-4 w-3.5 inline-block'></div>
            }

            <div className='text-neutral-500 uppercase text-xs font-lora font-normal -mt-0.5'>views</div>
          </span>
        </div>
      </div>

      {/* facebook ,twitter */}
      <div className='col-span-6'>

        <div className='grid grid-cols-2 gap-x-[1%]'>

          <FacebookShareButton 
            url={shareUrl}  
            quote={postTitle} 
            disabled={!canOpen}
            disabledStyle={{opacity: 0.4}}
            className='relative after:absolute after:inset-0 after:z-10'
            resetButtonStyle={true}
            onClick={handleShareUpdate}
          >

            <span className='px-3 whitespace-nowrap block bg-[#45629f] hover:bg-[rgba(69,98,159,.9)] text-center text-white rounded
              leading-10 cursor-pointer TextHeadertransition'>

                  <FaFacebookSquare className='inline-block text-lg text-white align-middle mb-1'/>
                <span className='ml-2.5 font-bold text-xs md:-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on facebook</span>
            </span>
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}  
            title={postTitle} 
            disabled={!canOpen}
            disabledStyle={{opacity: 0.4}}
            className='relative after:absolute after:inset-0 after:z-10'
            resetButtonStyle={true}
            onClick={handleShareUpdate}
          >

            <span className='px-3 whitespace-nowrap block bg-[#5db2ef] hover:bg-[rgba(94,178,239,.9)] text-center text-white rounded
              leading-10 cursor-pointer TextHeadertransition'>

              <FaTwitter className='inline-block text-lg text-white align-middle'/>
              <span className='ml-2.5 font-bold text-xs md:text-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on twitter</span>
            </span>
          </TwitterShareButton>
        </div>
      </div>


      {/* share , email, linkedIn, instagram, share button */}
      <div className='col-span-4'>
        <div className='grid grid-flow-col gap-x-[1%]'>     

          <span className={isFecthingStyle(!canOpen)}>
            <a href={`mailto:?subject=${postTitle}&body=${shareUrl}`} className='relative after:absolute after:inset-0 after:z-10' 
              onClick={handleShareUpdate} aria-label='email'>

              <span className='leading-10 whitespace-nowrap block rounded text-center text-white bg-[#eb4d3f]
                cursor-pointer hover:bg-[rgba(235,77,63,.9)] TextHeadertransition' title='mail'>

                <FaEnvelope className='inline-block text-lg text-white align-middle mb-1'/>
              </span>
            </a>
          </span>

          {otherShare &&

            <LinkedinShareButton
              url={shareUrl}  
              title={postTitle} 
              summary={shareUrl}
              source={shareUrl}
              disabled={!canOpen}
              disabledStyle={{opacity: 0.4}}
              className='relative after:absolute after:inset-0 block after:z-10 w-full'
              resetButtonStyle={true}
              onClick={handleShareUpdate}
            >
              <span className="leading-10 whitespace-nowrap block rounded text-center text-white bg-[#0e78aa]
                cursor-pointer hover:bg-[rgba(14,118,168,.9)] TextHeadertransition" title='linkedin'>

                <FaLinkedin className='inline-block text-lg text-white align-middle mb-1'/>
              </span>
            </LinkedinShareButton>
          }

          {otherShare &&
            <WhatsappShareButton
              url={shareUrl}  
              title={postTitle} 
              separator=""
              disabled={!canOpen}
              disabledStyle={{opacity: 0.4}}
              className='relative after:absolute after:inset-0 block after:z-10 w-full'
              resetButtonStyle={true}
              onClick={handleShareUpdate}
            >

              <span className="leading-10 whitespace-nowrap block rounded text-center text-white bg-[#4fce5d]
                cursor-pointer hover:bg-[rgba(79,206,93,.9)] TextHeadertransition" title='instagram'>

                <FaWhatsapp className='inline-block text-lg text-white align-middle mb-1'/>
              </span>      
            </WhatsappShareButton>
          }

          <button 
            type='button' 
            className='leading-10 whitespace-nowrap inline-block rounded text-center text-white bg-[#bdbdbd] cursor-pointer hover:bg-[rgba(189,189,189,.9)] disabled:opacity-40 TextHeadertransition' 
            title='share'
            disabled={!canOpen}
            onClick={() => setOtherShare((change) => !change)}
          >

            <FaShare className={`inline-block text-lg text-white align-middle mb-1 ${otherShare ? "rotate-[180deg]" : "rotate-[0deg]"} TextHeadertransition`}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SinglePostShareComponent
