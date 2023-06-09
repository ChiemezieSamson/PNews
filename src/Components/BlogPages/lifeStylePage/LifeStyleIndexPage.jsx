import React from "react";
import { GeneralCategorisePages as Lifestyle } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { useFetchedPosts } from "../../SharedAsset/Spinners/postsSpinner";
import useFetchedUsers from "../../SharedAsset/Spinners/userSpinner";
import useFetchedComments from "../../SharedAsset/Spinners/commentSpinner";


const LifeStyleIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)

  return (
    <>
      {canOpen && 
      <Lifestyle 
        users={users}
        Comments={Comments}
        ThreeFirstPost={Posts.slice(5, 9)}
        PagePost={Posts.slice(3, 13)}/> 
      }
    </>
  )
}


export default LifeStyleIndexPage