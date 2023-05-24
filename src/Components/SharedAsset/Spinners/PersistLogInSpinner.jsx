import React  from 'react'
import { useRefreshQuery } from '../../../Reduxstore/Slices/authSlice/authApiSlic'
import Spinner from './Spinner'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../Reduxstore/Slices/authSlice/AuthSlice'
import { Link } from 'react-router-dom'

const PersistLogInSpinner = () => {
    const {
        data: Token = {},
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
      } = useRefreshQuery()

      const dispatch = useDispatch()

   
      let content
      let action = false
    
      if (isLoading) {
        content = <Spinner text="Loading..."/>
      } else if (isSuccess) {
        action = true
        content = Token
       
        dispatch(setCredentials(Token.accessToken))

      } else if (isError) {
        if(error.originalStatus === 403) {
          localStorage.clear();
          content = <div>
            <p>Please login your account</p>
            <Link to={"/login"}>Login</Link>
          </div>
        } else {
          content = <div>{error?.data}</div>
        }
      } 
    
      return {content , action, refetch, isFetching}
}

export default PersistLogInSpinner
