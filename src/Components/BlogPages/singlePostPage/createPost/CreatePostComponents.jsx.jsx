import { useRef, useState } from "react";
import {BiImageAdd} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CreatePostAside from "./CreatePostAside";
import Preview from "./editorPreview/Preview";
import { convertToRaw, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { emptyCategories, selectAllPostCat } from '../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice'
import { emptyTag, selectAllPostTags } from '../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'
import { emptyOptional, selectAllPostOptionals } from '../../../../Reduxstore/Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice'
import { useFetchedPosts } from "../../../SharedAsset/Spinners/postsSpinner";
import { useCreateNewPostMutation } from "../../../../Reduxstore/Slices/posts/PostsSlice";

const CreatePostComponents = ({state}) => {
  const {content , action, refetch} = useFetchedPosts()
  const Posts = content

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(state),
  )

  const [postTitle, setPostTitle] = useState("")
  const [postImage, setPostImage] = useState("")
  const [postAuthor, setPostAuthor] = useState("")
  const [addNewPost, { isLoading }] = useCreateNewPostMutation()

  const postCategory = useSelector(selectAllPostCat)
  const postTags = useSelector(selectAllPostTags)
  const optional = useSelector(selectAllPostOptionals)

  const handleSetPostAuthor = (author) => {
    setPostAuthor(() => author.target.value.toLowerCase())
  }

  const postContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

  const dispatch = useDispatch()



  const canSave = [postTitle, postImage, postAuthor,postCategory[0],postTags[0]].every(Boolean) && !isLoading

  const handleAllPostContent = async () => {
    refetch()
    if (canSave) {
      try {
        await addNewPost({ postAuthor, postTitle, postImage, postContent , postCategory, postTags, optional }).unwrap()
        dispatch(emptyCategories())
        dispatch(emptyTag())
        dispatch(emptyOptional())
        setPostImage(() => "")
        setPostTitle(() => "")
        setPostAuthor(() => "")
        setEditorState(() => EditorState.createWithContent(state))
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const editorRef = useRef(null);

  const setEditorReference = (ref) => {
    editorRef.current = ref;
    // ref.focus();
  }

  return (
    <div className="grid lg:grid-cols-4 relative">
       {/* write post start here */}
      <div className='text-left lg:col-span-3 order-2 lg:order-1'>
        <div className="mt-5 mb-7">
          <input type="text" placeholder='My Title ...' id="title" name="head_title"  
          className='text-3xl text-[#444444] border-0 focus:border-b focus:outline-0 shadow-none p-5 pb-px' 
          autoFocus={true} form="post_form" value={postTitle}  onChange={(e) => setPostTitle(() => e.target.value)}/>
        </div>

        {action ? <img  src={Posts[4].postImage || null} alt="postImage" className='w-full h-80 rounded-xl object-cover' loading="lazy"/> : content}

        {/* write post form */}
        <form className="mt-2.5" id="post_form" onSubmit={handleSubmit}>
          {/* write form groups */}
          <label htmlFor="fileInput" className="bg-violet-50 px-2 rounded-full mr-3 hover:bg-violet-100 transition-all duration-200 ease-linear">
            <BiImageAdd className="inline-block" />
          </label>
          <input type="file" id="fileInput" className='w-auto text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-[#f70d28]
            hover:file:bg-violet-100 focus:outline-none focus:border-0 transition-all duration-200 ease-linear' name="image" 
            onChange={(e) => setPostImage(() => e.target.value)} value={postImage}/>
        </form>

        <div>
          <Editor 
              toolbarOnFocus
              editorState={editorState}
              onEditorStateChange={ setEditorState  }
              wrapperClassName="p-0 focus-within:pt-4 mt-7 leading-3 focus-within:bg-gray-200/40
              border border-b-0 border-x-0 border-solid border-[#eee]"
              editorClassName="focus:py-4 px-4 bg-[#fff] text-base"
              toolbarClassName="border border-solid border-[#eee] cursor-pointer mx-1.5"
              spellCheck
              hashtag={{
                separator: "",
                trigger: "#"
              }}
              toolbar={{
                // inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
              editorRef={setEditorReference}
            />       
        </div>

        <Preview editorText={editorState.getCurrentContent()} />
      </div>
      <div className="lg:order-2 order-1 text-left lg:col-span-1">
        <CreatePostAside 
        canSave={canSave}
        handleAllPostContent={handleAllPostContent} 
        handleSetPostAuthor={handleSetPostAuthor} 
        postAuthor={postAuthor}/> 
      </div>
    </div>
  )
}


export default CreatePostComponents


