import React from "react";
import { GeneralCategorisePages as QuotesPage } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { useFetchedPosts } from "../../SharedAsset/Spinners/postsSpinner";


const QuotesIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content

  return (
    <>
      {
        action &&
        <QuotesPage 
        ThreeFirstPost={Posts.slice(6, 10)} 
        DriectionName={"Books"} 
        PagePost={Posts.slice(2, 12)}/>
      }
    </>    
  )
}

export default QuotesIndexPage