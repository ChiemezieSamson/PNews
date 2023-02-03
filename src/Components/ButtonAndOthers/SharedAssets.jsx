import React, { useEffect, useRef, useState } from 'react';
import { FaFacebookSquare, FaFlickr, FaInstagram,  FaRegClock, FaRegComment, FaShareAlt, FaSoundcloud, FaTwitter} from 'react-icons/fa';
import { CatSideBarHanbugar } from './Buttons';

const HeadTitle = ({blackletters, redletters}) => {
  return (
    <h2 className="inline-block w-full">
        <span className="bg-white text-black whitespace-nowrap pr-4 font-bold font-round text-lg md:text-sm lg:text-lg capitalize">
          { blackletters }
          <strong className="text-[#f70d28] pt-px"> {redletters}</strong>
        </span>
      </h2>
  )
}


export const PostTitleLarge = ({post}) => (
  <h2 className="tracking-wide capitalize font-lora text-lg imgxs:text-xl md:text-lg lg:text-3xl font-bold">
    <span className='cursor-pointer'  title='title'>
      {post}
    </span>
  </h2>
)


export const PostTitleMedium = ({post}) => (
  <h3 className="capitalize tracking-wide text-black font-lora md:text-base text-base imgxs:text-xl lg:text-lg font-extrabold">
    <span className='hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear' title="title">
      {post}
    </span>
  </h3>
)

export const PostTitleMedium2 = ({post}) => (
  <h3 className="capitalize tracking-wide font-lora text-base imgxs:text-xl md:text-lg lg:text-xl font-extrabold">
    <span className='hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear'  title='title'>
      {post}
    </span>
  </h3>
)


export const PostTitleSmall = ({post}) => (
  <h4 className="capitalize font-lora tracking-wide font-extrabold text-black lg:text-base text-sm imgxs:text-base -mt-1.5 pb-1 md:text-[13px]">
    <span className='hover:text-[#f70d28] cursor-pointer transition-all duration-200 ease-linear' title='title'>
      {post}
    </span>
  </h4>
)


export const MainDivider = ({firstletter, secondletter}) => {
  return (
    <h2 className="inline-block w-full relative isolate after:absolute after:inset-0 whitespace-nowrap
       after:top-1/3 md:after:top-[40%] after:h-1 after:-z-10 after:border-b after:border-solid after:border-gray-400/40">
       <span className="bg-white pr-4 font-bold font-josefin text-lg md:text-sm lg:text-lg capitalize">
       {firstletter}
        <strong className="text-[#f70d28]"> {secondletter ? secondletter : ""}</strong>
       </span>
      </h2>
  )
}


