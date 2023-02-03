import React from 'react'
import { JustTimeComponet } from './SharedComponents';
import { Posts } from '../../../data';
import { AdminComponentColor, CategoriesComponentBotton, MainDivider, PostsShortInfoComponent, PostTitleMedium2, TimeComponentColor } from '../../ButtonAndOthers/SharedAssets';
import { ReadmoreButton, StarComponent } from '../../ButtonAndOthers/Buttons';


const FeaturedPosts = () => {

  return (
    <section className="mt-3.5">

      {/* featured posts divider start here */}

      <MainDivider firstletter={"Featured"} secondletter={"Posts"}/>

      <div className="md:grid md:grid-cols-2 mt-5">
        
      {/* featured posts first image and content start here */}

        <div className="text-black md:mr-[3%]">
          <div className="relative mt-1.5 mb-4">
            <img src={Posts[11].image} alt={"game"} className="w-full h-44 imgxs:h-[240px] object-cover cursor-pointer md:h-36 lg:h-48" loading="lazy"/>
            <CategoriesComponentBotton cat={Posts[11].cat} />
          </div>

          <PostTitleMedium2 post={Posts[11].title} />

          <span className="mt-2 mb-4 inline-block">
            <span className='mr-4 inline-block'>
              <StarComponent color={"text-[#f7c90d]"} />  
            </span>
            <span className='mr-4 inline-block'>
              <AdminComponentColor />
            </span>
            <TimeComponentColor time={Posts[11].date}/>
          </span>
          <PostsShortInfoComponent post={Posts[11].content} />
          <ReadmoreButton />   
        </div>

        {/* featured posts other post start here */}
        <div className='pb-7 pt-1.5 md:ml-[3%]'>
          <JustTimeComponet Posts={Posts.slice(5, 9)} />
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts
