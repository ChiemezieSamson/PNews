import React from 'react';
import { useFindThisUser } from '../../../../SharedAsset/Spinners/commentSpinner';
import MainCommentUpdate from './CommentComponents/MainCommentUpdate';
import CommentReplyCommponent from './CommentComponents/CommentReplyCommponent';
import Reply from './CommentUpdateComponents/Reply';
import { commentText, formatDate } from '../../../../SharedAsset/SharedAssets';
import { SkeletonTextFour } from '../../../../SharedAsset/Spinners/Spinner';


const Comment = ({comments, postId, byUserId, postAuthor, offsetOfForm, contentAction}) => {
  const User = useFindThisUser() // Get the user from the local storage

  return ( 
    <div className="my-2 px-4 py-2 bg-neutral-100 rounded-md">

      <span className='my-4 inline-block'>
        <h4 className='capitalize font-bold text-[27px] leading-8 inline-block font-lora align-bottom'>Comments</h4>
        <span className='inline-block px-3 py-px bg-neutral-400 mx-4 text-neutral-50 rounded-md'>{comments.length}</span>
      </span> 

      {(contentAction) ? (comments.length > 0 ) && 
      comments.map((comment) => { 
        // if the textarea content has a link add it inside a link tag funtion
        const {text} = commentText(comment.content)

        // changing the string content to html so that the any link will be displayed
        const renderHTML = (htmlString) => {        
          return { __html: htmlString };        
        };        

        // Render the data with the link as a clickable link
        const renderedData = (
           <p dangerouslySetInnerHTML={renderHTML(text)}></p>
        )                      

        return (
          <article key={comment._id} className="mb-3 relative font-round"> 
            <h3 className="font-medium capitalize font-josefin text-stone-700" name={comment.author}>
              {comment.author} 
              <small className="text-neutral-500 mt-1 prose ml-1 normal-case"> - {formatDate(comment.createdAt)}</small>
            </h3>
            
            {/* comment content */}
            <div className='tracking-wide font-poppins text-neutral-700 font-extralight first-letter:capitalize'>{renderedData}</div>
             

            <MainCommentUpdate 
              comment={comment}
              comments={comments} 
              postId={postId}
              User={User}
              byUserId={byUserId}  
              postAuthor={postAuthor}      
            />
             
            <CommentReplyCommponent 
              postId={postId} 
              User={User}
              comment={comment}
              comments={comments}
              byUserId={byUserId}  
              postAuthor={postAuthor}
              offsetOfForm={offsetOfForm}
            />

            <Reply 
              comment={comment}
              comments={comments}
              User={User}
              postId={postId}
              byUserId={byUserId}  
              postAuthor={postAuthor}
              offsetOfForm={offsetOfForm}
            />            
          </article>
        )
      } ) :
        <>
          <SkeletonTextFour />
          <br />
          <SkeletonTextFour />
        </>
      }
    </div>     
  );
};


export default Comment