import React from 'react'
import { NewsLetter, PagesDivider, PostTitleMedium2, SocialLinks, TimeComponent, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import TrendingCommentsLatest from '../IndexPageComponents/IndexPageComponentAsideComponent.jsx/TrendingCommentsLatest'
import { JustTimeComponetStar } from '../IndexPageComponents/SharedComponents'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import { StarComponent } from '../../ButtonAndOthers/Buttons'


const Aside = ({Comments}) => {
  const {content , action, isFetching} = useFetchedPosts()
  const Posts = content

  return (
    <>
      <div className='mb-5'>
        <PagesDivider text={"Stay Connected"} />
      </div>
     
      {/* the social media component main oweren of the site */}
      <SocialLinks />

      <NewsLetter />

      <TrendingCommentsLatest 
        posts={Posts} 
        action={action} 
        Comments={Comments} 
        isFetching={isFetching}
      />


      <div className={`my-10 ${isFecthingStyle(isFetching)} `}>
        <PagesDivider text={"Recent Posts"} />

        <div className='my-3 block'>

          {action ? 
            <div className='text-white relative mt-4 mb-7'>
            
              <Link to={`/single/${Posts[2]?._id}`} className='topRetangleImage block after:absolute after:inset-0 after:bg-neutral-700/20'>                
                <img src={publicFolder + Posts[2]?.postImage} alt="recentPost" className="topRetangleImage" loading="lazy"/>
              </Link>        
              
              <span className="absolute bottom-[8%] inset-x-0 z-20 max-w-fit mx-1">
                
                <PostTitleMedium2 post={Posts[2]?.postTitle} postId={Posts[2]?._id}/>
                
                <span className='inline-block'>
                  {Posts[2]?.optional?.favourite === false ? "" : 
                    <span className='mr-4'>
                      <StarComponent color={"text-white"} favourite={Posts[2]?.optional?.favourite}/>
                    </span>}
                  <TimeComponent time={Posts[2]?.createdAt}/>
                </span>
                  
              </span>
            </div>
            : 
            <div className="skeleton rounded-sm h-screen topRetangleImage mt-4 mb-7"></div>
          }  
          
          <JustTimeComponetStar Posts={action && Posts?.slice(4,8)} action={action}/>
        </div>
      </div>
    </>
  )
}

export default Aside
