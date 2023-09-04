import React, { useState } from 'react'
import { useDeleteExistingCommentMutation, useUpdateExistingCommentMutation } from '../../../../../../Reduxstore/Slices/comments/CommentsSlice'
import { CommentReplyForm, EditAndDeleteComment } from './CommentComponets'
import { ReactionAndReplyButton } from '../../../../../ButtonAndOthers/Buttons'

const MainCommentUpdate = ({comments, comment, postId, User, editEllipsis, postAuthor, byUserId}) => {
  //updating the comment created from the main comment form from the server   
  const [updateComment, {isLoading}] = useUpdateExistingCommentMutation()
  //deleting the comment created from the main comment form from the server
  const [deleteComment, {isLoading: deleting}] = useDeleteExistingCommentMutation()

  // Open and close the update form when editbutton is clicked
  const [EditComment, setEditComment] = useState(false)
  // Open and close the delete and edit button box when the three dot is clicked
  const [closeEditComment, setCloseEditComment] = useState(false)

  const [commentId, setCommentId] = useState("") // set the comment id
  const [replyContent, setReplyContent] = useState(''); // set the update content


  // Open and close the update form function
  const handleSetEditComment = (text) => {

    setEditComment(() => text)
  }  


  // Open and close the delete and edit button box function
  const handleSetCloseEditComment = (text) => {

    setCloseEditComment(() => text)
  }  


  // UPADTE EXISTING MAIN COMMENT
  const handleUpdateComment = (event) => {

    const commentId = event.target.id
  
    // get the comment clicked on for edit
    const userComment = comments?.find((comment) => comment?._id === commentId)
    
    if(userComment) {

      // hide the create reply component
      const createComponent = event.target.parentElement.nextSibling 
      createComponent.style.display = "none"

      setCommentId(() => commentId) // set the comment id
      setReplyContent(() => userComment?.content?.trim()) // set the comment text content

      handleSetEditComment(true)
    } else {

      setCommentId(() => "") // clear the comment id
      setReplyContent(() => "") // clear the comment text content

      handleSetEditComment(false)
    }
  }


  // DELETE EXISTING COMMENT AND ITS REPLY FROM THE SERVER IF ANY
  const handleDeleteComment = async (event) => {
    const commentId = event.target.id
    const canDelete = [commentId].every(Boolean) && !deleting

    if(canDelete) {

      try {

        await  deleteComment({commentId})
      } catch (err) {

        console.error("Failed to detele: ", err)
      }     
    }
  }


  // Handle getting content entered to the form textarea
  const handleSetFormContent = (event) => {

    setReplyContent(() => event.target.value)
  }


  const canSave = [commentId, replyContent].every(Boolean) && !isLoading


  // Handle submition of the form component
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Update just the main comment
    if(canSave) {

      try {
        const content = replyContent

        // open the create reply component
        const createComponent = event.target.parentElement.nextSibling.nextSibling.nextSibling
        createComponent.style.display = "block"

        await updateComment({commentId, content , postId})

        handleSetEditComment(false)
      } catch (err) {

        console.error("Failed to update the comment: ", err)
      }           
    }      

    setCommentId(() => "")
    setReplyContent(() => "");
  };


  const handleCancle = (event) => {
    // open the create reply component
    const createComponent = event.target.parentElement.parentElement.nextSibling.nextSibling.nextSibling
    createComponent.style.display = "block"

    setCommentId(() => "")
    setReplyContent(() => "");

    handleSetEditComment(false)
  }


  return (
    <>
      {EditComment &&
      
        <div onClick={() => setCloseEditComment(() => false)}>
          
          {/* Reaction Buttons and reply Button for main comment */}
          <ReactionAndReplyButton
            handler={handleCancle}
            comment={comment}
            User={User}
            postId={postId}
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
        
      {(comment?.onSaveId === User?.onSaveId || byUserId?._id === postAuthor) &&

        <EditAndDeleteComment 
          commentId={comment?._id}
          handleEdit={handleUpdateComment} 
          handleDelete={handleDeleteComment}
          editEllipsis={editEllipsis}
          closeEditComment={closeEditComment}
          handleSetEditComment={handleSetEditComment}
          handleSetCloseEditComment={handleSetCloseEditComment}
        />  
      }
    </>
  )
}

export default MainCommentUpdate
