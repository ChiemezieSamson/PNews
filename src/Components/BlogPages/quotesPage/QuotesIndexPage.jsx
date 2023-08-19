import React from "react";
import { GeneralCategorisePages as QuotesPage } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { useFetchedPostByPaginationTwo } from "../../SharedAsset/Spinners/postsSpinner";
import useFetchedUsers from "../../SharedAsset/Spinners/userSpinner";
import useFetchedComments from "../../SharedAsset/Spinners/commentSpinner";


const QuotesIndexPage = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByPaginationTwo()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <div className='disabled:opacity-40' disabled={isFetching}>
        <QuotesPage 
          users={users}
          Comments={Comments}
          ThreeFirstPost={canOpen && Posts?.slice(0, 4)} 
          PagePost={canOpen && Posts?.slice(4, 12)}
          currentPage={currentPage}
          totalPages={totalPages}
          canOpen={canOpen}
        />
    </div>    
  )
}

export default QuotesIndexPage