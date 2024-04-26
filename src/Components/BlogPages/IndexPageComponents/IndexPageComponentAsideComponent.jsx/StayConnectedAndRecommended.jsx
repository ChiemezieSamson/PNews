import React from 'react'
import { SocialMediaIcons } from '../../../../data'
import { MainDivider, SocialLinks, isFecthingStyle } from '../../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from '../SharedComponents'

const Recommended = ({Posts, canOpen, isFetching}) => {

  let newPosts 

  if (canOpen) {

    let getPosts = [...Posts]
    newPosts = getPosts
  }

  canOpen && newPosts?.sort((a, b) => {

    const A = a.optional?.shared
    
    const B = b.optional?.shared

    return B - A; // Sort in descending order
  });

  return (
    <section className='mt-2.5'>

      <>
        <MainDivider firstletter={"Stay Connected"} />

        <div className='pt-1'>
          <SocialLinks others={SocialMediaIcons}/>
        </div>        
      </>

      <div className='mt-10'>

        <MainDivider firstletter={"Recommended"}/>

        <div className={`pt-4 ${isFecthingStyle(isFetching)}`}>

          <JustTimeComponetStar 
            Posts={newPosts?.slice(5, 10)}
            action={canOpen}
          />
        </div>
      </div>
      
    </section>
  )
}

export default Recommended
