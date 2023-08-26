import React from 'react'
import { useWindowSize } from '../../SharedAsset/SharedAssets'
import Categories from './footerComponent/Categories'
import CopyWrite from './footerComponent/CopyWrite'
import FollowUs from './footerComponent/FollowUs'
import NewsLetter from './footerComponent/NewsLetter'

const Footer = () => {
  const size = useWindowSize()
  return (
    <section className='bg-stone-800 divide-y divide-neutral-200 font-poppins px-1'>
      
      <div className={`${size.width > 820 ? "grid grid-cols-3 gap-x-[3%]" : "block "} text-left md:text-center lg:text-left `}>
        <FollowUs />
        <Categories />
        <NewsLetter />
      </div>
      
      <CopyWrite />
    </section>
  )
}

export default Footer
