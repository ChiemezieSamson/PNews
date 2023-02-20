import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import {Hanbugar, NavLinksAndArrows} from "../../ButtonAndOthers/Buttons"
import { HoverLinsks, SmallScreenHoverLinsks } from "../HoverLinks";
import { useWindowSize } from "../../SharedAsset/SharedAssets";
import { ParentCategories, Posts } from "../../../data";





const NavigationLinks = () => {
  const [hideShowNavLinks, setHideShowNavLinks] = useState(false)
  const [sticky, setSticky] = useState("")
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowDown2, setArrowDown2] = useState(false);
  const [arrowDown3, setArrowDown3] = useState(false);
	const [arrowRight, setArrowRight] = useState(true);
	const [arrowRight2, setArrowRight2] = useState(true);
	const [arrowRight3, setArrowRight3] = useState(true);
  const [hover, setHover] = useState(false)
  const [hover1, setHover1] = useState(false)
  const [hover2, setHover2] = useState(false)
  const [arrowDownClick, setArrowDownClick] = useState(false)
  const [arrowDownClick2, setArrowDownClick2] = useState(false)
  const [arrowDownClick3, setArrowDownClick3] = useState(false)
  const [showhoverlinks , setShowHoverlinks] = useState(false)
  const [getTheNavlinkTextContent, setGetTheNavlinkTextContent] =useState()
  const size = useWindowSize()


  // if hovered get the textcontent of the hovered navigation so that it can be used to display the categories under it
  // const handleGetTheNavlinkTextContent = (e) => {
  //     setGetTheNavlinkTextContent(() => e.target.firstChild)
  //     console.log(getTheNavlinkTextContent);
  // }
  
  
  const handle_hideShowNavLinks = () => {
    setHideShowNavLinks((hideShowNavLinks) => !hideShowNavLinks)
  }

  const onshowHoverlinks = () => {
    setShowHoverlinks((showhoverlinks) => !showhoverlinks)
  }

  const handle_ArrowsButton = () => {
    setArrowDown((arrow) => !arrow);
    setArrowRight((arrow) => !arrow);
    setArrowRight2(() => true)
    setArrowDown2(() => false)
    setArrowRight3(() => true)
    setArrowDown3(() => false)		
  };

  const handle_ArrowsButton2 = () => {
    setArrowDown2((arrow) => !arrow);
    setArrowRight2((arrow) => !arrow);
    setArrowRight3(() => true)
    setArrowDown3(() => false)
    setArrowRight(() => true)
    setArrowDown(() => false)	
  };

  const handle_ArrowsButton3 = () => {
    setArrowDown3((arrow) => !arrow);
    setArrowRight3((arrow) => !arrow);
    setArrowRight2(() => true)
    setArrowDown2(() => false)
    setArrowRight(() => true)
    setArrowDown(() => false)		
  };
  
  const handle_ArrowsClick = () => {
    setArrowDownClick((arrow) => !arrow)		
    setArrowDownClick2(() => false)		
    setArrowDownClick3(() => false)		
  };

  const handle_ArrowsClick2 = () => {
    setArrowDownClick2((arrow) => !arrow)
    setArrowDownClick(() => false)		
    setArrowDownClick3(() => false)			
  };

  const handle_ArrowsClick3 = () => {
    setArrowDownClick3((arrow) => !arrow)
    setArrowDownClick2(() => false)		
    setArrowDownClick(() => false)			
  };

  const handle_clickHanbugar = () => {
    setArrowRight2(() => true)
    setArrowDown2(() => false)
    setArrowRight3(() => true)
    setArrowDown3(() => false)
    setArrowRight(() => true)
    setArrowDown(() => false)
    setArrowDownClick(() => false)
    setArrowDownClick2(() => false)
    setArrowDownClick3(() => false)
  }

  const onHover = (e) => {
    setHover((hover) => !hover)
    onshowHoverlinks()
    setGetTheNavlinkTextContent(() => e.target.parentElement.firstChild.textContent)
    console.log(getTheNavlinkTextContent);
  }

  const onHoverOut = () => {
    setHover1((hover) => !hover)
    onshowHoverlinks()
  }

  const onHoverOut2 = () => {
    setHover2((hover) => !hover)
    onshowHoverlinks()
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
        setArrowRight(() => false)
        setArrowRight2(() => false)
        setArrowRight3(() => false)
        setHideShowNavLinks(()=> false)
        setArrowDownClick(() => false)
        setArrowDownClick2(() => false)
        setArrowDownClick3(() => false)
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
		"links actives no-underline text-black pl-3.5 leading-[48px] text-sm font-bold uppercase ";

  return (
    <section className={`shadow-lg transition-all duration-200 delay-100 ease-linear ${size.width < 768 ? sticky : ""}`}>

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

        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
          <NavLink to="/books"	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle	}>Books</NavLink>
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

        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
						<NavLink to="/lifestyle"	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle	}>LifeStyle</NavLink>
						<span className="nav-link"></span>
        </li>

        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
						<NavLink to="/favorite"	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle	}>Favorite</NavLink>
						<span className="nav-link"></span>
            {
              sticky === "" && size.width >= 768 ? 
              <span className="inline-block text-[10px] py-4 px-4 thearrows" onMouseOver={onHoverOut} onMouseOut={onHoverOut}> 
              <NavLinksAndArrows />
              </span> : size.width <= 768 ? 
              <span className="inline-block text-[10px] py-4 px-4 thearrows" onMouseOver={onHoverOut} onMouseOut={onHoverOut}> 
              <NavLinksAndArrows handle_ArrowsClick={handle_ArrowsClick2} handle_ArrowsButton={handle_ArrowsButton2} arrowDown={arrowDown2} arrowRight={arrowRight2}/>
              </span> : ""
            }

            {/* ===== block of hoverable links small screen are here ====== */}
            <span className="hidden medium_hover blockOfHoverLink2 absolute inset-x-0 top-full z-50"
              onMouseOver={onHoverOut}  onMouseOut={onHoverOut} data-visible={window.scrollY > 201 && size.width > 768 ? "" : hover1} aria-required={arrowDownClick2}>
             <SmallScreenHoverLinsks sublink={Posts.slice(6, 12)}/>
            </span> 
        </li>

        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
						<NavLink to="/business"	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle }>Business</NavLink>
						<span className="nav-link"></span>
            {
              sticky === "" && size.width >= 768 ? 
              <span className="inline-block text-[10px] py-4 px-4 thearrows" onMouseOver={onHoverOut2} onMouseOut={onHoverOut2}> 
              <NavLinksAndArrows handle_ArrowsClick={handle_ArrowsClick3}/>
              </span> :  size.width <= 768 ? 
              <span className="inline-block text-[10px] py-4 px-4 thearrows" onMouseOver={onHoverOut2} onMouseOut={onHoverOut2}> 
              <NavLinksAndArrows handle_ArrowsClick={handle_ArrowsClick3} handle_ArrowsButton={handle_ArrowsButton3} arrowDown={arrowDown3} arrowRight={arrowRight3}/>
              </span> : ""
            }

            {/* ===== block of hoverable links small screen are here ====== */}
            <span className="hidden medium_hover blockOfHoverLink2 absolute inset-x-0 top-full z-50"
               onMouseOver={onHoverOut2}  onMouseOut={onHoverOut2} data-visible={window.scrollY > 201 && size.width > 768 ? "" : hover2} aria-required={arrowDownClick3}>
              <SmallScreenHoverLinsks sublink={Posts.slice(2, 8)}/>
            </span> 
        </li>

        <li className="md:inline-block relative hover:bg-lime-400 md:hover:bg-transparent">
						<NavLink to="/quotes"	className={({ isActive }) => isActive ? myLinkStyleActive : myLinkStyle	}>Quotes</NavLink>
						<span className="nav-link"></span>
        </li>
      </ul>
    </nav>

      {/* ===== block of hoverable links large screen are here ====== */}
      <div className="relative z-50 max-w-6xl mx-auto">
        <div className="blockOfHoverLink hidden transition-[display] duration-700 ease-linear absolute top-0 left-0"
            data-visible={window.scrollY > 201 && size.width > 768 ? "" : showhoverlinks} onMouseOver={onshowHoverlinks} onMouseOut={onshowHoverlinks}>
          <HoverLinsks sublink={ParentCategories} blogPost={Posts.slice(0, 6)} trendingTags={[1,2,3,4]}/>
        </div>        
      </div>
    </section>
  )
}


export default NavigationLinks