import { StarComponent } from '../../ButtonAndOthers/Buttons';
import { CategoriesComponent, isFecthingStyle, overLay, PostTitleLarge, TimeComponent, useWindowSize } from '../../SharedAsset/SharedAssets';
import { Link } from 'react-router-dom';
import { publicFolder } from '../../../data';
import TrendingPosts from './TrendingPosts';
import useParentcategories from './useParentcategories/UseParentcategories';
import { HeroOneThreeImageSpinner } from '../../SharedAsset/Spinners/Spinner';


const HeroImages = ({Posts, categories, canOpen, isFetching}) => { 
  const size = useWindowSize()

  const parent = "lifestyle"
  const parentRandom = "random"
  const parentBooks = "books"
  const parentBusiness = "business"
  
  const {allPost} = useParentcategories(parent, categories, Posts, canOpen)
  const {allPost: parentTwo} = useParentcategories(parentRandom, categories, Posts, canOpen)
  const {allPost: parentThree} = useParentcategories(parentBooks, categories, Posts, canOpen)
  const {allPost: parentLast} = useParentcategories(parentBusiness, categories, Posts, canOpen)

  parentTwo.shift()
  parentThree.shift()
  parentLast.shift()
  const displayedPost = canOpen && [parentLast[0], parentTwo[0], parentThree[0]]
  
  allPost.shift()
  return (   
    <div className="pt-5">

      {/* Trending Post Block change every 4s */}
      <TrendingPosts size={size} Posts={Posts} canOpen={canOpen}/>

      {/* Index Image block start here */}
      {canOpen ? 

        <div className={`md:grid md:grid-cols-3 my-12 text-white ${isFecthingStyle(isFetching)}`}>

          <div className={`col-span-2 HeroImageOneOverFlow group HeroImageOne`}>

            {allPost[0] && 
              <>
                <Link to={`/single/${allPost[0]?._id}`} className={overLay()}>
                  <img src={allPost[0]?.postImage ? publicFolder + allPost[0]?.postImage :  "../../../asset/images/imagebg.jpg"}  alt="Mostrecent" className="Imagetransition HeroImageOne" loading="lazy"/>
                </Link>          

                <span className="absolute lg:-top-1.5 -top-2 left-0 z-30">
                  <CategoriesComponent cat={allPost[0]?.postCategory[0]}/>
                </span>

                <span className="absolute bottom-[8%] inset-x-auto max-w-fit text-white z-30 mx-1">

                  <PostTitleLarge post={allPost[0]?.postTitle} postId={allPost[0]?._id}/>

                  {size.width > 480 &&

                    <span className="mt-2 inline-block lg:block lg:text-left">

                      <TimeComponent time={allPost[0]?.createdAt} />

                      {allPost[0]?.optional?.favourite === false ? "" : 

                        <span className='ml-4'>
                          <StarComponent color={"text-white"} favourite={allPost[0]?.optional?.favourite}/>
                        </span>
                      }     
                    </span>
                  }
                </span>
              </>
            }

          </div>


          {/* The three list image start here */}
          <div className="overflowScroll HeroImageThreeMultipleOverFlow">

            <ul className="w-[900px] md:w-full grid md:grid-rows-3 grid-cols-3 auto-cols-fr md:auto-cols-auto md:grid-cols-none HeroImageMultiple">

              {displayedPost?.map((post, index) => {

                return (                  
                  <li key={post?._id + index} className={`HeroImageMultipleListOverFlow first:mt-0 md:mt-1 group HeroImageMultipleList`}>

                    <Link to={`/single/${post?._id}`} className={overLay()}>
                      <img src={post?.postImage ? publicFolder + post?.postImage : "../../../asset/images/imagebg.jpg"} alt="IndexImage" className="Imagetransition HeroImageMultipleList aspect-video" loading="lazy"/>
                    </Link>

                    <span className='absolute lg:-top-1.5 -top-2 left-0 z-30'>
                      <CategoriesComponent cat={post?.postCategory[0]}/>
                    </span>

                    <Link to={`/single/${post?._id}`} className="absolute bottom-[10%] max-w-fit inset-x-auto text-white z-30 mx-1">

                      <h3 className="HeroImageMultipleListH3">
                        
                        <span>
                          {post?.postTitle ? post?.postTitle : ""}
                        </span>
                      </h3>

                      {size.width > 1024 && <TimeComponent time={post?.createdAt} />}
                    </Link>               
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        :
        <HeroOneThreeImageSpinner 
          groupStyle={"md:grid md:grid-cols-3 my-12"}
          oneimageStyle={"col-span-2 HeroImageOneOverFlow group HeroImageOne"}
          threecoverStyle={"overflowScroll HeroImageThreeMultipleOverFlow"}
          threeimageStyle={"HeroImageMultipleListOverFlow group HeroImageMultipleList"}
          threegroupStyle={"w-[900px] md:w-full md:gap-y-1 grid md:grid-rows-3 grid-flow-col HeroImageMultiple"}
        />
      }
    </div>
  )
}

export default HeroImages
