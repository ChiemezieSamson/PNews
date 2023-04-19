import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPostTags, tagAdded, tagUnchecked, updateTag } from '../../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'
import { createTags, deleteTag, selectAllTag } from '../../../../../Reduxstore/Slices/tags/TagsSlice'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'



const Tag = ({updatePostTags, parentTag, handleSelectedParentTag, handleSetAddTag, addTag}) => {
  const MyTags = useSelector(selectAllTag)
  const postTagArrays = useSelector(selectAllPostTags)
  const [openCat, setOpenCat] = useState(false)
  const [requiredParent, setRequiredParent] = useState(false)
  const [requiredText, setRequiredText] = useState(false)

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
  
 

  // CREATE TAG
  const handleAddTag = () => {
    if(parentTag === "— Parent Category —" || parentTag === "" ) {
      setRequiredText(false)
      setRequiredParent(true)      
    } else if (addTag === "") {
      setRequiredText(true)
      setRequiredParent(false)
    } else {
      setRequiredParent(false)
      setRequiredText(false)

      dispatch(createTags(parentTag, addTag.toLowerCase()))
    
      handleSetAddTag("")
      handleSelectedParentTag("")
    }
  }


  // DELETE TAG
  const handleDeletTag = (e) => {
    let remove = e.target.parentElement.firstChild.textContent.toLowerCase()

    dispatch(tagUnchecked({uncheckedTag: remove}))

    dispatch(deleteTag({uncheckedTag: remove}))
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
    <div className='text-sm'>
      <WritePostAsideOpenClosebar BarName={"Tags"} handle={handleOpenCloseChild}/>

      {/* form to enter new tag start here */}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="post_tag" className='inline-block text-sm text-[#444]'>ADD NEW TAG</label>
          <input type="text" id='post_tag' name='posttag' className='mb-0' value={addTag} onChange={handleAddNewTag}/>
          {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Tag name is required!</p> : "" }

          {/* select option to chose the parent the new created category will belong to */}
          <label htmlFor="parent_cat" className='inline-block text-sm text-[#444] mt-5'>PARENT TAG</label>
            <select name="parent_categories" id="parent_cat" className='mb-0' value={parentTag} onChange={handleParentTag}>
            <option className="text-sm">— Parent Tag —</option>
            {MyTags.parentTag.map((cat,index) => {
              return (
                <option value={cat} key={index} className="text-sm">{cat}</option>
              )
            })}
            </select>
            {requiredParent ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Parent tag is required!</p> : ""}

          <button type='submit' name='post_tag_button' id='post_tag' 
          className='border mt-5 border-solid border-blue-400 hover:border-blue-500 text-blue-400 hover:text-blue-500 text-xs px-3 py-1'
          onClick={handleAddTag} >Add</button>          
        </form>

        {/* list of tags start here */}
        <form className='mt-5' onSubmit={handleSubmit}>
          <ul>
          {MyTags.TagArray.map((tag, index) => {
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
          })}
          </ul>
        </form>
      </div>
    </div>
  )
}

export default Tag
