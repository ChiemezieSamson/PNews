import React from 'react'
import { JustTimeComponetCatBlockStar } from './SharedComponents'
import { MainDivider, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import PaginationFunctions from '../PaginationComponents/PaginationControl/PaginationFunctions/PaginationFunctions'

const LatestPosts = ({Posts, isFetching, canOpen, currentPage, totalPages}) => {
            
  return (
    <section className={`mt-2.5`}>

      <MainDivider firstletter={"Latest Post"} />

      <div className={`mt-3  ${isFecthingStyle(isFetching)}`}>
        
        <JustTimeComponetCatBlockStar 
          Posts={Posts} 
          grid={"imgxs:grid imgxs:grid-cols-2 gap-x-[2%]"}
          canOpen={canOpen}
        /> 
      </div>

      <div className="grid grid-flow-col justify-center w-full mt-3">
        {canOpen && 
          <PaginationFunctions 
            currentPage={currentPage}
            totalPages={totalPages}
          />
        }
      </div>
    </section>
  )
}

export default LatestPosts
