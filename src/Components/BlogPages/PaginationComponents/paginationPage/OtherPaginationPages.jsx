import React from 'react'
import { NavDirectionAndPageName, isFecthingStyle } from '../../../SharedAsset/SharedAssets'
import { PagesBlogPostComponent } from '../../IndexPageComponents/SharedComponents'
import Aside from '../../asidePage/Aside'
import StickyBox from "react-sticky-box";
import { useFetchedPostByPaginationTwo } from '../../../SharedAsset/Spinners/postsSpinner';
import useFetchedUsers from '../../../SharedAsset/Spinners/userSpinner';
import useFetchedComments from '../../../SharedAsset/Spinners/commentSpinner';
import PaginationFunctions from '../PaginationControl/PaginationFunctions/PaginationFunctions';

const OtherPaginationPages = () => {
  const {content , action, currentPage, totalPages, isFetching} = useFetchedPostByPaginationTwo()
  const {userContent, useraction, isFetching: allUserIsFetching} = useFetchedUsers()
  const {commentsContent, commentaction, isFetching: commentIsfetching} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)
  const anyIsFetching = isFetching || allUserIsFetching || commentIsfetching

  return (
    <div>
      <div className='md:grid md:grid-cols-3 text-left'>

          <div className={`md:col-span-2 md:mr-[3%] ${isFecthingStyle(anyIsFetching)}`}>
            
            <NavDirectionAndPageName />
          
            <PagesBlogPostComponent
              users={users}
              Comments={Comments}
              Posts={Posts}
              canOpen={canOpen}
            />

            <div className='grid grid-flow-col justify-center w-full'>  

            <PaginationFunctions 
              currentPage={currentPage}
              totalPages={totalPages}
            />
            </div>
          </div>

          <aside className="md:col-span-1 mt-8 md:ml-[3%]">

            <StickyBox offsetTop={0} offsetBottom={0}>

              <Aside 
                Comments={Comments}
                commentaction={canOpen}
              />
            </StickyBox>
          </aside>
      </div>       
    </div>
  )
}

export default OtherPaginationPages
