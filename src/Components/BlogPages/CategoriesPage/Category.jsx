import React from 'react'
import { GeneralCategorisePages } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'
import { useParams } from 'react-router-dom'

const Category = () => {
  const { clicked } = useParams()
  const {content , action} = useFetchedPosts()
  const Posts = content

  console.log(clicked);
  return (
    <>
      {action && <GeneralCategorisePages ThreeFirstPost={Posts.slice(5, 11)} DriectionName={"LifeStyle"} PagePost={Posts.slice(3, 13)}/>}
    </>
  )
}

export default Category
