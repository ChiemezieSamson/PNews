import React from 'react'
import { MainDivider, SharedCount, isFecthingStyle } from '../../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../../data'
import { PopularPostSpinner, SmallPostImageLeftTitleDateRightSpinner } from '../../../SharedAsset/Spinners/Spinner'

const PopularPost = ({Posts, canOpen, isFetching}) => {
  let number = 2
  const SharedPosts = canOpen && Posts?.filter(post => post?.optional?.socialmediashare?.facebook > 0 ||  post?.optional?.socialmediashare?.twitter > 0)

  canOpen && SharedPosts?.sort((a, b) => {

    const sumA = a.optional?.socialmediashare?.facebook + a.optional?.socialmediashare?.twitter;
    const sumB = b.optional?.socialmediashare?.facebook + b.optional?.socialmediashare?.twitter;

    return sumB - sumA; // Sort in descending order
  });

  let displayedPost 

  if(canOpen &&  SharedPosts?.length > 4) {

    displayedPost = SharedPosts?.slice(0, 5)
  } else {

    displayedPost = canOpen && Posts?.slice(0, 5)
  }

  


  return (
    
    <section className='md:my-3 mt-12'>
      <MainDivider firstletter={"Popular Post"} />

      {/* First Hero Image and link start here */}
      {canOpen ?

        <div className={`mt-3.5 ${isFecthingStyle(isFetching)}`}>

          <div className="pt-3.5 my-1 md:max-h-44 lg:max-h-52 xl:max-h-60">

            <Link to={`/single/${displayedPost[0]?._id}`}>
              <img src={publicFolder + displayedPost[0]?.postImage} alt={"posts"} className="md:max-h-44 lg:max-h-52 xl:max-h-60" loading="lazy"/>
            </Link>

          </div>

          <div className="pt-4">
            
            <h4 className="font-lora tracking-wide grid grid-cols-12 text-neutral-800 lg:text-lg font-extrabold text-base md:text-sm">

              <Link to={`/single/${displayedPost[0]?._id}`} className='hover:text-[#f70d28] col-span-11 TextHeadertransition'>{displayedPost[0]?.postTitle}</Link>

              <span className='inline-block text-center text-4xl border-l px-2 border-solid border-[#eee] text-[#d7d7d7] col-span-1
              top-0 italic cursor-pointer'>{`${"0" + (number - 1)}`}</span>
            </h4>

            <SharedCount 
              postId={displayedPost[0]?._id}
              postTitle={displayedPost[0]?.postTitle} 
              SocialSharedCount={displayedPost[0]?.optional?.socialmediashare}
              canOpen={canOpen}
            />
          </div>
        </div>
        :
        <SmallPostImageLeftTitleDateRightSpinner
          groupStyle={`mt-3.5`}
          listStyle={"pt-4"}
          imageStyle={"pt-3.5 my-1 md:max-h-44 lg:max-h-52 xl:max-h-60"}
          textStyle={"pt-2"}
          num={1}
        />
      }

      {/* just title links , share and numbers start here */}
      <section className='my-3'>
        <hr />

        {canOpen ?

          <ul className={`my-4 ${isFecthingStyle(isFetching)}`}>

            {displayedPost?.slice(1, 5)?.map((post) => {

              return ( 
                <li key={post?._id} className='relative grid grid-cols-8 gap-x-3 py-1.5 group'>

                  <span className='group-hover:text-stone-50 group-hover:bg-[#f70d28] col-span-1 text-lg leading-6 text-center italic bg-[#eee]
                    px-2 rounded-full TextHeadertransition h-10 cursor-pointer relative'>
                      <span className='absolute inset-x-0 top-[20%]'>
                        {`${"0" + number++}`}
                      </span>
                  </span>

                  <h4 className="capitalize col-span-7 font-lora tracking-wide font-extrabold text-stone-800 lg:text-base text-sm imgxs:text-base md:text-[13px]">

                    <Link to={`/single/${post?._id}`} className='hover:text-[#f70d28] cursor-pointer'>{post.postTitle}</Link>

                    <span className='block'>

                      <SharedCount 
                        postId={post?._id} 
                        postTitle={post?.postTitle} 
                        SocialSharedCount={post?.optional?.socialmediashare}
                        canOpen={canOpen}
                      />
                    </span>      

                  </h4>
                </li>          
              )
            })}
          </ul>
          :
          <PopularPostSpinner
            groupStyle={"mt-4"}
            numb={4}
          />
        }
      </section>      
    </section>
  )
}

export default PopularPost
