import React from 'react'
import StickyBox from "react-sticky-box";
import { NavDirectionAndPageName, PagesDivider, SocialLinks } from '../../../SharedAsset/SharedAssets';
import { JustTimeComponetCatBlockStar, JustTimeComponetStar } from '../../IndexPageComponents/SharedComponents';
// import Pagination from '../PaginationControl/Pagination';
import { useFetchedPostByPagination } from '../../../SharedAsset/Spinners/postsSpinner';
import PaginationFunctions from '../PaginationControl/PaginationFunctions/PaginationFunctions';


const PaginationPages = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByPagination();
  const Posts = content
 
  return (
    <div className='mt-7 text-left disabled:opacity-40' disabled={isFetching}> 
      <NavDirectionAndPageName/>

      <div className='md:grid md:grid-cols-3'>
        <div className='mt-8 col-span-2 md:mr-[3%] '>        
          {action && 
          <JustTimeComponetCatBlockStar 
          Posts={Posts.slice(0, 5)} 
          grid={"imgxs:grid imgxs:grid-cols-2 gap-x-4"}
          />}

          <div className='grid grid-flow-col justify-center w-full'>      
              <PaginationFunctions 
                 currentPage={currentPage}
                 totalPages={totalPages}
              />
          </div>
        </div>        

        <aside className="col-span-1 md:ml-[3%]">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <PagesDivider text={"Stay Connected"} />

            <div className='pt-3'>
              <SocialLinks />
            </div>
            
            <div className='my-10'>
              <PagesDivider text={"Recommended"} />
              <span className='mt-5 inline-block'>
                {action && <JustTimeComponetStar Posts={Posts.slice(0,5)} />}
              </span> 
            </div>
          </StickyBox>
        </aside>
      </div>


    </div>
  )
}

export default PaginationPages
