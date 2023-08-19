import React from 'react'
import { NavDirectionAndPageName } from '../../../SharedAsset/SharedAssets'
import { PagesBlogPostComponent } from '../../IndexPageComponents/SharedComponents'
import Aside from '../../asidePage/Aside'
import StickyBox from "react-sticky-box";
import { useFetchedPostByQery } from '../../../SharedAsset/Spinners/postsSpinner';
import useFetchedUsers from '../../../SharedAsset/Spinners/userSpinner';
import useFetchedComments from '../../../SharedAsset/Spinners/commentSpinner';

const OtherPaginationPages = () => {
  const {content , action} = useFetchedPostByQery()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <div>
      <div className='md:grid md:grid-cols-3 text-left'>
          <div className="md:col-span-2 md:mr-[3%]">
            <NavDirectionAndPageName />
          
            <PagesBlogPostComponent
              users={users}
              Comments={Comments}
              Posts={Posts}
              canOpen={canOpen}
            />
          </div>

          <aside className="md:col-span-1 mt-8 md:ml-[3%]">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <Aside Comments={Comments}/>
            </StickyBox>
          </aside>
      </div>       
    </div>
  )
}

export default OtherPaginationPages
