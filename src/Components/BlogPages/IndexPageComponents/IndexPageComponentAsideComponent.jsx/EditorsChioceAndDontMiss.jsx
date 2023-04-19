import { JustTimeComponet, JustTimeComponetStar} from '../SharedComponents'
import { MainDivider } from '../../../SharedAsset/SharedAssets'
import TrendingCommentsLatest from './TrendingCommentsLatest'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../../../../Reduxstore/Slices/posts/PostsSlice'

const EditorsChioceAndDontMiss = () => {
  const Posts = useSelector(selectAllPosts)
 
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
