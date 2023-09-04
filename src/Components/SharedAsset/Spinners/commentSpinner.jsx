import { useGetCommentsByPostIdQuery, useGetCommentsQuery } from "../../../Reduxstore/Slices/comments/CommentsSlice"
import { useMemo } from "react"
import { CommentSpinner } from "./Spinner"
import { useParams } from "react-router-dom"

// Use to fecth the comments when ever a call to the function is made
const useFetchedComments = () => {
  
  const { // redux data flow and or returned information
    data: comments = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetCommentsQuery()

  // Sort posts in descending chronological order
  const sortedComments = useMemo(() => {
    const sortedComments = comments?.slice()
    
    sortedComments?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))
    return sortedComments
  }, [comments])

  // An array of all the comments
  let commentsContent
  // Notify true only when the comments are ready
  let commentaction = false


  if (isLoading) {

    commentaction = false

  } else if (isSuccess && comments?.length > 0) {

    commentaction = true
    commentsContent = sortedComments
  } else if (isError) {

    commentsContent = <div>{error.toString()}</div>
  }

  return {commentsContent, commentaction, isFetching}
}


// Use to make keep user data update
export const useFindThisUser = () => {
  const {commentsContent, commentaction} = useFetchedComments()

  // Getting an exiting use localStorage information
  const randomCommentId = localStorage?.getItem("commentId")?.toLocaleLowerCase()
  const commentUserName = localStorage?.getItem("commentUserName")?.toLocaleLowerCase()

  let replyAuthor 

  if(commentaction && commentUserName && randomCommentId) {
    replyAuthor =  commentsContent?.find(item => item?.onSaveId === randomCommentId && item?.author === commentUserName)
  }
  
  return replyAuthor
}


// Use to fecth the comments by a post id when ever a call to the function is made
export const useFetchedCommentById = () => {
  const { postId } = useParams(); // getting the post id from the url params

  const { // redux data flow and or returned information
    data: comment = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetCommentsByPostIdQuery(postId)

  // An array of all the comments
  let singleContent
  // Notify true only when the comments are ready
  let contentAction = false

  if (isFetching) {

    // show a background Spinner
    singleContent = <CommentSpinner />
    contentAction = false
    

  } else if (isSuccess) {

    contentAction = true
    singleContent = comment

  } else if (isError) {

    singleContent = <div>{error.toString()}</div>
  }

  return {singleContent, contentAction, postId, isFetching}
}

export default useFetchedComments