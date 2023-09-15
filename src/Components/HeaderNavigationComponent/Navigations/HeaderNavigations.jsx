import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import { NavLinksAndArrows} from "../../ButtonAndOthers/Buttons"
import { HoverLinsks, SmallScreenHoverLinsks } from "../HeadHoverComponent/HoverLinks";
import { useWindowSize } from "../../SharedAsset/SharedAssets";
import { navItems } from "../../../data";
import { FaChevronDown, FaSistrix } from 'react-icons/fa';
import useFetchedTags from '../../SharedAsset/Spinners/tagsSpiner';
import useFetchedCategories from '../../SharedAsset/Spinners/categoriesSpinner';
import { useGetPostsByPaginationTwoQuery } from '../../../Reduxstore/Slices/posts/PostsSlice';

const HeaderNavigations = ({hideShowNavLinks, handleCloseNavLinks}) => {
  // fetch the tags of each ParentCategory
  const {tagsParents = [], isFetching: isFetchingTags, tagsaction} = useFetchedTags() 
  // fetch the category of each ParentCategory
  const {categoriesParents = [], categoriesaction,  isFetching} = useFetchedCategories()

  const [sticky, setSticky] = useState("")
  const [scroll, setScroll] = useState("")
  const [showhoverlinks , setShowHoverlinks] = useState(false) // display and hide the hover component

  // getting the category hovered on
  const [getTheNavlinkTextContent, setGetTheNavlinkTextContent] = useState("books")
  // get the array of all the item in post category for a hovered parentcategory  
  const [headerHoverCategoriesNav, setHeaderHoverCategoriesNav] = useState([])
  // get the array of all the item in post tag for a hovered parentcategory  
  const [headerHoverTagsNav, setHeaderHoverTagsNav] = useState([])
  const [headerParentCategory, setHeaderParentCategory] = useState([])
  // fetching post based on a particular parent category
  const { data = [], isSuccess, isFetching: isFetchingHoverPosts } = useGetPostsByPaginationTwoQuery(headerParentCategory ?  headerParentCategory : `${"?page=" + 1}&limit=${10}&parentCat="books"`);

  let action = false

  if (isSuccess && data?.Posts?.length > 0) {

    action = true
  }


  const hoverPosts = data?.Posts
  const size = useWindowSize()

  // function for opening and closing the hover components
  const onshowHoverlinks = () => {

    setShowHoverlinks((showhoverlinks) => !showhoverlinks)
  }

  // Closing the hover component when any link or item is clicke
  const handleCloseHoverlinks = () => {

    setShowHoverlinks(() => false)
  }
  
  // if hovered get the textcontent of the hovered navigation so that it can be used to display 
  // the categories under it
  const onHover = (e) => {

    let elementtextContent = e.target.id.toLowerCase() // text content

    // make sure to only open the big hover component when the window size is bigger than 768
    if(size.width > 768) { 

      onshowHoverlinks()
    }
   
    // set the text content choosen
    setGetTheNavlinkTextContent(() => elementtextContent)

    // Set the categories
    if (categoriesParents?._id) {

      // making sure to querry for particuarl post when the parent category is hovered on
      setHeaderParentCategory(() =>  `${"?page=" + 1}&limit=${10}&parentCat=${elementtextContent !== "quotes" ? elementtextContent : "random"}`)

      if (elementtextContent !== "quotes") {

        if (categoriesParents[elementtextContent]) {

          setHeaderHoverCategoriesNav(() => categoriesParents[elementtextContent]?.category)
        } 

      } else {

        setHeaderHoverCategoriesNav(() => categoriesParents?.random?.category)
      }
    }

    // set the tags
    if (tagsParents?._id) {

      if (elementtextContent !== "quotes") {

        if (tagsParents[elementtextContent]) {

          setHeaderHoverTagsNav(() => tagsParents[elementtextContent]?.tags)
        }

      } else {

        setHeaderHoverTagsNav(() => tagsParents?.random?.tags)
      }
    }
  }


  // Handling sticky header
  useEffect (() => {

    const isSticky = () => {

      const scrollTop = window?.scrollY;
      
      const stickyClass = scrollTop >= 300 ? is_sticky 
      : "shadow-md shadow-neutral-200 transition-all duration-200 delay-100 ease-linear";
      setSticky(stickyClass);

      setScroll(() => scrollTop)

      if(scrollTop > 201) {

        setShowHoverlinks(() => false)
      }
    };

    if(size.width < 768) {
      
      handleCloseHoverlinks()
    }

    const is_sticky  = `fixed top-0 inset-x-0 md:pt-2 bg-white z-[200] shadow-md shadow-neutral-300`

    window?.addEventListener("scroll", isSticky)
        
    return ()=>  window?.removeEventListener("scroll", isSticky)

  },[size])


  // navigation styling
  const navStyle = `links no-underline pl-3.5 leading-[48px] text-sm font-bold uppercase 
  transition-all duration-200 ease-linear`

  return (
    <div className={sticky}>

      {/* ==== Home Hero section start here ==== */}
      <div className={`leading-8 font-poppins font-medium md:py-8 max-w-xl mx-auto my-0 bg-white relative ${(size.width >= 768 && scroll >= 300) ? "hidden" : "block"}`}>

        <Link to={"/"} className='mt-7 mb-2 inline-block'>

          <h1 className="text-stone-800 text-[20vw] sxs:my-0 sxs:text-7xl italic sxs:tracking-wider uppercase inline-block">

            <strong className="relative after:absolute after:h-2.5 after:w-2.5 font-bold after:bg-[#f70d28] after:bottom-4">
                PN<span className='lowercase'>ews</span>
              <small className='xxs:text-[8px] sxs:text-[10px] absolute sxs:top-4 xxs:top-0 xxs:right-[4px] text-[7.5px] -top-[4px] right-0 italic tracking-normal'>news, blog &amp; magazine</small>
            </strong> 
          </h1>
        </Link>

        <p>
          <small className="text-xs xxs:text-base font-thin tracking-widest text-stone-800 font-lora capitalize">Discover The Best</small>
        </p>

        <Link 
          to={"/search"} 
          className={`absolute bottom-1 cursor-pointer md:hidden text-stone-800 text-xs pb-1 xxs:pb-0 xxs:text-lg font-bold hover:mainColor TextHeadertransition
            ${(size.width <= 768 && scroll >= 300) ? "bottom-0 right-2" : "right-0 xxs:right-2"}`} 
          title="posts search"  
          onClick={handleCloseNavLinks}
        >
          <FaSistrix className="inline-block"/>
        </Link>
      </div>

      {/* ==== Home nevigation section start here ===== */}
      <nav>

        {/* ==== navigfation liks ====== */}
        <ul className={`bg-[#ffffff1a] backdrop-blur-lg md:backdrop-blur-none md:bg-transparent 
          grid grid-flow-row m-0 max-w-3xl list-none list-inside pb-5 pt-8 fixed top-0 right-1/2 
          left-0 transition-transform duration-[350ms] ease-in-out z-50 md:p-0 md:z-0
          md:justify-evenly md:grid-flow-col md:static md:translate-x-0 md:mx-auto  
          ${hideShowNavLinks ? "translate-x-0" : "-translate-x-full"} font-round`}>

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
          {navItems?.map((nav) => {

            return (
              <li key={nav.id} className="md:inline-block relative group hover:bg-stone-100 md:hover:bg-transparent">
                
                <NavLink to={nav.url}	className={({ isActive , isPending }) => 
                  isActive ?  navStyle + " mainColor" : 
                  isPending ? navStyle + " text-blue-400" : navStyle}
                  onClick={handleCloseNavLinks}>{nav.name}</NavLink>

                <span id={nav.name} className="nav-link md:inline-block  transition-all duration-200 ease-linear"></span>{/* navlink hover underline design */}

                {/* The hover arrow for sublinks display */}
                {(scroll < 201 && size.width >= 768) ? 

                  <span id={nav.name} className="group-focus-within:mainColor text-[10px] py-4 px-4 hidden md:inline-block
                    relative after:absolute after:inset-0 after:z-20 transition-all duration-200 delay-100 ease-linear" 
                    onMouseOver={onHover} onMouseOut={onHover}> 

                    <FaChevronDown className="inline-block align-text-top mt-[2px] my-1"/> 
                  </span> : "" }                    
                  
                {size.width < 768 && 

                  <NavLinksAndArrows 
                    opncategories={onHover} 
                    name={nav.name} 
                    hideShowNavLinks={hideShowNavLinks}
                  />}

                {/* ===== block of hoverable links small screen are here ====== */}
                {size.width < 768 && 

                <span className="hidden overflow-hidden hover:block">    

                  <SmallScreenHoverLinsks 
                    handleCloseNavLinks={handleCloseNavLinks}
                    CategoriesLink={headerHoverCategoriesNav} 
                    Parentlink={getTheNavlinkTextContent}
                    categoriesaction={categoriesaction}
                    isFetching={isFetching}
                  />         
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

        <div className={`absolute top-0 inset-x-0 lg:inset-x-[5%] hidded md:block`}>

            <HoverLinsks 
              handleCloseHoverlinks={handleCloseHoverlinks}
              CategoriesLink={headerHoverCategoriesNav} 
              TagsLink={headerHoverTagsNav}
              Parentlink={getTheNavlinkTextContent} 
              blogPost={action && hoverPosts?.slice(0, 6)}
              isFetchingHoverPosts={isFetchingHoverPosts}
              isSuccess={action}
              isFetchingTags={isFetchingTags}
              isFetching={isFetching}
              categoriesaction={categoriesaction}
              tagsaction={tagsaction}
            />
        </div>        
      </div>}    
    </div>
  )
}

export default HeaderNavigations
