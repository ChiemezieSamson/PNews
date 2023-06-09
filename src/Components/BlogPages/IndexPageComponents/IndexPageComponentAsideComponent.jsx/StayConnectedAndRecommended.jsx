import React from 'react'
import { SocialMediaIcons } from '../../../../data'
import { MainDivider, SocialLinks } from '../../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from '../SharedComponents'

const Recommended = ({Posts}) => {
  return (
    <section className='mt-2.5'>

      <div>
        <MainDivider firstletter={"Stay Connected"} />

        <div className='pt-1'>
          <SocialLinks others={SocialMediaIcons}/>
        </div>
        
      </div>

      <div className='mt-10'>
        <MainDivider firstletter={"Recommended"}/>

        <div className='pt-4'>
          <JustTimeComponetStar Posts={Posts.slice(0, 5)}/>
        </div>
      </div>
      
    </section>
  )
}

export default Recommended
