import { useState, React, useEffect } from "react";
import { Link, Outlet, ScrollRestoration } from "react-router-dom"
import SocialNewsletter from "./HeaderNavigationComponent/Social_newsLetter";
import FullSreenSidebar from "./HeaderNavigationComponent/FullScree_SideBar";
import { FaBars, FaChevronUp, FaSistrix, FaTimes } from "react-icons/fa";
import Footer from "./BlogPages/footerPage/Footer";
import HeaderNavigations from "./HeaderNavigationComponent/Navigations/HeaderNavigations";
import { useFetchedPosts } from "./SharedAsset/Spinners/postsSpinner";
import { Hanbugar3 } from "./ButtonAndOthers/Buttons";
import { useWindowSize } from "./SharedAsset/SharedAssets";
import { useWindowScroll, useClickAway } from "@uidotdev/usehooks"


const HomeLinks = () => {
  const [showFullSideBAr, setShowFullSideBAr] = useState(false)
  const [hideShowNavLinks, setHideShowNavLinks] = useState(false)
  const [backToTop, setBackToTop] = useState("")
  const {isFetching} = useFetchedPosts()
  const size = useWindowSize()
  const [{x, y}, scrollTo] = useWindowScroll()


  const handle_showFullSideBAr = () => {
    setShowFullSideBAr((change) => !change)
  }

  const handle_hideShowNavLinks = () => {
    setHideShowNavLinks((change) => !change)
  }
  
  const handleCloseNavLinks = () => {
    setHideShowNavLinks(() => false)
  }

  const handleCloseInstaSidebar = () => {
    setShowFullSideBAr(() => false)
  }

  const closeSideBarOnBodyClick = useClickAway(() => {
    handleCloseInstaSidebar()
  }) 

  const closeNavLinksOnBodyClick = useClickAway(() => {
    handleCloseNavLinks()
  }) 

  useEffect(() => { 
    if (
      y > 550  // i windoScrollYis geater than 550
    ) {
      setBackToTop("block") 
    } else {
      setBackToTop("none") 
    }
  },[y,x])

  useEffect(() => {  
    if (size.width >= 768 ) {      
      setHideShowNavLinks(()=> false)
    } 
   
     handleCloseInstaSidebar() // close onec their is change in window width    
  }, [size, hideShowNavLinks])

  const handleBackToTopClick = () => {
    document.body.scrollTop = 0; // For Safari
    scrollTo({left: 0, top: 0, behavior: "smooth"})
    return
  }

   return(
    <div className="text-center relative">
      
      {/* ==== Main header section start here ==== */}
      <header className="relative">

        {/* ==== social and newsletter start here === */} 
        <div className="relative">
          <SocialNewsletter opensidebar={handle_showFullSideBAr}/>

          {/* === small scree hanbugar start here === */}
          <div className="md:hidden fixed w-8 border-0 inset-auto bg-neutral-100 z-[9999] right-4 shadow-md shadow-stone-900 pt-1">
            <button type="button" aria-controls="primary-navigation" onClick={handle_hideShowNavLinks}>
              {hideShowNavLinks ? <FaTimes /> : <FaBars /> }
              <span className="hidden">Menu</span>
            </button>
          </div>
        </div>
        
        {/* ==== FullScreen Side Bar start here ==== */}
        <div ref={closeSideBarOnBodyClick} className={`transition-[display] duration-700 ease-linear fixed right-0 inset-y-0 max-w-md z-[300] ${showFullSideBAr ? "block" : "hidden"}`}>
          <FullSreenSidebar  disabled={isFetching} closesidebar={handleCloseInstaSidebar}/>

          <div className="fixed top-3 px-3 text-stone-800 text-lg hover:text-rose-500 
            transition-all duration-200 ease-linear" title="close">
              <Hanbugar3 closesidebar={handleCloseInstaSidebar}/>
          </div>

          <Link to={"/search"} className="fixed right-8 top-3 cursor-pointer text-stone-800 text-lg font-bold hover:mainColor TextHeadertransition" title="posts search"
          onClick={handleCloseInstaSidebar}>
              <FaSistrix className="inline-block"/>
          </Link>
        </div>

        {/* ===== Home hero and navigations start here ===== */}
        <div className="relative z-50 mt-10" disabled={isFetching}>
          <HeaderNavigations 
            handleCloseNavLinks={handleCloseNavLinks}
            hideShowNavLinks={hideShowNavLinks} 
            closeNavLinksOnBodyClick={closeNavLinksOnBodyClick}/>
        </div>
      </header>

   
     {/* === Block for all the out let is here === */}
      <main className="w-full" disabled={isFetching}>
        <div className="pt-8 pb-6 lg:max-w-[88%] max-w-[95%] mx-auto">
          <Outlet/>
        </div>
      </main> 

      {/* === footer start here === */}
      <div className="text-left bg-stone-800 text-neutral-200 lg:mt-10 pt-4">
        <div className="lg:max-w-[88%] max-w-[95%] mx-auto py-4 lg:pt-8" disabled={isFetching}>
          <Footer />
        </div>
      </div>

        {/* === Move back to the top button === */}
      <span className="fixed bottom-8 right-6 z-30 hidden" style={{ display: backToTop, }} >
        <button title="Back to top" className="text-neutral-400 text-xl pt-1.5 pb-2.5 rounded-md px-3 bg-neutral-100/30 text-center
           border border-solid border-stone-300 shadow-sm shadow-stone-300 opacity-70 transition-opacity hover:opacity-100 
           duration-200 ease-in" onClick={handleBackToTopClick}>
          <FaChevronUp className="inline-block"/>
        </button>
      </span>


      {/* === scroll back to lasts position on page refresh === */}
      <ScrollRestoration 
        getKey={(location, matches) => {
          const paths = ["/home", "/notifications"];
          return paths.includes(location.pathname)
            ? // home and notifications restore by pathname
              location.pathname
            : // everything else by location like the browser
              location.key;
        }}
      />
    </div>
  )
}

export default HomeLinks