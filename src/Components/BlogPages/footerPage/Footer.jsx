import React from 'react'
import { NewsLetter, useWindowSize } from '../../SharedAsset/SharedAssets'
import Categories from './footerComponent/Categories'
import CopyWrite from './footerComponent/CopyWrite'
import FollowUs from './footerComponent/FollowUs'


const Footer = () => {
  const size = useWindowSize()
  return (
    <section className='bg-stone-800 divide-y divide-neutral-200 font-poppins px-1'>
      
      <div className={`${size.width > 820 ? "grid grid-cols-3 gap-x-[3%]" : "block "} text-left md:text-center lg:text-left `}>

        <FollowUs />

        <Categories />

        <div className='mt-2'>
          <p>
            <b className='inline-block text-[#f93d53] font-bold text-lg'>NewsLetter</b>
          </p>

          <NewsLetter textColor={"text-neutral-200"}/>
        </div>
      </div>
      
      <CopyWrite />
    </section>
  )
}

export default Footer
