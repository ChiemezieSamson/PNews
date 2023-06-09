import React from 'react'
import { GeneralCategorisePages } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import { useFetchedPostByQery } from '../../SharedAsset/Spinners/postsSpinner'
import useFetchedUsers from '../../SharedAsset/Spinners/userSpinner'
import useFetchedComments from '../../SharedAsset/Spinners/commentSpinner'

const Category = () => {
  const {content , action, isFetching} = useFetchedPostByQery()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <>{canOpen && 
      <div className="m-0 p-0 disabled:opacity-40" disabled={isFetching}>        
        <GeneralCategorisePages 
          users={users}
          Comments={Comments}
          ThreeFirstPost={Posts.slice(0, 4)}  
          PagePost={Posts.slice(4, 13)}/>
      </div>}
    </>
  )
}

export default Category
