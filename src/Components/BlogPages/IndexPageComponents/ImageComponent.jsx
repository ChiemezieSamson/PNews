import React from 'react'
import { Posts } from '../../../data'
import { StarComponent } from '../../ButtonAndOthers/Buttons'
import { CategoriesComponent, overLay, TimeComponent} from '../../ButtonAndOthers/SharedAssets'

const ImageComponent = () => {
  
  return (
    <section className='cursor-pointer mb-7 mt-12'>
      <div className="overflowScroll mt-2 lg:mt-0 col-span-2 overflow-x-auto scroll-px-4 overscroll-x-contain overflow-y-hidden snap-mandatory">
        <ul className="grid grid-flow-col gap-0.5">
        {Posts.slice(0, 7).map((post) => {
          return (
        <li key={post.id} className={`relative snap-start min-w-[350px] ${overLay()} m-0 p-0 group overflow-clip`}>
          <img src={post.image} alt="IndexImage"  className="h-full w-full object-cover group-hover:scale-110
                  transition-all duration-500 delay-200 ease-linear scale-100" loading="lazy"/>
          
          <div className="absolute bottom-[12%] text-white inset-x-0 flex content-center justify-center z-20 transition-all duration-500 delay-200 ease-linear translate-y-10 
               group-hover:translate-y-0">
                <div className="w-[93%] text-center">
                  <CategoriesComponent cat={post.cat} />
                  <h3 className="capitalize tracking-wide font-lora md:text-base text-lg lg:text-xl font-extrabold">
                    <span className='cursor-pointer'>
                      {post.title}
                    </span>
                  </h3>
                  <span className="mt-2 inline-block transition-all duration-500 delay-200 ease-linear translate-y-32 opacity-0 invisible cursor-pointer
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                        <span className='mr-4'>
                          <StarComponent color={"text-[#fff]"}/>
                        </span>
                          <TimeComponent time={post.date} />
                  </span>
                </div>
          </div>
        </li>
          )
        })}
        </ul>
      </div>
    </section>
  )
}

export default ImageComponent
