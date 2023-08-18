import React from 'react'
import { MainDivider, SharedCount } from '../../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'
import { publicFolder } from '../../../../data'

const PopularPost = ({Posts}) => {

let number = 2
  return (
    <section className='md:my-3 mt-12'>
      <MainDivider firstletter={"Popular Post"} />

      {/* First Hero Image and link start here */}

      <div className='mt-3.5'>

        <div className="pt-3.5 my-1 md:max-h-44 lg:max-h-52 xl:max-h-60">
          <Link to={`/single/${Posts[0]._id}`}>
            <img src={publicFolder + Posts[0].postImage} alt={"posts"} className="md:max-h-44 lg:max-h-52 xl:max-h-60" loading="lazy"/>
          </Link>
        </div>

        <div className="pt-4">
          <h4 className="font-lora tracking-wide grid grid-cols-12 text-neutral-800 lg:text-lg font-extrabold text-base md:text-sm">

            <Link to={`/single/${Posts[0]._id}`} className='hover:text-[#f70d28] col-span-11 TextHeadertransition'>{Posts[0].postTitle}</Link>
            <span className='inline-block text-center text-4xl border-l px-2 border-solid border-[#eee] text-[#d7d7d7] col-span-1
            top-0 italic cursor-pointer'>{`${"0" + (number - 1)}`}</span>
          </h4>

          <SharedCount postId={Posts[0]._id} postTitle={Posts[0].postTitle} SocialSharedCount={Posts[0].optional.socialmediashare}/>
        </div>
      </div>

      {/* just title links , share and numbers start here */}

      <section className='my-3'>
        <hr />

        <ul className='my-4'>
          {Posts.slice(1, 5).map((post) => {
            return ( 
              <li key={post._id} className='relative grid grid-cols-8 gap-x-3 py-1.5 group'>

                <span className='group-hover:text-stone-50 group-hover:bg-[#f70d28] col-span-1 text-lg leading-6 text-center italic bg-[#eee]
                  px-2 rounded-full TextHeadertransition h-10 cursor-pointer relative'>
                    <span className='absolute inset-x-0 top-[20%]'>
                      {`${"0" + number++}`}
                    </span>
                </span>

                <h4 className="capitalize col-span-7 font-lora tracking-wide font-extrabold text-stone-800 lg:text-base text-sm imgxs:text-base md:text-[13px]">
                  <Link to={`/single/${post._id}`} className='hover:text-[#f70d28] cursor-pointer'>{post.postTitle}</Link>
                  <span className='block'>
                    <SharedCount postId={post._id} postTitle={post.postTitle} SocialSharedCount={post.optional.socialmediashare}/>
                  </span>              
                </h4>
              </li>          
            )
          })}
        </ul>
      </section>
      
    </section>
  )
}

export default PopularPost
