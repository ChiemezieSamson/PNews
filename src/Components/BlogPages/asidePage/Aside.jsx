import React from 'react'
import { NewsLetter, PagesDivider, PostTitleMedium2, SocialLinks, TimeComponent } from '../../SharedAsset/SharedAssets'
import TrendingCommentsLatest from '../IndexPageComponents/IndexPageComponentAsideComponent.jsx/TrendingCommentsLatest'
import { JustTimeComponet } from '../IndexPageComponents/SharedComponents'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'


const Aside = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content

  return (
    <section>
      <div className='mb-5'>
        <PagesDivider text={"Stay Connected"} />
      </div>
     
      <SocialLinks />

      <NewsLetter />

      {action &&  <TrendingCommentsLatest posts={Posts}/>}

      <div className='my-10'>
        <PagesDivider text={"Recent Posts"} />
        <span className='my-3 inline-block'>
          <div className='text-white relative after:inset-0 after:bg-black/40 after:absolute mt-4 mb-7'>
            <div className='w-full h-44 imgxs:h-[240px] md:h-36 lg:h-48'>
              {action ? 
              <img src={Posts[2].postImage} alt="recentPost" className="w-full relative h-full object-cover cursor-pointer" loading="lazy"/> :
              content}  
            </div>
            

            <div className="absolute bottom-[10%] inset-x-0 flex content-center  justify-center z-20">
              <div className="w-[90%] text-left">
                {action && <PostTitleMedium2 post={Posts[2].postTitle} postId={Posts[2]._id}/>}
                
                {action && <TimeComponent time={Posts[2].createdAt}/>}
              </div>
            </div>
          </div>
          {action && <JustTimeComponet Posts={Posts.slice(4,8)} />}
        </span> 
      </div>
    </section>
  )
}

export default Aside
