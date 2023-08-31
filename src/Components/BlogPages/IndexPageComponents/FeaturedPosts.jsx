import React from 'react'
import { JustTimeComponetStar } from './SharedComponents';
import { AdminComponentColor, CategoriesComponentBotton, isFecthingStyle, MainDivider, PostsShortInfoComponent, PostTitleMedium2, TimeComponentColor } from '../../SharedAsset/SharedAssets';
import { ReadmoreButton, StarComponent } from '../../ButtonAndOthers/Buttons';
import { publicFolder } from '../../../data';
import { Link } from 'react-router-dom';
import useParentcategories from './useParentcategories/UseParentcategories';
import { HomeFeaturedArroundSpinner } from '../../SharedAsset/Spinners/Spinner';


const FeaturedPosts = ({Posts, users, canOpen, categories, isFetching}) => {
  const parent = "random"
  
  const {allPost} = useParentcategories(parent, categories, Posts, canOpen)
  
  return (
    <section className="mt-3.5">

      {/* featured posts divider start here */}
      <MainDivider firstletter={"Featured"} secondletter={"Posts"}/>

      <div className={`md:grid md:grid-cols-2 mt-5 ${isFecthingStyle(isFetching)}`}>
        
        {/* featured posts first image and content start here */}
        {canOpen ?
          <div className="text-stone-800 md:mr-[2%]">
            <div className="relative mt-1.5 mb-2 topRetangleImage">

              <Link to={`/single/${allPost[0]?._id}`}>
                <img src={publicFolder + allPost[0]?.postImage} alt={"game"} className="topRetangleImage" loading="lazy"/>
              </Link>

              <CategoriesComponentBotton cat={allPost[0]?.postCategory[0]} />
            </div>

            <PostTitleMedium2 post={allPost[0]?.postTitle} postId={allPost[0]?._id}/>

            <span className="mt-2 mb-2 inline-block">

              {allPost[0]?.optional?.favourite === false ? "" : 
                <span className='mr-4 inline-block'>
                  <StarComponent color={"text-[#f7c90d]"} favourite={allPost[0]?.optional?.favourite}/>  
                </span>
              }

              <span className='mr-4 inline-block'>
                <AdminComponentColor user={allPost[0]?.postAuthor} users={users}/>
              </span>

              <TimeComponentColor time={allPost[0]?.createdAt}/>
            </span>

            <PostsShortInfoComponent post={allPost[0]?.postContent} />
            <ReadmoreButton postId={allPost[0]?._id}/>   
          </div>
          :
          <HomeFeaturedArroundSpinner
            groupStyle={"text-stone-800 md:mr-[2%]"}
            imageStyle={"mt-1.5 mb-2 topRetangleImage"}
            num={1}
          />
        }

        {/* featured posts other post start here */}
        <div className='my-4 md:mt-1.5 md:ml-[2%]'>
          <JustTimeComponetStar 
            Posts={canOpen && allPost?.slice(1, 5)}
            action={canOpen}
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts
