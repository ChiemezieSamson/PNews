import React from 'react'
import { JustTimeComponetCatBlockStar } from './SharedComponents'
import { MainDivider } from '../../SharedAsset/SharedAssets'
import { useFetchedPostByPagination } from '../../SharedAsset/Spinners/postsSpinner';

const LatestPosts = () => {
  const {content , action,  isFetching} = useFetchedPostByPagination();
  const Posts = content
  
  return (
    <section className='mt-2.5 disabled:opacity-40' disabled={isFetching}>
      <MainDivider firstletter={"Latest Post"} />

      <div className='mt-3'>
       {action ?
        <JustTimeComponetCatBlockStar 
          Posts={Posts} 
          grid={"imgxs:grid imgxs:grid-cols-2 gap-x-[2%]"}/> :
          content}
      </div>
    </section>
  )
}

export default LatestPosts
