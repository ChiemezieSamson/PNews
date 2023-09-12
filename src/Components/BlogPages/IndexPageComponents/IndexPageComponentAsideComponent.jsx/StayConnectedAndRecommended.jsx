import React from 'react'
import { SocialMediaIcons } from '../../../../data'
import { MainDivider, SocialLinks, isFecthingStyle } from '../../../SharedAsset/SharedAssets'
import { JustTimeComponetStar } from '../SharedComponents'

const Recommended = ({Posts, canOpen, isFetching}) => {
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
            Posts={canOpen && Posts?.slice(0, 5)}
            action={canOpen}
          />
        </div>
      </div>
      
    </section>
  )
}

export default Recommended
