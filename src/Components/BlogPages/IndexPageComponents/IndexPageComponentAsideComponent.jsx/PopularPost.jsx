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

      <div className='pt-0.5'>
        <div className="basis-1/6 md:basis-1/3 pt-2.5 my-1 min-w-[90px]">
          <img src={publicFolder + Posts[0].postImage} alt={"posts"} className="w-full h-auto object-cover cursor-pointer md:h-40 lg:h-52 xl:h-[250px]" loading="lazy"/>
        </div>

        <div className="basis-5/6 md:basis-2/3 pt-2">
          <h4 className="font-lora tracking-wide flex text-black lg:text-lg font-extrabold text-base md:text-sm">
            <Link to={`/single/${Posts[0]._id}`} className='hover:text-[#f70d28] basis-11/12 cursor-pointer'>{Posts[0].postTitle}</Link>
            <span className='inline-block  text-center basis-1/12
            w-12 text-4xl border-l px-2 border-solid border-[#eee] text-[#d7d7d7]
            top-0 italic cursor-pointer'>{`${"0" + (number - 1)}`}</span>
          </h4>

          <SharedCount />
        </div>
      </div>

      {/* just title links , share and numbers start here */}

      <section className='my-3'>
        <hr />

        <ul className='my-4'>
          {Posts.slice(1, 5).map((post) => {
            return ( 
              <li key={post._id} className='relative flex gap-4 py-1.5 titlePost'>
                <span className='titleNum text-lg leading-6 text-center italic bg-[#eee]
                  px-2 rounded-full transition-all duration-500 delay-200 grid items-center
                  ease-linear hover:bg-[#f70d28] hover:text-white h-10 cursor-pointer'>
                  {`${"0" + number++}`}
                </span>
                <h4 className="capitalize font-lora tracking-wide font-extrabold text-black lg:text-base text-sm imgxs:text-base md:text-[13px] ">
                  <Link to={`/single/${post._id}`} className='hover:text-[#f70d28] cursor-pointer'>{post.postTitle}</Link>
                  <span className='block'>
                    <SharedCount />
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
