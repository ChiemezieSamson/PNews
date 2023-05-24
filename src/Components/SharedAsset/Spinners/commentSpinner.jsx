import { useGetCommentsByPostIdQuery, useGetCommentsQuery } from "../../../Reduxstore/Slices/comments/CommentsSlice"
import { useMemo } from "react"
import Spinner from "./Spinner"
import { useParams } from "react-router-dom"

const useFetchedComments = () => {
  const {
    data: comments = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetCommentsQuery()


  const sortedComments = useMemo(() => {
    const sortedComments = comments.slice()
    // Sort posts in descending chronological order
    sortedComments.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return sortedComments
  }, [comments])


  let commentsContent
  let commentaction = false


  if (isLoading) {
    commentsContent = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    commentaction = true
    commentsContent = sortedComments
  } else if (isError) {
    commentsContent = <div>{error.toString()}</div>
  }

  return {commentsContent, commentaction, refetch, isFetching}
}

export const useFindThisUser = (email, author) => {
  const {commentsContent, commentaction} = useFetchedComments()
  let replyAuthor 

  if(commentaction) {
    replyAuthor =  commentsContent.find(item => item.email === email && item.author === author)
  }
  
  return replyAuthor
}

export const useFetchedCommentById = () => {
  const { postId } = useParams();
  const {
    data: comment = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetCommentsByPostIdQuery(postId)

  let singleContent
  let contentAction = false

  if (isFetching) {
    singleContent = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    contentAction = true
    singleContent = comment
  } else if (isError) {
    singleContent = <div>{error.toString()}</div>
  }

  return {singleContent, contentAction, postId, isFetching}
}

export default useFetchedComments