import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tagAdded, tagUnchecked, updateTag } from '../../../../../Reduxstore/Slices/PostsComponentSlices/postsTags/PostsTagsSlice'
import { createTags, deleteTag } from '../../../../../Reduxstore/Slices/tags/TagsSlice'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'

const parentCategories = ["books", "lifestyle", "favorite", "business" , "random"]


const Tag = ({updatePostTags}) => {
  const tagsFromRedux = useSelector(state => state.tags)
  const dispatchedTagArrays = useSelector(state => state.postTags)
  const [tags, setTags] = useState([])
  const [tagChoosed, setTagChoosed] = useState([])
  const [openCat, setOpenCat] = useState(false)
  const [addTag, setAddTag] = useState("")
  const [parent, setSelectedParentCat] = useState("")
  const [requiredParent, setRequiredParent] = useState(false)
  const [requiredText, setRequiredText] = useState(false)
  

  const dispatch = useDispatch()

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)

    if (updatePostTags !== undefined && openCat !== true) {
      const alltags = document.querySelectorAll(".alltags")
      alltags.forEach((element) => {
        if(updatePostTags.includes(element.textContent)){
          element.parentElement.style.borderColor = "#60a5fa"
          element.nextSibling.checked = true
          element.parentElement.lastChild.style.display = "inline-block"
          setTagChoosed(list => [...list, element.parentElement])
          dispatch(tagAdded({checkedTag: element.textContent.toLowerCase()}))
        }
      })     
    } 
    if(updatePostTags !== undefined && openCat !== false){
      setTagChoosed(() => [])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleCheckboxChange = (e) => {
  
    if (e.target.checked !== true) {

      e.target.parentElement.style.borderColor = "#e2e2e2"

      e.target.parentElement.lastChild.style.display = "none"

      setTagChoosed(list => {
        let newlist = list.filter(item => item !==  e.target.parentElement)
        return newlist 
      })

    } else {
      e.target.parentElement.style.borderColor = "#60a5fa"

      e.target.parentElement.lastChild.style.display = "inline-block"

      setTagChoosed(list => [...list, e.target.parentElement])
    }
  };

 
  const handleChoosedTag = (e) =>{
    dispatchedTagArrays.includes(e.target.textContent.toLowerCase()) ?
    dispatch(tagUnchecked({uncheckedTag: e.target.textContent})) :
    dispatch(tagAdded({checkedTag: e.target.textContent.toLowerCase()}))
  }
 

  // CREATE TAG
  const handleAddTag = () => {
    if(parent === "— Parent Category —" || parent === "" ) {
      setRequiredText(false)
      setRequiredParent(true)      
    } else if (addTag === "") {
      setRequiredText(true)
      setRequiredParent(false)
    } else {
      setRequiredParent(false)
      setRequiredText(false)

      dispatch(createTags(parent, addTag.toLowerCase()))
    
      setAddTag(() => "")
      setSelectedParentCat(() => "")
    }
  }


  // DELETE TAG
  const handleDeletTag = (e) => {

    e.target.previousSibling.checked = false
    e.target.parentElement.style.borderColor = "#e2e2e2"
    e.target.style.display = "none"

    dispatch(deleteTag({uncheckedTag: e.target.parentElement.firstChild.textContent.toLowerCase()}))

    dispatch(tagUnchecked({uncheckedTag: e.target.parentElement.firstChild.textContent.toLowerCase()}))
  }


  useEffect(() => {
    setTags(() => [])
    for (const tag in tagsFromRedux) {
      if (tagsFromRedux[tag].tags) { 
        setTags((list) => [...list, ...tagsFromRedux[tag].tags])
      }
    }
  },[tagsFromRedux])

  useEffect(() => {
    if(dispatchedTagArrays.length < 1) {
      
    for(const selectedTags of tagChoosed) {
      selectedTags.style.borderColor = "#e2e2e2"
      selectedTags.lastChild.style.display = "none"
    }

      setSelectedParentCat(() => "")
      setAddTag(() => "")
    }
  },[dispatchedTagArrays, tagChoosed]) 

  useEffect(() => {
    if (updatePostTags !== undefined) {
      dispatch(updateTag(updatePostTags))     
    } 
  },[updatePostTags, dispatch])
  
  return (
    <div className='text-sm'>
      <WritePostAsideOpenClosebar BarName={"Tags"} handle={handleOpenCloseChild}/>

      {/* form to enter new tag start here */}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="post_tag" className='inline-block text-sm text-[#444]'>ADD NEW TAG</label>
          <input type="text" id='post_tag' name='posttag' className='mb-0' value={addTag} onChange={(e) =>  setAddTag(() => e.target.value)}/>
          {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Tag name is required!</p> : "" }

          {/* select option to chose the parent the new created category will belong to */}
          <label htmlFor="parent_cat" className='inline-block text-sm text-[#444] mt-5'>PARENT CATEGORY</label>
            <select name="parent_categories" id="parent_cat" className='mb-0' value={parent} onChange={(e) => setSelectedParentCat(() => e.target.value)}>
            <option className="text-sm">— Parent Category —</option>
            {parentCategories.map((cat,index) => {
              return (
                <option value={cat} key={index} className="text-sm">{cat}</option>
              )
            })}
            </select>
            {requiredParent ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Parent tag is required!</p> : ""}

          <button type='submit' name='post_tag_button' id='post_tag' 
          className='border mt-5 border-solid border-blue-400 hover:border-blue-500 text-blue-400 hover:text-blue-500 text-xs px-3 py-1'
          onClick={handleAddTag}>Add</button>
        </form>

        {/* list of tags start here */}
        <form className='mt-5' onSubmit={handleSubmit}>
          <ul>
          {tags.map((tag, index) => {
            return (
              <li key={index} className={`bg-[#e2e2e2] inline-block mr-2 mt-2 cursor-pointer text-sm border border-solid`}>
                <label htmlFor={`"Tag" + ${index}`} className='peer p-0.5 mr-1.5 inline-block capitalize text-center alltags' onClick={handleChoosedTag}>
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
