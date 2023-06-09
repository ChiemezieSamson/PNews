import React from 'react'
import { NewsLetter, PagesDivider, PostTitleMedium2, SocialLinks, TimeComponent } from '../../SharedAsset/SharedAssets'
import TrendingCommentsLatest from '../IndexPageComponents/IndexPageComponentAsideComponent.jsx/TrendingCommentsLatest'
import { JustTimeComponetStar } from '../IndexPageComponents/SharedComponents'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import { StarComponent } from '../../ButtonAndOthers/Buttons'


const Aside = ({Comments}) => {
  const {content , action} = useFetchedPosts()
  const Posts = content

  return (
    <section>
      <div className='mb-5'>
        <PagesDivider text={"Stay Connected"} />
      </div>
     
      <SocialLinks />

      <NewsLetter />

      {action &&  <TrendingCommentsLatest posts={Posts} Comments={Comments}/>}

      <div className='my-10'>
        <PagesDivider text={"Recent Posts"} />

        {action ? 
        <div className='my-3 inline-block'>

          <div className='text-white relative mt-4 mb-7'>
          
            <Link to={`/single/${Posts[2]._id}`} className='topRetangleImage block after:absolute after:inset-0 after:bg-neutral-700/20'>                
              <img src={publicFolder + Posts[2].postImage} alt="recentPost" 
                className="topRetangleImage object-cover object-center cursor-pointer" loading="lazy"/>
            </Link>        
            
            <span className="absolute bottom-[8%] inset-x-0 z-20 max-w-fit mx-1">
              
              <PostTitleMedium2 post={Posts[2].postTitle} postId={Posts[2]._id}/>
              
              <span className='inline-block'>
                {Posts[2].optional.Trending === false ? "" : 
                  <span className='mr-4'>
                    <StarComponent color={"text-white"} favourite={Posts[2].optional.Trending}/>
                  </span>}
                <TimeComponent time={Posts[2].createdAt}/>
              </span>
                
            </span>
          </div>
          
          <JustTimeComponetStar Posts={Posts.slice(4,8)}/>

        </div> : content}  
      </div>
    </section>
  )
}

export default Aside
