import React, { useEffect, useState } from 'react'
import { FaGripHorizontal, FaGripVertical } from 'react-icons/fa'
import { Hanbugar3 } from "../../../ButtonAndOthers/Buttons"
import { emptyOptional, optionalAdded } from '../../../../Reduxstore/Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice'
import { useDispatch } from 'react-redux'
import Author from './CreatePostAsideComponents/Author'
import Optional from './CreatePostAsideComponents/Optional'
import Tag from './CreatePostAsideComponents/Tag'
import Category from './CreatePostAsideComponents/Category'
import { emptyCategories } from '../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice'
import { emptyTag } from '../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'


const CreatePostAside = ({postTitle, handleAllPostContent, handleSetPostAuthor, postAuthor, canSave, handlePreview, preview,
  handleShowBar, handleCloseSidebar, showSideBar, userAction, post, postId, isFetching, size}) => {
  const [postCategory, setPostCategory] = useState(post?.postCategory)
  const [postTag, setPostTag] = useState(post?.postTags)
  const [parentCat, setSelectedParentCat] = useState("")
  const [parentTag, setSelectedParentTag] = useState("")
  const [category , setCategory] = useState("")
  const [addTag, setAddTag] = useState("")
  const [Trending, setTrending] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const [uncheckedTag, setUncheckedTag] = useState(false)
  const [shared, setShared] = useState(0)
  const [viewed, setViewed] = useState(0)
  const [textSubstring, setTextSubstring] = useState(25)
  const [checkedItemElemets, setCheckedItemElements] = useState([])

  const dispatch = useDispatch()

  // handling setting the value of the Author slecte value and 
  //sending it to CreatePostComponent
  const handlePostAuthor = (e) => {

    handleSetPostAuthor(e)
  }

  // handling setting the select value of category parent 
  const handleSelectedParentCat = (e) => {

    if(e?.target?.value === "— Parent Category —") {

      setSelectedParentCat(() => "")
    } else {

      setSelectedParentCat(() => e !== "" ? e?.target?.value : e)
    }
  }

  // handling setting the value of the input for category name
  const handleSetCategory = (e) => {

    setCategory(() => e !== "" ? e?.target?.value : e)
  }

  // handling setting the select value of tag parent 
  const handleSelectedParentTag = (e) => {

    if(e?.target?.value === "— Parent Tag —") {

      setSelectedParentTag(() => "")
    } else {

      setSelectedParentTag(() => e !== "" ? e?.target?.value : e)
    }
  }

  // handling setting the value of the input for tag name
  const handleSetAddTag = (e) => {

    setAddTag(() => e !== "" ? e?.target?.value : e)    
  }

  // Handle setting the number value for the views
  const handlesetViewed = (e) => {

    setViewed(()=> e.target.value)

    dispatch(optionalAdded(shared, viewed, Trending))
  }

   // Handle setting the number value for the shares
  const handlessetShared = (e) => {

    setShared(()=> e.target.value)

    dispatch(optionalAdded(shared, viewed, Trending))
  }

   // Handle setting the value for the trending posts
  const handleCheckedTrendig = (e) => {

    e.target.checked ? setTrending(() => true) : setTrending(() => false)

    dispatch(optionalAdded(shared, viewed, Trending))
  }

  // handleing setting CheckedItemElements for categories checkbox
  const handlesetCheckedItemElements = (element, action) => {

    // If the checkbox is true add this element "li" parent to the array
    if (action === "create") {

      setCheckedItemElements((list) => {

        //first check if the element containing the checkbox of the value is already in the list
        if (list.includes(element.target)) {

          return [...list] // if so just return the list as it is
        } else {

          return [...list, element.target] // if not then add the new category parentelement to the list
        }
      })      
    }

    // If the checkbox is false then filter out this element "li" parent from the array
    if (action === "delete") { 

      setCheckedItemElements((list) =>{

        let newElement = list.filter(item => item !== element.target)
        return newElement
      })  
    }

    if(element === "" && action === "clear") { 

      setCheckedItemElements(() => [])     
    }

     // If the "li" of the lable for each category is present set the setCheckedItemElements to the input 
    // element of the checkbox
    if (element.parentElement && action === "update") { 

      setCheckedItemElements((list) => [...list, element.previousSibling]);
    }
  }

  // handling reseting tag after publish
  const handleUncheckTag = () => {

    setUncheckedTag(() => false)
  }
  
  const handleDispatched = async () => {

    await handleAllPostContent() // handling calling of the function that save each post to the data base 

    if (canSave) {
      dispatch(emptyCategories())
      dispatch(emptyTag())
      dispatch(emptyOptional())
      handleSetPostAuthor("")

      for(let i = 0; i < checkedItemElemets?.length; i++) {

        checkedItemElemets[i].checked = false // for each of the collected element first uncheck them
      }

      setUncheckedTag(() => true)
    
      setSelectedParentCat(() => "")
      setSelectedParentTag(() => "")
      setTrending(() => false)
      setPostCategory(() => [])
      setPostTag(() => [])
      setViewed(()=> 0)
      setShared(()=> 0)
      setAddTag(() => "")
      setCategory(() => "")
      setCheckedItemElements(() => [])
    }
  }

  useEffect(() => { // updating changes made

    if (postId) {
      if(post?.optional?.shared === null || post?.optional?.shared === "") {

        setShared(() => 0)
      } else {
  
        setShared(() => post?.optional?.shared)
      }
  
      if(post?.optional?.viewed === null || post?.optional?.viewed === "") {
  
        setViewed(() => 0)
      }else {
  
        setViewed(() => post?.optional?.viewed)
      }
  
      if(post?.optional?.trending === undefined || post?.optional?.trending === "") {
  
  
        setTrending(() => false)
      } else {
  
        setTrending(() => post?.optional?.trending)
      }
  
      if(post?.optional?.favourite === undefined || post?.optional?.trending === "") {
  
        setFavourite(() => false)
      }else {
  
        setFavourite(() => post?.optional?.favourite)
      }
    }
  },[postId, post])

  useEffect(() => {

    dispatch(optionalAdded(shared, viewed, Trending, favourite))

  },[shared, viewed, Trending, favourite, dispatch])


  useEffect(() => {

    if (size.width > 729) {

      setTextSubstring(() => 70)
    } else if(size.width > 509) {

      setTextSubstring(() => 50)
    } else if (size.width > 389) {

      setTextSubstring(() => 35)
    } else {

      setTextSubstring(() => 25)
    }
  }, [size])
  
  return (
    <div className="lg:border lg:border-solid lg:border-slate-500 lg:shadow-stone-700 lg:shadow lg:ml-[4%] bg-white lg:bg-neutral-100">

       {/* post publish, preview , show and hide buttons */}
      <div className={`grid grid-cols-5 xl:grid-cols-7 justify-between gap-x-[2%] px-1 my-2 font-poppins font-semibold ${showSideBar && "mb-10"} max-w-sm ml-auto`}>

        <span className={`col-span-4 xl:col-span-6 grid grid-cols-2 gap-x-[2%]`}>

          <button 
            type='button'
            name='preview'
            className='text-stone-700 bg-neutral-300 hover:bg-neutral-400 hover:text-neutral-50 border-0 p-2.5 
            rounded-sm cursor-pointer text-base shadow-stone-700 shadow-sm TextHeadertransition disabled:opacity-40'
            disabled={!canSave || !userAction || isFetching}
            onClick={handlePreview}
          >{preview ? "Back" : "Preview"}</button>

          <button 
            className='text-neutral-50 bg-teal-600 hover:bg-teal-700 border-0 p-2.5 rounded-sm cursor-pointer text-base
            shadow-stone-700 shadow-sm TextHeadertransition disabled:opacity-40' 
            type='submit' 
            form="post_form" 
            disabled={!canSave || !userAction || isFetching || preview}
            onClick={handleDispatched}
          >Publish</button>
        </span>

        <button 
          type='button'
          className={`text-stone-700 ${showSideBar ? "bg-neutral-400" : "bg-neutral-100"} hover:bg-neutral-300 col-span-1 
          hover:text-neutral-50 border-0 p-2.5 rounded-sm cursor-pointer text-base shadow-stone-700 shadow-sm`} 
          onClick={handleShowBar}
        >
          {showSideBar ?

            <FaGripVertical className="text-white inline-block" />
              :                             
            <FaGripHorizontal className='inline-block'/>           
          }
        </button>
      </div>

      <div className={`${showSideBar ? "block" : "hidden"} bg-white lg:bg-neutral-100 divide-y divide-solid divide-slate-500`}>

        <div className={`lg:hidden`}> 

          <span className='px-1'>
            <Hanbugar3 closesidebar={handleCloseSidebar}/>
          </span>

          <h3 className='pt-8 my-0 mx-1 text-center capitalize font-round font-medium text-stone-800 text-lg sm:text-xl'>

            <span className='px-2'>
             {postTitle ? postTitle?.substring(0, textSubstring)  : "(no title)"} 
             {postTitle?.substring(0, textSubstring).length < postTitle.length && "..."}
            </span>
          </h3>
        </div>

        <Author 
          handlePostAuthor={handlePostAuthor} 
          postAuthor={postAuthor}
          userAction={userAction}
          isFetching={isFetching}
          postId={postId} 
        />

        <Category 
          handleSelectedParentCat={handleSelectedParentCat} 
          parentCat={parentCat} 
          handleSetCategory={handleSetCategory}
          category={category}
          handlesetCheckedItemElements={handlesetCheckedItemElements}
          checkedItemElemets={checkedItemElemets}
          userAction={userAction}
          isFetching={isFetching}  
          updatePostCategories={postCategory}
          postId={postId} 
        />    

        <Tag 
          parentTag={parentTag}
          addTag={addTag}
          handleSetAddTag={handleSetAddTag}
          handleSelectedParentTag={handleSelectedParentTag}
          updatePostTags={postTag}
          userAction={userAction}
          isFetching={isFetching}
          uncheckedTag={uncheckedTag}
          handleUncheckTag={handleUncheckTag}
          postId={postId} 
        />    

        <Optional
          handlessetShared={handlessetShared}
          handlesetViewed={handlesetViewed}
          handleCheckedTrendig={handleCheckedTrendig}
          Trending={Trending}
          shared={shared}
          viewed={viewed}
          userAction={userAction}
          isFetching={isFetching}
        />
      </div>       
    </div>
  )
}

export default CreatePostAside