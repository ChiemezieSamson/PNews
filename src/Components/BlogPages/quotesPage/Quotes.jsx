import React from "react";
import { useSelector } from "react-redux";
import { GeneralCategorisePages } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";


const Quotes = () => {
  const Posts = useSelector(state => state.posts)
  return (
    <GeneralCategorisePages 
    ThreeFirstPost={Posts.slice(6, 10)} 
    DriectionName={"Books"} 
    PagePost={Posts.slice(2, 12)}/>
  )
}

export default Quotes