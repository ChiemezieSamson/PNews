import React from "react";
import { useState, useEffect} from "react";
import { FaBars, FaChevronLeft, FaChevronUp, FaEllipsisH, FaEllipsisV, FaStar, FaTimes} from "react-icons/fa"
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWindowSize } from "../SharedAsset/SharedAssets";
import { CommentReactionButtons, ReplyReactionButtons } from "./ReactionButtons";


export const HanbugarTwo = ({openSidebar}) => {

  const handle_toggle = () => {

    openSidebar()
  }

  return(
    <button type="button" className="" aria-controls="primary-navigation" onClick={handle_toggle}>

      <FaBars /> 
      <span className="hidden">Menu</span>
    </button>
  )
}


export const Hanbugar3 = ({closesidebar}) => {

  const handle_toggle = () => {

    closesidebar()
  } 

  return(
    <button type="button" className="" aria-controls="primary-navigation" onClick={handle_toggle}>

      <FaTimes /> 
      <span className="hidden">Menu</span>
    </button>
  )
}


export const NavLinksAndArrows = ({opncategories, hideShowNavLinks, name}) => {
  const size = useWindowSize()

  const handle_toggle = (e) => {

    if (e.target.nextSibling.style.display !== "block") {

      const allThearrow = document.querySelectorAll(".shortNav")
      allThearrow.forEach((element) => {
  
        element.nextSibling.style.display = "none" 
        element.nextSibling.style = " " 
      })
  
      opncategories(e)
      e.target.nextSibling.style.display = "block"
    } else {
      
      const allThearrow = document.querySelectorAll(".shortNav")
      allThearrow.forEach((element) => {
  
        element.nextSibling.style.display = "none" 
        element.nextSibling.style = " " 
      })
    }

  }

  useEffect(() => {

    const allThearrow = document.querySelectorAll(".shortNav")

    if(hideShowNavLinks === false && size.width < 768) {

      allThearrow.forEach((element) => {

        element.nextSibling.style.display = "none" 
        element.nextSibling.style = " " 
      })
    } 
  },[hideShowNavLinks, size])

  
	return (
		<button type="button" id={name} className="shortNav inline-block text-[10px] py-2.5 group px-4 relative after:absolute after:inset-0 after:z-10" 
       onClick={handle_toggle}>

        <FaChevronDown className="my-1 hidden group-focus:inline-block"/> 
      
        <FaChevronRight className="inline-block my-1 group-focus:hidden"/>
  
		</button>		
	);
};


export const CatSideBarHanbugarButton = ({sidebar_state, handleShowCatSideBar}) => {
  const [state, setState] = useState(sidebar_state)

  const handle_toggle = () => {

    setState((state) => !state)
    handleShowCatSideBar()
  }

  return(
    <button type="button" className="" aria-controls="primary-navigation" onClick={handle_toggle}>

      {state === false ? <FaEllipsisV /> : <FaEllipsisH />}
    </button>
  )
}


export const StarComponent = ({color, favourite}) => {
  
  return (
    <>
      {favourite === false ? "" :

        <button 
          type="button"
          className={`${color} cursor-pointer whitespace-nowrap font-lora tracking-wide font-semibold lg:text-base text-base md:text-sm`} 
          title="favourite"
        >
          <FaStar className='p-[1px] -mt-0.5 inline-block'/>
        </button>
      }
    </>
  )
}


export const EditAndDeleteButton = ({handler}) => {
  const size = useWindowSize()   
   
  return (  
    <button type="button" className='absolute top-1 right-1 cursor-pointer text-neutral-500 after:absolute after:top-1 
      after:right-1 after:inset-0 after:w-full z-20 hover:text-stone-700 TextHeadertransition' onClick={handler}>

      {size.width > 1028 ? <FaEllipsisH /> : <FaEllipsisV />}
    </button>
  )
}


export const ReactionAndReplyButton = ({handler, comment, User, postId, buttonText, createUserFirstButton, offsetOfForm}) => {

  const handleBackToForm = () => {
    document.body.scrollTop = offsetOfForm.current.offsetTop; // For Safari
    window.scrollTo({left: 0, top: offsetOfForm.current.offsetTop, behavior: "smooth"})
    return
  }

  return (  
    <div className='max-w-xs py-1.5 mb-1.5' name={comment.author} id={comment._id}>

      <span className="inline-block mt-1">

        <CommentReactionButtons 
          comment={comment} 
          authorId={User?._id} 
          postId={postId}
          handleBackToForm={handleBackToForm}
          createUserFirstButton={createUserFirstButton}
        />
      </span>      

     {createUserFirstButton ?         

        <button type="button" className="text-neutral-700 hover:text-neutral-500 font-josefin tracking-wide mt-[5px] 
          align-top mx-2 inline-block TextHeadertransition" onClick={handleBackToForm}>
          {buttonText}
        </button>      
      :
        <button type="button" className="text-neutral-700 hover:text-neutral-500 font-josefin tracking-wide mt-[5px] 
          align-top mx-2 TextHeadertransition" onClick={handler}>
          {buttonText}
        </button> 
    }
    </div> 
  )
}


