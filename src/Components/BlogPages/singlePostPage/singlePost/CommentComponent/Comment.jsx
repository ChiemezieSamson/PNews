import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LikeDislikeReply, { EditAndDeleteComment, ReplyForm } from './CommentComponents/CommentComponets';
import { createReply, deleteComment, deleteReply, selectAllComments, updateComment, updateReply } from '../../../../../Reduxstore/Slices/comments/CommentsSlice';
import { CommentReactionButtons, ReplyReactionButtons } from '../../../../ButtonAndOthers/ReactionButtons';



const Comment = () => {
  const comments = useSelector(selectAllComments)
  const [replyTo, setReplyTo] = useState("")  
  const [commentId, setCommentId] = useState("")
  const [replyId, setReplyId] = useState("")
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');


  const dispatch = useDispatch()

  // Handle getting name entered from the form component that is imported from CommentComponents/CommentComponets
  const handleSetFormAuthor = (event) => {
    setReplyAuthor(() => event.target.value)
  }

  // Handle getting content entered from the form component that is imported from CommentComponents/CommentComponets
  const handleSetFormContent = (event) => {
    setReplyContent(() => event.target.value)
  }
  
// Handle submition of the form component that is imported from CommentComponents/CommentComponets
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (replyTo !== "" && replyAuthor !== "" && replyContent !== "") {

      // Create new reply both for replies made under other users reply or made directly under main comment
      dispatch(createReply({commentId, replyTo, replyAuthor, replyContent}))

    } else if (replyId !== "" && replyAuthor !== "" && replyContent !== "") {

      // Update existing reply both for replies made under other users reply or made directly under main comment
      dispatch(updateReply({commentId, replyAuthor, replyContent, replyId}))

    }else {

      // Update just the main comment
      dispatch(updateComment({commentId, replyAuthor, replyContent}))
    }

    // Open and Close the form code block on submit
    /**
     * Checke if the Edit component was cliked, which will change the hidden css classname to block
     * if so replace if with hidden again but if not the the hidde didn't change so just toggle it back
     */
    event.target.classList.contains("block") ? 
    event.target.classList.replace("block", "hidden") :
    event.target.classList.toggle("hidden")

    // No matter what happen just change the textContent of our button back to reply and empty every already collected state
   event.target.previousSibling.lastChild.textContent = "Reply"
    setReplyTo(() => "")
    setReplyId(() => "")
    setCommentId(() => "")
    setReplyAuthor(() => "");
    setReplyContent(() => "");
  };

  // CREATE NEW REPLY by click to the main comment
  const handleCreateReplyOnComment = (e) => {

    // Open and Close the form code block when the reply button is clicked
    /**
     * Checke if the Edit component was cliked, which will change the hidden css classname to block
     * if so replace if with hidden again but if not the the hidde didn't change so just toggle it back
     */
    e.target.parentElement.nextSibling.classList.contains("block") ?
    e.target.parentElement.nextSibling.classList.replace("block", "hidden") :
    e.target.parentElement.nextSibling.classList.toggle("hidden")

    // check to see the textcontent of the button and toggle to reply or cancle accordingly
     if(e.target.textContent === "Reply") {

      e.target.textContent = "Cancle"
      setReplyTo(() => null) // just set this to null for anyone replying directly to the main comment
      setCommentId(() => e.target.parentElement.parentElement.id);
     } else {
      e.target.textContent = "Reply"
      setReplyTo(() => "")
      setReplyId(() => "")
      setCommentId(() => "")
     }

    //  No matter what once clicked empty this two because they will be set by the form once user enter info
     setReplyAuthor(() => "");
     setReplyContent(() => "");
  }

  // CREATE NEW REPLY by click to the reply of other users reply
  const handleCreateReplyOnReply = (e) => {
    // Open and Close the form code block when the reply button is clicked
    /**
     * Checke if the Edit component was cliked, which will change the hidden css classname to block
     * if so replace if with hidden again but if not the the hidde didn't change so just toggle it back
     */
    e.target.parentElement.parentElement.lastChild.classList.contains("block") ?
    e.target.parentElement.parentElement.lastChild.classList.replace("block", "hidden") :
    e.target.parentElement.parentElement.lastChild.classList.toggle("hidden")

    // check to see the textcontent of the button and toggle to reply or cancle accordingly
    if( e.target.textContent === "Reply") {
      e.target.textContent = "Cancle"       
      setReplyTo(() => e.target.parentElement.parentElement.firstChild.getAttribute("name")) // set this to the name of the user being replied to
      setCommentId(() => e.target.parentElement.parentElement.parentElement.id)
    } else {
      e.target.textContent = "Reply"
      setReplyTo(() => "")
      setReplyId(() => "")
      setCommentId(() => "")
    }

    //  No matter what once clicked empty this two because they will be set by the form once user enter info
    setReplyAuthor(() => "");
    setReplyContent(() => "");
  }

  // UPADTE EXISTING MAIN COMMENT
  const handleUpdateComment = (event) => {
    const userComment = comments.find((comment) => comment.id === event.target.parentElement.parentElement.id)

    // Open the form code block when the edit button is clicked by rplacing the hidden to block
    event.target.parentElement.previousSibling.previousSibling.classList.replace("hidden", "block")
    
   if(userComment) {
    // Set the textContent of the Button to Cancle
    event.target.parentElement.previousSibling.previousSibling.previousSibling.lastChild.textContent = "Cancle"
    setCommentId(() => event.target.parentElement.parentElement.id)
    setReplyAuthor(() => userComment.author.trim())
    setReplyContent(() => userComment.content.trim())    
   }
  
   // No matter what once clicked empty this two
   setReplyTo(() => "")
   setReplyId(() => "")
  }

