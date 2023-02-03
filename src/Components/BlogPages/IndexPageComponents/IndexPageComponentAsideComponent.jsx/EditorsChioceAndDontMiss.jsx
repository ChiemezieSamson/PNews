import { JustTimeComponet, JustTimeComponetStar} from '../SharedComponents'
import { Posts } from '../../../../data'
import { MainDivider } from '../../../ButtonAndOthers/SharedAssets'
import TrendingCommentsLatest from './TrendingCommentsLatest'

const EditorsChioceAndDontMiss = () => {
 
  return (
    <section>    

      <TrendingCommentsLatest posts={Posts}/>

      <div className='mt-7 mb-12'>
        <MainDivider firstletter={"Editor's"} secondletter={"choice"} />

        <div className='mt-4'>
          <JustTimeComponetStar Posts={Posts.slice(4, 8)} />
        </div>
        
      </div>

      <div>
        <MainDivider firstletter={"Don't"} secondletter={"Miss"} />

        <div className='mt-4'>
          <JustTimeComponet Posts={Posts.slice(9, 13)} />
        </div>
      </div>
    </section>
  )
}

export default EditorsChioceAndDontMiss
