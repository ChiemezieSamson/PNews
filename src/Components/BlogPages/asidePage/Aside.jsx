import React from 'react'
import { Posts } from '../../../data'
import { NewsLetter, PagesDivider, PostTitleMedium2, SocialLinks, TimeComponent } from '../../ButtonAndOthers/SharedAssets'
import TrendingCommentsLatest from '../IndexPageComponents/IndexPageComponentAsideComponent.jsx/TrendingCommentsLatest'
import { JustTimeComponet } from '../IndexPageComponents/SharedComponents'


const Aside = () => {
  return (
    <section>
      <div className='mb-5'>
        <PagesDivider text={"Stay Connected"} />
      </div>
     
      <SocialLinks />

      <NewsLetter />

      <TrendingCommentsLatest posts={Posts}/>

      <div className='my-10'>
        <PagesDivider text={"Recent Posts"} />
        <span className='my-3 inline-block'>
          <div className='text-white relative after:inset-0 after:bg-black/40 after:absolute mt-4 mb-7'>
            <div className='w-full h-44 imgxs:h-[240px] md:h-36 lg:h-48'>
              <img src={Posts[2].image} alt="recentPost" className="w-full relative h-full object-cover cursor-pointer" loading="lazy"/>  
            </div>
            

            <div className="absolute bottom-[10%] inset-x-0 flex content-center  justify-center z-20">
              <div className="w-[90%] text-left">
                <PostTitleMedium2 post={Posts[2].title}/>
                
                <TimeComponent time={Posts[2].date}/>
              </div>
            </div>
          </div>
          <JustTimeComponet Posts={Posts.slice(4,8)} />
        </span> 
      </div>
    </section>
  )
}

export default Aside
