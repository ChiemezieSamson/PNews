import {  useSelector } from 'react-redux'
import { selectAllUsers } from '../../../../../Reduxstore/Slices/users/UsersSlice'

const Author = ({handlePostAuthor, postAuthor}) => {
  const users = useSelector(selectAllUsers)
  const onSelectAuthor = (e) => {
    handlePostAuthor(e)
  }

  return (
     //* Author selection start here */
    <div className='pt-5 mb-3 px-3'>

      <label htmlFor="postAuthor" className='inline-block font-bold lg:mb-5 mb-3 text-lg text-[#444]'>Author</label>
      <select name="author" id="postAuthor" value={postAuthor} onChange={onSelectAuthor} form="post_form">
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
