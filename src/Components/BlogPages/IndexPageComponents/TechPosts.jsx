import React from 'react'
import { useSelector } from 'react-redux'
import { CatSidebarHanbugar } from '../../SharedAsset/SharedAssets'
import { JustTimeComponet, JustTimeComponetStar} from './SharedComponents'
import { selectAllPosts } from '../../../Reduxstore/Slices/posts/PostsSlice'

const TechPosts = () => {
  const Posts = useSelector(selectAllPosts)
  return (
    <section>
      <hr />
    
    <div>
    <CatSidebarHanbugar 
        blackletters={"Tech"} 
        redletters={"News"} 
        initial={["All", "Apps", "Gadget", "Mobile", "Startup"]}
        />
    </div>

    <div className='md:grid md:grid-cols-2 mt-7'>
      <div className='md:mr-[3%]'>
        <JustTimeComponetStar Posts={Posts.slice(0, 3)}/>
      </div>
      

      <div className='md:ml-[3%]'>
       <JustTimeComponetStar Posts={Posts.slice(4,6)}/>
       <JustTimeComponet Posts={Posts.slice(6,7)} />
      </div>
    </div>
      
    </section>
  )
}

export default TechPosts
