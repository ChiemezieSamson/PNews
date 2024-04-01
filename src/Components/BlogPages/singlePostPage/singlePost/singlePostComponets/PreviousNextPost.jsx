import { CategoriesComponentBotton, PagesDivider, PostTitleMedium, PostTitleSmall, TimeComponentColor, isFecthingStyle } from '../../../../SharedAsset/SharedAssets'
import { SocialMediaIcons, publicFolder } from '../../../../../data'
import { Link } from 'react-router-dom'
import { useGetPostsByQueryQuery } from '../../../../../Reduxstore/Slices/posts/PostsSlice'
import { ImageTopTitleTimeDownSpinner, SinglePostPreviousNextButtonSpinner, SkeletonTextFour } from '../../../../SharedAsset/Spinners/Spinner'
import userAvatar from "../../../../../asset/images/user-avatar.png"
import ImageBg from "./../../../../../asset/images/imagebg.jpg"


const PreviousNextPost = ({post, User, canOpen, size, onAnyIsfetching}) => {
  const {data: posts = [], isFetching, isSuccess} = useGetPostsByQueryQuery(`?category=${canOpen && (post?.postCategory[0])}`)
 
  const Posts = posts.posts

  let Id 
  let SimilarPost
  let start
  let end

  if(isSuccess && canOpen) {

    Id = Posts?.findIndex(obj => obj?._id === post?._id)
    SimilarPost = Posts?.filter(obj => obj?._id !== post?._id)
    start = Id + 6 > SimilarPost?.length ? 0 : Id
    end = Id + 6 > SimilarPost?.length ? 6 : Id + 6      
  }

  return (
    <div className="p-2">

      {/* previous and next post button */}
      <div className={`border-y border-solid border-neutral-200 mb-[30px] py-5 mt-3 text-center sm:text-left grid grid-cols-2 ${isFecthingStyle(onAnyIsfetching || isFetching)}`}>
        
        {/* previous post button */}
          {(isSuccess && canOpen) ? 

            <Link to={`/single/${Posts[Id - 1 < 0 ? (Posts?.length - 1) : Id - 1]?._id}`} className='group'>

              <span className='text-neutral-400 font-bold'>
                Previous Post
              </span>

              
              <h3 className='border-l-[10px] font-round border-solid border-neutral-200 mt-2.5 mb-2.5 pl-3 text-stone-800
                font-bold TextHeadertransition group-hover:border-[#f70d28] cursor-pointer hidden sm:block'>               
                  {Posts[Id - 1 < 0 ? (Posts?.length - 1) : Id - 1]?.postTitle?.substring(0, 47)} . . .
              </h3>
            </Link>
            : 
            <SinglePostPreviousNextButtonSpinner 
              text={"Previous Post"}
            />
          }             

        {/* next post button */}
          {(isSuccess && canOpen) ?

            <Link to={`/single/${Posts[Id + 1 > (Posts?.length - 1) ? 0 : Id + 1]?._id}`} className='group'>

              <span className='text-neutral-400 font-bold'>
                Next Post
              </span>

              <h3 className='border-l-[10px] font-round border-solid border-neutral-200 mt-2.5 mb-2.5 pl-3 text-stone-800
                font-bold TextHeadertransition group-hover:border-[#f70d28] cursor-pointer hidden sm:block'>          
                  {Posts[Id + 1 > Posts?.length -1 ? 0 : Id + 1]?.postTitle?.substring(0, 47)} . . .
              </h3>
            </Link>
            : 
            <SinglePostPreviousNextButtonSpinner 
              text={"Next Post"}
            />
          }                             
      </div>

      {/* user Bio and info */}
      <section className='lg:grid-cols-6 lg:grid lg:text-left p-7 mb-7 border border-solid border-neutral-200 font-poppins text-center sm:text-left rounded-sm'>

        <span className={`max-w-[80px] w-screen mx-auto lg:mx-0 text-center h-20 inline-block lg:block rounded-full align-bottom mr-2 col-span-1 border border-solid border-neutral-200 ${isFecthingStyle(onAnyIsfetching || isFetching)}`}>

          {canOpen ? 

            <img loading='lazy' src={User?.profileImage ? publicFolder + User?.profileImage : userAvatar} alt="AdminImage" className='rounded-full cursor-pointer max-h-20'/>
            :
            <div className='skeleton rounded-full w-[80px] h-20'></div>
          }
        </span>
          
        <div className='col-span-5'>

          <span className={isFecthingStyle(onAnyIsfetching || isFetching)}>
            <Link to={`/categories?user=${canOpen && (User?._id)}`} className='mb-2.5 inline-block text-lg font-bold'>

              {canOpen ?

                <span className='text-[#f70d28] cursor-pointer capitalize'>{User.username}</span>
                :
                <div className='w-36 h-4 skeleton rounded-sm inline-block'></div>
              }
            </Link>
          </span>

          <div className={`text-stone-700 font-josefin leading-5 mb-4 ${isFecthingStyle(onAnyIsfetching || isFetching)}`}>

            {canOpen ?

             <p>{User?.bio}</p> 
              :
              <SkeletonTextFour />
            }
          </div>

          <ul className="pt-1 list-none m-0 p-0 inline-block">

            {SocialMediaIcons?.map((icon) => {

              return (

                <li key={icon?.id} className="inline-block first:pl-0 last:pr-0 group cursor-pointer" title={icon?.name}>

                  <a href={User?.socialLinks[icon.name]} target="_blank" rel={"noreferrer"} className={`no-underline mx-1.5 text-xl ${icon?.socialLinks} leading-3 
                    group-hover:text-white TextHeadertransition inline-block relative after:absolute after:inset-0 after:z-10`}>

                    {icon?.icon}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
       
      <div className= "mb-5">

        <PagesDivider text={"Similar News"} />
      </div>
      
      <div className={isFecthingStyle(onAnyIsfetching || isFetching)}>

        {(isSuccess && canOpen) ?

          <ul className="mb-2 pt-1.5 min-w-[200px] gap-[2%] md:grid md:grid-cols-3">

            {/* featured posts other post start here */}
            {SimilarPost?.slice(start , end)?.map((post) => {

              return (

                <li key={post?._id} className="mb-7 last:mb-0 md:mb-0">
                  
                  <div className="mb-1 topRetangleImage relative">   

                    <Link to={`/single/${post?._id}`}>
                      <img src={post?.postImage ? publicFolder + post?.postImage : ImageBg} alt={"posts"} className="topRetangleImage aspect-video" loading="lazy"/>
                    </Link>

                    <CategoriesComponentBotton cat={post?.postCategory[0]} />                              
                  </div>

                  <div className="pt-1">
                    
                    { size.width > 768 ? <PostTitleSmall post={post?.postTitle} postId={post?._id}/> : <PostTitleMedium post={post?.postTitle} postId={post?._id}/>}

                    <TimeComponentColor time={post?.createdAt}/>                 
                  </div>
                </li>
              )
              })}
          </ul>
          :
          <ImageTopTitleTimeDownSpinner
            groupStyle={"mb-2 pt-1.5 min-w-[200px] gap-[2%] md:grid md:grid-cols-3"}
            listStyle={"mb-7 last:mb-0 md:mb-0"}
            imageStyle={"mb-1 topRetangleImage"}
            titleStyle={"mt-1 h-5"}
            num={6}
          /> 
        }
      </div>
    </div>
  )
}

export default PreviousNextPost
