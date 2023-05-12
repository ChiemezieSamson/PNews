import React from "react";
import { GeneralCategorisePages as Lifestyle } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { useFetchedPosts } from "../../SharedAsset/Spinners/postsSpinner";


const LifeStyleIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content

  return (
    <>
    {
      action && <Lifestyle ThreeFirstPost={Posts.slice(5, 11)} DriectionName={"LifeStyle"} PagePost={Posts.slice(3, 13)}/>
    }
    </>   
  )
}

export default LifeStyleIndexPage