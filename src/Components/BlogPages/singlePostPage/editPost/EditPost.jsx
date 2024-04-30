import { ContentState, convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFetchedPostById } from '../../../SharedAsset/Spinners/postsSpinner';
import Spinner from '../../../SharedAsset/Spinners/Spinner';
import CreatePostComponents from '../createPost/CreatePostComponents.jsx';

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
    <div className="md:mt-20 md:mb-60">
      {postId ? <p className='text-sm text-left text-rose-500 tracking-wider font-lora mt-6'>Remember to re-update your videos</p> : "" }

      {postAction ? 

        <CreatePostComponents 
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
