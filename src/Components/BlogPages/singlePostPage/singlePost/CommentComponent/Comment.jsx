import React, { useState } from 'react';
import LikeDislikeReply, { EditAndDeleteComment, ReplyForm } from './CommentComponents/CommentComponets';
import { useDeleteExistingCommentMutation, useUpdateExistingCommentMutation } from '../../../../../Reduxstore/Slices/comments/CommentsSlice';
import { CommentReactionButtons, ReplyReactionButtons } from '../../../../ButtonAndOthers/ReactionButtons';
import { useFindThisUser } from '../../../../SharedAsset/Spinners/commentSpinner';
import { useCreateNewReplyMutation, useDeleteExistingReplyMutation, useUpdateExistingReplyMutation } from '../../../../../Reduxstore/Slices/replySlice/replySlice';



const Comment = ({comments, postId}) => {
  const [replyTo, setReplyTo] = useState("")  
  const [updateComment, {isLoading}] = useUpdateExistingCommentMutation()
  const [deleteComment, {isLoading: deleting}] = useDeleteExistingCommentMutation()
  const [createReply, {isLoading: replyCreating}] = useCreateNewReplyMutation()
  const [updateReply, {isLoading: replyUpdating}] = useUpdateExistingReplyMutation()
  const [deleteReply, {isLoading: replyDeleting}] = useDeleteExistingReplyMutation()
  const [commentId, setCommentId] = useState("")
  const [replyId, setReplyId] = useState("")
  const [replyContent, setReplyContent] = useState(''); 
  const User = useFindThisUser("daddygreenarrow4401@gmail.com", "nebbeolis")



  // Handle getting content entered from the form component that is imported from CommentComponents/CommentComponets
  const handleSetFormContent = (event) => {
    setReplyContent(() => event.target.value)
  }
  
// Handle submition of the form component that is imported from CommentComponents/CommentComponets
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (replyTo !== "" && User.author !== "" && replyContent !== "") {
        const canSave = [commentId, replyTo, User.author, replyContent].every(Boolean) && !replyCreating
      // Create new reply both for replies made under other users reply or made directly under main comment
      if(canSave) {
        try {
          await createReply({commentId, replyTo, author: User.author, replyContent, postId}).unwrap()
        } catch (err) {
          console.error("Failed to save the reply: ", err)
        }    
      }

    } else if (replyId !== "" && User.author !== "" && replyContent !== "") {
      const canSave = [commentId, User.author, replyContent, replyId].every(Boolean) && !replyUpdating
      // Update existing reply both for replies made under other users reply or made directly under main comment
      if(canSave) {
        try {
          await updateReply({commentId, content: replyContent, replyId, postId})
        }catch (err) {
          console.error("Failed to update the reply: ", err)
        }   
      }

    }else {
      const canSave = [commentId, replyContent].every(Boolean) && !isLoading
      // Update just the main comment
      if(canSave) {
        try {
          await updateComment({commentId, content: replyContent, postId})
        } catch (err) {
          console.error("Failed to update the comment: ", err)
        }           
      }
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
      setReplyTo(() => e.target.parentElement.parentElement.firstChild.getAttribute("name")) // just set this to null for anyone replying directly to the main comment
      setCommentId(() => e.target.parentElement.parentElement.id);
     } else {
      e.target.textContent = "Reply"
      setReplyTo(() => "")
      setReplyId(() => "")
      setCommentId(() => "")
     }

    //  No matter what once clicked empty this two because they will be set by the form once user enter info
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
    setReplyContent(() => "");
  }

  // UPADTE EXISTING MAIN COMMENT
  const handleUpdateComment = (event) => {
    const userComment = comments.find((comment) => comment._id === event.target.parentElement.parentElement.id)

    // Open the form code block when the edit button is clicked by rplacing the hidden to block
    event.target.parentElement.previousSibling.previousSibling.classList.replace("hidden", "block")
    
   if(userComment) {
    // Set the textContent of the Button to Cancle
    event.target.parentElement.previousSibling.previousSibling.previousSibling.lastChild.textContent = "Cancle"
    setCommentId(() => event.target.parentElement.parentElement.id)
    setReplyContent(() => userComment.content.trim())    
   }
  
   // No matter what once clicked empty this two
   setReplyTo(() => "")
   setReplyId(() => "")
  }

