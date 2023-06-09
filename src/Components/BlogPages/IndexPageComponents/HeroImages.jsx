import React from 'react'
import { StarComponent } from '../../ButtonAndOthers/Buttons';
import { CategoriesComponent, overLay, PostTitleLarge, TimeComponent, useWindowSize } from '../../SharedAsset/SharedAssets';
import { Link } from 'react-router-dom';
import { publicFolder } from '../../../data';
import TrendingPosts from './TrendingPosts';


const HeroImages = ({Posts}) => { 
  const size = useWindowSize()


  return (   
    <div className="pt-5">

      {/* Trending Post Block change every 4s */}

      <TrendingPosts size={size} Posts={Posts}/>

      {/* Index Image block start here */}

      <div className="md:grid md:grid-cols-3 my-12 text-white">
        {/* First Big Image */}

        <div className={`col-span-2 HeroImageOneOverFlow group HeroImageOne`}>

          <Link to={`/single/${Posts[4]._id}`} className={overLay()}>

            <img src={publicFolder + Posts[4].postImage} 
              alt="Mostrecent" 
              className="Imagetransition HeroImageOne"
              loading="lazy"/>
          </Link>          

          <span className="absolute lg:-top-1.5 -top-2 left-0 z-30">
            <CategoriesComponent cat={Posts[4].postCategory[0]}/>
          </span>

          <span className="absolute bottom-[8%] inset-x-auto max-w-fit text-white z-30 mx-1">
            <PostTitleLarge post={Posts[4].postTitle} postId={Posts[4]._id}/>

            {size.width > 480 &&
              <span className="mt-2 inline-block lg:block lg:text-left">

                {Posts[4].optional.Trending === false ? "" : <span className='mr-4'>
                  <StarComponent color={"text-white"} favourite={Posts[4].optional.Trending}/>
                </span>}     

                <TimeComponent time={Posts[4].createdAt} />
              </span>
            }
          </span>
        </div>

        {/* The three list image start here */}
        <div className="overflowScroll HeroImageThreeMultipleOverFlow">

          <ul className="w-[900px] md:w-full grid md:grid-rows-3 grid-flow-col HeroImageMultiple">

            {Posts.slice(1,4).map((post) => {
              return (
                
                <li key={post._id} className={`HeroImageMultipleListOverFlow first:mt-0 md:mt-1 group HeroImageMultipleList`}>

                  <Link to={`/single/${post._id}`} className={overLay()}>
                    <img src={publicFolder + post.postImage} alt="IndexImage"  
                      className="Imagetransition HeroImageMultipleList" 
                      loading="lazy"/>
                  </Link>

                  <span className='absolute lg:-top-1.5 -top-2 left-0 z-30'>
                    <CategoriesComponent cat={post.postCategory[0]}/>
                  </span>

                  <Link to={`/single/${post._id}`} className="absolute bottom-[10%] max-w-fit inset-x-auto text-white z-30 mx-1">

                    <h3 className="HeroImageMultipleListH3">
                      <span>
                        {post.postTitle}
                      </span>
                    </h3>

                    {size.width > 1024 && <TimeComponent time={post.createdAt} />}
                  </Link>
               
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeroImages
