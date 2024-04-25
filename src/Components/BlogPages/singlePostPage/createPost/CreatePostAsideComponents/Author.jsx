import { isFecthingStyle } from '../../../../SharedAsset/SharedAssets';
import useFetchedUsers from '../../../../SharedAsset/Spinners/userSpinner';


const Author = ({handlePostAuthor, postAuthor, userAction, isFetching, postId}) => {
  const {userContent, useraction, isFetching: allUserIsFetching} = useFetchedUsers() // fetch all the user
  const users = userContent

  const isfectchingAll = isFetching || allUserIsFetching
  const canOpen = [userAction, useraction].every(Boolean)
  const enable = !canOpen === !postId

  return (
     //* Author selection start here */
    <div className={`pt-5 mb-3 max-w-[92%] mx-auto ${isFecthingStyle(isfectchingAll)}`}>

      <label htmlFor="postAuthor" className='inline-block font-bold lg:mb-5 mb-3 text-lg text-stone-700'>Author</label>

      <select 
        name="author" 
        id="postAuthor" 
        value={postAuthor} 
        aria-label="select"
        className='capitalize aria-required:bg-rose-500 font-poppins disabled:opacity-40'
        onChange={handlePostAuthor}
        disabled={enable} 
        form="post_form" 
        required
      >

        <option className="text-sm" value={""}></option>

        {canOpen && users?.map((user) => {

          return (
            
            <option key={user?._id} value={user?._id} className="text-sm inline-block prose">{user.username}</option>    
          )
        })}
      </select>
    </div>
  )
}

export default Author
