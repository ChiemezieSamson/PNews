import { useEffect, useState } from "react";
import { useCreateNewCommentMutation} from "../../../../../Reduxstore/Slices/comments/CommentsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { handleEmailPattern, handleUrlLinks, textAndNumberOnly } from "../../../../SharedAsset/Vaidations/RegularExpression";
import { isFecthingStyle } from "../../../../SharedAsset/SharedAssets";

const CommentForm = ({commentsContent, postId, onAnyIsfetching, canOpen}) => {
   // Create new comment 
  const [addNewComments, {isLoading}] = useCreateNewCommentMutation() 

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [randomCommentId, setRandomCommentId] = useState('');
  const [commentAuthorName, setCommentAuthorName] = useState('');
  const [checkRandomIdComments, setCheckRandomIdComments] = useState({});

  // save to local storage if true
  const [saveInfo, setSaveInfo] = useState(false); 

  const [requiredText, setRequiredText] = useState(false) // text used to indicate that an option is needed
  const [requiredText2, setRequiredText2] = useState(false) // text used to indicate that an option is needed
  const [errorText, setErrorText] = useState(false) /// text used to indicate that your category didn't save or there is an erro
  const [isValid, setIsValid] = useState(true); // regular expressions
  const [emailIsValid, setEmailIsValid] = useState(true); // regular expressions
  const [websiteIsValid, setWebsiteIsValid] = useState(true); // regular expressions


  // handling save author name
  const handleAuthorName = (event) => {
    setRequiredText(() => false)
    
    const { value } = event.target;
    const { isValid } = textAndNumberOnly(value);
    setIsValid(() => isValid);

    let validName 

    if (canOpen) {// check if a user we this name already exist

      validName = commentsContent?.find(item => item?.author === value?.toLowerCase())
    }

    if (validName?.author && isValid ) {

      if (validName?.author !== commentAuthorName) {

        setRequiredText(() => true)
      }
    }     
    
    setAuthor(() => value) 
  }


  // handling save the textarea content
  const handleTextarea = (event) => {

    const { value } = event.target;    
    setContent(() => value)
  }


  // handling save the email content
  const handleEmail = (event) => {
    setRequiredText2(() => false)

    const { value } = event.target;
    const { isValid } = handleEmailPattern(value);
    setEmailIsValid(isValid)

    let validEmail 

    if (canOpen) {// check if a user we this name already exist

      validEmail = commentsContent?.find(item => item?.email === value.toLowerCase())
    }

    if (validEmail?.email && isValid ) {

      if (validEmail?.author !== commentAuthorName) {

        setRequiredText2(() => true)
      }      
    }

    setEmail(() => value)
  }


  // handling save the website content
  const handleWebsite = (event) => {

    const { value } = event.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setWebsiteIsValid(() => isValid)
    setWebsite(() => value)    
  }

  // CREATE COMMENT
  const canSave = [postId, author, content, email, isValid, emailIsValid].every(Boolean) 
    && !isLoading && requiredText === false && requiredText2 === false


  // handle creating of new comment
  const handleSubmit = async (event) => {    
    event.preventDefault();  
    setErrorText(() => false) 

    if (canSave) {
      const randomId = nanoid() // generating a random id
     
      //if there is an existing user and just use the local storage id and not a new generated id 
      // else do the opposite
      if (checkRandomIdComments?.onSaveId !== "" && randomCommentId) {
        
        try {

          await addNewComments({postId, author, content, email, website, saveInfo: true, randomId: randomCommentId}).unwrap()

          setAuthor(() => "");
          setContent(() => "");
          setEmail(() => "");
          setWebsite(() => "");
          setSaveInfo(() => "")
        } catch (err) {

          setErrorText(() => true)
          console.error('Failed to save the post: ', err)
        }       

      } else {

        if(saveInfo) {

          localStorage.setItem("commentId", randomId);
          localStorage.setItem("commentUserName", author);

          try {

            await addNewComments({postId, author, content, email, website, saveInfo, randomId}).unwrap()

            setAuthor(() => "");
            setContent(() => "");
            setEmail(() => "");
            setWebsite(() => "");
            setSaveInfo(() => "")
          } catch (err) {

            setErrorText(() => true)
            console.error('Failed to save the post: ', err)
          }

        } else {

          try {

            await addNewComments({postId, author, content, email}).unwrap()
            
            setAuthor(() => "");
            setContent(() => "");
            setEmail(() => "");
            setWebsite(() => "");
            setSaveInfo(() => "")
          } catch (err) {

            setErrorText(() => true)
            console.error('Failed to save the post: ', err)
          }
        }          
      }    
    }
  };


  useEffect(() => {

    const randomCommentId = localStorage?.getItem("commentId")?.toLocaleLowerCase()
    const commentUserName = localStorage?.getItem("commentUserName")?.toLocaleLowerCase()
    let checkId

     // if there is an existing user 
    if (canOpen && randomCommentId) {

      checkId  = commentsContent?.find(item => item?.onSaveId === randomCommentId)
    }

    if(checkId?.onSaveId === randomCommentId ) {

      setRandomCommentId(() => randomCommentId)
      setCommentAuthorName(() => commentUserName)
      setCheckRandomIdComments(() => checkId)
    }
  }, [commentsContent, canOpen])


  useEffect(() => {

    if(checkRandomIdComments?.author) {

      setAuthor(() => checkRandomIdComments?.author)
      setEmail(() => checkRandomIdComments?.email)
      setWebsite(() => checkRandomIdComments?.website)
    }
  },[checkRandomIdComments])


  return (
    <form onSubmit={handleSubmit} className={isFecthingStyle(onAnyIsfetching)}>

      {errorText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to save the comment</p> : "" }

      {/* comment user name */}
      <div className="mt-2">

        <label htmlFor="author" className="after:content-['*'] after:ml-1 after:text-lg  after:text-red-500  block text-sm font-medium text-gray-700">
          Your Name
        </label>

        <input
          type="text"
          id="author"
          aria-label='text'
          maxLength={30}
          autoFocus={true} 
          value={author}
          onChange={handleAuthorName}
          disabled={!canOpen}
          required
          className={`mt-1 p-1 border border-gray-400 rounded-md w-full mb-0 disabled:opacity-40
          ${(!isValid && author) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`}
        />

        {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'> Name already exist! </p> : "" }
      </div>

      {/* comment user text */}
      <div className="mt-2">

        <label htmlFor="content" className="after:content-['*'] after:ml-1 after:text-lg after:text-red-500 block text-sm font-medium text-gray-700">
          Your Comment
        </label>

        <textarea
          name="content"
          id="content"
          value={content}
          onChange={handleTextarea}
          required
          maxLength={1000}
          rows={4}
          disabled={!canOpen}
          className="mt-1 p-1 border border-gray-400 rounded-md w-full mb-0 resize-none overflow-hidden disabled:opacity-40"
        ></textarea>
      </div>

      {/* comment user email and website */}
      <div className='grid grid-cols-2 mt-2 gap-x-[2%]'>

        {/* email */}
        <span className="col-span-2 xs:col-span-1">

          <label htmlFor="email" className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 block text-sm font-medium text-gray-700'>
            Email
          </label>

          <input 
            type="email" 
            name="email" 
            aria-label="email"
            id="email" 
            value={email}
            required
            disabled={!canOpen}
            className={`mt-1 p-1 border border-gray-400 rounded-md w-full mb-0 disabled:opacity-40
            ${(!emailIsValid && email) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`}
            onChange={handleEmail}
          />

          {requiredText2 ? <p className='text-xs text-rose-500 tracking-wider font-lora'> Email already exist! </p> : "" }
        </span>

        {/* website */}
        <span className="col-span-2 xs:col-span-1 mt-5 xs:mt-0">

          <label htmlFor="website" className='after:ml-1 after:text-lg after:text-red-500 block text-sm font-medium text-gray-700'>
            Website
          </label>

          <input 
            type="url" 
            id='website'
            aria-label='url'
            value={website}
            name='website' 
            disabled={!canOpen}
            className={`mt-1 p-1 border border-gray-400 rounded-md w-full mb-0 disabled:opacity-40
            ${(websiteIsValid !== true && website) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`}
            onChange={handleWebsite}
          />
        </span>
      </div>

      {/* save name and email checkbox */}
      {(!randomCommentId && !commentAuthorName) && 

        <div className='grid grid-cols-12 lg:inline-block mt-5'>

          <input 
            type="checkbox" 
            name="save-data"
            aria-label="checkbox" 
            id="save-data" 
            disabled={!canOpen}
            className='outline-0 focus:outline-0 focus:ring-0 align-text-top h-3 w-3 rounded-sm mt-2 sm:mt-1.5 lg:mt-px col-span-1 disabled:opacity-40'
            checked={saveInfo}
            onChange={() => setSaveInfo((change) => !change)}
          />

          <label htmlFor="save-data" className="inline-block mx-2 align-top leading-4 text-sm font-medium text-gray-700 col-span-11">
            Save my name, email and website in this browser for the next time I comment.
          </label>
        </div>
      }
      
      {/* Add comment button */}
      <div className="mt-7">

        <button 
          type="submit" 
          name="commentFormButton"
          className="py-2 px-2 disabled:opacity-40 uppercase rounded-md text-xs tracking-wider text-white bg-gray-700 hover:bg-[#f70d28]"
          disabled={!canSave}
        >
          Add Comment
        </button>
      </div>
    </form>
  );
};


export default CommentForm