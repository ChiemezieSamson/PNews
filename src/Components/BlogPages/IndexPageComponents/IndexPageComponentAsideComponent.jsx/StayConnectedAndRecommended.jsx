import React from 'react'
import { Posts } from '../../../../data'
import { MainDivider, SocialLinks } from '../../../ButtonAndOthers/SharedAssets'
import { JustTimeComponet, JustTimeComponetStar } from '../SharedComponents'
import { HomeAndPigSocialLinks } from '../../../../data'

const Recommended = () => {
  
  return (
    <section className='mt-2.5'>

      <div>
        <MainDivider firstletter={"Stay Connected"} />

        <div className='pt-1'>
          <SocialLinks others={HomeAndPigSocialLinks}/>
        </div>
        
      </div>

      <div className='mt-10'>
        <MainDivider firstletter={"Recommended"}/>

        <div className='pt-4'>
          <JustTimeComponetStar Posts={Posts.slice(0, 2)}/>
          <JustTimeComponet Posts={Posts.slice(2, 3)}/>
          <JustTimeComponetStar Posts={Posts.slice(3, 4)}/>
          <JustTimeComponet Posts={Posts.slice(4, 5)}/>
        </div>
      </div>
      
    </section>
  )
}

export default Recommended
