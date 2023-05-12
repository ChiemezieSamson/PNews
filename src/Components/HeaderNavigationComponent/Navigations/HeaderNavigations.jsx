import React from 'react'
import { NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import {Hanbugar, NavLinksAndArrows} from "../../ButtonAndOthers/Buttons"
import { HoverLinsks, SmallScreenHoverLinsks } from "../HeadHoverComponent/HoverLinks";
import { useWindowSize } from "../../SharedAsset/SharedAssets";
import { navItems } from "../../../data";
import { FaChevronDown } from 'react-icons/fa';
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner';
import useFetchedTags from '../../SharedAsset/Spinners/tagsSpiner';
import useFetchedCategories from '../../SharedAsset/Spinners/categoriesSpinner';

const HeaderNavigations = () => {
  const {tagsParents, isFetching: isFetchingTags} = useFetchedTags()
  const {categoriesParents, isFetching} = useFetchedCategories()
  const [hideShowNavLinks, setHideShowNavLinks] = useState(false)
  const [sticky, setSticky] = useState("")
  const [arrowDown, setArrowDown] = useState(false);
  const [showhoverlinks , setShowHoverlinks] = useState(false)
  const [getTheNavlinkTextContent, setGetTheNavlinkTextContent] = useState("books")
  const [headerHoverCategoriesNav, setHeaderHoverCategoriesNav] = useState([])
  const [headerHoverTagsNav, setHeaderHoverTagsNav] = useState([])
  const {content , action} = useFetchedPosts()
  const Posts = content
  const size = useWindowSize()

  const handle_hideShowNavLinks = () => {
    setHideShowNavLinks((hideShowNavLinks) => !hideShowNavLinks)
  }

  const onshowHoverlinks = () => {
    setShowHoverlinks((showhoverlinks) => !showhoverlinks)
  }

  const handle_clickHanbugar = () => {
    setArrowDown(() => false)
  }
  
  // if hovered get the textcontent of the hovered navigation so that it can be used to display the categories under it
  const onHover = (e) => {
    let elementtextContent =  e.target.parentElement.firstChild.textContent.toLowerCase()
    onshowHoverlinks()
    setGetTheNavlinkTextContent(() => elementtextContent)
    if((categoriesParents[elementtextContent] && tagsParents[elementtextContent])
     || (elementtextContent === "quotes" && categoriesParents["random"] && tagsParents["random"])) {
    setHeaderHoverCategoriesNav(() => elementtextContent !== "quotes" ? categoriesParents[elementtextContent].category : categoriesParents.random.category)
    setHeaderHoverTagsNav(() => elementtextContent !== "quotes" ? tagsParents[elementtextContent].tags : tagsParents.random.tags)
    }
  }

  useEffect (() => {

    const isSticky = () => {
      const scrollTop = window.scrollY;
      const stickyClass = scrollTop >= 200 ? is_sticky : "";
      setSticky(stickyClass);
    };
  
    const is_sticky  = `fixed top-0 left-0 right-0 md:pt-4 md:bg-white md:shadow-md md:shadow-black/30 z-[200]`

    const thewindow = () => {
      if (size.width > 768 ) {      
        setHideShowNavLinks(()=> false)
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
        <h1 className="text-black text-5xl sm:text-6xl md:text-8xl font-extralight italic tracking-wider uppercase">Chinonye</h1>
        <small className="text-[1rem] font-thin tracking-widest">Discover The Best</small>
      </div>

    {/* ==== Home nevigation section start here ===== */}
    <nav className={`transition-all duration-300 delay-200 ease-linear ${sticky}`}>
      
      {/* === small scree hanbugar start here === */}
      <div className="mobile-nav-toggle fixed z-30 w-8 border-0 top-4 right-4 shadow-md shadow-black pt-1" 
      onClick={handle_clickHanbugar}>
        <Hanbugar open_close_smallscreen_sidebar={handle_hideShowNavLinks}/>
      </div>

      {/* ==== navigfation liks ====== */}
      <ul className="primary-navigation flex flex-col justify-evenly m-0 max-w-3xl list-none list-inside p-0 fixed top-0 right-1/2 bottom-1/3 left-0 -translate-x-full transition-transform 
      duration-[350ms] ease-in-out md:flex-row md:static md:translate-x-0 md:mx-auto z-30"
      data-visible={hideShowNavLinks}
      >
        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent w-[78%] md:w-auto">
						<NavLink to="/" end className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle}>Home</NavLink>
						<span className="nav-link"></span>
        </li>

        {navItems.map((nav) => {
          return (
            <li key={nav.id} className="md:inline-block relative hover:bg-[#eee] md:hover:bg-transparent">
              <NavLink to={nav.url}	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle	}>{nav.name}</NavLink>
              <span className="nav-link"></span>{/* navlink hover underline design */}

              {/* The hover arrow for sublinks display */}
                {
                  sticky === "" && size.width >= 768 ? 
                  <span className="inline-block peer text-[10px] py-4 px-4 relative after:absolute after:inset-0 after:z-20" onMouseOver={onHover} onMouseOut={onHover}> 
                    <FaChevronDown className="inline-block align-text-top mt-[2px] my-1"/>            
                  </span> : size.width <= 768 ? 
                  <span className="inline-block text-[10px] py-4 px-4 peer relative after:absolute after:inset-0 after:z-20 group" onMouseOver={onHover} onMouseOut={onHover}>
                    <NavLinksAndArrows  handle_ArrowsButton={arrowDown}/>
                  </span> : "" 
                }                

              {/* ===== block of hoverable links small screen are here ====== */}
              <span className="hidden absolute inset-x-0 top-full z-50 md:rounded-md peer-hover:block hover:block bg-slate-50 lg:hover:hidden lg:peer-hover:hidden
              overflow-hidden">            
                <SmallScreenHoverLinsks CategoriesLink={headerHoverCategoriesNav} Parentlink={getTheNavlinkTextContent}/>          
              </span>
            </li>
          )
        })
        }
      </ul>
    </nav>

     {/* ===== block of hoverable links large screen are here ====== */}
     {(window.scrollY > 201 && size.width > 768 ? false : showhoverlinks) && 
      <div className="relative" onMouseOver={onshowHoverlinks} onMouseOut={onshowHoverlinks}>
        <div className={`absolute top-0 inset-x-[5%] disabled:opacity-40`} disabled={isFetchingTags || isFetching}>
          {((categoriesParents[getTheNavlinkTextContent] && tagsParents[getTheNavlinkTextContent]) 
          || (getTheNavlinkTextContent === "quotes" && categoriesParents["random"] && tagsParents["random"]) ) && 
          <HoverLinsks 
          CategoriesLink={headerHoverCategoriesNav} 
          TagsLink={headerHoverTagsNav}
          Parentlink={getTheNavlinkTextContent} 
          blogPost={action && Posts.slice(0, 6)} />}
        </div>        
      </div>}    
    </div>
  )
}

export default HeaderNavigations
