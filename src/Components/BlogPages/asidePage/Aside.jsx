import React from 'react'
import { NewsLetter, PagesDivider, PostTitleMedium2, SocialLinks, TimeComponent, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import TrendingCommentsLatest from '../IndexPageComponents/IndexPageComponentAsideComponent.jsx/TrendingCommentsLatest'
import { JustTimeComponetStar } from '../IndexPageComponents/SharedComponents'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'
import { publicFolder } from '../../../data'
import { Link } from 'react-router-dom'
import { StarComponent } from '../../ButtonAndOthers/Buttons'


const Aside = ({Comments, commentaction}) => {
  const {content , action, isFetching} = useFetchedPosts()
  const Posts = content

  const canOpen = [action, commentaction].every(Boolean)

  return (
    <div className='text-left'>

      <div className='mb-5'>
        <PagesDivider text={"Stay Connected"} />
      </div>
     
      {/* the social media component main owner of the site */}
      <SocialLinks />

      <NewsLetter />

      <TrendingCommentsLatest 
        posts={Posts} 
        action={canOpen}
        Comments={Comments} 
        isFetching={isFetching}
      />

      <div className="my-10">
        
        <PagesDivider text={"Recent Posts"} />

        <div className={`my-3 block ${isFecthingStyle(isFetching)}`}>

          {canOpen ? 

            <div className='text-white relative mt-4 mb-7'>
            
              <Link to={`/single/${Posts[0]?._id}`} className='topRetangleImage block after:absolute after:inset-0 after:bg-neutral-700/20'>                
                <img src={Posts[0]?.postImage ? publicFolder + Posts[0]?.postImage : "../../../asset/images/imagebg.jpg"} alt="recentPost" className="topRetangleImage" loading="lazy"/>
              </Link>        
              
              <span className="absolute bottom-[8%] inset-x-0 z-20 max-w-fit mx-1">
                
                <PostTitleMedium2 post={Posts[0]?.postTitle} postId={Posts[0]?._id}/>
                
                <span className='inline-block'>

                  {Posts[0]?.optional?.favourite === false ? "" : 

                    <span className='mr-4'>
                      <StarComponent color={"text-white"} favourite={Posts[0]?.optional?.favourite}/>
                    </span>
                  }

                  <TimeComponent time={Posts[0]?.createdAt}/>
                </span>                  
              </span>
            </div>
            : 
            <div className="skeleton rounded-sm h-screen topRetangleImage mt-4 mb-7"></div>
          }  
          
          <JustTimeComponetStar Posts={canOpen && Posts?.slice(1,5)} action={canOpen}/>
        </div>
      </div>
    </div>
  )
}

export default Aside
