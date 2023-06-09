import React from "react";
import { useState, useEffect} from "react";
import {FaBars,FaChevronUp,FaEllipsisH,FaEllipsisV,FaRegStar,FaStar,FaTimes} from "react-icons/fa"
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useFetcher } from "react-router-dom";
import { useWindowSize } from "../SharedAsset/SharedAssets";


// export const Hanbugar = ({open_close_smallscreen_sidebar}) => {
//   const [state, setState] = useState(false)
//   const size = useWindowSize()

//   const handle_toggle = () => {
//     setState((state) => !state)
//     open_close_smallscreen_sidebar()
//   }
  
//   useEffect (() => {
//     size.width >= 768  &&  setState(() => false)
//     setState(() => false)
//   },[size])

//   return(
//       <button className="" aria-controls="primary-navigation"
//       onClick={handle_toggle}
//       >
//         {state ? <FaTimes /> : <FaBars /> }
//         <span className="hidden">Menu</span>
//       </button>
//   )
// }


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
  const handle_toggle = () => {
    closesidebar()
  } 

  return(
      <button className="" aria-controls="primary-navigation" 
      onClick={handle_toggle}
      >
       <FaTimes /> 
       <span className="hidden">Menu</span>
      </button>
  )
}


export const NavLinksAndArrows = ({opncategories, hideShowNavLinks}) => {
  const [state, setState] = useState(false)
  const size = useWindowSize()

  const handle_toggle = (e) => {
    setState((state) => !state)

    if(state){
      opncategories(e)
      e.target.nextSibling.style.display =  "none" 
    } else {
      e.target.nextSibling.style.display = "block"
    }
  }

  useEffect(() => {
     const allThearrow = document.querySelectorAll(".shortNav")
    if(hideShowNavLinks === false && size.width < 768) {
    setState(() => false)
    allThearrow.forEach((element) => {
    element.nextSibling.style.display = "none" 
    element.nextSibling.style = " " 
     })
    } 
  },[hideShowNavLinks, size])
  
	return (
		<span className="shortNav inline-block text-[10px] py-2.5 px-4 relative after:absolute after:inset-0 after:z-10" 
    onClick={handle_toggle}>
      {state ? 
      <FaChevronDown className="inline-block my-1"/> 
      : 
      <FaChevronRight className="inline-block my-1"/>
      }
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


export const StarComponent = ({color, favourite}) => {
  
  return (
    <>
      {favourite === false ? "" :
        <button className={`${color} cursor-pointer whitespace-nowrap 
          font-lora tracking-wide font-semibold lg:text-base text-base md:text-sm`} title="favourite"
          >
          <FaStar className='p-[1px] -mt-0.5 inline-block'/>
        </button>
      }
    </>
  )
}


export const Favorite = ({ contact }) => {
  // yes, this is a `let` for later
  const fetcher = useFetcher()
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : <FaRegStar className='p-[1px] -mt-0.5 inline-block'/> }
      </button>
    </fetcher.Form>
  );
}


export const ReadmoreButton = ({postId}) => (
  <Link to={`/single/${postId}`}>  
    <button className="uppercase cursor-pointer hover:bg-[#f70d28] font-medium prose text-[#7a7a7a] hover:text-white border
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
        <b className='block font-bold text-lg text-[#444] capitalize'>{BarName}</b>
        <span className='pt-2.5'>
          {openCat ? <FaChevronDown /> : <FaChevronUp />}
        </span>
      </div>
  )
} 
