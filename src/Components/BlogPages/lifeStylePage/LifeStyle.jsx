import React from "react";
import { useSelector } from "react-redux";
import { GeneralCategorisePages as Lifestyle } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { selectAllPosts } from "../../../Reduxstore/Slices/posts/PostsSlice";


const LifeStyle = () => {
  const Posts = useSelector(selectAllPosts)
  return (
    <Lifestyle 
    ThreeFirstPost={Posts.slice(5, 11)} 
    DriectionName={"LifeStyle"} 
    PagePost={Posts.slice(3, 13)}/>
  )
}

export default LifeStyle