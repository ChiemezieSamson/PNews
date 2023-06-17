import React from 'react'
import StickyBox from "react-sticky-box";
import Aside from '../../asidePage/Aside';
import { NavDirectionAndPageName } from '../../../SharedAsset/SharedAssets';
import { PagesBlogPostComponent } from '../../IndexPageComponents/SharedComponents';
import useFetchedUsers from '../../../SharedAsset/Spinners/userSpinner';
import useFetchedComments from '../../../SharedAsset/Spinners/commentSpinner';
import { useFetchedPostByQery } from '../../../SharedAsset/Spinners/postsSpinner';

const CategorySearchpagination = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByQery()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <>
      {canOpen &&
        <div className='grid grid-flow-row md:grid-cols-3 disabled:opacity-40' disabled={isFetching}>

          <aside className="md:col-span-1 mt-8 md:mr-[3%] order-last md:order-first">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <Aside Comments={Comments}/>
            </StickyBox>
          </aside>

          <div className="md:col-span-2 md:ml-[3%]">
            <NavDirectionAndPageName />
          
            <PagesBlogPostComponent 
              users={users}
              Comments={Comments}
              Posts={Posts.slice(0, 10)}
              currentPage={currentPage}
              totalPages={totalPages}
              />
          </div>
        </div>
      }
    </>
  )
}

export default CategorySearchpagination
