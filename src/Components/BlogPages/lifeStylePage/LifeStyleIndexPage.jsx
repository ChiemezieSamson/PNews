import React from "react";
import { GeneralCategorisePages as Lifestyle } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { useFetchedPostByPaginationTwo } from "../../SharedAsset/Spinners/postsSpinner";
import useFetchedUsers from "../../SharedAsset/Spinners/userSpinner";
import useFetchedComments from "../../SharedAsset/Spinners/commentSpinner";


const LifeStyleIndexPage = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByPaginationTwo()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <div className='disabled:opacity-40' disabled={isFetching}>
      {canOpen && 
      <Lifestyle 
        users={users}
        Comments={Comments}
        ThreeFirstPost={Posts.slice(0, 4)}
        PagePost={Posts.slice(4, 12)}
        currentPage={currentPage}
        totalPages={totalPages}
        /> 
      }
    </div>
  )
}


export default LifeStyleIndexPage