export const PagesDivider = ({text}) => {
  return (
    <div className="bg-white relative pr-4 py-1 my-1 font-bold font-josefin text-lg md:text-sm lg:text-lg capitalize
        before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-gray-200/50 after:absolute after:left-0
        after:bottom-0 after:w-8 after:h-0.5 after:bg-[#f70d28] after:z-10">
        {text}
    </div>
  )
}


export const CategoriesComponent = ({cat}) => {
  return (
    <span className="bg-[#f70d28] tracking-wider font-lora lg:text-xs text-[11px] md:leading-3 uppercase px-2 z-20 cursor-pointer" title='category'>{cat}</span>
  )
}


export const CategoriesComponentBotton = ({cat}) => {
  return (
    <span className="absolute bottom-2 bg-[#f70d28] font-lora left-3 lg:text-xs text-[11px] md:leading-3 tracking-wider cursor-pointer font-semibold text-white px-2 uppercase"
    title='category'>{cat}</span>
  )
}


export const CatSidebarHanbugar = ({initial, blackletters, redletters}) => {
  const [catSidebar, setCatSidebar] = useState(false)
  const size = useWindowSize()

  const handleShowCatSideBar = () => {
    setCatSidebar((open) => !open)
  }

  useEffect(() => {
    if (size.width >= 768) {
      setCatSidebar(() => false)
    }
  }, [catSidebar, size])

  const CatSideBarStyle = `absolute right-0 top-full z-20 shadow-sm shadow-black/5 bg-[#fff] py-1 px-2 uppercase cursor-pointer hover:text-[#f70d28] ${catSidebar ? "translate-y-0 opacity-100 visible transition-all duration-500 delay-200 ease-linear" : "translate-y-32 opacity-0 invisible"}`

  return (
    <div className="flex justify-between relative my-3">
      
      <HeadTitle blackletters={blackletters} redletters={redletters} />

      <div className=' text-[#54595f]/70 font-semibold text-xs lg:text-xs md:text-[10px] md:leading-4 md:mt-0.5 tracking-wide'>
        <div className='flex'>
          <ul className="flex">
            {initial.map((list, index) => {
              return (
                <li key={index} className={`first:text-black first:hover:text-black inline-block cursor-pointer uppercase last:hidden py-1 px-2 last:md:inline-block  
                 ${size.width < 420 && "[&:nth-child(2)]:hidden"} [&:nth-child(2)]:sxs:inline-block ${size.width < 520 && "[&:nth-child(3)]:hidden"} 
                 [&:nth-child(3)]:xs:inline-block [&:nth-child(4)]:hidden [&:nth-child(4)]:md:inline-block [&:nth-child(5)]:hidden [&:nth-child(5)]:md:inline-block`}>
                  <span className='hover:text-[#f70d28]'>{list}</span>
                  </li>
              )
            })}
          </ul>

          <div className="block md:hidden px-2 pt-1.5">
            <CatSideBarHanbugar sidebar_state={catSidebar} handleShowCatSideBar={handleShowCatSideBar} />
          </div>
        </div>
        <ul className={CatSideBarStyle}>
          {initial.map((list, index) => {
            return (
              <li key={index} className="first:hidden [&:nth-child(2)]:sxs:hidden [&:nth-child(3)]:xs:hidden py-1 px-2">{list}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}


export const SocialLinks = ({others}) => {

  const links = [
    {
      id: 1,
      icon: <FaInstagram className='text-[#e4405f] inline-block'/>,
      number: 87.1 + "k",
      text: "Followers"
    },
    {
      id: 2,
      icon: <FaFlickr className='text-[#f07] inline-block'/>,
      number: 649,
      text: "Followers"
    },
    {
      id: 3,
      icon: <FaSoundcloud className='text-[#ffae00] inline-block'/>,
      number: 23.7 + "k",
      text: "Followers"
    },
  ]
  return (
    <ul className='grid grid-cols-3 text-center mt-4'>
      {(others ? others : links).map((link) => {
        return (
          <li key={link.id} className={`text-xl ${link.bg ? link.bg : "bg-[#fff]"} font-bold ${link.hv ? link.hv : "hover:bg-slate-200/75"} cursor-pointer border border-solid border-[#e0e0e0]
          transition-all duration-200 ease-linear`}>
            <span className={`${link.bg ? "text-white" : "text-[#53585c]"}`}>
              <span className='block text-3xl'>{link.icon}</span>
              <span className='block'>{link.number}</span>
              <small className={`${link.bg ? "text-white" : "text-[#a0a0a0]"} prose text-xs`}>{link.text}</small>
            </span>
          </li>
        )
      })}
     </ul>
  )
}


// The window width and height Hook
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


export const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  let node = ref.current

  useEffect(
    () => {  
      let node = ref.current
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [node]
  );
  return [ref, value];
}


export const overLay = () => {
  const overLay = `after:absolute after:inset-0 cursor-pointer
  after:bg-gradient-to-bl from-[#b3ffab] via-cyan-300 to-[#12fff7] transition-all duration-500 delay-200 ease-linear
  hover:after:opacity-50 after:opacity-0 after:transition-opacity after:ease-in-out
  after:duration-300 after:delay-150 before:absolute before:z-10 before:inset-0 before:bg-black/30`

  return overLay
}


const SocialMediaCount = ({text, bg}) => {

  return (
    <span className='relative pr-1.5 ring-0 '>
      <span className={`${bg} text-[#fff] shadow-sm shadow-black/20 font-semibold inline-block
        py-0.5 px-1 relative whitespace-nowrap rounded font-lora tracking-wider`}>
        <span className='absoluste left-1 top-[2px] mr-1 '>
        {text === "Share" ? <FaFacebookSquare  className='inline-block text-base align-text-top pr-1'/> : 
        <FaTwitter className='inline-block text-base align-text-top pr-1'/>}
        </span>
        {text}
      </span>
      <span className='relative bg-white text-center whitespace-nowrap mx-2 px-[3px] border border-solid border-[#bfbfbf] 
        rounded-sm text-[#888] inline-block text-[11px] leading-[18px] font-normal ml-2 min-w-[15px]
        top-0 -z-10 before:absolute before:block before:right-full  before:top-[40%] before:-mt-[3px]
        before:border-[5px] before:border-solid before:border-r-[#d7d7d7]  before:border-y-transparent 
        before:border-l-transparent after:absolute after:right-full  after:top-[40%] after:-mt-[1px]
        after:border-[3px] after:border-solid after:border-r-[#fff]  after:border-y-transparent 
        after:border-l-transparent '>
          {0}
      </span> 
    </span>
  )
}  


export const NewsLetter = () => {
  return (
    <div className='mt-12 mb-12 bg-gray-300/30 p-5 shadow-sm shadow-gray-300/40 rounded-sm text-center sm:text-left'>
      <p className='font-round text-[#54595f] text-xs lg:text-sm tracking-normal my-0.5'>Subscribe to our mailing list to receives daily updates direct to your inbox!</p>
      <form className='my-4'>
        <input type="email" placeholder='Your email address' name='email' 
        className='bg-[#fff] focus:outline-none text-center w-full md:w-auto focus:ring-0 lg:w-56 py-2 focus:border border-solid focus:border-gray-300/50 sm:text-left border-gray-300/50 shadow-inner'/>
        <input type="button" value={"sing up"} name='email' className='uppercase block w-full md:w-auto my-2 md:inline-block text-xs font-black pt-[13.2px] pb-[11.1px] px-6 text-white bg-[#f70d28] tracking-wider'/>
      </form>
      <small className='text-[#54595f] block text-[11px] tracking-wide'>
        <sup>*</sup>
        we hate spam as much as you do
      </small>
    </div>
  )
}


export const SharedCount = () => {
  const [hoverRef, isHovered] = useHover();
  return (
    <span className='text-[#d7d7d7] inline-block my-2 text-xs cursor-pointer '>
      <span ref={hoverRef}>
      {isHovered ?<div className='socialIcon'>

          <SocialMediaCount  text={"Share"} bg={"bg-[#45629f]"}/>

          <SocialMediaCount text={"Tweet"} bg={"bg-[#5eb2ef]"}/>

        </div> : 
        <span>
          <FaShareAlt className='inline-block align-middle pb-1 text-xl'/>
        
          <span className='font-lora tracking-wider'>
            &nbsp;&nbsp;  {0}&nbsp;Shares
          </span>
        </span>}
        
      </span>
    </span>
  )
}


export const NavDirectionAndPageName = ({page}) => {
  return (
    <>
      <span className="inline-block mb-5 mt-8">
        <small>Home &gt; {page}</small>
      </span>
      
      <h2 className="font-black font-round tracking-wide text-3xl">
        <strong>
          {page}
        </strong> 
      </h2>
    </>
  )
} 


export const TimeComponentColor = ({time}) => {
  return (
    <span className="mt-1 font-lora tracking-wide whitespace-nowrap text-xs lg:text-xs md:text-[10px] font-extrabold"
    title='date'>
      <FaRegClock className="-mt-0.5 text-[#2e9fff] cursor-pointer inline-block p-px"/>
      <time dateTime='2022-11-3 4:45' className="ml-0.5 text-[#7a7a7a]/60 whitespace-nowrap cursor-pointer inline-block">{time}</time>
    </span>
  )
}


export const TimeComponent = ({time}) => {
  return (
    <span className="mt-1 font-lora tracking-wide whitespace-nowrap text-xs lg:text-xs md:text-[10px] font-extrabold"
    title='date'>
      <FaRegClock className="-mt-0.5 cursor-pointer inline-block p-px"/>
      <time dateTime='2022-11-3 4:45' className="whitespace-nowrap cursor-pointer mt-0.5 ml-0.5 inline-block">{time}</time>
    </span>
  )
}


export const CommentComponetColor = () => {
  return (
    <span className='cursor-pointer font-lora tracking-wide whitespace-nowrap  text-xs lg:text-xs md:text-[10px] font-extrabold'
    title='comments'>
      <FaRegComment className="text-[#2e9fff] inline-block mr-px -mt-px"/> <span className='mt-px text-[#7a7a7a]/60 text-[11px] leading-4 inline-block'>{0}</span>
    </span>
  )
}

export const AdminComponent = () => {
  return (
    <small className="font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-xs md:text-[11px]  leading-4 inline-block"
    title='post admin'>
      By
      <span className="cursor-pointer"> Admin</span>
    </small>
  )
}

export const AdminComponentColor = () => {
  return (
    <small className="text-[#7a7a7a] mt-[3px] font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-xs md:text-[11px] leading-4 inline-block"
    title='post admin'>
      By
      <span className="text-[#f70d28] cursor-pointer"> Admin</span>
    </small>
  )
}


export const PostsShortInfoComponent = ({post}) => (
  <p className="text-ellipsis prose text-[#54595f] md:text-[13px] leading-[20px] text-sm imgxs:text-[15px] lg:text-base">
    {post.substring(0, 120)} . . .
  </p>
)

export const UserInfoHeading = ({head, text}) => {
 return (
  <div>
    <h3 className='text-3xl font-normal my-1 pr-2 text-[#282a35] capitalize'>{head}</h3>
    <small className='text-sm font-normal text-[#798488] my-1'><p>{text}</p></small>
  </div>
 )
}