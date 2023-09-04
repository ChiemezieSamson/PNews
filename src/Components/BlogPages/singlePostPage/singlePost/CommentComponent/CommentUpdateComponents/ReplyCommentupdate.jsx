import React, { useState } from 'react'
import { useDeleteExistingReplyMutation, useUpdateExistingReplyMutation } from '../../../../../../Reduxstore/Slices/replySlice/replySlice'
import { CommentReplyForm, EditAndDeleteComment } from '../CommentComponents/CommentComponets'
import { ReactionAndReplyButtonForReply } from '../../../../../ButtonAndOthers/Buttons'

const ReplyCommentupdate = ({comments, User, postId, reply, comment, byUserId, postAuthor}) => {
  // If the replies or any reply have been created use this to update it on the server
  const [updateReply, {isLoading: replyUpdating}] = useUpdateExistingReplyMutation()
  // use this to delete just comment reply on server
  const [deleteReply, {isLoading: replyDeleting}] = useDeleteExistingReplyMutation()

  // Open and close the update form when editbutton is clicked
  const [EditReply, setEditReply] = useState(false)
  // Open and close the delete and edit button box when the three dot is clicked
  const [closeEditComment, setCloseEditComment] = useState(false)

  const [commentId, setCommentId] = useState("") // set the comment id
  const [replyId, setReplyId] = useState("") // set the reply id
  const [replyContent, setReplyContent] = useState(''); // set the update content
  

   // Open and close the update form function
  const handleSetEditReply = (text) => {

    setEditReply(() => text)
  }  

  // Open and close the delete and edit button box function
  const handleSetCloseEditComment = (text) => {

    setCloseEditComment(() => text)
  }  


  // UPADTE EXISTING REPLY
  const handleUpdateReply = (event) => {

    const commentId = event.target.id
    const replyId = event.target.parentElement.id

    // get the comment clicked on for edit
    const CommentAuthor = comments.find((comment) => comment?._id === commentId)
    // find the reply clicked on for edit from the comment replies array
    const userReply = CommentAuthor.replies.find((reply) => reply?._id === replyId)
    
    if(userReply) {
      // hide the create reply component
      const createComponent = event.target.parentElement.nextSibling 
      createComponent.style.display = "none"
      
      setCommentId(() => commentId) // set comment id
      setReplyContent(() => userReply.content.trim()) // set reply text content
      setReplyId(() => replyId) // set reply id

      handleSetEditReply(true)
    } else {
      
      // clear all collected content
      setCommentId(() => "") 
      setReplyContent(() => "") 
      setReplyId(() => "") 

      handleSetEditReply(false)
    }   
  }


  // DELETE EXISTING REPLY AND ITS REPLY IF ANY
  const handleDeleteReply = async (event) => {
    const commentId = event.target.id
    const replyId = event.target.parentElement.parentElement.parentElement.id
    const author = User?.author

    const canDelete = [commentId, replyId, author, postId].every(Boolean) && !replyDeleting

    if (canDelete) {

      try {

        await  deleteReply({commentId, replyId, author, postId})      
      } catch (err) {

        console.error("Failed to detele: ", err)
      }    
    }
  }


  // Handle getting content entered to the form component 
  const handleSetFormContent = (event) => {
    setReplyContent(() => event.target.value)
  }
  

  const canSave = [commentId, User?.author, replyContent, replyId].every(Boolean) && !replyUpdating


  // Handle submition of the form component 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Update existing reply
    if(canSave) {

      try {
        const content = replyContent

        // open the create reply component
        const createComponent = event.target.parentElement.nextSibling.nextSibling.nextSibling
        createComponent.style.display = "block"

        await updateReply({commentId, content, replyId, postId})

        handleSetEditReply(false)
      }catch (err) {
        
        console.error("Failed to update the reply: ", err)
      }   
    }

    setReplyId(() => "")
    setCommentId(() => "")
    setReplyContent(() => "");
  };


  const handleCancle = (event) => {
    // open the create reply component
    const createComponent = event.target.parentElement.parentElement.nextSibling.nextSibling.nextSibling
    createComponent.style.display = "block"

    setCommentId(() => "") 
    setReplyContent(() => "") 
    setReplyId(() => "") 

    handleSetEditReply(false)
  }


  return (
    <>
      {EditReply &&

        <div onClick={() => setCloseEditComment(() => false)}>    

          <ReactionAndReplyButtonForReply
            handler={handleCancle}
            comment={comment}
            User={User}
            postId={postId}
            reply={reply}
            buttonText={"Cancle"}
          />                  

          <CommentReplyForm
            canSave={canSave}
            handleSetFormContent={handleSetFormContent}
            replyContent={replyContent}
            handleFormSubmit={handleFormSubmit}
            buttonText={"update"}
          />      
        </div>
      }

      {(reply?.name === User?.author || byUserId?._id === postAuthor) &&

        <EditAndDeleteComment 
          replyId={reply?._id}
          commentId={comment?._id}
          handleEdit={handleUpdateReply} 
          handleDelete={handleDeleteReply}
          closeEditComment={closeEditComment}
          handleSetEditReply={handleSetEditReply}
          handleSetCloseEditComment={handleSetCloseEditComment}
        />      
      }
    </>
  )
}

export default ReplyCommentupdate
