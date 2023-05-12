import React from 'react'
import { FaHandHoldingHeart, FaHeart, FaLaughBeam} from 'react-icons/fa'
import { useUpdateCommentReactionMutation } from '../../Reduxstore/Slices/comments/CommentsSlice'
import { useUpdateReplyReactionMutation } from '../../Reduxstore/Slices/replySlice/replySlice'


const reactionEmoji = {
  like: <FaHeart className='inline-block text-blue-500' title='Like'/>,
  support: <FaHandHoldingHeart className='inline-block text-green-600' title='Support'/>,
  love: <FaHeart className='inline-block text-rose-500' title='Love'/>,
  funny: <FaLaughBeam className='inline-block text-yellow-500' title='Funny'/>,
}

export const CommentReactionButtons = ({comment, authorId, postId}) => {
  const [reactionAddedComment, { isLoading }] = useUpdateCommentReactionMutation()

  const handleUpdateReaction = async (e) => {
    let name = e.target.id
    const canSave = !isLoading && [comment._id, name, authorId].every(Boolean)
    if(canSave) {
    await  reactionAddedComment({commentId: comment._id, reaction: name, authorId, postId})
    }
  } 

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
      key={name} 
      type="button" 
      id={name}
      className="mx-1 mb-0.5 relative after:absolute after:inset-0 after:z-10"
      onClick={handleUpdateReaction}
      >
        {emoji} {comment.reactions[name]}
      </button>
    )
  })

  return <div className='inline-block mr-[8%]'>{reactionButtons}</div>
}


export const ReplyReactionButtons = ({reply, commentId, authorId, postId}) => {
  const [reactionAddedReply, { isLoading }] = useUpdateReplyReactionMutation()
  
  const handleUpdateReaction = async (e) => {
    let name = e.target.id
    const canSave = !isLoading && [commentId, name, authorId, reply._id].every(Boolean)
    if(canSave) {
    await  reactionAddedReply({commentId, replyId: reply._id, reaction: name, authorId, postId})
    }
  } 

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
      key={name} 
      id={name}
      type="button" 
      className="mx-1 mb-0.5 relative after:absolute after:inset-0 after:z-10"
      onClick={handleUpdateReaction}
      >
        {emoji}  {reply.reactions[name]}        
      </button>
    )
  })

  return <div className='inline-block mr-[8%]'>{reactionButtons}</div>
}


