import React, { useEffect, useRef, useState } from 'react';
import { FaCheckDouble, FaFacebookSquare,   FaRegClock, FaRegComment, FaRegEye, FaRegEyeSlash, FaShareAlt, FaTwitter} from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { SocialMediaIcons } from '../../data';
import { CatSideBarHanbugarButton } from '../ButtonAndOthers/Buttons';
import Preview from '../BlogPages/singlePostPage/createPost/editorPreview/Preview';
import { Link, useLocation } from 'react-router-dom';
import { useUpDateSharedPostsMutation } from '../../Reduxstore/Slices/posts/PostsSlice';


// HeroImage one image title
export const PostTitleLarge = ({post, postId}) => (

  <h2 className="tracking-wide capitalize font-lora text-lg imgxs:text-xl md:text-lg lg:text-2xl font-bold">
    <Link to={`/single/${postId}`} className='cursor-pointer'  title='title'>
      {post.substring(0, 50)}
    </Link>
  </h2>
)


// HeroImage and post title with black color style (latest post, Entertainment News, Arround The world etc)
export const PostTitleMedium = ({post, postId}) => (

  <h3 className="capitalize tracking-wide text-stone-900 font-lora md:text-base text-base imgxs:text-xl lg:text-lg font-extrabold">
    <Link to={`/single/${postId}`} className='hover:mainColor cursor-pointer TextHeadertransition' title="title">
      {post.substring(0, 50)}
    </Link>
  </h3>
)


// HeroImage and post title withOut black color style (Featured Posts, Entertainment News, Arround The world etc)
export const PostTitleMedium2 = ({post, postId}) => (

  <h3 className="capitalize tracking-wide font-lora text-base imgxs:text-xl md:text-lg lg:text-xl font-extrabold">
    <Link to={`/single/${postId}`} className='hover:mainColor cursor-pointer TextHeadertransition'  title='title'>
      {post.substring(0, 50)}
    </Link>
  </h3>
)

// HeroImage and post title color style (Featured Posts, Entertainment News, Fashion & Trends, Don't Miss, Tech News etc)
export const PostTitleSmall = ({post, postId}) => (

  <h4 className="capitalize font-lora tracking-wide font-extrabold text-stone-900 lg:text-base text-sm imgxs:text-base -mt-1.5 pb-1 md:text-[13px]">
    <Link to={`/single/${postId}`} className='hover:mainColor cursor-pointer TextHeadertransition' title='title'>
      {post.substring(0, 50)}
    </Link>
  </h4>
)


// Home botton to bring you back to the home page(privay, contact, notfound component etc)
export const HomeLink = () => (

  <Link to={"/"} className='text-center font-lora text-4xl hover:mainColor inline-block italic font-bold py-10 TextHeadertransition'>
    <span className='hover:underline hover:decoration-4 cursor-pointer'>Home</span>
  </Link>
)


// Hero page categories intoduction Title without line style (Arround The world, Fashion & Trends, Entertainment News etc)
const HeadTitle = ({blackletters, redletters}) => {

  return (
    <h2 className="inline-block w-full">
      <span className="bg-white text-black whitespace-nowrap font-bold font-round text-base sm:text-lg md:text-sm lg:text-lg capitalize">
        { blackletters }
        {redletters && 
          <strong className="mainColor px-1.5 pt-px">{redletters}</strong>
        }
      </span>
    </h2>
  )
}


// Hero page categories intoduction Title with line style (Arround The world, Fashion & Trends, Entertainment News etc)
export const MainDivider = ({firstletter, secondletter}) => {
  
  return (
    <h2 className="inline-block w-full relative isolate after:absolute after:inset-0 whitespace-nowrap
      after:top-1/3 md:after:top-[40%] after:h-1 after:-z-10 after:border-b after:border-solid after:border-neutral-200">

      <span className="bg-white text-black pr-4 font-bold font-josefin text-lg md:text-sm lg:text-lg capitalize">
        {firstletter}
        {secondletter && 
          <strong className="mainColor"> { secondletter }</strong>
        }
      </span>
    </h2>
  )
}


