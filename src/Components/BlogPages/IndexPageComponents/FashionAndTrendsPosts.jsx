import React from 'react'
import { CategoriesComponentBotton, CatSidebarHanbugar, PostTitleMedium, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../../Reduxstore/Slices/posts/PostsSlice';


const FashionAndTrendsPosts = () => {
  const Posts = useSelector(selectAllPosts)
  const size = useWindowSize()

  return (
    <section className="mb-16">
      <hr />

      <CatSidebarHanbugar  
      initial={["All", "Lifestyle", "Fashion", "Food", "Travel", "Health"]}
      blackletters={"Fashion &"} 
      redletters={"Trends"}
      />


      <ul className="mb-2 pt-1.5 min-w-[200px] md:grid md:grid-cols-3">
        {/* featured posts other post start here */}
        {Posts.slice(0,3).map((post) => {
          return (
            <li key={post.id} className="md:mr-[6%] mb-7 last:mb-0 md:mb-0">

              <div className="basis-1/6 md:basis-1/3 mb-1 min-w-[90px] relative">
                <img src={post.postImage} alt={"posts"} className="w-full h-44 imgxs:h-[240px] md:h-36 lg:h-48 object-cover cursor-pointer" loading="lazy"/>
                <CategoriesComponentBotton cat={post.postCategory[0]} />
              </div>

              <div className="basis-5/6 md:basis-2/3 pt-1">
                {size.width > 768 ? <PostTitleSmall post={post.postTitle} postId={post.id}/> : <PostTitleMedium post={post.postTitle} postId={post.id}/>}
                <TimeComponentColor time={post.date}/>
              </div>
            </li>
          )
        })}
      </ul>

    </section>
  )
}

export default FashionAndTrendsPosts
