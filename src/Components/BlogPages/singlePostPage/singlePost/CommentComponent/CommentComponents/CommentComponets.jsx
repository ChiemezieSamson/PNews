import React, { useEffect, useState } from 'react'
import { useWindowSize } from '../../../../../SharedAsset/SharedAssets'
import { EditAndDeleteButton } from '../../../../../ButtonAndOthers/Buttons'


export const CommentReplyForm = ({canSave, handleSetFormContent, replyContent, handleFormSubmit, buttonText}) => {
     
  return (
    <form onSubmit={handleFormSubmit} className="font-round text-neutral-600">

      <div className="mt-2">
        <label htmlFor="replycontent" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-lg after:text-red-500">
          Your {buttonText}
        </label>

        <textarea
          id='replycontent'
          value={replyContent}
          onChange={handleSetFormContent}
          required
          maxLength={1000}
          rows={2}
          autoFocus={true}
          className="mt-1 p-1 border mb-0 border-neutral-400 rounded w-full resize-none overflow-hidden"
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="mt-2 py-1 px-2 uppercase rounded text-xs tracking-wider text-white bg-neutral-600 
        hover:bg-[#f70d28] TextHeadertransition disabled:opacity-40"  disabled={!canSave}
      >
        {buttonText}
      </button>
    </form>   
  )
}


export const EditAndDeleteComment = ({handleEdit, handleDelete, commentId, handleSetEditReply,
  replyId, handleSetEditComment, closeEditComment, handleSetCloseEditComment}) => {
  const [editEllipsis , setEditEllipsis] = useState(false) // open and close the edit, delete side box
  // open and close the delete comment yes or no text when delete is clicked
  const [deleteMessage , setDeleteMessage] = useState(false) 

  const size = useWindowSize()


  //open and close hanburgar button for post editing and deleting
  const handleOpenandCloseEdit = (event) => {

    // onClick check if the side box for the main comment was opened 
    if (editEllipsis && handleSetEditComment) { 

      // if yes close the reply component and open the update component
      const createComponent = event.target.nextSibling.nextSibling
      createComponent.style.display = "block"

      handleSetEditComment(false) // close the update form
    }

    // onClick check if the side box for the reply comment was opened 
    if (editEllipsis && handleSetEditReply) {
      // if yes close the reply component and open the update component
      const createComponent = event.target.nextSibling.nextSibling
      createComponent.style.display = "block"

      handleSetEditReply(false) // close the update form
    }

    setEditEllipsis(change => !change) // set editEllipsis
    handleSetCloseEditComment(true) // make sure the edit, deleted side box remains closed
  }

  // handle sending comment or reply id for deletion
  const handleDeleteButton = (event) => {
    handleDelete(event)
  }

  // make sure to close the edit, deleted side box when the form area is clicked
  useEffect(() => { 
    if (!closeEditComment) {
      setEditEllipsis(() => false)
    }
  },[closeEditComment])

 return (
  <>
    {/* The Three dotted hanmbugar tag */}
    <EditAndDeleteButton handler={handleOpenandCloseEdit}/> 

    {/* Edit, Delete and Delete Message container */}
    <div  id={replyId} 
      className={`absolute bg-white w-full py-2 m-0 shadow-inner shadow-gray-400 rounded-md max-w-[8rem] top-6 right-0 
      ${editEllipsis ? "translate-y-0 opacity-100 visible transition-all duration-300 delay-200 ease-linear"
      : "translate-y-32 opacity-0 invisible"}`}>

      {/* Edit Button */}
      <button 
        id={commentId}
        type='button' 
        className={`${!deleteMessage ? "block" : "hidden"} 
        font-medium prose mb-1.5 block text-sm px-2 hover:text-red-400 focus:text-sky-400 TextHeadertransition`}
        onClick={handleEdit}>
          Edit 
        {size.width < 1028 && <span> text</span>}
      </button>
      
       {/* Delete Button */}
      <button 
        className={`${!deleteMessage ? "block" : "hidden"} 
        font-medium prose block text-sm px-2 hover:text-red-400 focus:text-sky-400 TextHeadertransition`} 
        onClick={() => setDeleteMessage(() => true)}
      >
          Delete 
        {size.width < 1028 && <span> text</span>}
      </button>

      {/* DeleteMessage */}
      <div className={`${deleteMessage ? "block" : "hidden"} font-poppins font-medium text-stone-700 text-center`}>
        <span>Are you sure?</span>

        <div className='grid grid-flow-col justify-around'>
          <span onClick={handleDeleteButton}  id={commentId}
          className='hover:mainColor TextHeadertransition cursor-pointer'>yes</span>

          <span onClick={() => setDeleteMessage(() => false)}  
          className='hover:text-blue-400 TextHeadertransition cursor-pointer'>no</span>
        </div>
      </div>
    </div>
  </>
 )
}
