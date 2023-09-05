import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetPostByIdQuery, useGetPostByUserIdQuery, useGetPostsByPaginationQuery, 
  useGetPostsByPaginationTwoQuery, useGetPostsByQueryQuery, useGetPostsQuery } from '../../../Reduxstore/Slices/posts/PostsSlice'

// Use to fecth the all posts when ever a call to the function is made
export const useFetchedPosts = () => {

  const { // redux data flow and or returned information
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  // Sort posts in descending chronological order
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.slice()
   
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))

    return sortedPosts
  }, [posts])

  // An array of all the posts
  let content
  // Notify true only when the posts are ready
  let action = false

  if (isLoading) {

    action = false

  } else if (isSuccess && posts?.length > 0) {

    action = true
    content = sortedPosts

  } else if (isError) {
    
    content = <div>{error.toString()}</div>
  } 

  return {content , action, isFetching}
}


// Use to fecth the post by thier Id when ever a call to the function is made
export const useFetchedPostById = () => {
  const { postId } = useParams(); // getting the post id from the url params

  const { // redux data flow and or returned information
    data: post = {},
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostByIdQuery(postId)

  // An object of the post
  let singlePost
  // Notify true only when the post are ready
  let postAction = false


  if (isFetching) {

    postAction = false

  } else if (isSuccess && post?._id) {

    postAction = true
    singlePost = post

  } else if (isError) {

    singlePost = <div>{error.toString()}</div>
  }

  return {singlePost, postAction, postId, isFetching}
}


// Use to fecth the post by user Id when ever a call to the function is made
export const useFetchedPostByUserId = (page = 1) => {
  const  getPostId  =  localStorage.getItem("userId") // getting the user id from the local storage
  const postId = `${getPostId}?page=${page}&limit=${10}` // add a limit to the fetched post and managing it by page

  const { // redux data flow and or returned information
    data: post = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostByUserIdQuery(postId)

  // An object of the post
  let singlePost
  // Notify true only when the post are ready
  let postAction = false


  if (isFetching) {
   
    postAction = false

  } else if (isSuccess  && post?.post?.length > 0) {

    postAction = true
    singlePost = post

  } else if (isError) {

    singlePost = <div>{error.toString()}</div>
  }

  return {singlePost, postAction, isFetching}
}


// fetch post by name of the query from the url
export const useFetchedPostByQery = () => {
  const { search } = useLocation(); // getting the search value from the url through useLocation

  // arrange the query in order for it not to return more than 10 posts for each search.
  // if no search was not found just return the first 10 post in descending order 
  const newSearch = `${search ? search : "?s="}&limit=${10}`

  const { // redux data flow and or returned information
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsByQueryQuery(newSearch)

  // Sort posts in descending chronological order
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.posts?.slice()
    
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))

    return sortedPosts
  }, [posts])

  // An array of all the posts
  let content
  // Notify true only when the posts are ready
  let action = false
  // get the possible total page for each post if each fetch is to get 10 posts
  let totalPages
  // Amonges all the possible page which one are we on
  let currentPage
  

  if (isFetching) {

    action = false

  } else if (isSuccess && posts?.posts?.length > 0) {

    action = true
    content = sortedPosts
    totalPages = posts?.totalPages
    currentPage = posts?.currentPage
  } else if (isError) {

    content = <div>{error.toString()}</div>
  }

  return {content , action, totalPages, currentPage, isFetching}
}


// fetch post by Pagination pages of the query from the url
export const useFetchedPostByPagination = () => {
  const { search } = useLocation(); // getting the search value from the url through useLocation

  // Arrange the query in order for it not to return more than 10 posts for each query.
  // if no search was not found just return the first 10 post in descending order taking page as one
  let page = `${search ? search : "?page=" + 1}&limit=${10}` 

  const { // redux data flow and or returned information
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsByPaginationQuery(page)

  // Sort posts in descending chronological order
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.Posts?.slice()
    
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))

    return sortedPosts
  }, [posts])

   // An array of all the posts
  let content
  // Notify true only when the posts are ready
  let action = false
  // get the possible total page for each post if each fetch is to get 10 posts
  let totalPages
  // Amonges all the possible page which one are we on
  let currentPage


  if (isFetching) {

    action = false

  } else if (isSuccess && posts?.Posts?.length > 0) {

    action = true
    content = sortedPosts
    totalPages = posts?.totalPages
    currentPage = posts?.currentPage
  } else if (isError) {

    content = <div>{error.toString()}</div>
  }

  return {content , action, totalPages, currentPage, isFetching}
}


// fetch post by Pagination pages of the parent category query from the url
export const useFetchedPostByPaginationTwo = () => {
  // getting the search and pathname value from the url through useLocation
  const { pathname, search } = useLocation();
  // getting the parent category from the path url
  const parent = pathname.split("/")[1]

  // making sure our quotes parent category is same as the database name which is random
  const parentRoute = parent === "quotes" ?  "random" : parent

   // Arrange the query in order for it not to return more than 10 posts for each query.
  // if no search was not found just return the first 10 post in descending order taking page as one
  // and also send the parent category name to the api
  let page = `${search ? search : "?page=" + 1}&limit=${10}&parentCat=${parentRoute}` 

  const { // redux data flow and or returned information
    data: posts = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsByPaginationTwoQuery(page)

  // Sort posts in descending chronological order
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.Posts?.slice()
    
    sortedPosts?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))

    return sortedPosts
  }, [posts])


  // An array of all the posts
  let content
  // Notify true only when the posts are ready
  let action = false
  // get the possible total page for each post if each fetch is to get 10 posts
  let totalPages
  // Amonges all the possible page which one are we on
  let currentPage
   

  if (isFetching) {

    action = false

  } else if (isSuccess && posts?.Posts?.length > 0) {

    action = true
    content = sortedPosts
    totalPages = posts?.totalPages
    currentPage = posts?.currentPage
  } else if (isError) {

    content = <div>{error.toString()}</div>
  }

  return {content , action, totalPages, currentPage, isFetching}
}