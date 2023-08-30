import React from 'react'
import { CatSidebarHanbugar } from '../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from './SharedComponents'
import useParentcategories from './useParentcategories/UseParentcategories'

const TechPosts = ({Posts, categories, canOpen}) => {
  const parent = "books"
  
  const {allPost} = useParentcategories(parent, categories, Posts, canOpen)

  return (
    <section>
      <hr />                    

      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar 
        initial={categories}  
        parent={parent}
        canOpen={canOpen}
        blackletters={"Tech"} 
        redletters={"News"}
      />

      <div className='mt-5'>
        <JustTimeComponetStar 
          Posts={canOpen && allPost.slice(0, 6)}
          grid={"md:grid md:grid-cols-2 gap-x-[2%]"}
          action={canOpen}
        />
      </div>      
    </section>
  )
}

export default TechPosts
