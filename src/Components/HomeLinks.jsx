import { useState, React, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom"
import SocialNewsletter from "./HeaderNavigationComponent/Social_newsLetter";
import FullSreenSidebar from "./HeaderNavigationComponent/FullScree_SideBar";
import { FaChevronUp } from "react-icons/fa";
import Footer from "./BlogPages/footerPage/Footer";
import HeaderNavigations from "./HeaderNavigationComponent/Navigations/HeaderNavigations";
import { useFetchedPosts } from "./SharedAsset/Spinners/postsSpinner";


const HomeLinks = () => {
  const [showFullSideBAr, setShowFullSideBAr] = useState(false)
  const [backToTop, setBackToTop] = useState("")
  const {isFetching} = useFetchedPosts()
 
  
  const handle_showFullSideBAr = () => {
    setShowFullSideBAr((change) => !change)
  }
  
  const handleCloseInstaSidebar = () => {
    setShowFullSideBAr(() => false)
  }

  const scrollFunction = () => {
    if (
      window.scrollY > 550
    ) {
      setBackToTop("block") 
    } else {
      setBackToTop("none") 
    }
  }

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener("scroll",scrollFunction)
    }
  
    watchScroll()

   return () => {
    window.removeEventListener("scroll",scrollFunction)
   } 
  },[])

  const handleBackToTopClick = () => {
    document.body.scrollTop = 0; // For Safari
	  document.documentElement.scrollTop = 0; //
    return
  }

   return(
    <div className="text-center relative">
      
      {/* ==== Main header section start here ==== */}
      <header className="relative">

        {/* ==== social and newsletter start here === */} 
        <SocialNewsletter opensidebar={handle_showFullSideBAr}/>


          <>
          {/* ==== FullScreen Side Bar start here ==== */}
        <div className="Instagramsidebar transition-[display] duration-700 ease-linear hidden fixed right-0 top-0 bottom-0 max-w-md z-[300]" data-visible={showFullSideBAr}>
          <FullSreenSidebar closesidebar={handleCloseInstaSidebar} disabled={isFetching}/>
        </div>

        {/* ===== Home hero and navigations start here ===== */}
        <div className="relative z-50" disabled={isFetching}>
          <HeaderNavigations/>
        </div>
        </>
      </header>

   
     {/* Block for all the out let is here */}
        <div className="w-full" disabled={isFetching}>
          <div className="pt-8 pb-6 lg:max-w-[88%] max-w-[95%] mx-auto">
            <Outlet/>
          </div>
        </div> 


      <div className="text-left bg-[#212121] text-[#a8a8aa] lg:mt-10 pt-4">
        <div className="lg:max-w-[88%] max-w-[95%] mx-auto py-4 lg:pt-8" disabled={isFetching}>
          <Footer />
        </div>
      </div>


      <span className="fixed bottom-8 right-6 z-30 hidden" style={{ display: backToTop, }} >
        <button title="Go to Top" className="text-[#a0a0a0] text-xl pt-1.5 pb-2.5 rounded-md px-3 bg-[rgba(180,180,180,.15)] text-center
           border border-solid border-[rgba(0,0,0,.11)] shadow-sm shadow-black/20 opacity-70 transition-opacity hover:opacity-100 
           duration-200 ease-in" onClick={handleBackToTopClick}>
          <FaChevronUp className="inline-block"/>
        </button>
      </span>


      {/*  */}
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