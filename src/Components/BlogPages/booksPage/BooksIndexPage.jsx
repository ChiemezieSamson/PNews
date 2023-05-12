import React from 'react'
import { useFetchedPosts } from '../../SharedAsset/Spinners/postsSpinner'
import { SharedBlogPageStyleOne } from '../../SharedAsset/SharedBlogPageStyle_1st_Component'
import { NavDirectionAndPageName } from '../../SharedAsset/SharedAssets'
import { PagesBlogPostComponent } from '../IndexPageComponents/SharedComponents'
import StickyBox from "react-sticky-box";
import Aside from '../asidePage/Aside'

const BooksIndexPage = () => {
  const {content , action} = useFetchedPosts()
  const Posts = content
  return (
    <div>
      {action && <SharedBlogPageStyleOne Posts={Posts}/>}

        <div className='md:grid md:grid-cols-3'>
          <div className="col-span-2 md:mr-[3%]">
            <NavDirectionAndPageName page={"Books"}/>
          
            {action && <PagesBlogPostComponent Posts={Posts.slice(0, 10)}/>}
          </div>
          <aside className="col-span-1 mt-8 md:ml-[3%]">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <Aside />
            </StickyBox>
          </aside>
        </div>       
    </div>
  )
}

export default BooksIndexPage
