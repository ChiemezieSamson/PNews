import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import Preview from '../../createPost/editorPreview/Preview';
import UpdatePostAsideComponent from './UpdatePostAsideComponent';
import { postUpdated } from '../../../../../Reduxstore/Slices/posts/PostsSlice';
import { emptyCategories } from '../../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice';
import { emptyTag } from '../../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice';
import { emptyOptional } from '../../../../../Reduxstore/Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice';
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from 'react-router-dom';

const UpdatePostComponent = ({state, editPost}) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(state),
  )
  const post = useSelector(state => state.posts.find(post => post.id === editPost))

  const [postTitle, setPostTitle] = useState(post.postTitle)
  const [postImage, setPostImage] = useState(post.postImage)
  const [postAuthor, setPostAuthor] = useState(post.postAuthor)

  const postCategory = useSelector(state => state.postCat)
  const postTags = useSelector(state => state.postTags)
  const postOptional = useSelector(state => state.postOptional)

  const handleSetPostAuthor = (author) => {
    setPostAuthor(() => author.target.value.toLowerCase())
  }

  const postContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const postId = editPost


  const canSave = Boolean(postTitle) && Boolean(postImage) && Boolean(postAuthor) && Boolean(postCategory[0]) && Boolean(postTags[0])

  const handleAllPostContent = () => {
    const sampleMarkup = '<p>My post ...! |</p>'
    let html = draftToHtml(sampleMarkup);
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

    if (canSave) {
      dispatch(postUpdated({postId, postAuthor, postTitle, postImage, postContent , postCategory, postTags, postOptional}))
      
      dispatch(emptyCategories())
      dispatch(emptyTag())
      dispatch(emptyOptional())
      setPostImage(() => "")
      setPostTitle(() => "")
      setEditorState(() => EditorState.createWithContent(state))
      navigate(-1)
      setPostAuthor(() => undefined)
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

        <img key={post.id} src={post.postImage || null} alt="postImage" className='w-full h-80 rounded-xl object-cover' loading="lazy"/>

        {/* write post form */}
        <form className="mt-2.5" id="post_form" onSubmit={handleSubmit}>
          {/* write form groups */}
          <label htmlFor="fileInput" className="bg-violet-50 px-2 rounded-full mr-3 hover:bg-violet-100 transition-all duration-200 ease-linear">
            <BiImageAdd className="inline-block" />
          </label>
          <input type="file" id="fileInput" className='w-auto text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-[#f70d28]
            hover:file:bg-violet-100 focus:outline-none focus:border-0 transition-all duration-200 ease-linear' name="image" 
            onChange={(e) => setPostImage(() => e.target.value)} />
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

        <Preview editorText={editorState.getCurrentContent()}/>
      </div>
      <div className="lg:order-2 order-1 text-left lg:col-span-1">
        <UpdatePostAsideComponent 
        handleAllPostContent={handleAllPostContent} 
        editPost={editPost} 
        postAuthor={postAuthor}
        handleSetPostAuthor={handleSetPostAuthor}/> 
      </div>
    </div>
  )
}

export default UpdatePostComponent
