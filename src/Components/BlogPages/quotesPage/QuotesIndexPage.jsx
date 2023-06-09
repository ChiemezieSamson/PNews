import React from "react";
import { GeneralCategorisePages as QuotesPage } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { useFetchedPosts } from "../../SharedAsset/Spinners/postsSpinner";
import useFetchedUsers from "../../SharedAsset/Spinners/userSpinner";
import useFetchedComments from "../../SharedAsset/Spinners/commentSpinner";


const QuotesIndexPage = () => {
  const {content, action} = useFetchedPosts()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)
  return (
    <div>
      {canOpen &&
        <QuotesPage 
          users={users}
          Comments={Comments}
          ThreeFirstPost={Posts.slice(6, 10)} 
          PagePost={Posts.slice(2, 12)}/>
          }
    </div>    
  )
}

export default QuotesIndexPage