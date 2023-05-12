import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import { useGetPostByIdQuery, useGetPostsQuery } from '../../../Reduxstore/Slices/posts/PostsSlice'

export const useFetchedPosts = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetPostsQuery()


  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return sortedPosts
  }, [posts])

  let content
  let action = false

  if (isLoading) {
    content = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    action = true
    content = sortedPosts
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } 

  return {content , action, refetch, isFetching}
}



export const useFetchedPostById = () => {
  const { postId } = useParams();
  const {
    data: post = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostByIdQuery(postId)

  let singlePost
  let postAction = false

  if (isFetching) {
    singlePost = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    postAction = true
    singlePost = post
  } else if (isError) {
    singlePost = <div>{error.toString()}</div>
  }

  return {singlePost, postAction, postId, isFetching}
}


