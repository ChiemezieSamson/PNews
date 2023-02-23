import React from 'react'
import { useWindowSize } from '../../SharedAsset/SharedAssets'
import Categories from '../footerComponent/Categories'
import CopyWrite from '../footerComponent/CopyWrite'
import FollowUs from '../footerComponent/FollowUs'
import NewsLetter from '../footerComponent/NewsLetter'

const Footer = () => {
  const size = useWindowSize()
  return (
    <section className='bg-[#212121] text-[#a8a8aa] grid grid-cols-1 divide-y divide-[#a8a8aa] '>
      <div className={`${size.width > 820 ? "grid" : "block"} text-left md:text-center lg:text-left grid-cols-3 gap-6`}>
        <FollowUs />
        <Categories />
        <NewsLetter />
      </div>
      <CopyWrite />
    </section>
  )
}

export default Footer
