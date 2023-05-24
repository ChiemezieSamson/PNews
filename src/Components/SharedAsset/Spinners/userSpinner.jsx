import { useParams } from "react-router-dom"
import { useGetUserByIdQuery, useGetUserByPostIdQuery, useGetUserQuery } from "../../../Reduxstore/Slices/users/UsersSlice"
import Spinner from "./Spinner"

const useFetchedUsers = () => {
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetUserQuery()

  let userContent
  let useraction = false


  if (isLoading) {
    userContent = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    userContent = users
    useraction = true
  } else if (isError) {
    userContent = <div>{error.toString()}</div>
  }

  return {userContent , useraction, refetch, isFetching}
}


export const useFetchedUserById = () => {
  const {userId} = useParams()
  const {
    data: user = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetUserByIdQuery(userId)

  let singleUser
  let userAction = false

  if (isFetching) {
    singleUser = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    userAction = true
    singleUser = user
  } else if (isError) {
    singleUser = <div>{error.toString()}</div>
  }

  return {singleUser, userAction, isFetching}
}

export const useFetchedUserByPostId = () => {
  const { postId } = useParams();
  const {
    data: user = [],
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetUserByPostIdQuery(postId)

  let singleUser
  let userAction = false

  if (isFetching) {
    singleUser = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    userAction = true
    singleUser = user
  } else if (isError) {
    singleUser = <div>{error.toString()}</div>
  }

  return {singleUser, userAction, postId, isFetching}
}


export default useFetchedUsers