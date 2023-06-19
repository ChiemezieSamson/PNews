import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import { NavLinksAndArrows} from "../../ButtonAndOthers/Buttons"
import { HoverLinsks, SmallScreenHoverLinsks } from "../HeadHoverComponent/HoverLinks";
import { useWindowSize } from "../../SharedAsset/SharedAssets";
import { navItems } from "../../../data";
import { FaChevronDown, FaSistrix } from 'react-icons/fa';
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner';
import useFetchedTags from '../../SharedAsset/Spinners/tagsSpiner';
import useFetchedCategories from '../../SharedAsset/Spinners/categoriesSpinner';

const HeaderNavigations = ({hideShowNavLinks, closeNavLinksOnBodyClick, handleCloseNavLinks}) => {
  const {tagsParents, isFetching: isFetchingTags} = useFetchedTags()
  const {categoriesParents, isFetching} = useFetchedCategories()
  const [sticky, setSticky] = useState("")
  const [scroll, setScroll] = useState("")
  const [showhoverlinks , setShowHoverlinks] = useState(false)
  const [getTheNavlinkTextContent, setGetTheNavlinkTextContent] = useState("books")
  const [headerHoverCategoriesNav, setHeaderHoverCategoriesNav] = useState([])
  const [headerHoverTagsNav, setHeaderHoverTagsNav] = useState([])
  const {content , action} = useFetchedPosts()
  const Posts = content
  const size = useWindowSize()

  const onshowHoverlinks = () => {
    setShowHoverlinks((showhoverlinks) => !showhoverlinks)
  }

  const handleCloseHoverlinks = () => {
    setShowHoverlinks(() => false)
  }
  
  // if hovered get the textcontent of the hovered navigation so that it can be used to display the categories under it
  const onHover = (e) => {
    let elementtextContent =  e.target.parentElement.firstChild.textContent.toLowerCase()

    if(size.width > 768) { //make sure to only open the big hover component when the window size is bigger than 768
      onshowHoverlinks()
    }
   
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
      
      const stickyClass = scrollTop >= 300 ? is_sticky 
      : "shadow-md shadow-neutral-200 transition-all duration-200 delay-100 ease-linear";
      setSticky(stickyClass);

      setScroll(() => scrollTop)

      if(scrollTop > 201) {
        setShowHoverlinks(() => false)
      }
    };
  
    const is_sticky  = `fixed top-0 inset-x-0 md:pt-2 bg-white z-[200] shadow-md shadow-neutral-300`

    window.addEventListener("scroll", isSticky)
        
    return ()=>  window.removeEventListener("scroll", isSticky)

  },[size])

  const navStyle = `links no-underline pl-3.5 leading-[48px] text-sm font-bold uppercase 
  transition-all duration-200 ease-linear`

  return (
    <div className={sticky}>

      {/* ==== Home Hero section start here ==== */}
      <div className={`leading-8 font-poppins font-medium pt-8 md:py-8 max-w-xl mx-auto my-0 mt-2 bg-white relative
      ${(size.width >= 768 && scroll >= 300) ? "hidden" : "block"}`}>
        <h1 className="text-stone-800 text-4xl sm:text-6xl md:text-8xl font-extralight 
        italic tracking-wider uppercase">Chinonye</h1>
        <small className="text-base font-thin tracking-widest text-stone-800 font-lora capitalize">Discover The Best</small>

        <Link to={"/search"} className="absolute right-2 bottom-1 cursor-pointer md:hidden text-stone-800 text-lg font-bold hover:mainColor TextHeadertransition" title="posts search">
          <FaSistrix className="inline-block"/>
        </Link>
      </div>

      {/* ==== Home nevigation section start here ===== */}
      <nav>

        {/* ==== navigfation liks ====== */}
        <ul className={`bg-[#ffffff1a] backdrop-blur-lg md:backdrop-blur-none md:bg-transparent 
        grid grid-flow-row m-0 max-w-3xl list-none list-inside pb-5 pt-8 fixed top-0 right-1/2 
        left-0 transition-transform duration-[350ms] ease-in-out z-50 md:p-0 
        md:justify-evenly md:grid-flow-col md:static md:translate-x-0 md:mx-auto 
        ${hideShowNavLinks ? "translate-x-0" : "-translate-x-full"} font-round`} ref={closeNavLinksOnBodyClick}>

          {/* === The Home link and style is here === */}
          <li className="md:inline-block relative hover:bg-stone-100 md:hover:bg-transparent mr-2">
              <NavLink to="/" end 
              className={({ isActive , isPending }) => 
              isActive ?  navStyle + " mainColor actives" : 
              isPending ? navStyle + " text-blue-400" : navStyle}
              onClick={handleCloseNavLinks}
             >Home</NavLink>
              <span className="nav-link md:inline-block transition-all duration-200 ease-linear"></span>
          </li>

            {/* === The rest of the links start here === */}
          {navItems.map((nav) => {
            return (
              <li key={nav.id} className="md:inline-block relative group hover:bg-stone-100 md:hover:bg-transparent">
                <NavLink to={nav.url}	className={({ isActive , isPending }) => 
                  isActive ?  navStyle + " mainColor actives" : 
                  isPending ? navStyle + " text-blue-400" : navStyle}
                  onClick={handleCloseNavLinks}>{nav.name}</NavLink>
                <span className="nav-link md:inline-block  transition-all duration-200 ease-linear"></span>{/* navlink hover underline design */}

                {/* The hover arrow for sublinks display */}
                {(scroll < 201 && size.width >= 768) ? 
                  <span className="group-focus-within:mainColor text-[10px] py-4 px-4 hidden md:inline-block
                    relative after:absolute after:inset-0 after:z-20 transition-all duration-200 delay-100 ease-linear" 
                    onMouseOver={onHover} onMouseOut={onHover}> 
                    <FaChevronDown className="inline-block align-text-top mt-[2px] my-1"/> 
                  </span> : "" }                    
                  
                {size.width < 768 && <NavLinksAndArrows opncategories={onHover} hideShowNavLinks={hideShowNavLinks}/>}

                {/* ===== block of hoverable links small screen are here ====== */}
                {size.width < 768 && 
                <span className="hidden overflow-hidden hover:block">            
                  <SmallScreenHoverLinsks 
                  handleCloseNavLinks={handleCloseNavLinks}
                  CategoriesLink={headerHoverCategoriesNav} 
                  Parentlink={getTheNavlinkTextContent}/>         
                </span>}
              </li>
            )
          })
          }
        </ul>
      </nav>

     {/* ===== block of hoverable links large screen are here ====== */}
     {(scroll > 201 && size.width >= 768 ? false : showhoverlinks) && 
      <div className="relative" onMouseOver={onshowHoverlinks} onMouseOut={onshowHoverlinks}>
        <div className={`absolute top-0 lg:inset-x-[5%] disabled:opacity-40`} disabled={isFetchingTags || isFetching}>
          {((categoriesParents[getTheNavlinkTextContent] && tagsParents[getTheNavlinkTextContent]) 
          || (getTheNavlinkTextContent === "quotes" && categoriesParents["random"] && tagsParents["random"]) ) && 
          <HoverLinsks 
            handleCloseHoverlinks={handleCloseHoverlinks}
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
