import { useDispatch, useSelector } from 'react-redux'
import { AuthorAdded } from '../../../../../Reduxstore/Slices/PostsComponentSlices/postAuthor/PostsAuthorSlice'
import { useEffect, useState } from 'react'

const Author = ({updatePostAuthor}) => {
  const [author, setAuthor] = useState(updatePostAuthor || "" )
  const users = useSelector(state => state.users)
  const postAuthor = useSelector(state => state.postAuthor)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthorAdded(author))
  },[author, dispatch])


  return (
     //* Author selection start here */
    <div className='pt-5 mb-3 px-3'>

      <label htmlFor="postAuthor" className='inline-block font-bold lg:mb-5 mb-3 text-lg text-[#444]'>Author</label>
      <select name="author" id="postAuthor" value={postAuthor} onChange={(e) => setAuthor(() => e.target.value.toLowerCase())} form="post_form">
      <option className="text-sm">{postAuthor}</option>
      {users.map((user) => {
        return (
        <option key={user.id} value={user.name.firstName} className="text-sm">{user.name.firstName}</option>    
        )
      })}
      </select>
    </div>
  )
}

export default Author
