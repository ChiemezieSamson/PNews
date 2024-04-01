import { JustTimeComponetStar } from '../SharedComponents'
import { MainDivider, isFecthingStyle } from '../../../SharedAsset/SharedAssets'
import TrendingCommentsLatest from './TrendingCommentsLatest'


const EditorsChioceAndDontMiss = ({Posts, Comments, canOpen, isFetching}) => {
  const editorsChioce = canOpen && Posts?.filter(post => post?.optional?.favourite === true)
  
  let newPosts 

  if (canOpen) {

    newPosts = [...Posts?.sort(() => Math.random() - 0.5)]
  }

  canOpen && newPosts?.sort((a, b) => {

    const A = a.optional?.viewed
    
    const B = b.optional?.viewed

    return B - A; // Sort in descending order
  });

  return (
    <>    

      <TrendingCommentsLatest 
        posts={Posts} 
        Comments={Comments}
        action={canOpen}
        isFetching={isFetching}
      />

      <div className='mt-7 mb-12'>

        <MainDivider firstletter={"Editor's"} secondletter={"choice"} />

        <div className={`mt-4 ${isFecthingStyle(isFetching)}`}>

          <JustTimeComponetStar 
            Posts={canOpen && editorsChioce?.slice(0, 4)} 
            action={canOpen}
          />
        </div>
        
      </div>

      <>

        <MainDivider firstletter={"Don't"} secondletter={"Miss"} />

        <div className={`mt-4 ${isFecthingStyle(isFetching)}`}>

          <JustTimeComponetStar 
            Posts={canOpen && newPosts?.slice(0, 4)} 
            action={canOpen}
          />
        </div>
      </>
    </>
  )
}

export default EditorsChioceAndDontMiss
