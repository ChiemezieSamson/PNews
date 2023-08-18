import React from 'react'
import { CatSidebarHanbugar } from '../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from './SharedComponents'

const TechPosts = ({Posts, categories}) => {

  return (
    <section>
      <hr />
    
      {/* Section title and nav categories start here */}                     

      {/* === Header title and possible categories === */}
      <CatSidebarHanbugar initial={categories}  parent={"books"}
          blackletters={"Tech"}  redletters={"News"}/>

      <div className='mt-5'>
        <JustTimeComponetStar 
          Posts={Posts.slice(0, 6)}
          grid={"md:grid md:grid-cols-2 gap-x-[2%]"}/>
      </div>      
    </section>
  )
}

export default TechPosts
