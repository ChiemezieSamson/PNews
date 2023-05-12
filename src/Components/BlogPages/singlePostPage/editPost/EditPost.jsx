import { ContentState,convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import UpdatePostComponent from './EditPostComponents/UpdatePostComponent';
import { useFetchedPostById } from '../../../SharedAsset/Spinners/postsSpinner';

const EditPost = () => {
  const {singlePost , postAction, postId} = useFetchedPostById()
  const post = singlePost
  let state
 
  if (postAction) {
  let html = draftToHtml(JSON.parse(post.postContent));
  const blocksFromHTML = convertFromHTML(html);
    state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );}
  
  return (
    <>
    {
      postAction ? <UpdatePostComponent post={post} state={state} postId={postId}/> : singlePost
    }
    </>   
  )
}

export default EditPost
