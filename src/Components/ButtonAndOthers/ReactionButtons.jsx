import React from 'react'
import { FaHandHoldingHeart, FaHeart, FaLaughBeam} from 'react-icons/fa'
import { useUpdateCommentReactionMutation } from '../../Reduxstore/Slices/comments/CommentsSlice'
import { useUpdateReplyReactionMutation } from '../../Reduxstore/Slices/replySlice/replySlice'


const reactionEmoji =  {
  like: <FaHeart className='inline-block text-blue-500 align-text-top mt-px'/>,
  support: <FaHandHoldingHeart className='inline-block text-green-600 align-text-top mt-px'/>,
  love: <FaHeart className='inline-block text-rose-500 align-text-top mt-px'/>,
  funny: <FaLaughBeam className='inline-block text-amber-500 align-text-top mt-px'/>,
}

export const CommentReactionButtons = ({comment, authorId, postId}) => {
  // redux tool kit function for updating reactions
  const [reactionAddedComment, { isLoading }] = useUpdateCommentReactionMutation()

  const handleUpdateReaction = async (e) => {

    const commentId = comment?._id
    const reaction = e.target.id
    
    const canSave = !isLoading && [commentId, reaction, authorId].every(Boolean)

    if(canSave) {

      try {

        await reactionAddedComment({commentId , reaction, authorId, postId})
      } catch (err) {

        console.error("Failed to update reaction!", err)
      }     
    }
  } 

   const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => { // copy the reactionEmoji
    
    return (
      <button 
        key={name} 
        type="button" 
        id={name}
        title={name}
        className="mx-1 my-px mb-0.5 relative after:absolute after:inset-0 after:z-10 disabled:opacity-40"
        onClick={handleUpdateReaction}
        disabled={isLoading}
      >
        {emoji}
        <span className='inline-block mx-2'>{comment?.reactions[name]}</span>         
      </button>
    )
  })

  return <div className='inline-block'>{reactionButtons}</div>
}


export const ReplyReactionButtons = ({reply, commentId, authorId, postId}) => {
  // redux tool kit function for updating reactions on reply comments
  const [reactionAddedReply, { isLoading }] = useUpdateReplyReactionMutation()
  
  const handleUpdateReaction = async (e) => {

    const replyId = reply?._id
    const reaction = e.target.id
   
    const canSave = !isLoading && [commentId, reaction, authorId, replyId].every(Boolean)

    if(canSave) {

      try {

        await  reactionAddedReply({commentId, replyId, reaction, authorId, postId})
      } catch (err) {

        console.error("Failed to update reaction!", err)
      }
    }
  } 

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {

    return (
      <button 
        key={name} 
        id={name}
        type="button" 
        title={name}
        className="mx-1 my-px mb-0.5 relative after:absolute after:inset-0 after:z-10 disabled:opacity-40"
        onClick={handleUpdateReaction}
        disabled={isLoading}
      >
        {emoji} 
        <span className='inline-block mx-2'>{reply?.reactions[name]}</span>         
      </button>
    )
  })

  return <div className='inline-block'>{reactionButtons}</div>
}


