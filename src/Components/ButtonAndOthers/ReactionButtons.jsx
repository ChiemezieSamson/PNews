import React from 'react'
import { FaHandHoldingHeart, FaHeart, FaLaughBeam} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { reactionAddedComment, reactionAddedReply } from '../../Reduxstore/Slices/comments/CommentsSlice'


const reactionEmoji = {
  like: <FaHeart className='inline-block text-blue-500' title='Like'/>,
  support: <FaHandHoldingHeart className='inline-block text-green-600' title='Support'/>,
  love: <FaHeart className='inline-block text-rose-500' title='Love'/>,
  funny: <FaLaughBeam className='inline-block text-yellow-500' title='Funny'/>,
}

export const CommentReactionButtons = ({comment}) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
      key={name} 
      type="button" 
      className="mx-1 mb-0.5"
      onClick={() =>
        dispatch(reactionAddedComment({commentId: comment.id, reaction: name}))
      }
      >
        {emoji} {comment.reactions[name]}
      </button>
    )
  })

  return <div className='inline-block mr-[8%]'>{reactionButtons}</div>
}


export const ReplyReactionButtons = ({reply, commentId}) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button 
      key={name} 
      type="button" 
      className="mx-1 mb-0.5"
      onClick={() =>
        dispatch(reactionAddedReply({commentId, replyId: reply.id, reaction: name}))
      }
      >
        {emoji}  {reply.reactions[name]}        
      </button>
    )
  })

  return <div className='inline-block mr-[8%]'>{reactionButtons}</div>
}