// categories page aside component introduction with line of red and gray
export const PagesDivider = ({text}) => {

  return (
    <div className="bg-white relative pr-4 py-1 my-1 font-bold font-josefin text-lg md:text-sm lg:text-lg capitalize
        before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-neutral-200 after:absolute after:left-0
        after:bottom-0 after:w-8 after:h-0.5 after:bg-[#f70d28] after:z-10">
        {text}
    </div>
  )
}


// categories placement with no absolute position
export const CategoriesComponent = ({cat}) => {

  return (
    <Link 
      to={`/categories?category=${cat}`} 
      className="bg-[#f70d28] tracking-wider font-lora lg:text-xs text-[11px] md:leading-3 uppercase px-2 cursor-pointer" 
      title='category'>{cat}</Link>
  )
}


// categories placement with an absolute position
export const CategoriesComponentBotton = ({cat}) => {

  return (
    <Link 
      to={`/categories?category=${cat}`} 
      className="absolute bottom-2 bg-[#f70d28] font-lora left-3 lg:text-xs text-[11px] md:leading-3 tracking-wider cursor-pointer 
      font-semibold text-white px-2 uppercase rounded-sm"
      title='category'>{cat}</Link>
  )
}


// hero page section navigation of few possible categories (Arround The world, Fashion & Trends, Entertainment News etc)
export const CatSidebarHanbugar = ({initial, blackletters, redletters, parent}) => {
  const [catSidebar, setCatSidebar] = useState(false) // display control
  const size = useWindowSize()

  // Change each array to object with id for keys
  const CategoriesLinks = initial[parent]?.category?.map((title, id) => ({id: id, title: title}))

  // open and close display control
  const handleShowCatSideBar = () => {
    setCatSidebar((open) => !open)
  }

  useEffect(() => {
    if (size.width >= 1000) {
      setCatSidebar(() => false)
    }
  }, [catSidebar, size])

  const CatSideBarStyle = `absolute right-0 top-full z-20 shadow-sm shadow-black/5 bg-white py-1 px-2 uppercase cursor-pointer hover:mainColor ${catSidebar ? "translate-y-0 opacity-100 visible TextHeadertransition" : "translate-y-32 opacity-0 invisible"}`

  return (
    <div className="grid grid-flow-col justify-between relative my-3">
      
      {/* Section Introduction text */}
      <HeadTitle blackletters={blackletters} redletters={redletters} /> 

      {/* Categories listing and styling */}
      <div className='text-neutral-400 font-josefin font-semibold text-xs lg:text-xs md:text-[10px] md:leading-4 md:mt-0.5 tracking-wide'>
        <div className='grid grid-flow-col'>
          <ul className="grid grid-flow-col">

            {/* All ie the main parent categories */}
            <li className="text-stone-800 inline-block cursor-pointer uppercase">
              <Link to={`/${parent}`} className='py-1 px-2 inline-block'>All</Link>
            </li>

            {CategoriesLinks.map((cat) => {
              return (
                <li key={cat.id} className={`inline-block cursor-pointer uppercase last:hidden  last:md:inline-block  
                  ${size.width < 420 ? "[&:nth-child(2)]:hidden": "[&:nth-child(2)]:sxs:inline-block"}  
                  ${size.width < 520 ? "[&:nth-child(3)]:hidden" : "[&:nth-child(3)]:xs:inline-block "} 
                    ${size.width < 768 ? "[&:nth-child(4)]:hidden" : "[&:nth-child(4)]:md:inline-block"}
                    ${size.width < 1000 ? "[&:nth-child(5)]:hidden" : "[&:nth-child(5)]:md:inline-block"}`}
                    >
                  <Link to={`/categories?category=${cat.title}`} className='hover:mainColor py-1 px-2 inline-block'>{cat.title}</Link>
                </li>
              )
            })}
          </ul>

          {/* small scree eclips button to display and hide the list */}
          {(size.width > 1000 && CategoriesLinks.length <= 5) ? "" :
            <div className="block px-2 pt-1.5 lg:hidden">
              <CatSideBarHanbugarButton sidebar_state={catSidebar} handleShowCatSideBar={handleShowCatSideBar} />
          </div>}
        </div>
        
        {/* use some of the list here in  small screens*/}
        <ul className={CatSideBarStyle}>
          {CategoriesLinks.map((cat) => {
            return (
              <li key={cat.id} className="first:sxs:hidden [&:nth-child(2)]:xs:hidden [&:nth-child(3)]:md:hidden">
                <Link to={`/categories?category=${cat.title}`} className='hover:mainColor py-1 px-2 inline-block'>{cat.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}


// Social subscribe newsletter social media component
export const SocialMediaLinks = () => {
  
  return (
    <ul className="pt-1 list-none m-0 p-0 inline-block">
      {SocialMediaIcons?.map((icon) => {
        return (
          <li key={icon.id} className="inline-block first:pl-0 last:pr-0 group cursor-pointer" title={icon.name}>
            <a  
              href={icon.link} 
              target="_blank" 
              rel={"noreferrer"} 
              className={`no-underline mx-1.5 text-xl ${icon.socialLinks} leading-3 
              group-hover:text-white TextHeadertransition inline-block relative after:absolute after:inset-0 after:z-10`}>
              {icon.icon}
            </a>
          </li>
        )
      })}
    </ul>
  )
}


// hero page Popular Post social media with share count
const SocialMediaCount = ({text, bg, shareUrl, postTitle, postId, SocialSharedCount}) => {
  let social // getting the name of the share button clicked
  const [updateSocial, { isLoading }] = useUpDateSharedPostsMutation() // redux toolkit mutation function

  // handling setting of the clicked button
  const handleSetSocial = (event) => {
    social = event.target.ariaLabel
  }

  const canShare = [postId, postTitle].every(Boolean) && !isLoading // making sure that every thing is ready

  // making a call to redux api slice
  const handleShareUpdate = async() => {
    if (canShare && social) {
      await updateSocial({ postId, postTitle, social})
    }
  }

  return (
    <span className='relative pr-1.5 ring-0 disabled:opacity-40' disabled={isLoading}>

      <span id='' className={`${bg} text-white shadow-sm shadow-black/20 font-semibold inline-block relative whitespace-nowrap rounded font-lora tracking-wider`}>
        <span id={text} className='absoluste left-1 top-[2px] mr-1'>

        {text === "Share" ? 
          <FacebookShareButton 
            url={shareUrl}  
            quote={postTitle} 
            disabled={!canShare}
            disabledStyle={{opacity: 0.4}}
            className={`my-0.5 mx-2 disabled:opacity-40`} 
            onShareWindowClose={handleShareUpdate}
            onClick={handleSetSocial}
            >
            <FaFacebookSquare className='inline-block text-base align-text-top pr-1 TextHeadertransition'/> 
            { text}
          </FacebookShareButton>
        : 
          <TwitterShareButton         
            url={shareUrl}
            title={postTitle}
            disabled={!canShare}
            disabledStyle={{opacity: 0.4}}
            className={`my-0.5 mx-2 disabled:opacity-40`} 
            onShareWindowClose={handleShareUpdate}
            onClick={handleSetSocial}>
            <FaTwitter className='inline-block text-base align-text-top pr-1'/>
            { text}
          </TwitterShareButton>
        }
        </span>        
      </span>

      <span className='relative bg-white text-center whitespace-nowrap mx-2 px-[3px] border border-solid border-neutral-300
        rounded-sm text-stone-400 inline-block text-[11px] leading-[18px] font-normal ml-2 min-w-[15px]
        top-0 -z-10 before:absolute before:block before:right-full  before:top-[40%] before:-mt-[3px]
        before:border-[5px] before:border-solid before:border-r-neutral-300  before:border-y-transparent 
        before:border-l-transparent after:absolute after:right-full  after:top-[40%] after:-mt-[1px]
        after:border-[3px] after:border-solid after:border-r-white  after:border-y-transparent 
        after:border-l-transparent '>
        {SocialSharedCount[text === "Share" ? "facebook" : "twitter"]}
      </span> 
    </span>
  )
}  


// hero page Popular Post social media with share count
export const SharedCount = ({postId, postTitle, SocialSharedCount}) => {
  const [hoverRef, isHovered] = useHover(); // hover hook

  return (
    <span className='text-[#d7d7d7] inline-block my-2 text-xs cursor-pointer '>
      <span ref={hoverRef}>

      {isHovered ?
        <>

          <SocialMediaCount  
            text={"Share"} 
            bg={"bg-[#45629f]"} 
            shareUrl={`/single/${postId}`} 
            postTitle={postTitle} 
            postId={postId} 
            SocialSharedCount={SocialSharedCount}/>

          <SocialMediaCount 
            text={"Tweet"} 
            bg={"bg-[#5eb2ef]"} 
            shareUrl={`/single/${postId}`} 
            postTitle={postTitle}
            postId={postId}
            SocialSharedCount={SocialSharedCount}/>

        </> : 
        <span>
          <FaShareAlt className='inline-block align-middle pb-1 text-xl'/>
        
          <span className='font-lora tracking-wider'>
            &nbsp;&nbsp;  {SocialSharedCount.twitter + SocialSharedCount.facebook}&nbsp;Shares
          </span>
        </span>}
        
      </span>
    </span>
  )
}


// Aside stay connected social like
export const SocialLinks = ({others}) => {

  return (
    <ul className='grid grid-cols-3 text-center mt-4'>
      {(others ? others : SocialMediaIcons.slice(0, 5)).map((link) => {
        return (
          <li key={link.id}>
            <a href={link.link} target="_blank" rel="noopener noreferrer" className={`text-xl block ${others ? link.bg : "bg-[#fff]"} font-bold ${others ? link.hv : "hover:bg-slate-200/75"} cursor-pointer border border-solid border-[#e0e0e0]
              TextHeadertransition`} onClick={(e) => e.preventDefault()}>
              <span className={`${others ? "text-white" : "text-[#53585c]"}`}>
                <span className={`block text-3xl ${others ? "text-white" : link.socialLinks}`}>{link.icon}</span>
                <span className='block'>{link.number}</span>
                <small className={`${others ? "text-white" : "text-[#a0a0a0]"} prose text-xs`}>{link.text}</small>
              </span>
            </a>
          </li>
        )
      })}
     </ul>
  )
}


// The window width and height Hook component
export const useWindowSize = () => {

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}


// hover Hook component used in hero page (Popular Post) and other pages
export const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  let node = ref.current

  useEffect(() => {  
    let node = ref.current

    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [node]);

  return [ref, value];
}


// hero images hover overlay 
export const overLay = () => {
  const overLay = `after:absolute after:inset-0 cursor-pointer after:bg-blue-500/30 group-hover:after:opacity-50 
  after:opacity-0 after:transition-opacity after:ease-linear after:duration-300 before:absolute 
  before:z-10 before:inset-0 before:bg-black/10 group-hover:before:bg-black/30`

  return overLay
}


// when is fetching 
export const isFecthingStyle = (isFetching) => {
  const isFetchingStyle = `${isFetching && "opacity-40 after:absolute after:inset-0 after:z-10"}`

  return isFetchingStyle
}


// footer and aside newletter component
export const NewsLetter = () => {

  return (
    <div className='mt-12 mb-12 bg-gray-300/30 p-5 shadow-sm shadow-gray-300/40 rounded-sm text-center sm:text-left'>
      <p className='font-round text-[#54595f] text-xs lg:text-sm tracking-normal my-0.5'>Subscribe to our mailing list to receives daily updates direct to your inbox!</p>

      <form className='my-4'>
        <input type="email" placeholder='Your email address' name='email' 
        className='bg-white focus:outline-none text-center w-full md:w-auto focus:ring-0 lg:w-56 py-2 focus:border border-solid focus:border-gray-300/50 sm:text-left border-gray-300/50 shadow-inner'/>
        <input type="button" value={"sing up"} name='email' className='uppercase block w-full md:w-auto my-2 md:inline-block text-xs font-black pt-[13.2px] pb-[11.1px] px-6 text-white bg-[#f70d28] tracking-wider'/>
      </form>

      <small className="text-[#54595f] block text-[11px] tracking-wide">
        <sup>*</sup>
        &nbsp; we hate spam as much as you do
      </small>
    </div>
  )
}


// single page introduction newletter component
export const NavDirectionAndPageName = () => {
  const location = useLocation() 
  let page
  let pages
  let search

  if (location?.pathname) {
    page = location.pathname.split("/")[1]
    pages = location.pathname.replace(/[/]/g, " > ")
  }

  if(location?.search) {
    let path = location.search.replace(/[?=]/g, ",")
    let searchReturned = path.split(",")[path.split(",").length - 1]

    search = searchReturned.replace(/[%]\d+/g, " ")
  }

  return (
    <>
      <span className="inline-block mb-5 mt-8">
        <small>Home {pages} {search && 
        <span> &gt; {search} </span>}</small>
      </span>
      
      <h2 className="font-black font-round tracking-wide text-3xl">
        <strong>
          {page !== "pages" ? page : ""}
        </strong> 
      </h2>
    </>
  )
} 


// post time component with blue clock icon
export const TimeComponentColor = ({time}) => {

  return (
    <span className="mt-1 font-lora tracking-wide whitespace-nowrap text-xs lg:text-xs md:text-[10px] font-extrabold" title='date'>
      <FaRegClock className="-mt-0.5 text-[#2e9fff] cursor-pointer inline-block p-px"/>

      <time dateTime='2022-11-3 4:45' className="ml-0.5 text-[#7a7a7a]/60 whitespace-nowrap cursor-pointer inline-block">
        {new Date(time).toDateString()}
      </time>
    </span>
  )
}


// post time component clock icon
export const TimeComponent = ({time}) => {

  return (
    <span className="mt-1 font-lora tracking-wide whitespace-nowrap text-xs lg:text-xs md:text-[10px] font-extrabold" title='date'>

      <FaRegClock className="-mt-0.5 cursor-pointer inline-block p-px"/>

      <time dateTime='2022-11-3 4:45' className="whitespace-nowrap cursor-pointer mt-0.5 ml-0.5 inline-block">
        {new Date(time).toDateString()}
      </time>
    </span>
  )
}


// Comment time frame component
export  const formatDate = (createdAt) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const timeDiffInSeconds = Math.floor((currentDate - createdDate) / 1000);

  if (timeDiffInSeconds < 2) {

    return `${1}sec`;
  } else if (timeDiffInSeconds < 60) {

    return `${timeDiffInSeconds}sec`;

  } else if (timeDiffInSeconds < 3600) {

    const minutes = Math.floor(timeDiffInSeconds / 60);
    return `${minutes}min${minutes > 1 ? 's' : ''}`;

  } else if (timeDiffInSeconds < 86400) {

    const hours = Math.floor(timeDiffInSeconds / 3600);
    return `${hours}hr${hours > 1 ? 's' : ''}`;

  } else if (timeDiffInSeconds < 604800) {

    const days = Math.floor(timeDiffInSeconds / 86400);
    return `${days}day${days > 1 ? 's' : ''}`;

  } else if (timeDiffInSeconds < 2592000) {

    const weeks = Math.floor(timeDiffInSeconds / 604800);
    return `${weeks}week${weeks > 1 ? 's' : ''}`;

  } else if (timeDiffInSeconds < 31536000) {

    const months = Math.floor(timeDiffInSeconds / 2592000);
    return `${months}month${months > 1 ? 's' : ''}`;

  } else {

    const years = Math.floor(timeDiffInSeconds / 31536000);
    return `${years}year${years > 1 ? 's' : ''}`;

  }
};


// little Comment icon and count component
export const CommentComponetColor = ({postId, Comments}) => {
  let numberOfComment

  if(Comments){
    numberOfComment = Comments.filter(comment => comment.postId === postId)
  }

  return (
    <span className='cursor-pointer font-lora tracking-wide whitespace-nowrap text-xs lg:text-xs md:text-[10px] font-extrabold' title='comments'>

      <FaRegComment className="text-[#2e9fff] inline-block mr-px -mt-px"/> 

      <span className='mt-px text-stone-400/80 text-[11px] leading-4 inline-block'>
        &nbsp;{numberOfComment?.length ? numberOfComment.length : 0}
      </span>
    </span>
  )
}


// hero images admin component
export const AdminComponent = ({user, users}) => {
  let adminName

  if(users) {
    adminName = users.find(item => item._id === user)
  }
  
  return (
    <Link to={`/categories?user=${user}`} 
     className="font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-xs md:text-[11px] leading-4 inline-block"
      title='post admin'>
      By
      <span className="cursor-pointer"> {adminName?.username ? adminName.username : " Admin"}</span>
    </Link>
  )
}


// post admin with red color
export const AdminComponentColor = ({user, users}) => {
  let adminName

  if(users) {
    adminName = users.find(item => item._id === user)
  }
 
  return (
    <Link to={`/categories?user=${user}`} 
      className="text-stone-500/80 mt-[3px] font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-xs md:text-[11px] leading-4 inline-block"
      title='post admin'>
        By
        <span className="mainColor cursor-pointer"> {adminName?.username ? adminName.username : "Admin"}</span>
    </Link>
  )
}


// Post body short introduction component
export const PostsShortInfoComponent = ({post}) => {
  const postContent =  (<Preview postContent={post}/>)
  const textExtract = JSON.parse(postContent.props.postContent).blocks[0].text

  return (
    <div className="text-ellipsis prose text-stone-500 md:text-[13px] leading-[20px] text-sm imgxs:text-[15px] lg:text-base">
      {textExtract.substring(0, 120)} . . .
    </div>
  )
}


// Head introduction of every user pages
export const UserInfoHeading = ({head, text}) => {

 return (
  <div className='py-1 my-0.5 mx-0'>
    <h3 className='text-2xl sm:text-3xl font-normal my-1 pr-2 text-stone-900 capitalize'>{head}</h3>
    <small className='text-sm font-normal text-[#798488] my-1'><p>{text}</p></small>
  </div>
 )
}


// User security info, warning and updates
export const SinginAndSecurityIntro = ({text}) => {
  return (
    <div className='font-medium tracking-wide font-josefin'>
      <p>{text}</p>
    </div>
  )
}


// Green correct tick component, user, register login input tick 
export const CorrectTick = ({IsValid, positionTop}) => {

  return (
    <span className={`${positionTop} absolute xxs:right-4 right-1 p-px ${IsValid ? "inline" : "hidden"}`}>
      <FaCheckDouble className="inline-block text-xs text-green-500 drop-shadow-md bg-slate-50/50" />
    </span>
  )
}


// password open and close component, user, register login input 
export const PasswordDisplay = ({showPassword, handle}) => {

  return (
    <span className="absolute top-[22%] right-4 p-px cursor-pointer after:absolute after:inset-0 after:z-10" onClick={handle}>
      {showPassword ?
        <FaRegEye className="inline-block text-xs text-stone-600 cursor-pointer"/>
        :
        <FaRegEyeSlash className="inline-block text-xs text-stone-600 cursor-pointer"/>
      }
    </span>
  )
}

