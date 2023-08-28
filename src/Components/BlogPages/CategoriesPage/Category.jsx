import React from 'react'
import { GeneralCategorisePages } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import { useFetchedPostByQery } from '../../SharedAsset/Spinners/postsSpinner'
import useFetchedUsers from '../../SharedAsset/Spinners/userSpinner'
import useFetchedComments from '../../SharedAsset/Spinners/commentSpinner'
import CategorySearchpagination from '../PaginationComponents/paginationPage/CategorySearchpagination'
import { isFecthingStyle } from '../../SharedAsset/SharedAssets'

const Category = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByQery()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (  
    <div className={`m-0 p-0 ${isFecthingStyle(isFetching)}`}>
      {currentPage > 1 ?
        <CategorySearchpagination /> 
          :
        <GeneralCategorisePages 
          canOpen={canOpen}
          users={users}
          Comments={Comments}
          commentaction={commentaction}
          ThreeFirstPost={canOpen && Posts?.slice(0, 4)}  
          PagePost={canOpen && Posts?.slice(4, 13)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      }                
    </div>    
  )
}

export default Category
