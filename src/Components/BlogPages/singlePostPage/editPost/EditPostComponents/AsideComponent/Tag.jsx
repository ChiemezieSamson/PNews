import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchedTags from '../../../../../SharedAsset/Spinners/tagsSpiner'
import { useDeleteExistingTagMutation, useUpdateExistingTagMutation } from '../../../../../../Reduxstore/Slices/tags/TagsSlice'
import { selectAllPostTags, tagAdded, tagUnchecked, updateTag } from '../../../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'
import { WritePostAsideOpenClosebar } from '../../../../../ButtonAndOthers/Buttons'
import { parentCategoriesAndTags } from '../../../../../../data'


const Tag = ({updatePostTags, parentTag, handleSelectedParentTag, handleSetAddTag, addTag}) => {
  // fetch all the tags and their parent for tags listing
  const {tagsContent, tagsParents, tagsaction, isFetching} = useFetchedTags()
  // Update tag using the id of the first created tags
  const [updatingTag, { isLoading: isUpdating }] = useUpdateExistingTagMutation()
  // Delete tag makings sure that a tag,user and authorities are correct
  const [deleteTag, { isLoading: isDeleting }] = useDeleteExistingTagMutation()
 
  // Array of all the selected tags, coming from redux store
  const postTagArrays = useSelector(selectAllPostTags)

  const [openCat, setOpenCat] = useState(false) // use to open and close the tag section
  const [requiredText, setRequiredText] = useState(false) // text used to indicate that an option is needed
  const [errorText, setErrorText] = useState(false) // text used to indicate that your tag didn't save or there is an erro
  const [parentFullText, setParentFullText] = useState(false) // text used to indicate that you have create up five item for this array
  const [isValid, setIsValid] = useState(false); // regular expressions

  let MyTags  // list of all tags arrary
  let tag = addTag
  const parent = parentTag  // value of the selected parent
  const parentList  = parentCategoriesAndTags?.map((title, id) => ({id: id, title: title}) )// list of all tags parent arrary 
 
  // make sure that the tags are all fetched before assigning
  if(tagsaction) {
    MyTags = tagsContent?.map((title, id) => ({id: id, title: title}) )
  }

  const dispatch = useDispatch()

  // handling the display or hidden of the whole tag component
  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)

    if (postTagArrays.length > 0) {
      const alltags = document.querySelectorAll(".alltags")
      alltags.forEach((element) => {
        element.parentElement.style.borderColor = "#e2e2e2"
        element.nextSibling.checked = false
        element.parentElement.lastChild.style.display = "none"
        
        if(updatePostTags.includes(element.textContent.toLowerCase())){
          element.parentElement.style.borderColor = "#60a5fa"
          element.nextSibling.checked = true
          element.parentElement.lastChild.style.display = "inline-block"
        }
      })     
    } 
  }

  // regular expression that allows only letters and numbers (no symbols)
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/

  // handling setting the value of the input for tag name and 
  //sending it to CreatePostAside component
  const handleAddNewTag = (e) => {
    const { value } = e.target;
    const isValid = alphanumericRegex.test(value);
    setIsValid(isValid);
    handleSetAddTag(e)
  }

  // handling setting the value of the parent slecte value and 
  //sending it to CreatePostAside component
  const handleParentTag = (e) => {
    handleSelectedParentTag(e)
  }

  // Check to see if the parent array is up to 5 
  useEffect(() => {
    if (parent) { // make sure the user have selected a parent first
      if (tagsParents[parent]?.tags.length < 5) {
        setParentFullText(() => false)
      } else {
        setParentFullText(() => true)
      }     
    } else {
      setParentFullText(() => false)
    }
  },[tagsParents, parent])

  /************ TAGS SELECTION */

   // the function is handling the selection of tags when clicked and
  //the deselection of tags when the already checked tag is unchecked
  const handleCheckboxChange = (e) => {
    let element = e     
  
    // check to see if the tag is not checked
    if (e.target.checked !== true) {
      e.target.parentElement.style.borderColor = "#e2e2e2"

      e.target.parentElement.lastChild.style.display = "none"

      dispatch(tagUnchecked({uncheckedTag: element.target.parentElement.firstChild.textContent.toLowerCase()}))    
    } 
    
    // check to see if the tag is checked
    if(e.target.checked !== false){
      e.target.parentElement.style.borderColor = "#60a5fa"

      e.target.parentElement.lastChild.style.display = "inline-block"

      dispatch(tagAdded({checkedTag: element.target.parentElement.firstChild.textContent.toLowerCase()}))     
    }
  };

   /***************** CREATE */
  
  const canSave = [parent, tag, isValid].every(Boolean) && !parentFullText && !tagsContent?.includes(tag.toLowerCase())

  useEffect(() => {  // making sure the user dont add an already existing tag
    if(tagsaction) {
      if(tagsContent?.includes(tag.toLowerCase()) ) {
        setRequiredText(true)
      } else {
        setRequiredText(false)
      }
    }   
  },[tag, tagsContent, tagsaction])

  // CREATE NEW TAG
  const handleAddTag = async () => {
      if (canSave) {

        setErrorText(false)
        
        try {
          // run if the user have create any tag before and the id for that is available (saving to database)
          if(!isUpdating) {
            await updatingTag({tagId: tagsParents._id, parent, tag})

            // function to empty this parent and category for next user action
            handleSetAddTag("")
            handleSelectedParentTag("")
          }    
        } catch (err) {
          setErrorText(true)
        } 
      }

      // function to empty this parent and category for next user action
      handleSetAddTag("")
      handleSelectedParentTag("")    
  }

  /***************** DELETE */

  const canDelete = !isDeleting && Boolean(postTagArrays[0])

  // DELETE TAG
  const handleDeletTag = async (e) => {

    if(canDelete) {
      let remove = e.target.parentElement.firstChild.textContent.toLowerCase()

      dispatch(tagUnchecked({uncheckedTag: remove}))

      await deleteTag({tagId: tagsParents._id, uncheckedTag: remove})
    }
  }

  useEffect(() => {    
    if (updatePostTags?.length > 0) {
      dispatch(updateTag(updatePostTags)) 
    } 
  },[updatePostTags, dispatch])

 
  return (
    <div className='text-sm disabled:opacity-40' disabled={isFetching}>

      {/* This is just the button for changing the diplay and hidden of the whole category component */}

      <WritePostAsideOpenClosebar BarName={"Tags"} handle={handleOpenCloseChild}/>

      {/* form to enter new tag start here */}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>
        {errorText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to save the Tag</p> : "" }

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="post_tag" className='inline-block text-sm text-stone-700'>ADD NEW TAG</label>
          <input 
            type="text" 
            id='post_tag' 
            name='posttag' 
            aria-label='text' 
            maxLength={22}              
            required
            className={`mb-0 aria-required:bg-rose-500 font-poppins 
            ${(!isValid && addTag) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
            ""}`} 
            autoFocus={true}
            value={addTag} 
            onChange={handleAddNewTag}
          />
          {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Tag name already exist!</p> : "" }

          {/* select option to chose the parent the new created tag will belong to */}

          <label htmlFor="parent_tag" className='inline-block text-sm text-stone-700 mt-5'>PARENT TAG</label>
            <select 
              name="parent_tag" 
              id="parent_tag" 
              className='mb-0 aria-required:bg-rose-500 font-poppins'
              aria-label='select'
              required
              value={parentTag} 
              onChange={handleParentTag}>

              <option className="text-sm prose inline-block">— Parent Tag —</option>
              {parentList.map((tag) => {
                return (
                  <option value={tag.title} key={tag.id} className="text-sm prose inline-block">{tag.title}</option>
                )
              })}
            </select>
            {parentFullText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Maximum tags for this parent reached!</p> : "" }

          <button 
            type='submit' 
            name='post_tag_button' 
            id='post_tag' 
            className='border mt-5 disabled:opacity-40 border-solid border-blue-400 hover:border-blue-500 text-blue-400 hover:text-blue-500 text-xs px-3 py-1'
            onClick={handleAddTag} 
            disabled={!canSave}>Add</button>          
        </form>

        {/* list of tags start here */}

        <form className='mt-5' onSubmit={(e) => e.preventDefault()}>
          <ul className='text-stone-700 font-poppins'>
            {tagsaction ? MyTags.map((tag) => {
              return (
                <li key={tag.id} className={`bg-[#e2e2e2] inline-block mr-2 mt-2 cursor-pointer text-sm border border-solid`}>
                  <label htmlFor={`"Tag" + ${tag.id}`} className='peer p-0.5 mr-1.5 inline-block capitalize text-center alltags cursor-pointer' > 
                    {tag.title}
                  </label>
                  <input type='checkbox' name="posttags" id={`"Tag" + ${tag.id}`} className='hidden' onChange={handleCheckboxChange}/>
                  
                  <button type='submit' title='delete' name='deletetag' className='px-[2.5px] py-0.5 hover:bg-red-500 hover:text-white peer-hover:bg-[#b7b6b6] 
                    peer-hover:text-stone-600 hidden text-center disabled:opacity-40 TextHeadertransition' onClick={handleDeletTag} disabled={!canDelete}> &#10006;</button>                  
                </li>
              )
            }) : tagsContent}
          </ul>
        </form>
      </div>
    </div>
  )
}

export default Tag