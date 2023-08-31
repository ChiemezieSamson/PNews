import React from 'react'
import { useFetchedPostByPaginationTwo } from '../../SharedAsset/Spinners/postsSpinner'
import { SharedBlogPageStyleOne } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import { NavDirectionAndPageName } from '../../SharedAsset/SharedAssets'
import { PagesBlogPostComponent } from '../IndexPageComponents/SharedComponents'
import StickyBox from "react-sticky-box";
import Aside from '../asidePage/Aside'
import useFetchedUsers from '../../SharedAsset/Spinners/userSpinner'
import useFetchedComments from '../../SharedAsset/Spinners/commentSpinner'

const BooksIndexPage = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByPaginationTwo()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <>
      <SharedBlogPageStyleOne
        users={users} 
        Posts={canOpen && Posts?.slice(0,4)} 
        canOpen={canOpen}
        isFetching={isFetching}
      />
   

      <div className='md:grid md:grid-cols-3'>
        <div className="md:col-span-2 md:mr-[3%]">
          <NavDirectionAndPageName />
        
        
          <PagesBlogPostComponent
            users={users}
            Comments={Comments}
            Posts={canOpen && Posts?.slice(4,10)}
            currentPage={currentPage}
            totalPages={totalPages}
            canOpen={canOpen}
            isFetching={isFetching}
          />              
        </div>

        <aside className="md:col-span-1 mt-8 md:ml-[3%]">
          <StickyBox offsetTop={0} offsetBottom={0}>

            <Aside 
              Comments={Comments} 
              commentaction={commentaction}
            />
          </StickyBox>
        </aside>
      </div>       
    </>
  )
}

export default BooksIndexPage
