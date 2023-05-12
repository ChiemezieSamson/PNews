import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPostTags, tagAdded, tagUnchecked, updateTag } from '../../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'
import { useCreateNewTagsMutation, useDeleteExistingTagMutation, useUpdateExistingTagMutation } from '../../../../../Reduxstore/Slices/tags/TagsSlice'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'
import useFetchedTags from '../../../../SharedAsset/Spinners/tagsSpiner'
import { parentCategoriesAndTags } from '../../../../../data'


const Tag = ({updatePostTags, parentTag, handleSelectedParentTag, handleSetAddTag, addTag}) => {
  const {tagsContent, tagsParents, tagsaction, isFetching} = useFetchedTags()
  const [addNewTags, { isLoading }] = useCreateNewTagsMutation()
  const [updatingTag, { isLoading: isUpdating }] = useUpdateExistingTagMutation()
  const [deleteTag, { isLoading: isDeleting }] = useDeleteExistingTagMutation()
  const MyTags = tagsContent
  const postTagArrays = useSelector(selectAllPostTags)
  const [openCat, setOpenCat] = useState(false)
  const [requiredText, setRequiredText] = useState(false)

  let parent = parentTag
  let tag = addTag

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleParentTag = (e) => {
    handleSelectedParentTag(e)
  }

  const handleAddNewTag = (e) => {
    handleSetAddTag(e)
  }

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }


  const handleCheckboxChange = (e) => {
    let element = e     
  
    if (e.target.checked !== true) {
      e.target.parentElement.style.borderColor = "#e2e2e2"

      e.target.parentElement.lastChild.style.display = "none"

      dispatch(tagUnchecked({uncheckedTag: element.target.parentElement.firstChild.textContent.toLowerCase()}))    
    } 
    
    if(e.target.checked !== false){
      e.target.parentElement.style.borderColor = "#60a5fa"

      e.target.parentElement.lastChild.style.display = "inline-block"

      dispatch(tagAdded({checkedTag: element.target.parentElement.firstChild.textContent.toLowerCase()}))     
    }
  };
  
  const canSave = [parent, tag].every(Boolean) && !isLoading && !MyTags.includes(tag.toLowerCase())

  useEffect(() => {
    if(tagsaction) {
      if(MyTags.includes(tag.toLowerCase()) ) {
        setRequiredText(true)
      } else {
        setRequiredText(false)
      }
    }   
  },[tag, MyTags, tagsaction])

  // CREATE TAG
  const handleAddTag = async () => {
      if (canSave) {
        try {
          if(!tagsParents._id) {
            await addNewTags({parent, tag}).unwrap()
            handleSetAddTag("")
            handleSelectedParentTag("")
          } else {
            if(!isUpdating) {
              await updatingTag({tagId: tagsParents._id, parent, tag})
              handleSetAddTag("")
              handleSelectedParentTag("")
            }
          }    
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } 
      }
      handleSetAddTag("")
      handleSelectedParentTag("")    
  }


  // DELETE TAG
  const handleDeletTag = async (e) => {
    if(!isDeleting) {
      let remove = e.target.parentElement.firstChild.textContent.toLowerCase()

      dispatch(tagUnchecked({uncheckedTag: remove}))

      await deleteTag({tagId: tagsParents._id, uncheckedTag: remove})
    }
  }

  useEffect(() => {    
    if (updatePostTags !== undefined) {
      dispatch(updateTag(updatePostTags)) 
    } 
  },[updatePostTags, dispatch])

  useEffect(() => {
    if (postTagArrays.length > 0) {
      const alltags = document.querySelectorAll(".alltags")
      alltags.forEach((element) => {
        element.parentElement.style.borderColor = "#e2e2e2"
        element.nextSibling.checked = false
        element.parentElement.lastChild.style.display = "none"
        
        if(postTagArrays.includes(element.textContent.toLowerCase())){
          element.parentElement.style.borderColor = "#60a5fa"
          element.nextSibling.checked = true
          element.parentElement.lastChild.style.display = "inline-block"
        }
      })     
    } 

    if(postTagArrays.length === 0) {
      const alltags = document.querySelectorAll(".alltags")
      alltags.forEach((element) => {
        element.parentElement.style.borderColor = "#e2e2e2"
        element.nextSibling.checked = false
        element.parentElement.lastChild.style.display = "none"
      })
    }
  },[postTagArrays])


  return (
    <div className='text-sm disabled:opacity-40' disabled={isFetching}>
      <WritePostAsideOpenClosebar BarName={"Tags"} handle={handleOpenCloseChild}/>

      {/* form to enter new tag start here */}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="post_tag" className='inline-block text-sm text-[#444]'>ADD NEW TAG</label>
          <input type="text" id='post_tag' name='posttag' className='mb-0' value={addTag} onChange={handleAddNewTag}/>
          {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Tag name already exist!</p> : "" }

          {/* select option to chose the parent the new created category will belong to */}
          <label htmlFor="parent_tag" className='inline-block text-sm text-[#444] mt-5'>PARENT TAG</label>
            <select name="parent_tag" id="parent_tag" className='mb-0' value={parentTag} onChange={handleParentTag}>
            <option className="text-sm">— Parent Tag —</option>
            {parentCategoriesAndTags.map((tag,index) => {
              return (
                <option value={tag} key={index} className="text-sm">{tag}</option>
              )
            })}
            </select>

          <button type='submit' name='post_tag_button' id='post_tag' 
          className='border mt-5 disabled:opacity-40 border-solid border-blue-400 hover:border-blue-500 text-blue-400 hover:text-blue-500 text-xs px-3 py-1'
          onClick={handleAddTag} disabled={!canSave}>Add</button>          
        </form>

        {/* list of tags start here */}
        <form className='mt-5' onSubmit={handleSubmit}>
          <ul>
          {tagsaction ? MyTags.map((tag, index) => {
            return (
              <li key={index} className={`bg-[#e2e2e2] inline-block mr-2 mt-2 cursor-pointer text-sm border border-solid`}>
                <label htmlFor={`"Tag" + ${index}`} className='peer p-0.5 mr-1.5 inline-block capitalize text-center alltags' > 
                  {tag}
                </label>
                <input type='checkbox' name="posttags" id={`"Tag" + ${index}`} className='hidden' onChange={handleCheckboxChange}/>
                <button type='submit' title='delete' name='deletetag' className='px-[2.5px] py-0.5 hover:bg-red-400 hover:text-white peer-hover:bg-[#b7b6b6] 
                  peer-hover:text-[#444] hidden text-center' onClick={handleDeletTag}> &#10006;</button>                  
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
