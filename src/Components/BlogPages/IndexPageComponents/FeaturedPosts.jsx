import React from 'react'
import { JustTimeComponetStar } from './SharedComponents';
import { AdminComponentColor, CategoriesComponentBotton, MainDivider, PostsShortInfoComponent, PostTitleMedium2, TimeComponentColor } from '../../SharedAsset/SharedAssets';
import { ReadmoreButton, StarComponent } from '../../ButtonAndOthers/Buttons';
import { publicFolder } from '../../../data';
import { Link } from 'react-router-dom';


const FeaturedPosts = ({Posts, users}) => {
  
  return (
    <section className="mt-3.5">

      {/* featured posts divider start here */}

      <MainDivider firstletter={"Featured"} secondletter={"Posts"}/>

      <div className="md:grid md:grid-cols-2 mt-5">
        
      {/* featured posts first image and content start here */}
      {/* h-44  md:h-36 lg:h-48 */}
        <div className="text-stone-800 md:mr-[2%]">
          <div className="relative mt-1.5 mb-2 topRetangleImage">

            <Link to={`/single/${Posts[11]._id}`}>
              <img src={publicFolder + Posts[11].postImage} alt={"game"} 
              className="topRetangleImage" loading="lazy"/>
            </Link>

            <CategoriesComponentBotton cat={Posts[11].postCategory[0]} />
          </div>

          <PostTitleMedium2 post={Posts[11].postTitle} postId={Posts[11]._id}/>

          <span className="mt-2 mb-2 inline-block">
            {Posts[11].optional.Trending === false ? "" : <span className='mr-4 inline-block'>
              <StarComponent color={"text-[#f7c90d]"} favourite={Posts[11].optional.Trending}/>  
            </span>}
            <span className='mr-4 inline-block'>
              <AdminComponentColor user={Posts[11].postAuthor} users={users}/>
            </span>
            <TimeComponentColor time={Posts[11].createdAt}/>
          </span>

          <PostsShortInfoComponent post={Posts[11].postContent} />
          <ReadmoreButton postId={Posts[11]._id}/>   
        </div>

        {/* featured posts other post start here */}
        <div className='my-4 md:mt-1.5 md:ml-[2%]'>
          <JustTimeComponetStar Posts={Posts.slice(5, 9)}/>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts
