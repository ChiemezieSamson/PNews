import { useParams } from 'react-router-dom';
import useFetchedUsers from '../../../../SharedAsset/Spinners/userSpinner';


const Author = ({handlePostAuthor, postAuthor}) => {
  const { postId } = useParams();
  const {userContent, useraction} = useFetchedUsers()
  const users = userContent
  const onSelectAuthor = (e) => {
    handlePostAuthor(e)
  }

  return (
     //* Author selection start here */
    <div className='pt-5 mb-3 px-3'>
      <label htmlFor="postAuthor" className='inline-block font-bold lg:mb-5 mb-3 text-lg text-[#444]'>Author</label>
      <select name="author" id="postAuthor" value={postAuthor} onChange={onSelectAuthor} form="post_form" disabled={postId}>
      <option className="text-sm" value={""}></option>
      { useraction && users.map((user) => {
        return (
        <option key={user._id} value={user._id} className="text-sm">{user.username}</option>    
        )
      })}
      </select>
    </div>
  )
}

export default Author
