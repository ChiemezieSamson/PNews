import React, { useEffect, useState } from 'react'
import { HomePageSlideNextAndPreviousButton2, StarComponent } from '../../ButtonAndOthers/Buttons'
import { CategoriesComponent, isFecthingStyle, overLay, TimeComponent, useWindowSize} from '../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../data'
import { HeroOneBussinessFavoriteImageSpinner } from '../../SharedAsset/Spinners/Spinner'

const ImageComponent = ({Posts, canOpen, isFetching}) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [imageStart, setImageStart] = useState(5)
  const [imageEnd, setImageEnd] = useState(10)
  const reversPost = []

  const size = useWindowSize()
  
  for (let i =  Posts?.length -1; i > 0; i-- ) {

      if (canOpen) {

        reversPost.push(Posts[i])
      }
  }

  const handleNext = () => {

    if(end < imageEnd && start < imageStart) {

      setEnd(() => end + 1)
      setStart(() => start + 1)
    } else {

      setEnd(() => imageStart)
      setStart(() => 0)
    }
  }

  const handleBackward = () => {

    if(start === 0 && end === imageStart) {

      setEnd(() => imageEnd)
      setStart(() => imageStart)
    } else {

      setEnd(() => end - 1)
      setStart(() => start - 1)
    }
  }

  useEffect(() => {

    if (size.width > 1536) {

      setEnd(() => 5)
      setStart(() => 0)
    } else {

      setEnd(() => 10)
      setStart(() => 0)
      setImageStart(() => 5)
      setImageEnd(() => 10)
    }
  },[size])

  
  return (
    <section className={`mb-7 mt-10 ${isFecthingStyle(isFetching)} relative isolate`}>
      
      <div className="overflowScroll overflow-x-auto scroll-px-0 overscroll-x-contain snap-mandatory overflow-y-hidden">

        {canOpen ?

          <ul className="grid grid-flow-col">
           
            {reversPost?.slice(start, end)?.map((post) => {

              return (
                <li key={post?._id} className={`relative snap-start m-0 mr-0.5 last:mr-0 p-0 group overflow-clip max-h-80 min-w-[300px]`}>

                  <Link to={`/single/${post?._id}`} className={overLay()}>
                    <img src={post?.postImage ? publicFolder + post?.postImage : "../../../asset/images/imagebg.jpg"} alt="IndexImage"  className="scale-100 group-hover:scale-110 Imagetransition max-h-80 min-w-[300px] aspect-square" loading="lazy"/>         
                  </Link>
                          
                  <div className="absolute bottom-[12%] text-white inset-x-auto text-center max-w-fit z-30 Imagetransition translate-y-10 group-hover:translate-y-0">
                          
                    <CategoriesComponent cat={post?.postCategory[0]}/> 
                        
                    <h3 className="capitalize tracking-wide font-lora md:text-base text-lg lg:text-xl font-extrabold">

                      <Link to={`/single/${post?._id}`} className='cursor-pointer'>
                        {post?.postTitle ? post?.postTitle : ""}
                      </Link>
                    </h3>

                    <span className="mt-2 inline-block Imagetransition translate-y-32 opacity-0 invisible cursor-pointer
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                        <TimeComponent time={post?.createdAt} />

                      {post?.optional?.favourite === false ? "" : <span className='ml-4'>
                          <StarComponent color={"text-white"} favourite={post?.optional?.favourite}/>
                        </span>
                      }  
                    </span>                    
                  </div>
                </li>
              )
            })}
          </ul>        
          :
          <HeroOneBussinessFavoriteImageSpinner 
            groupStyle={"grid grid-flow-col"}
            imageStyle={"m-0 mr-0.5 last:mr-0 p-0 h-80 min-w-[300px]"}
            image={8}
          />
        }
      </div>
      
      <div className='hidden 2xl:block'>

        <HomePageSlideNextAndPreviousButton2
          isSuccess={canOpen}
          handleBackward={handleBackward}
          handleNext={handleNext}
        />
      </div>
    </section>
  )
}

export default ImageComponent
