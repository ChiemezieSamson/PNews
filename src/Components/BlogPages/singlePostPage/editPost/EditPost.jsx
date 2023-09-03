import { ContentState,convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import UpdatePostComponent from './EditPostComponents/UpdatePostComponent';
import { useFetchedPostById } from '../../../SharedAsset/Spinners/postsSpinner';
import Spinner from '../../../SharedAsset/Spinners/Spinner';

const EditPost = () => {
  const {singlePost , postAction, postId, isFetching} = useFetchedPostById()
  const post = singlePost
  let state
 
  if (postAction) {

    let html = draftToHtml(JSON.parse(post?.postContent));
    const blocksFromHTML = convertFromHTML(html);

    state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );}
  
  return (
    <div className='my-32'>

    {postAction ? 

      <UpdatePostComponent 
        post={post} 
        state={state} 
        postId={postId}
        isFetching={isFetching}
        postAction={postAction}
      /> 

      : 

      <Spinner  
        text={'Loading...'}
        size={"w-24 h-24"}
      />      
    }
    </div>   
  )
}

export default EditPost
