import React from 'react'
import { NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import {Hanbugar, NavLinksAndArrows} from "../../ButtonAndOthers/Buttons"
import { HoverLinsks, SmallScreenHoverLinsks } from "../HoverLinks";
import { useWindowSize } from "../../SharedAsset/SharedAssets";
import { ParentCategories, Posts } from "../../../data";

const HeaderNavigations = () => {
  const [hideShowNavLinks, setHideShowNavLinks] = useState(false)
  const [sticky, setSticky] = useState("")
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowRight, setArrowRight] = useState(true);
  const [arrowDownClick, setArrowDownClick] = useState(false)
  const [hover, setHover] = useState(false)
  const [showhoverlinks , setShowHoverlinks] = useState(false)
  const [getTheNavlinkTextContent, setGetTheNavlinkTextContent] =useState("books")
  const [headerHoverPostNav, setHeaderHoverPostNav] = useState(ParentCategories.books)
  const size = useWindowSize()

  const navItems = [
    {
      id: 1,
      url: "/books",
      name: "Books"
    },
    {
      id: 2,
      url: "/lifestyle",
      name: "Lifestyle"
    },
    {
      id: 3,
      url: "/favorite",
      name: "Favorite"
    },
    {
      id: 4,
      url: "/business",
      name: "Business"
    },
    {
      id: 5,
      url: "/quotes",
      name: "Quotes"
    }
  ]

  const handle_hideShowNavLinks = () => {
    setHideShowNavLinks((hideShowNavLinks) => !hideShowNavLinks)
  }

  const onshowHoverlinks = () => {
    setShowHoverlinks((showhoverlinks) => !showhoverlinks)
  }

  const handle_ArrowsButton = () => {
    setArrowDown((arrow) => !arrow);
    setArrowRight((arrow) => !arrow);		
  };

  const handle_ArrowsClick = () => {
    setArrowDownClick((arrow) => !arrow)		
  };


  const handle_clickHanbugar = () => {
    setArrowDown(() => false)
    setArrowRight(() => true)
    setArrowDownClick(() => false)
  }

  
  const onHover = (e) => {
    let elementtextContent =  e.target.parentElement.firstChild.textContent.toLowerCase()
    setHover((hover) => !hover)
    onshowHoverlinks()
    setGetTheNavlinkTextContent(() => e.target.parentElement.firstChild.textContent.toLowerCase())
    setHeaderHoverPostNav(() => e.target.parentElement.firstChild.textContent.toLowerCase() !== "quotes" ?
     ParentCategories[elementtextContent] : ParentCategories.random)
  }

  useEffect (() => {

    const isSticky = () => {
      const scrollTop = window.scrollY;
      const stickyClass = scrollTop >= 200 ? is_sticky : "";
      setSticky(stickyClass);
    };
  
    const is_sticky  = `fixed top-0 left-0 right-0 md:pt-4 md:bg-white md:shadow-md md:shadow-black/30 z-[200]`

    const thewindow = () => {
      if (size.width > 768) {      
        setHideShowNavLinks(()=> false)
        setArrowRight(() => false)
        setArrowDownClick(() => false)
      } 
    }

    window.addEventListener('resize', () => {
      thewindow()
    });

    window.addEventListener("scroll",isSticky)
        
    return ()=> {
      window.removeEventListener("scroll",isSticky)
      window.removeEventListener("resize",() => {
        thewindow()
      })
    }

  },[size])


  const myLinkStyle =
		"links no-underline text-black pl-3.5 leading-[48px] text-sm font-bold uppercase";
	const myLinkStyleActive =
		"links actives no-underline text-black pl-3.5 leading-[48px] text-sm font-bold uppercase";
  return (
    <div className={`shadow-lg transition-all duration-200 delay-100 ease-linear ${size.width < 768 ? sticky : ""}`}>

    {/* ==== Home Hero section start here ==== */}
      <div className="leading-8 font-serif pt-12 md:py-8 bg-white">
        <h1 className="text-black text-6xl md:text-8xl font-extralight italic tracking-wider uppercase">Chinonye</h1>
        <small className="text-[1rem] font-thin tracking-widest">Discover The Best</small>
      </div>

    {/* ==== Home nevigation section start here ===== */}
    <nav className={`transition-all duration-300 delay-200 ease-linear ${sticky}`}>
      
      {/* === small scree hanbugar start here === */}
      <div className="mobile-nav-toggle absolute z-30 w-8 border-0 top-4 right-4 shadow-md shadow-black pt-1" 
      onClick={handle_clickHanbugar}>
        <Hanbugar open_close_smallscreen_sidebar={handle_hideShowNavLinks} sidebar_state={hideShowNavLinks}/>
      </div>

      {/* ==== navigfation liks ====== */}
      <ul className="primary-navigation flex flex-col justify-evenly m-0 max-w-3xl list-none list-inside p-0 fixed top-0 right-[30%] bottom-0 left-0 -translate-x-full transition-transform 
      duration-[350ms] ease-in-out md:flex-row md:static md:translate-x-0 md:mx-auto z-30"
      data-visible={hideShowNavLinks}
      >
        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
						<NavLink to="/" end className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle}>Home</NavLink>
						<span className="nav-link"></span>
        </li>

        {navItems.map((nav) => {
          return (
            <li key={nav.id} className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
              <NavLink to={nav.url}	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle	}>{nav.name}</NavLink>
              <span className="nav-link"></span>
                {
                  sticky === "" && size.width >= 768 ? 
                  <span className="inline-block text-[10px] py-4 px-4 thearrows relative after:absolute after:inset-0 after:z-20" onMouseOver={onHover} onMouseOut={onHover}> 
                    <NavLinksAndArrows />             
                  </span> : size.width <= 768 ? 
                  <span className="inline-block text-[10px] py-4 px-4 thearrows" onMouseOver={onHover} onMouseOut={onHover}>
                  <NavLinksAndArrows handle_ArrowsClick={handle_ArrowsClick} handle_ArrowsButton={handle_ArrowsButton} arrowDown={arrowDown} arrowRight={arrowRight}/>
                  </span> : "" 
                }

              {/* ===== block of hoverable links small screen are here ====== */}
              <span className="hidden medium_hover blockOfHoverLink2 absolute inset-x-0 top-full z-50" data-visible={window.scrollY > 201 && size.width > 768 ? "" : hover} aria-required={arrowDownClick}
                onMouseOver={onHover}  onMouseOut={onHover}>            
                  <SmallScreenHoverLinsks sublink={Posts.slice(0, 6)}/>          
              </span>
            </li>
          )
        })

        }
      
      </ul>
    </nav>

      {/* ===== block of hoverable links large screen are here ====== */}
      <div className="relative z-50 max-w-6xl mx-auto">
        <div className="blockOfHoverLink hidden transition-[display] duration-700 ease-linear absolute top-0 left-0"
            data-visible={window.scrollY > 201 && size.width > 768 ? "" : showhoverlinks} onMouseOver={onshowHoverlinks} onMouseOut={onshowHoverlinks}>
          <HoverLinsks sublink={headerHoverPostNav} hostCat={getTheNavlinkTextContent} blogPost={Posts.slice(0, 6)}/>
        </div>        
      </div>
    </div>
  )
}

export default HeaderNavigations
