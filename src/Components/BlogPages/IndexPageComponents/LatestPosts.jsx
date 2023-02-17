import React from 'react'
import { JustTimeComponetCatBlock, JustTimeComponetCatBlockStar } from './SharedComponents'
import { Posts } from '../../../data'
import { MainDivider } from '../../SharedAsset/SharedAssets'

const LatestPosts = () => {
  return (
    <section className='mt-2.5'>
      <MainDivider firstletter={"Latest Post"} />

      <div className='imgxs:grid imgxs:grid-cols-2 mt-3'>
        <div className='imgxs:mr-[3%]'>
          <JustTimeComponetCatBlockStar Posts={Posts.slice(0, 4)} />
          <JustTimeComponetCatBlock Posts={Posts.slice(4, 5)} />
        </div>
        <div className='imgxs:ml-[3%]'>
          <JustTimeComponetCatBlockStar Posts={Posts.slice(6, 8)} />
          <JustTimeComponetCatBlock Posts={Posts.slice(8, 11)} />
        </div>
      </div>
    </section>
  )
}

export default LatestPosts
