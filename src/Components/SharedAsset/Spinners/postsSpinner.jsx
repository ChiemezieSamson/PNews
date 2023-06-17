import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Spinner from './Spinner'
import { useGetPostByIdQuery, useGetPostsByPaginationQuery, useGetPostsByPaginationTwoQuery, useGetPostsByQueryQuery, useGetPostsQuery } from '../../../Reduxstore/Slices/posts/PostsSlice'

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


export const useFetchedPostByQery = () => {
  const { search } = useLocation();
  let newSearch = `${search}&limit=${10}`

  const {
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsByQueryQuery(newSearch)


  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.posts?.slice()
    // Sort posts in descending chronological order
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))
    return sortedPosts
  }, [posts])

  
  let content
  let action = false
  let totalPages
  let currentPage
  

  if (isFetching) {
    content = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    action = true
    content = sortedPosts
    totalPages = posts.totalPages
    currentPage = posts.currentPage
    console.log(sortedPosts, totalPages, currentPage);
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return {content , action, totalPages, currentPage, isFetching}
}


export const useFetchedPostByPagination = () => {
  const { search } = useLocation();
  let page = `${search ? search : "?page=" + 1}&limit=${10}` 

  const {
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsByPaginationQuery(page)


  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.Posts?.slice()
    // Sort posts in descending chronological order
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))
    return sortedPosts
  }, [posts])

  
  let content
  let action = false
  let totalPages
  let currentPage 

  if (isFetching) {
    content = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    action = true
    content = sortedPosts
    totalPages = posts.totalPages
    currentPage = posts.currentPage
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return {content , action, totalPages, currentPage, isFetching}
}


export const useFetchedPostByPaginationTwo = () => {
  const { pathname, search } = useLocation();
  const parent = pathname.split("/")[1]
  let parentRoute
  parent === "quotes" ? parentRoute = "random" : parentRoute = parent
  console.log(search, parent);
  let page = `${search ? search : "?page=" + 1}&limit=${10}&parentCat=${parentRoute}` 

  const {
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsByPaginationTwoQuery(page)


  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.Posts?.slice()
    // Sort posts in descending chronological order
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))
    return sortedPosts
  }, [posts])

  
  let content
  let action = false
  let totalPages
  let currentPage 

  if (isFetching) {
    content = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    action = true
    content = sortedPosts
    totalPages = posts.totalPages
    currentPage = posts.currentPage
    console.log(sortedPosts, totalPages, currentPage);
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return {content , action, totalPages, currentPage, isFetching}
}