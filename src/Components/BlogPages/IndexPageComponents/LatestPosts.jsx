import React from 'react'
import { JustTimeComponetCatBlockStar } from './SharedComponents'
import { MainDivider } from '../../SharedAsset/SharedAssets'

const LatestPosts = ({Posts}) => {
  
  return (
    <section className='mt-2.5'>
      <MainDivider firstletter={"Latest Post"} />

      <div className='mt-3'>
       
        <JustTimeComponetCatBlockStar 
          Posts={Posts.slice(0, 10)} 
          grid={"imgxs:grid imgxs:grid-cols-2 gap-x-[2%]"}/>

      </div>
    </section>
  )
}

export default LatestPosts