// UPADTE EXISTING REPLY
  const handleUpdateReply = (event) => {
    const CommentAuthor = comments.find((comment) => comment.id === event.target.parentElement.parentElement.parentElement.id)
    const userReply = CommentAuthor.replies.find((reply) => reply.id === event.target.parentElement.parentElement.id)

    // Open the form code block when the edit button is clicked by rplacing the hidden to block
    event.target.parentElement.parentElement.lastChild.classList.replace("hidden", "block")
    
   if(userReply) {
    // Set the textContent of the Button to Cancle
    event.target.parentElement.nextSibling.lastChild.textContent = "Cancle"
    setCommentId(() => event.target.parentElement.parentElement.parentElement.id)
    setReplyAuthor(() => userReply.name.trim())
    setReplyContent(() => userReply.content.trim())
    setReplyId(() => event.target.parentElement.parentElement.id)    
   }
   
   // No matter what once clicked empty this
   setReplyTo(() => "")
  }

// DELETE EXISTING COMMENT AND ITS REPLY IF ANY
  const handleDeleteComment = (event) => {
    dispatch(deleteComment({commentId: event.target.parentElement.parentElement.id}))
  }

  // DELETE EXISTING REPLY AND ITS REPLY IF ANY
  const handleDeleteReply = (event) => {
    dispatch(deleteReply({commentId: event.target.parentElement.parentElement.parentElement.id, replyId: event.target.parentElement.parentElement.id}))
  }

  return (
    <div className="my-2 px-4 py-2 bg-gray-100 rounded-lg">
      {comments.map((comment) => {
        return (
          <div id={comment.id} key={comment.id} className="mb-3 relative">
            <div className="font-medium capitalize font-josefin" name={comment.author}>{comment.author}</div>
            <div>{comment.content}</div>
            <div className="text-sm text-gray-500 mt-1">{comment.time}</div>

            <div className='mr-6 max-w-xs py-1 mt-1'>
              <CommentReactionButtons comment={comment}/>              
              <LikeDislikeReply handler={handleCreateReplyOnComment} />
            </div> 

            <ReplyForm  handleSetReplyContent={handleSetFormContent} handleSetReplyAuthor={handleSetFormAuthor} 
            handleReplySubmit={handleFormSubmit} replyAuthor={replyAuthor} replyContent={replyContent}
            />
            
            <EditAndDeleteComment handleEdit={handleUpdateComment} handleDelete={handleDeleteComment}/>


            {comment.replies.length > 0 &&
              <details>
                <summary className='text-sm italic text-blue-500 cursor-pointer'> {comment.replies.length} replies</summary>
                {comment.replies.map((reply) => {
                  return (
                    <div id={comment.id} key={reply.id} className={`${reply.name && "bg-gray-200 rounded-lg my-2 px-4 py-2"}`}>
                      {reply.name &&
                      <div className="relative" id={reply.id}>
                        <div className="font-medium capitalize font-josefin" name={reply.name}>
                          {reply.name}
                          {reply.replyOfreply !== "" &&
                          <span className='text-blue-500 mx-3'>{reply.replyOfreply}</span>}
                        </div>
                        <div>{reply.content}</div>
                        <div className="text-sm text-gray-500 mt-1">{reply.time}</div>

                        <EditAndDeleteComment handleEdit={handleUpdateReply} handleDelete={handleDeleteReply}/> 

                        <div className='mr-6 max-w-xs justify-between py-1 mt-1'>
                          <ReplyReactionButtons reply={reply} commentId={comment.id}/>
                          <LikeDislikeReply handler={handleCreateReplyOnReply}/>
                        </div>                     

                        

                        <ReplyForm  handleSetReplyContent={handleSetFormContent} handleSetReplyAuthor={handleSetFormAuthor} 
                            handleReplySubmit={handleFormSubmit} replyAuthor={replyAuthor} replyContent={replyContent}
                            />
                      </div>  
                    } 
                    </div>                           
                  )
                })}
              </details>
            }
            
          </div>
        )
      } )}
    </div>
  );
};


export default Comment