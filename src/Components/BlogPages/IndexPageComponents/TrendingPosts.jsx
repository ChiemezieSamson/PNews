import React, { useEffect, useState } from 'react'
import { FaMapPin, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import { Link } from 'react-router-dom';

const TrendingPosts = ({ Posts, size, canOpen}) => {
  const [nextTrendingPost, setNextTrendingPost] = useState(0)
  
  const trendingPostArry = canOpen && Posts?.filter(post => post?.optional?.trending === true)

  const firstSixPosts = canOpen && trendingPostArry?.slice(0, 6)

  const length = firstSixPosts?.length
 
  const handleNextPost = () => {

    setNextTrendingPost((next) => next + 1)
  }

  const handlePreviousPost = () => {

    if (nextTrendingPost === 0) {

      setNextTrendingPost(() => length )
    } else {

      setNextTrendingPost((previous) => previous - 1 )
    }
  }

  const nextPreviousButton = [
    {
      id:1,
      title: "tredingprevious",
      icon: <FaChevronLeft className='inline-block'/>,
      handler: handlePreviousPost
    },
    {
      id:2,
      title: "tredingnext",
      icon: <FaChevronRight className='inline-block'/>,
      handler: handleNextPost
    }
  ]

  useEffect(() => { 

    if (nextTrendingPost === length) {

      setNextTrendingPost(() => 0)
    }

    let interval = setInterval(() => {
      
      setNextTrendingPost((next) => next + 1)
    }, 4000)

    return () => clearInterval(interval)
  },[nextTrendingPost, length])


  return (
    <div className="grid grid-cols-5 sm:grid-cols-8">

          <div className="grid xs:grid-cols-5 grid-cols-10 col-span-4 sm:col-span-7 border border-solid border-neutral-200">

            {/* === Trending icon === */}
            <span className="bg-stone-800 inline-block text-center col-span-1 text-neutral-100 py-2 pr-px md:text-sm text-xs whitespace-nowrap tracking-wider font-bold uppercase">

              <FaMapPin className="inline-block mb-1 mx-0 px-0" title='Trending posts'/>

              {size.width > 520 && " Trending" }
            </span>

            {/* === Post title and date display start here === */}
            <div className="mt-[6px] xs:col-span-4 relative bg-white col-span-9 md:text-sm text-base lg:text-base prose">

              {canOpen ?
              <>
                {firstSixPosts?.map((post) => {

                  return (

                    <span key={post?._id} className={`capitalize pl-[2%] font-lora tracking-wide truncate font-bold text-sm w-[97%] sm:w-full whitespace-nowrap absolute top-[10%]
                        ${post?._id === firstSixPosts[nextTrendingPost]?._id ? "block opacity-100 z-10 translate-y-0" : "opacity-0 -z-10 TextHeadertransition translate-y-full"}`}>                   
    
                        <Link to={`/single/${post?._id}`} className='hover:mainColor no-underline cursor-pointer TextHeadertransition text-neutral-700' title='title'>
                          {post?.postTitle}
                        </Link> 
    
                        <time dateTime='2022-11-3 4:45' className="whitespace-nowrap ml-3 text-neutral-300 cursor-pointer text-ellipsis" title='date'>
                          {new Date(post?.createdAt).toDateString()}
                        </time>
                    </span>
                  )
                })}
              </>
              :
              <div className='skeleton w-full h-4 mt-1 mb-0.5 rounded-sm'></div>
              }
            </div>
          </div>

            {/* === next and previous trending post buttons start here === */}
          <ul className="grid grid-cols-2 text-center border border-l-0 divide-x border-solid border-neutral-200 col-span-1">

            {nextPreviousButton?.map(icon => {

              return (

                <li key={icon.id} className="text-stone-300 hover:bg-neutral-200 TextHeadertransition disabled:opacity-40" title={icon.title}>

                  <button 
                    type='button'
                    name={icon.title}
                    id={icon.title}
                    className='pt-1'
                    disabled={!canOpen}
                    onClick={icon.handler}>
                      {icon.icon}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
  )
}

export default TrendingPosts
