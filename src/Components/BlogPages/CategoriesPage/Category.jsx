import React from 'react'
import { GeneralCategorisePages } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import { useFetchedPostByQery } from '../../SharedAsset/Spinners/postsSpinner'

const Category = () => {
  const {content , action, pathname, isFetching} = useFetchedPostByQery()
  const Posts = content
  const path = pathname.split("/")
  
  return (
    <div className="m-0 p-0 disabled:opacity-40" disabled={isFetching}>
      {action && <GeneralCategorisePages ThreeFirstPost={Posts} DriectionName={path} PagePost={Posts}/>}
    </div>
  )
}

export default Category
