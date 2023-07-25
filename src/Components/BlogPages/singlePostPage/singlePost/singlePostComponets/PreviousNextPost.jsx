import { CategoriesComponentBotton, PagesDivider, PostTitleMedium, PostTitleSmall, SocialMediaLinks, TimeComponentColor } from '../../../../SharedAsset/SharedAssets'
import { publicFolder } from '../../../../../data'
import { Link } from 'react-router-dom'
import { useGetPostsByQueryQuery } from '../../../../../Reduxstore/Slices/posts/PostsSlice'
import { SkeletonTextFour } from '../../../../SharedAsset/Spinners/Spinner'


const PreviousNextPost = ({post, User, useraction, size, postAction}) => {
  const {data: posts = [], isFetching, isSuccess} = useGetPostsByQueryQuery(`?category=${postAction && (post?.postCategory[0])}`)
 
  const Posts = posts.posts

  let Id 
  let SimilarPost
  let start
  let end

  if(isSuccess) {
    Id = Posts?.findIndex(obj => obj?._id === post?._id)
    SimilarPost = Posts?.filter(obj => obj?._id !== post?._id)
    start = Id + 6 > SimilarPost?.length ? 0 : Id
    end = Id + 6 > SimilarPost?.length ? 6 : Id + 6      
  }

  return (
    <div className='p-2 disabled:opacity-40' disabled={isFetching}>

      {/* previous and next post button */}
      <div className='border-y border-solid border-neutral-200 mb-[30px] py-5 mt-3 text-center sm:text-left grid grid-cols-2'>
        
        {/* previous post button */}
        <Link to={`/single/${isSuccess && (Posts[Id - 1 < 0 ? (Posts?.length - 1) : Id - 1]?._id)}`} className='group'>
          <span className='text-neutral-400 font-bold'>
            Previous Post
          </span>

          
          <h3 className='border-l-[10px] font-round border-solid border-neutral-200 mt-2.5 mb-2.5 pl-3 text-stone-800
            font-bold TextHeadertransition group-hover:border-[#f70d28] cursor-pointer hidden sm:block'>               
            {isSuccess ? 
              Posts[Id - 1 < 0 ? (Posts?.length - 1) : Id - 1]?.postTitle 
            : 
              <div className='skeleton h-3 w-80 inline-block'></div>
            }             
          </h3>
        </Link>

        {/* next post button */}
        <Link to={`/single/${isSuccess && (Posts[Id + 1 > (Posts?.length - 1) ? 0 : Id + 1]?._id)}`} className='group'>
          <span className='text-neutral-400 font-bold'>
            Next Post
          </span>

          <h3 className='border-l-[10px] font-round border-solid border-neutral-200 mt-2.5 mb-2.5 pl-3 text-stone-800
            font-bold TextHeadertransition group-hover:border-[#f70d28] cursor-pointer hidden sm:block'>          
            {isSuccess ?
              Posts[Id + 1 > Posts?.length -1 ? 0 : Id + 1]?.postTitle
              : 
              <div className='skeleton h-3 w-80 inline-block'></div>
            }                             
          </h3>
        </Link>
      </div>

      {/* user Bio and info */}
      <section className='lg:grid-cols-6 lg:grid p-7 mb-7 border border-solid border-neutral-200 font-poppins text-center sm:text-left rounded-sm'>
        <span className='w-[80px] h-20 block rounded-full align-bottom mr-2 col-span-1 border border-solid border-neutral-200'>
          {useraction ? 
            <img loading='lazy' src={publicFolder + User?.profileImage} alt="AdminImage" className='rounded-full cursor-pointer'/>
            :
            <div className='skeleton rounded-full w-[80px] h-20'></div>
          }
        </span>

        <div className='col-span-5'>
          <Link to={`/categories?user=${useraction && (User?._id)}`} className='mb-2.5 inline-block text-lg font-bold'>
            {useraction ?
              <span className='text-[#f70d28] cursor-pointer capitalize'>{User?.username}</span>
              :
              <div className='w-60 h-4 skeleton rounded-sm inline-block'></div>
            }
          </Link>

          <div className='text-stone-700 font-josefin leading-5 mb-4'>
            {useraction ?
             <p>{User?.bio}</p> 
              :
              <SkeletonTextFour />
            }
          </div>

          <SocialMediaLinks 
            socialLinks={useraction && (User?.socialLinks)}
          />
        </div>
      </section>
       
      <div className= "mb-5">
        <PagesDivider text={"Similar News"} />
      </div>

      <ul className="mb-2 pt-1.5 min-w-[200px] gap-[2%] md:grid md:grid-cols-3">

        {/* featured posts other post start here */}
        {isSuccess && SimilarPost?.slice(start , end)?.map((post) => {
          return (
            <li key={post?._id} className="mb-7 last:mb-0 md:mb-0">
              
              <div className="mb-1 topRetangleImage relative">             
                <Link to={`/single/${post?._id}`}>
                  <img src={publicFolder + post?.postImage} alt={"posts"} className="topRetangleImage" loading="lazy"/>
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
    </div>
  )
}

export default PreviousNextPost
