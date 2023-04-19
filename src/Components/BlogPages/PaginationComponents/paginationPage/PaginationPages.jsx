import React from 'react'
import StickyBox from "react-sticky-box";
import { useSelector } from "react-redux"
import { HomeAndPigSocialLinks } from '../../../../data';
import { PagesDivider, SocialLinks } from '../../../SharedAsset/SharedAssets';
import { JustTimeComponetCatBlock, JustTimeComponetStar } from '../../IndexPageComponents/SharedComponents';
import Pagination from '../PaginationControl/Pagination';
import { selectAllPosts } from '../../../../Reduxstore/Slices/posts/PostsSlice';



const PaginationPages = () => {
  const Posts = useSelector(selectAllPosts)
 
  return (
    <div className='md:grid md:grid-cols-3 mt-7'>
      <div className="col-span-2 md:mr-[3%]">
        <PagesDivider text={"Lastest Post"} />

        <div className='imgxs:grid imgxs:grid-cols-2 mt-6'>
          <span className='imgxs:mr-[3%]'>
            <JustTimeComponetCatBlock Posts={Posts.slice(7, 13)} />
          </span>
         
          <span className='imgxs:ml-[3%]'>
            <JustTimeComponetCatBlock Posts={Posts.slice(1, 7)} />
          </span>
        </div>
        
      </div>
      <aside className="col-span-1 md:ml-[3%]">
        <StickyBox offsetTop={0} offsetBottom={0}>
          <PagesDivider text={"Stay Connected"} />

          <div className='pt-3'>
            <SocialLinks others={HomeAndPigSocialLinks}/>
          </div>
          
          <div className='my-10'>
            <PagesDivider text={"Recommended"} />
            <span className='mt-5 inline-block'>
              <JustTimeComponetStar Posts={Posts.slice(6,10)} />
            </span> 
          </div>
        </StickyBox>
      </aside>

      <Pagination />
     
    </div>
  )
}

export default PaginationPages
