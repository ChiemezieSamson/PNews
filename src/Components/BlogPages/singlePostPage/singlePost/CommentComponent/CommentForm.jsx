import { useState } from "react";
import { useCreateNewCommentMutation} from "../../../../../Reduxstore/Slices/comments/CommentsSlice";
import useFetchedComments from "../../../../SharedAsset/Spinners/commentSpinner";

const CommentForm = ({postId}) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const {refetch ,isFetching} = useFetchedComments() 
  const [addNewComments, {isLoading}] = useCreateNewCommentMutation()

  const canSave =
  [postId, author, content, email, website, saveInfo].every(Boolean) && !isLoading

  const handleSubmit = async (event) => {
    event.preventDefault();
    refetch()
    if (canSave) {
      try {
        await addNewComments({postId, author, content, email, website, saveInfo}).unwrap()
        setAuthor(() => "");
        setContent(() => "");
        setEmail(() => "");
        setWebsite(() => "");
        setSaveInfo(() => "")
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} disabled={isFetching} className="disabled:opacity-40">
      <div className="mt-2">
        <label htmlFor="author" className="after:content-['*'] after:ml-1 after:text-lg after:text-red-500  block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
          className="mt-1 p-1 border border-gray-400 rounded-md w-full"
        />
      </div>

      <div className="mt-2">
        <label htmlFor="content" className="after:content-['*'] after:ml-1 after:text-lg after:text-red-500 block text-sm font-medium text-gray-700">
          Your Comment
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          rows={3}
          className="mt-1 p-1 border border-gray-400 rounded-md w-full"
        ></textarea>
      </div>

      <div className='grid grid-cols-2 gap-x-4'>
        <span>
          <label htmlFor="email" className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 block text-sm font-medium text-gray-700'>Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            className="mt-1 p-1 border border-gray-400 rounded-md w-full"
            onChange={(event) => setEmail(event.target.value)}
          />
        </span>
        <span>
          <label htmlFor="website" className='after:ml-1 after:text-lg after:text-red-500 block text-sm font-medium text-gray-700'>
          Website</label>
          <input 
            type="text" 
            id='website'
            value={website}
            name='website' 
            className="mt-1 p-1 border border-gray-400 rounded-md w-full"
            onChange={(event) => setWebsite(event.target.value)}
           />
        </span>
      </div>

      <div className='grid grid-cols-12 lg:inline-block'>
        <input 
        type="checkbox" 
        name="save-data" 
        id="save-data" 
        className='outline-0 focus:outline-0 focus:ring-0 align-text-top h-3 w-3 rounded-sm mt-2 sm:mt-1.5 lg:mt-px col-span-1'
        checked={saveInfo}
        onChange={() => setSaveInfo((change) => !change)}
        />
        <label htmlFor="save-data" className="inline-block mx-2 align-top leading-4 text-sm font-medium text-gray-700 col-span-11">
          Save my name, email and website in this browser for the next time i comment.</label>
      </div>
      
      <div className="mt-7">
        <button type="submit" className="py-2 px-2 disabled:opacity-40 uppercase rounded-md text-xs tracking-wider text-white bg-gray-700 hover:bg-[#f70d28]"
         disabled={!canSave}>
          Add Comment
        </button>
      </div>
    </form>
  );
};


export default CommentForm