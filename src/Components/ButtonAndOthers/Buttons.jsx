import React from "react";
import { useState, useEffect} from "react";
import {FaBars,FaChevronUp,FaEllipsisH,FaEllipsisV,FaRegStar,FaStar,FaTimes} from "react-icons/fa"
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useWindowSize } from "./SharedAssets";


export const Hanbugar = ({open_close_smallscreen_sidebar, sidebar_state}) => {
  const [state, setState] = useState(sidebar_state)
  const size = useWindowSize()

  const handle_toggle = () => {
    setState((state) => !state)
    open_close_smallscreen_sidebar()
  }
  
  useEffect (() => {
    if (size.width >= 768) {
      setState(() => false)
    } 
  },[state,size])

  return(
      <button className="" aria-controls="primary-navigation"
      onClick={handle_toggle}
      >
        {state === false ? <FaBars /> : <FaTimes /> }
        <span className="hidden">Menu</span>
      </button>
  )
}


export const HanbugarTwo = ({openSidebar}) => {
  const handle_toggle = () => {
    openSidebar()
  }
  return(
      <button className="" aria-controls="primary-navigation"
      onClick={handle_toggle}
      >
        <FaBars /> 
        <span className="hidden">Menu</span>
      </button>
  )
}


export const Hanbugar3 = ({closesidebar}) => {
  const size = useWindowSize()
  const handle_toggle = () => {
    closesidebar()
  } 

  useEffect (() => {
    size <= 768 && closesidebar()
  },[closesidebar, size])

  return(
      <button className="" aria-controls="primary-navigation" 
      onClick={handle_toggle}
      >
       <FaTimes /> 
       <span className="hidden">Menu</span>
      </button>
  )
}


export const NavLinksAndArrows = ({handle_ArrowsClick, handle_ArrowsButton, arrowDown, arrowRight}) => {
 
	const handle_Arrows = () => {
      handle_ArrowsButton()
      handle_ArrowsClick()		
	};

	return (
		<span>
			<span className="md:hidden">
			<FaChevronRight className="arrows mt-[2px] hidden align-text-top" onClick={handle_Arrows} data-visible={arrowRight}/> 
			</span>
			<FaChevronDown className="arrows mt-[2px] align-text-top hidden md:inline" onClick={handle_Arrows} data-visible={arrowDown}/>
		</span>		
	);
};


export const CatSideBarHanbugar = ({sidebar_state, handleShowCatSideBar}) => {
  const [state, setState] = useState(sidebar_state)

  const handle_toggle = () => {
    setState((state) => !state)
    handleShowCatSideBar()
  }

  return(
    <button className="" aria-controls="primary-navigation"
    onClick={handle_toggle}
    >
      {state === false ? <FaEllipsisV /> : <FaEllipsisH />}
    </button>
)
}


export const StarComponent = ({color}) => {
  const [state, setState] = useState(false)

  const handle_toggle = () => {
    setState((state) => !state)
  }
  
  return (
    <button className={`${color} cursor-pointer whitespace-nowrap 
      font-lora tracking-wide font-semibold lg:text-base text-base md:text-sm`}
      onClick={handle_toggle} title="favourite"
      >
      {state === false ? <FaRegStar className='p-[1px] -mt-0.5 inline-block'/> : <FaStar className='p-[1px] -mt-0.5 inline-block'/> }
    </button>
  )
}


export const ReadmoreButton = () => (
  <button className="uppercase cursor-pointer hover:bg-[#f70d28] font-medium prose text-[#7a7a7a] hover:text-white border
  border-solid border-gray-400 py-1.5 tracking-wider px-4 text-[11px] leading-[16px]  my-4 shadow rounded
  shadow-gray-400/60  hover:border-[#f70d28] outline-none transition-all duration-200 ease-linear">READ MORE</button>
)


export const WritePostAsideOpenClosebar = ({BarName, handle}) => {
  const [openCat, setOpenCat] = useState(false)

  const handleOpenCat = () => {
    setOpenCat((change) => !change)
    handle()
  }

  return (
    <div className='hover:bg-[#e2e2e2] px-3 py-3 flex justify-between' onClick={handleOpenCat}>
        <b className='block font-bold text-lg text-[#444] capitalize'>{BarName}</b>
        <span className='pt-2.5'>
          {openCat ? <FaChevronDown /> : <FaChevronUp />}
        </span>
      </div>
  )
} 
