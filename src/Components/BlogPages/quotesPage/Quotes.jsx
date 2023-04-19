import React from "react";
import { useSelector } from "react-redux";
import { GeneralCategorisePages } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { selectAllPosts } from "../../../Reduxstore/Slices/posts/PostsSlice";


const Quotes = () => {
  const Posts = useSelector(selectAllPosts)
  return (
    <GeneralCategorisePages 
    ThreeFirstPost={Posts.slice(6, 10)} 
    DriectionName={"Books"} 
    PagePost={Posts.slice(2, 12)}/>
  )
}

export default Quotes