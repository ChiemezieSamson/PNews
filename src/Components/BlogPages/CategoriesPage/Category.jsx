import React from 'react'
import { useSelector } from 'react-redux'
import { GeneralCategorisePages } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'

const Category = ({match}) => {
  const Posts = useSelector(state => state.posts)
  return (
    <GeneralCategorisePages 
    ThreeFirstPost={Posts.slice(5, 11)} 
    DriectionName={"LifeStyle"} 
    PagePost={Posts.slice(3, 13)}/>
  )
}

export default Category
