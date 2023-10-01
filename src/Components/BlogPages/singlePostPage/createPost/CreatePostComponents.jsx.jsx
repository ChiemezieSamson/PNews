import { useEffect, useState } from "react";
import {BiImageAdd} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CreatePostAside from "./CreatePostAside";
import { convertToRaw } from 'draft-js';
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { emptyCategories, selectAllPostCat } from '../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice'
import { emptyTag, selectAllPostTags } from '../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'
import { emptyOptional, selectAllPostOptionals } from '../../../../Reduxstore/Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice'
import { useCreateNewPostMutation } from "../../../../Reduxstore/Slices/posts/PostsSlice";
import axios from "axios"
import { isFecthingStyle, useWindowSize } from "../../../SharedAsset/SharedAssets";
import PostWritePreview from "./editorPreview/postWritePreview";
import { useFetchedUserById } from "../../../SharedAsset/Spinners/userSpinner";
import { useNavigate } from "react-router-dom";
import { textSpaceAndNumber } from "../../../SharedAsset/Vaidations/RegularExpression";
import TextEditor from "../editor/Editor";

const CreatePostComponents = ({state}) => {
  const [addNewPost, { isLoading , isFetching: CreatePostsIsfetching}] = useCreateNewPostMutation() // Redux function to create a new post
  // getting the user for authenticatin, authorisation and security
  const {singleUser, userAction, isSuccess, isError, isFetching} = useFetchedUserById()

  const [editorState, setEditorState] = useState(() => state)

  const [preview, setPreview] = useState(false) // handling the preview of the post preview component page design
  const [showSideBar, setShowSideBar] = useState(false) // handling the display action of the aside components
  const [errorText, setErrorText] = useState(false) /// text used to indicate that your category didn't save or there is an erro
  const [errorText2, setErrorText2] = useState(false) /// text used to indicate that your category didn't save or there is an erro
  const [isValid, setIsValid] = useState(false); // regular expressions
  const [runOnce, setRunOnce] = useState(false)

  const [postTitle, setPostTitle] = useState("")
  const [postImage, setPostImage] = useState("")
  const [postAuthor, setPostAuthor] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState("")
  const [data, setData] = useState({})

  const size = useWindowSize()
  const navigate = useNavigate();
  const User = singleUser
  const anyIsfetching = CreatePostsIsfetching || isFetching

  // Array of all the selected categories, tags, and options coming from redux store
  const postCategory = useSelector(selectAllPostCat)
  const postTags = useSelector(selectAllPostTags)
  const optional = useSelector(selectAllPostOptionals)  

   // handling setting the select value of Author
  const handleSetPostAuthor = (author) => {

    setPostAuthor(() => author?.target?.value)
  }

  // handling setting the post title
  const handlePostTitle = (e) => {

    const { value } = e.target;
    const { isValid }= textSpaceAndNumber(value);
    setIsValid(isValid);

    setPostTitle(() => value)
  }

  // handling setting display and hide value of preview component page
  const handlePreview = () => {
    
    setPreview((change) => !change)
  }

  // handling the display or hidden of the fullsidebar
  const handleShowBar = () => {

    setShowSideBar((change) => !change)
  }

  // handling the display or hidden of the fullsidebar in small screen
  const handleCloseSidebar = () => {

    setShowSideBar(() => false)
  }

  // stringify the editor object before sending to the database
  const postContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

  const dispatch = useDispatch()

  // handling setting image once selected from the user device
  const handleImage = async (e) => {

    if(e.target.value) {

      setErrorText(() => false)

      const data = new FormData()
      const file = e.target.files[0]
      const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB

       if (fileSizeInMB > 1) {

        setErrorMessage('Image size exceeds 1MB limit');
        setPostImage(() => "")
      } else {

        setErrorMessage('');

        try {
          
          const filename = Date.now() + file.name; // making sure no two file have same name
          
          data.append("name", filename)
          data.append("file", file)
            
          setPostImage(() => filename)
          setFile(() => file)
  
          setData(() => data);       
    
        } catch (err) {

          setErrorText(() => true)
          console.error(err)
        }
      }
    }
  }

  const canSave = [postTitle, postImage, postAuthor, postCategory[0], postTags[0], isValid].every(Boolean) && !isLoading && !errorText

  const handleAllPostContent = async () => {

    if (canSave) {

      setErrorText2(() => false)

      try {

        await axios.post("/upload", data)
        
        await addNewPost({ postAuthor, postTitle, postImage, postContent , postCategory, postTags, optional }).unwrap()
        
        dispatch(emptyCategories())
        dispatch(emptyTag())
        dispatch(emptyOptional())

        setPostImage(() => "")
        setPostTitle(() => "")
        setPostAuthor(() => "")
        setFile(() => "")
        setEditorState(() => state)
      } catch (err) {

        setErrorText2(() => true)
        console.error(err)
      }
    }
  }

  // using useEffect to dictect the changes in screen size
  useEffect(() => {

    if (size.width < 1024 && !runOnce) {

      setShowSideBar(() => false)
      setRunOnce(() => true)
    }

    if (size.width >= 1024 && runOnce) {

      setShowSideBar(() => true) 
      setRunOnce(() => false)
    }

  },[size, runOnce])


   // making user that only authorized user can update
   useEffect(() => {

    if(!isSuccess && isError) {

      navigate(-1, {replace: true}, [navigate])
      window.history.replaceState({}, document.title)
    }
  },[isSuccess, isError, navigate])


  return (
    <div className="grid lg:grid-cols-4 relative mb-10">

       {/* write post start here */}
      <div className={`text-left lg:col-span-3 order-2 lg:order-1 ${(size.width < 1024 && showSideBar) && "hidden"} ${isFecthingStyle(anyIsfetching)}`}>

        {!preview ? 
          <>
          {errorText2 ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to save the post</p> : "" }
            <div className="mt-5">

              {/* Title input is here */}
              <input 
                type="text" 
                aria-label='text'
                placeholder='My Title ...' 
                id="title" 
                maxLength={70}
                name="head_title"  
                className={`text-2xl sm:text-3xl xl:text-4xl text-stone-800 border-0 focus:border-b focus:outline-0 shadow-none disabled:opacity-40
                  p-5 pb-px font-round ${(!isValid && postTitle) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`}
                autoFocus={true} 
                disabled={!userAction}
                form="post_form" 
                value={postTitle}  
                onChange={handlePostTitle}/>
            </div>

            {/* image to be display when an image is selected from user device */}
            {(postImage && file) && 
              <img  
                src={URL.createObjectURL(file)} 
                alt="postImage" 
                className='rounded-md max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]' 
                loading="lazy"
              />
            }

            {/* write post form */}
            <form className="mt-2.5" id="post_form" onSubmit={(e) => e.preventDefault()}>

              {/* write form groups */}
              <label htmlFor="fileInput" className="bg-neutral-100 px-2 cursor-pointer rounded-full mr-3 hover:bg-neutral-200 TextHeadertransition">
                <BiImageAdd className="inline-block" />
              </label>

              <input 
                type="file" 
                id="fileInput"
                accept="image/*" 
                className='w-auto text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 disabled:opacity-40
                  file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-[#f70d28]
                hover:file:bg-neutral-200 focus:outline-none focus:border-0 TextHeadertransition' 
                name="image" 
                required
                disabled={!userAction}
                onChange={handleImage}
              />

              {errorMessage && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errorMessage}</p>}
              {errorText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to save the image</p> : "" }
            </form>

            <div className="postEditor">
              
              <TextEditor 
                editorState={editorState}
                state={state}
                setEditorState={setEditorState}
                userAction={userAction}
              />
            </div>
          </> 
          :
          <PostWritePreview 
            editorText={editorState.getCurrentContent()} 
            postTitle={postTitle}
            postTags={postTags}
            optional={optional}           
            postImage={postImage}        
            postCategory={postCategory?.length > 0 ? postCategory :  ["category"]}
            file={file}
            User={User}
            preview={preview}
            userAction={userAction}
            isFetching={anyIsfetching}
          />
        }
      </div>
      
      <div className="lg:order-2 order-1 text-left lg:col-span-1">

        <CreatePostAside 
          postTitle={postTitle}
          canSave={canSave}
          handleAllPostContent={handleAllPostContent} 
          handleSetPostAuthor={handleSetPostAuthor} 
          postAuthor={postAuthor}
          handlePreview={handlePreview}
          preview={preview}
          size={size}
          handleShowBar={handleShowBar}
          handleCloseSidebar={handleCloseSidebar}
          showSideBar={showSideBar}
          userAction={userAction}
          isFetching={anyIsfetching}
        />        
      </div>
    </div>
  )
}

export default CreatePostComponents