export const ReactionAndReplyButtonForReply = ({handler, reply, comment, User, postId, buttonText, createUserFirstButton, offsetOfForm}) => {

  const handleBackToForm = () => {

    document.body.scrollTop = offsetOfForm.current.offsetTop; // For Safari
    window.scrollTo({left: 0, top: offsetOfForm.current.offsetTop, behavior: "smooth"})
    return
  }

  return ( 
    <div className='max-w-xs py-1.5 mb-1.5' name={reply.name} id={comment._id}>

      <span  className="inline-block mt-1">

        <ReplyReactionButtons 
          reply={reply} 
          commentId={comment._id} 
          authorId={User?._id} 
          postId={postId}
          handleBackToForm={handleBackToForm}
          createUserFirstButton={createUserFirstButton}
        />
      </span>

      {createUserFirstButton ?

          <button type="button" className="text-neutral-700 hover:text-neutral-500 font-josefin tracking-wide mt-[5px] 
              align-top mx-2 inline-block TextHeadertransition" onClick={handleBackToForm}>
            {buttonText}
          </button>          
        :
        <button type="button" className="text-neutral-700 hover:text-neutral-500 font-josefin tracking-wide mt-[5px] 
          align-top mx-2 TextHeadertransition" onClick={handler}>
          {buttonText}
        </button> 
      }
    </div>  
  )
}


export const ReadmoreButton = ({postId}) => (

  <Link to={`/single/${postId}`}> 

    <button type="button" className="uppercase cursor-pointer hover:bg-[#f70d28] font-medium prose text-[#7a7a7a] hover:text-white border
    border-solid border-gray-400 py-1.5 tracking-wider px-4 text-[11px] leading-[16px]  my-4 shadow rounded
    shadow-gray-400/60  hover:border-[#f70d28] outline-none TextHeadertransition">READ MORE</button>
  </Link>
)


export const WritePostAsideOpenClosebar = ({BarName, handle}) => {
  const [openCat, setOpenCat] = useState(false)

  const handleOpenCat = () => {

    setOpenCat((change) => !change)
    handle()
  }

  return (
    <div className='hover:bg-[#e2e2e2] px-3 py-3 flex justify-between' onClick={handleOpenCat}>

      <b className='block font-bold text-lg text-stone-800 capitalize'>{BarName}</b>

      <span className='pt-2.5'>
        {openCat ? <FaChevronDown  className="text-stone-800"/> : <FaChevronUp className="text-stone-800"/>}
      </span>
    </div>
  )
} 

export const HomePageSlideNextAndPreviousButton = ({isSuccess, handleBackward, handleNext}) => {

  return (

    <div className='grid grid-cols-2 max-w-[90px] gap-1 text-neutral-500 text-xs p-2 mx-auto'>
      
      <button 
        type='button'
        id='previouspost'
        name='previouspost'
        title='previous'
        disabled={!isSuccess}
        className='py-2 px-2.5 border border-solid border-neutral-300 hover:border-neutral-400 disabled:opacity-40 hover:text-neutral-600 cursor-pointer TextHeadertransition' 
        onClick={handleBackward}>
        <FaChevronLeft />
      </button>

      <button 
        type='button'
        id='nextpost'
        name='nextpost'
        title='next'
        disabled={!isSuccess}
        className='py-2 px-2.5 border border-solid border-neutral-300 hover:border-neutral-400 disabled:opacity-40 hover:text-neutral-600 cursor-pointer TextHeadertransition'
        onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  )
}


export const HomePageSlideNextAndPreviousButton2 = ({isSuccess, handleBackward, handleNext}) => {

  return (

    <>
      
      <span className='inline-block absolute top-[45%] left-1 z-[900]'>

        <button 
          type='button'
          name='previouspost'
          title='previous'
          disabled={!isSuccess}
          className='text-neutral-100 text-xl pt-3 pb-3 rounded-md px-1.5 bg-neutral-100/30 text-center hover:backdrop-blur-sm
            border border-solid border-stone-50 shadow-sm shadow-stone-300 opacity-70 transition-opacity hover:opacity-100 
            duration-200 ease-in' 
          onClick={handleBackward}
        >
          <FaChevronLeft className='inline-block'/>
        </button>
      </span>
      

      <span className='inline-block absolute top-[45%] right-1 z-[900]'>

        <button 
          type='button'
          name='previouspost'
          title='previous'
          disabled={!isSuccess}
          className='text-neutral-100 text-xl pt-3 pb-3 rounded-md px-1.5 bg-neutral-100/30 text-center hover:backdrop-blur-sm
            border border-solid border-stone-50 shadow-sm shadow-stone-300 opacity-70 transition-opacity hover:opacity-100 
            duration-200 ease-in' 
          onClick={handleNext}
        >
          <FaChevronRight className='inline-block'/>
        </button>
      </span>
    </>
  )
}

export const WritePostButton = ({isFecthingStyle, isFetching, userAction}) => {

  return (
    <div className={`${isFecthingStyle(isFetching)} text-right`}>

      <Link to={`/writepost`}>  

        <button className="uppercase cursor-pointer hover:bg-neutral-300 font-medium prose text-stone-700 hover:text-white
          py-1.5 tracking-wider px-4 text-[11px] leading-[16px] my-4 shadow rounded disabled:opacity-40
          shadow-gray-400/60  hover:border-[#f70d28] outline-none TextHeadertransition" 
          disabled={!userAction}
        >
          Write new Post
        </button>
      </Link>
    </div>
  )
}