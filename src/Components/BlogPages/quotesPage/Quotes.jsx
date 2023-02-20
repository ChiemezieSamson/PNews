import React from "react";
import { Posts } from "../../../data";
import { GeneralCategorisePages } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";


const Quotes = () => {
 
  return (
    <GeneralCategorisePages 
    ThreeFirstPost={Posts.slice(6, 10)} 
    DriectionName={"Books"} 
    PagePost={Posts.slice(2, 12)}/>
  )
}

export default Quotes