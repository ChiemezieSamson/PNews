import { ContentState,convertFromHTML} from 'draft-js';
import {useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import UpdatePostComponent from './EditPostComponents/UpdatePostComponent';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { postId } = useParams()
  const post = useSelector(state => state.posts.find(post => post.id === postId))
 
  
  let html = draftToHtml(post.postContent);
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  
  return (
   <UpdatePostComponent  state={state} editPost={postId}/>
  )
}

export default EditPost
