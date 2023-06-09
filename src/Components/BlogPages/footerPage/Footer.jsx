import React from 'react'
import { useWindowSize } from '../../SharedAsset/SharedAssets'
import Categories from '../footerComponent/Categories'
import CopyWrite from '../footerComponent/CopyWrite'
import FollowUs from '../footerComponent/FollowUs'
import NewsLetter from '../footerComponent/NewsLetter'

const Footer = () => {
  const size = useWindowSize()
  return (
    <section className='bg-stone-800 text-neutral-200 grid grid-cols-1 divide-y divide-neutral-200 font-poppins'>
      <div className={`${size.width > 820 ? "grid" : "block"} text-left md:text-center lg:text-left grid-cols-3 gap-[4%]`}>
        <FollowUs />
        <Categories />
        <NewsLetter />
      </div>
      <CopyWrite />
    </section>
  )
}

export default Footer
