import useFetchedUsers from '../../../../../SharedAsset/Spinners/userSpinner';


const Author = ({handlePostAuthor, postAuthor}) => {
  const {userContent, useraction} = useFetchedUsers() // fetch all the user
  const users = userContent

  return (
     //* Author selection start here */
    <div className='pt-5 mb-3 max-w-[92%] mx-auto'>
      <label htmlFor="postAuthor" className='inline-block font-bold lg:mb-5 mb-3 text-lg text-stone-700'>Author</label>

      <select 
        name="author" 
        id="postAuthor" 
        value={postAuthor} 
        aria-label="select"
        className='capitalize aria-required:bg-rose-500 font-poppins'
        onChange={handlePostAuthor} 
        form="post_form" 
        disabled={true}  
      >

        <option className="text-sm" value={""}></option>

        {useraction && users?.map((user) => {
          
          return (

            <option key={user?._id} value={user?._id} className="text-sm inline-block prose">{user.username}</option>    
          )
        })}
      </select>
    </div>
  )
}

export default Author
