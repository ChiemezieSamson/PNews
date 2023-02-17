import React from 'react'
import { AdminComponentColor, CategoriesComponentBotton, CatSidebarHanbugar, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, TimeComponentColor, useWindowSize } from '../../SharedAsset/SharedAssets'
import { Posts } from '../../../data';
import { ReadmoreButton } from '../../ButtonAndOthers/Buttons';

const ArroundTheWorldPosts = () => {
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
            <img src={Posts[11].image} alt="game" className="w-full max-h-44 imgxs:min-h-[240px] object-cover cursor-pointer md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]" loading="lazy"/>
            <CategoriesComponentBotton cat={Posts[11].cat} />
          </div>

          <PostTitleMedium2 post={Posts[3].title} />

          <span className="mt-2 mb-4 inline-block">
            <span className='mr-4 inline-block'>
              <AdminComponentColor />
            </span>
            
            <TimeComponentColor time={Posts[3].date}/>
          </span>

          {size.width > 519 && 
          <>
            <PostsShortInfoComponent post={Posts[3].content}/>
            <ReadmoreButton />
          </>}
        </div>

        <ul className='mt-0.5 p-0 md:ml-[3%]'>
          {Posts.slice(0, 2).map((post) => {
            return (
              <li key={post.id} className="mb-3.5">
                <div className="relative mb-4">
                  <img src={post.image} alt={"game"} className="w-full h-44 imgxs:h-[240px] md:h-36 lg:h-48 xl:h-[250px] object-cover cursor-pointer" loading="lazy"/>
                  <CategoriesComponentBotton cat={post.cat} />
                </div>

                <PostTitleMedium post={post.title} />

                <span className="mt-2 mb-2 inline-block">
                  <span className='mr-4'>
                    <AdminComponentColor />
                  </span>
                  <span className='mr-4'>
                    <TimeComponentColor time={post.date}/>
                  </span>
                    <CommentComponetColor />
                </span>

                {size.width > 519 && 
                <>
                  <PostsShortInfoComponent post={post.content} />
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
