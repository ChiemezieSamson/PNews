import React from 'react'
import ReplyCommentupdate from './ReplyCommentupdate'
import CommentReplyCommponent from '../CommentComponents/CommentReplyCommponent'
import { commentText, formatDate } from '../../../../../SharedAsset/SharedAssets'

const Reply = ({comment, comments, User, postId, offsetOfForm, byUserId, postAuthor}) => {

  return (
    <div className='mt-3'>
       {comment?.replies?.length > 0 &&
       
          <details>
            <summary className='text-sm italic text-blue-500 cursor-pointer inline'>{comment?.replies?.length} replies</summary>
            
            {comment?.replies?.map((reply) => {

              // if the textarea content has a link add it inside a link tag funtion
              const {text} = commentText(reply?.content)

              // changing the string content to html so that the any link will be displayed
              const renderHTML = (htmlString) => {        
                return { __html: htmlString };        
              };        

              // Render the data with the link as a clickable link
              const renderedData = (
                <p dangerouslySetInnerHTML={renderHTML(text)}></p>
              )    

              return (
                <div key={reply._id} className={`${reply.name && "bg-neutral-200 rounded-md my-2 px-4 py-2"}`}>

                  {reply.name &&
                    <article className="relative font-round">
                      <h3 className="font-medium capitalize -mb-2.5 font-josefin text-stone-700" name={reply?.name}>
                        {reply?.name} 
                        <small className="text-neutral-500 mt-1 prose ml-1 normal-case"> - {formatDate(reply?.createdAt)}</small>
                      </h3>

                      <small className='font-lora text-neutral-500 inline-block mb-1'>
                        {reply?.name} replied to 
                        <span className='text-blue-500 mx-1.5'>@ {reply?.replyOfreply}</span>
                      </small>                      

                      <div className='tracking-wide font-poppins text-neutral-700 font-extralight first-letter:capitalize'>{renderedData}</div>


                      <ReplyCommentupdate
                        comments={comments}
                        User={User}
                        postId={postId}
                        reply={reply}
                        byUserId={byUserId}  
                        postAuthor={postAuthor}
                        comment={comment}
                      />

                      <CommentReplyCommponent 
                        reply={reply}
                        comment={comment}
                        User={User}
                        postId={postId}
                        byUserId={byUserId}  
                        postAuthor={postAuthor}
                        offsetOfForm={offsetOfForm}
                      />

                    </article>
                  } 
                </div>                           
              )
            })}
          </details>
        }      
    </div>
  )
}

export default Reply
