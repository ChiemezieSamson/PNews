import React, { useEffect, useState } from 'react'
import { useCreateNewReplyMutation } from '../../../../../../Reduxstore/Slices/replySlice/replySlice'
import { CommentReplyForm } from './CommentComponets'
import { ReactionAndReplyButton, ReactionAndReplyButtonForReply } from '../../../../../ButtonAndOthers/Buttons'

const CommentReplyCommponent = ({reply, postId, User, comment, byUserId,  offsetOfForm,
  postAuthor}) => {
  // create a new replay to a user comment on the server
  const [createReply, {isLoading: replyCreating}] = useCreateNewReplyMutation()

  const [replyTo, setReplyTo] = useState("") // get the author of the comment
  const [commentId, setCommentId] = useState("") // set the comment id 
  const [replyContent, setReplyContent] = useState(''); // set the update content
  const [openTextArea, setOpenTextArea] = useState(false); // open and close text area 

  // use open the button that will direct the new user to the form component
  const [createUserFirstButton, setCreateUserFirstButton] = useState(false)
  


  // CREATE NEW REPLY BY CLICK TO THE REPLY BUTTON ON THE MAIN COMMENT AND REPLY
  const handleCreateReplyOnComment = (e) => { 
    if (byUserId === postAuthor || User) {
      const CommentId = e.target.parentElement.id // get the comment id from the element
      const ReplyTo = e.target.parentElement.getAttribute("name") // get the author

      setOpenTextArea((change) => !change)

      // check to see the textcontent of the button and toggle to reply or cancle accordingly
      if(e.target.textContent === "Reply") {
        e.target.textContent = "Cancle" // change the to cancle

        // disable the 3 dotted hambuger button
        const editDelete = e.target.parentElement.parentElement.previousSibling.previousSibling
        editDelete.style.pointerEvents = "none"

        // just set the comment author and id
        setReplyTo(() => ReplyTo) 
        setCommentId(() => CommentId);
        
      } else {

        e.target.textContent = "Reply"

        // Enable the 3 dotted hambuger button
        const editDelete = e.target.parentElement.parentElement.previousSibling.previousSibling
        editDelete.style.pointerEvents = ""

        // Clear the data's
        setReplyTo(() => "")
        setCommentId(() => "")
        setReplyContent(() => "")
      }
    } 
  }


  // Handle getting content entered from the form component
  const handleSetFormContent = (event) => {
    setReplyContent(() => event.target.value)
  }


  const canSave = [commentId, replyTo, User?.author, replyContent].every(Boolean) && !replyCreating


  // Handle submition of the form component Clicking on the Reply button after entering text in the textarea
  const handleFormSubmit = async (event) => {
    event.preventDefault();  
    
    // Create new reply both for replies made under other users reply or made directly under main comment
    if(canSave) {

      try {
        await createReply({commentId, replyTo, author: User.author, replyContent, postId}).unwrap()
      } catch (err) {
        console.error("Failed to save the reply: ", err)
      }          
    } 

    // No matter what happen just change the textContent of our button back to reply and empty every already collected state
    event.target.previousSibling.lastChild.textContent = "Reply"

    setOpenTextArea(() => false)
    setReplyTo(() => "")
    setCommentId(() => "")
    setReplyContent(() => "");
  };


  useEffect(() => {
    if(byUserId === postAuthor || User) {

      // open the button that will direct the new user to the form component
      setCreateUserFirstButton(() => false) 
    } else {
      
      setCreateUserFirstButton(() => true)
    }
  }, [byUserId, User, postAuthor])
  

  return (
    <div>
      {reply ? 

        <ReactionAndReplyButtonForReply
          handler={handleCreateReplyOnComment}
          comment={comment}
          User={User}
          postId={postId}
          reply={reply}
          buttonText={"Reply"}
          createUserFirstButton={createUserFirstButton}
          offsetOfForm={offsetOfForm}
        /> 

        :

        <ReactionAndReplyButton
          handler={handleCreateReplyOnComment}
          comment={comment}
          User={User}
          postId={postId}
          buttonText={"Reply"}
          createUserFirstButton={createUserFirstButton}
          offsetOfForm={offsetOfForm}
        />
      }         

      {openTextArea &&
        <CommentReplyForm
          canSave={canSave}
          handleSetFormContent={handleSetFormContent}
          replyContent={replyContent}
          handleFormSubmit={handleFormSubmit}
          buttonText={"Reply"}
        />   
      }
    </div>
  )
  }

export default CommentReplyCommponent
