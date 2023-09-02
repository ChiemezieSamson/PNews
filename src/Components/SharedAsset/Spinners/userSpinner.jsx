import { useParams } from "react-router-dom"
import { useGetUserByIdQuery, useGetUserByPostIdQuery, useGetUserQuery } from "../../../Reduxstore/Slices/users/UsersSlice"

// Use to fecth the all users when ever a call to the function is made
const useFetchedUsers = () => {

  const { // redux data flow and or returned information
    data: users = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetUserQuery()

  // An array of all the users
  let userContent
  // Notify true only when the users are ready
  let useraction = false


  if (isLoading) {

    useraction = false

  } else if (isSuccess && users.length > 0) {

    userContent = users
    useraction = true
  } else if (isError) {

    userContent = <div>{error.toString()}</div>
  }

  return {userContent , useraction, isFetching}
}

// Use to fecth the user by thier Id when ever a call to the function is made
export const useFetchedUserById = () => {
  let userId = localStorage.getItem("userId") // getting the user id from the localStorage

  const { // redux data flow and or returned information
    data: user = {},
    isFetching,
    isSuccess,
    refetch,
    isError,
    error
  } = useGetUserByIdQuery(userId)

  // An object of the user
  let singleUser
   // Notify true only when the user are ready
  let userAction = false

  if (isFetching) {

    userAction = false

  } else if (isSuccess && user._id) {

    userAction = true
    singleUser = user
  } else if (isError) {

    singleUser = <div>{error.toString()}</div>
  }

  return {singleUser, userAction, refetch, isError, isSuccess, isFetching}
}


// Use to fecth the user by post Id when ever a call to the function is made
export const useFetchedUserByPostId = () => {
  const { postId } = useParams(); // getting the post id from the url params

  const { // redux data flow and or returned information
    data: user = {},
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetUserByPostIdQuery(postId)

  // An object of the user
  let singleUser
  // Notify true only when the user are ready
  let userAction = false


  if (isFetching) {

    userAction = false

  } else if (isSuccess  && user._id) {

    userAction = true
    singleUser = user
  } else if (isError) {

    singleUser = <div>{error.toString()}</div>
  }

  return {singleUser, userAction, postId, isFetching, isSuccess, isError}
}


export default useFetchedUsers