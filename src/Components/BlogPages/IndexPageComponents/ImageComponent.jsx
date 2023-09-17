import React, { useState } from 'react'
import { HomePageSlideNextAndPreviousButton2, StarComponent } from '../../ButtonAndOthers/Buttons'
import { CategoriesComponent, isFecthingStyle, overLay, TimeComponent} from '../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../data'
import { HeroOneBussinessFavoriteImageSpinner } from '../../SharedAsset/Spinners/Spinner'

const ImageComponent = ({Posts, canOpen, isFetching}) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const reversPost = []
  
  for (let i =  Posts?.length -1; i > 0; i-- ) {

      if (canOpen) {

        reversPost.push(Posts[i])
      }
  }

  const handleNext = () => {

    if(end < 12 && start < 6) {

      setEnd(() => end + 1)
      setStart(() => start + 1)
    } else {

      setEnd(() => 6)
      setStart(() => 0)
    }
  }

  const handleBackward = () => {

    if(start === 0 && end === 6) {

      setEnd(() => 12)
      setStart(() => 6)
    } else {

      setEnd(() => end - 1)
      setStart(() => start - 1)
    }
  }

  
  return (
    <section className={`mb-7 mt-10 ${isFecthingStyle(isFetching)} relative isolate`}>
      
      <div className="overflowScroll overflow-x-auto scroll-px-0 overscroll-x-contain snap-mandatory overflow-y-hidden">

        {canOpen ?

          <ul className="grid grid-flow-col">
           
            {reversPost?.slice(start, end)?.map((post) => {

              return (
                <li key={post?._id} className={`relative snap-start m-0 mr-0.5 last:mr-0 p-0 group overflow-clip max-h-80 min-w-[300px]`}>

                  <Link to={`/single/${post?._id}`} className={overLay()}>
                    <img src={publicFolder + post?.postImage} alt="IndexImage"  className="scale-100 group-hover:scale-110 Imagetransition max-h-80 min-w-[300px]" loading="lazy"/>         
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

      <HomePageSlideNextAndPreviousButton2
        isSuccess={canOpen}
        handleBackward={handleBackward}
        handleNext={handleNext}
      />
    </section>
  )
}

export default ImageComponent
