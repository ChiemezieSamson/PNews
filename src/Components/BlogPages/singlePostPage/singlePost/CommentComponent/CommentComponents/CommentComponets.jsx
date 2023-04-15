import React, { useState } from 'react'
import { FaEllipsisH, FaEllipsisV, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import { useWindowSize } from '../../../../../SharedAsset/SharedAssets'


const LikeDislikeReply = ({like, dislike, handler}) => {

  // useEffect
  return (
    <div className='mr-6 max-w-[12rem] grid grid-cols-3 py-1 mt-1'>
      <span className='grid grid-cols-2 px-1'>
        <FaRegThumbsUp className='inline-block mt-1'/>
        <span>{like}</span>
      </span>
      <span className='grid grid-cols-2 px-1'>
        <FaRegThumbsDown className='inline-block mt-1.5'/>
        <span>{dislike}</span>
      </span>
      <button className="text-sm text-gray-500" onClick={handler}>
        Reply
      </button>
  </div>    
  )
}

export const ReplyForm = ({handleReplySubmit, handleSetReplyAuthor, handleSetReplyContent, replyAuthor, replyContent }) => {
     
  return (
    <form onSubmit={handleReplySubmit} className= "hidden">
      <div className="mt-2">
        <label htmlFor="replyname" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-lg after:text-red-500">
          Your Name
        </label>
        <input
          type="text"
          id="replyname"
          value={replyAuthor}
          onChange={handleSetReplyAuthor}
          required
          className="mt-1 p-1 border border-gray-400 rounded-md w-full"
        />
      </div>
      <div className="mt-2">
        <label htmlFor="replycontent" className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-1 after:text-lg after:text-red-500">
          Your Reply
        </label>
        <textarea
          id="replycontent"
          value={replyContent}
          onChange={handleSetReplyContent}
          required
          rows={3}
          className="mt-1 p-1 border border-gray-400 rounded-md w-full"
        ></textarea>
      </div>
      <div className="mt-2">
        <button type="submit" className="py-1 px-2 uppercase rounded-md text-xs tracking-wider text-white bg-gray-700 hover:bg-[#f70d28] transition-all duration-200 ease-linear">
          Reply
        </button>
      </div>
    </form>      
  )
}


export const EditAndDeleteComment = ({handleEdit, handleDelete}) => {
  const [editEllipsis , setEditEllipsis] = useState(false)
  const size = useWindowSize()

  const handleOpenandCloseEdit = () => {
    setEditEllipsis(change => !change)
  }
  
 return (
  <>
    <div className='absolute top-1 right-1 cursor-pointer text-gray-400 after:absolute after:top-1 
      after:right-1 after:inset-0 after:w-full' onClick={handleOpenandCloseEdit}>
      {size.width > 1028 ? <FaEllipsisH /> : <FaEllipsisV />}
    </div>

    <div className={`absolute bg-white pr-4 pl-2 py-2 m-0 shadow-inner shadow-gray-400 rounded-md max-w-[8rem] w-full
    top-6 right-0 ${editEllipsis ? "translate-y-0 opacity-100 visible transition-all duration-500 delay-200 ease-linear" : "translate-y-32 opacity-0 invisible"}`}>
      <button className='font-medium prose mb-1.5 block text-sm hover:text-blue-400 focus:text-rose-400 transition-all duration-500 delay-200 ease-linear'
      onClick={handleEdit}>
        Edit 
      {size.width < 1028 && <span>reply</span>}
      </button>
      <button className='font-medium prose block text-sm hover:text-blue-400 focus:text-rose-400 transition-all duration-500 delay-200 ease-linear' 
      onClick={handleDelete}
      >
        Delete 
      {size.width < 1028 && <span>reply</span>}
      </button>
    </div>
  </>
 )
}

export default LikeDislikeReply
