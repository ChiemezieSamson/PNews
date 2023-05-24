import React from 'react'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { ReadmoreButton } from '../../ButtonAndOthers/Buttons';
import { publicFolder } from '../../../data';

const ArroundTheWorldPosts = ({Posts}) => {
  const size = useWindowSize()
 
  return (
    <section className="mt-7">
      <hr />
      
      <CatSidebarHanbugar  initial={["All", "News", "Business", "Politics", "Science"]}
        blackletters={"Arround the"} redletters={"world"}
      />

      <div className='md:grid md:grid-cols-2 pb-7 pt-2'>
        <div className='md:row-span-3 mt-0.5 text-black md:mr-[3%]'>
          <div className="relative mb-4 mx-auto">
            <img src={publicFolder + Posts[11].postImage} alt="game" className="w-full max-h-44 imgxs:min-h-[240px] object-cover cursor-pointer md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]" loading="lazy"/>
            <CategoriesComponentBotton cat={Posts[11].postCategory[0]} />
          </div>

          <PostTitleMedium2 post={Posts[11].postTitle} postId={Posts[11]._id}/>

          <span className="mt-2 mb-4 inline-block">
            <span className='mr-4 inline-block'>
              <AdminComponentColor />
            </span>
            
            <TimeComponentColor time={Posts[11].createdAt}/>
          </span>

          {size.width > 519 && 
          <>
            <PostsShortInfoComponent post={Posts[11].postContent}/>
            <ReadmoreButton />
          </>}
        </div>

        <ul className='mt-0.5 p-0 md:ml-[3%]'>
          {Posts.slice(0, 2).map((post) => {
            return (
              <li key={post._id} className="mb-3.5">
                <div className="relative mb-4">
                  <img src={publicFolder + post.postImage} alt={"game"} className="w-full h-44 imgxs:h-[240px] md:h-36 lg:h-48 xl:h-[250px] object-cover cursor-pointer" loading="lazy"/>
                  <CategoriesComponentBotton cat={post.postCategory[0]}/>
                </div>

                <PostTitleMedium post={post.postTitle} postId={post._id}/>

                <span className="mt-2 mb-2 inline-block">
                  <span className='mr-4'>
                    <AdminComponentColor />
                  </span>
                  <span className='mr-4'>
                    <TimeComponentColor time={post.createdAt}/>
                  </span>
                    <CommentComponetColor />
                </span>

                {size.width > 519 && 
                <>
                  <PostsShortInfoComponent post={post.postContent}/>
                  <ReadmoreButton />
                </>}
              </li>
            )
          })}
        </ul>
      </div>    
    </section>
  )
}

export default ArroundTheWorldPosts
