import React from "react";
import { Posts } from "../../../data";
import { GeneralCategorisePages } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";


const LifeStyle = () => {
  return (
    <GeneralCategorisePages 
    ThreeFirstPost={Posts.slice(5, 11)} 
    DriectionName={"LifeStyle"} 
    PagePost={Posts.slice(3, 13)}/>
  )
}

export default LifeStyle