// UPADTE EXISTING REPLY
  const handleUpdateReply = (event) => {
    const CommentAuthor = comments.find((comment) => comment._id === event.target.parentElement.parentElement.parentElement.id)
    const userReply = CommentAuthor.replies.find((reply) => reply._id === event.target.parentElement.parentElement.id)

    // Open the form code block when the edit button is clicked by rplacing the hidden to block
    event.target.parentElement.parentElement.lastChild.classList.replace("hidden", "block")
    
   if(userReply) {
    // Set the textContent of the Button to Cancle
    event.target.parentElement.nextSibling.lastChild.textContent = "Cancle"
    setCommentId(() => event.target.parentElement.parentElement.parentElement.id)
    setReplyContent(() => userReply.content.trim())
    setReplyId(() => event.target.parentElement.parentElement.id)    
   }
   
   // No matter what once clicked empty this
   setReplyTo(() => "")
  }

// DELETE EXISTING COMMENT AND ITS REPLY IF ANY
  const handleDeleteComment = async (event) => {
    if(!deleting) {
     await  deleteComment({commentId: event.target.parentElement.parentElement.id})
    }
  }

  // DELETE EXISTING REPLY AND ITS REPLY IF ANY
  const handleDeleteReply = async (event) => {
    if (!replyDeleting) {
      await  deleteReply({commentId: event.target.parentElement.parentElement.parentElement.id, replyId: event.target.parentElement.parentElement.id, author: User.author, postId})
    }
  }

  return ( 
    <div className="my-2 px-4 py-2 bg-gray-100 rounded-lg">
        <span className='inline-block mb-4'>
          <h4 className='capitalize font-bold text-[27px] leading-8 inline-block align-bottom font-lora'>Comments</h4>
          <span className='inline-block px-3 bg-[#999] mx-4 text-white rounded-md'>{comments.length}</span>
        </span> 
      {comments.map((comment) => {
        return (
          <div id={comment._id} key={comment._id} className="mb-3 relative"> 
            <div className="font-medium capitalize font-josefin" name={comment.author}>{comment.author}</div>
            <div>{comment.content}</div>
            <div className="text-sm text-gray-500 mt-1">{comment.time}</div>

            <div className='mr-6 max-w-xs py-1 mt-1'>
              <CommentReactionButtons comment={comment} authorId={User ? User._id : ""} postId={postId}/>              
              <LikeDislikeReply handler={handleCreateReplyOnComment} />
            </div> 

            <ReplyForm  handleSetReplyContent={handleSetFormContent} 
            handleReplySubmit={handleFormSubmit} replyContent={replyContent}
            />
            
            <EditAndDeleteComment handleEdit={handleUpdateComment} handleDelete={handleDeleteComment}/>


            {comment.replies.length > 0 &&
              <details>
                <summary className='text-sm italic text-blue-500 cursor-pointer'> {comment.replies.length} replies</summary>
                {comment.replies.map((reply) => {
                  return (
                    <div id={comment._id} key={reply._id} className={`${reply.name && "bg-gray-200 rounded-lg my-2 px-4 py-2"}`}>
                      {reply.name &&
                      <div className="relative" id={reply._id}>
                        <div className="font-medium capitalize font-josefin" name={reply.name}>
                          {reply.name}
                          {reply.replyOfreply !== "" &&
                          <span className='text-blue-500 mx-3'>{reply.replyOfreply}</span>}
                        </div>
                        <div>{reply.content}</div>
                        <div className="text-sm text-gray-500 mt-1">{reply.time}</div>

                        <EditAndDeleteComment handleEdit={handleUpdateReply} handleDelete={handleDeleteReply}/> 

                        <div className='mr-6 max-w-xs justify-between py-1 mt-1'>
                          <ReplyReactionButtons reply={reply} commentId={comment._id} authorId={User ? User._id : ""} postId={postId}/>
                          <LikeDislikeReply handler={handleCreateReplyOnReply}/>
                        </div>                   

                        <ReplyForm  handleSetReplyContent={handleSetFormContent}  replyContent={replyContent}
                            handleReplySubmit={handleFormSubmit}  
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