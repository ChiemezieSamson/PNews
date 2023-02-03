import React from 'react'
import { ReadmoreButton, StarComponent } from '../../ButtonAndOthers/Buttons'
import { AdminComponentColor, CategoriesComponentBotton, CommentComponetColor, PostsShortInfoComponent, PostTitleMedium, PostTitleMedium2, PostTitleSmall, TimeComponentColor, useWindowSize } from '../../ButtonAndOthers/SharedAssets'


export const JustTimeComponet = ({Posts}) => {
  return (    
    <ul className="min-w-[200px]">
        {/* featured posts other post start here */}
      {Posts.map((post) => {
        return (
          <li key={post.id} className="grid imgxs:grid-cols-5 grid-cols-4 mb-6">

            <div className="col-span-1 md:col-span-2 mb-1 imgxs:min-w-[90px] mr-[3%] md:mr-[7%] lg:mr-[3%]">
              <img src={post.image} alt={"posts"} className="w-full h-auto md:h-[70px] lg:h-[85px] object-cover cursor-pointer" loading="lazy"/>
            </div>

            <div className="col-span-3 imgxs:col-span-4 md:col-span-3 ml-[3%] md:ml-[7%] lg:ml-[3%]">
              <PostTitleSmall post={post.title} />

              <TimeComponentColor time={post.date}/>
            </div>
          </li>
        )
      })}
    </ul>
  )
}


export const JustTimeComponetStar = ({Posts}) => {
  return (    
    <ul className="min-w-[200px]">
      {/* featured posts other post start here */}
      {Posts.map((post) => {
        return (
          <li key={post.id} className="grid imgxs:grid-cols-5 grid-cols-4 mb-6">

            <div className="col-span-1 md:col-span-2 mb-1 imgxs:min-w-[90px] mr-[3%] md:mr-[7%] lg:mr-[3%]">
              <img src={post.image} alt={"posts"} className="w-full md:h-[70px] lg:h-[85px] h-auto object-cover cursor-pointer" loading="lazy"/>
            </div>

            <div className="col-span-3 imgxs:col-span-4 md:col-span-3 ml-[3%] md:ml-[7%] lg:ml-[3%]">
              <PostTitleSmall post={post.title} />

              <span className='inline-block'>
                <span className='mr-4'>
                  <StarComponent color={"text-[#f7c90d]"}/>
                </span>
                  <TimeComponentColor time={post.date}/>
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}


export const JustTimeComponetCatBlock = ({Posts}) => {
  const size = useWindowSize()
  return (
    <ul className="my-2 min-w-[200px]">
        {/* featured posts other post start here */}
      {Posts.map((post) => {
        return (
          <li key={post.id} className="mb-8">

            <div className="mb-1 min-w-[90px] relative">
              <img src={post.image} alt={"posts"} className="w-full h-40 imgxs:h-32 object-cover md:min-h-[144px]  cursor-pointer lg:min-h-[192px] " loading="lazy"/>
              <CategoriesComponentBotton cat={post.cat} />
            </div>

            <div className="pt-2">
            {size.width < 768 && size.width > 480 ? <PostTitleSmall post={post.title}/> : <PostTitleMedium post={post.title} /> }

              <span className='inline-block mt-0.5'>
                <TimeComponentColor time={post.date} />
              </span>
              
            </div>
          </li>
        )
     })}
   </ul>
  )
}


export const JustTimeComponetCatBlockStar = ({Posts}) => {
  const size = useWindowSize()
  return (
    <ul className="my-2 min-w-[200px]">
        {/* featured posts other post start here */}
      {Posts.map((post) => {
        return (
          <li key={post.id} className="mb-8">

            <div className="mb-1 min-w-[90px] relative">
              <img src={post.image} alt={"posts"} className="w-full h-40 imgxs:h-32 object-cover md:min-h-[144px]  cursor-pointer lg:min-h-[192px]" loading="lazy"/>
              <CategoriesComponentBotton cat={post.cat} />
            </div>

            <div className="pt-2">
            {size.width < 768 && size.width > 480 ? <PostTitleSmall post={post.title}/> : <PostTitleMedium post={post.title} /> }

              <span className='mt-1'>
                <span className='mr-4'>
                  <StarComponent color={"text-[#f7c90d]"}/>
                </span>
                  <TimeComponentColor time={post.date} />
              </span>
              
            </div>
          </li>
        )
     })}
   </ul>
  )
}

export const PagesBlogPostComponent = ({Posts}) => {
  const size = useWindowSize()
  return (
    <ul className='mt-7 text-left'>
        {Posts.map((post) => {
          return (
          <li key={post.id} className="grid grid-cols-5 md:grid-cols-2 mt-3 pb-3">
            <div className="my-2 mr-[3%] col-span-2 md:col-span-1 h-24 imgxs:h-36 md:h-[160px] lg:h-[176px] xl:h-full">
              <img src={post.image} alt={"game"} className="w-full h-full object-cover cursor-pointer" loading="lazy"/>
            </div>

            <div className='pt-1 ml-[3%] col-span-3 md:col-span-1'>
              <PostTitleMedium2 post={post.title} />

              <span className="mb-4 inline-block">
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
            </div>
          
          </li>
          )
        })}
      </ul>
  )
}



