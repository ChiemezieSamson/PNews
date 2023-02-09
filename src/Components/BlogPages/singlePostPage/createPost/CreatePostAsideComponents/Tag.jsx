import React, { useEffect, useState } from 'react'
import { tags } from '../../../../../data'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'



const Tag = () => {
  const [openCat, setOpenCat] = useState(false)
  const [tagColorChange, setTagColorChange] = useState(false)
  const [tagChoosed, setTagChoosed] = useState([])
  const [addTag, setAddTag] = useState(" ")
  const [newAddTag, setNewAddTag] = useState(tags)

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
  }

  const handleAddTag = () => {
    let id = newAddTag.length - 1
    let newId
    id > 0 ? newId = newAddTag[id].id : newId = 1
    let addedTag = {id: newId + 1, tag: addTag.toLowerCase()}
    const checktag = newAddTag.map(tag => tag.tag)
     
    checktag.includes(addedTag.tag) || addedTag.tag === " " ? setNewAddTag((list) => [...list]) : 
    setNewAddTag((list) => [...list, addedTag])
    setAddTag(() => " ")
  }

  const handleInput = (e) => {
    setAddTag(() => e.target.value)
  }

  const handleChoosedTag = (e) =>{
    setTagChoosed(list => {
      if (list.includes(e.target.textContent.toLowerCase())) {
        let newlist = list.filter(item => item !==  e.target.textContent)
        setTagColorChange(() =>  false)
        e.target.parentElement.style.backgroundColor = "#e2e2e2"
        return newlist 
       } else {
        setTagColorChange(() =>  true)
        e.target.parentElement.style.backgroundColor = "#60a5fa"
        return [...list,e.target.textContent]
       }})
  }

  const handleDeletTag = (e) => {
    const checktag = newAddTag.map(tag => tag.tag)
    checktag.includes(e.target.parentElement.firstChild.textContent.toLowerCase()) ?
    setTagChoosed((list) => {
      let newlist = list.filter(item => item.tag !==  e.target.parentElement.firstChild.textContent)
      return newlist}): e.target.parentElement.remove()
  }
  
  useEffect(() => {
    console.log(tagChoosed,tagColorChange);
  },[tagChoosed,tagColorChange])

  return (
    <div className='text-sm'>
      <WritePostAsideOpenClosebar BarName={"Tags"} handle={handleOpenCloseChild}/>

      {/* form to enter new tag start here */}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>
        <form>
          <label htmlFor="post_tag" className='inline-block text-sm text-[#444]'>ADD NEW TAG</label>
          <input type="text" id='post_tag' name='posttag' value={addTag} onChange={handleInput}/>
          <button type='button' name='post_tag_button' id='post_tag' 
          className='border border-solid border-blue-400 hover:border-blue-500 text-blue-400 hover:text-blue-500 text-xs px-3 py-1'
          onClick={handleAddTag}>Add</button>
        </form>

        {/* list of tags start here */}
        <ul className='mt-5'>
          {newAddTag.map((tag) => {
            return (
              <li key={tag.id} className="bg-[#e2e2e2] inline-block mr-2 mt-2 group cursor-pointer text-sm">
                <span className='peer p-0.5 mr-1.5 inline-block group-hover:pr-0 capitalize' onClick={handleChoosedTag}>{tag.tag.toLowerCase()}</span>
                <span className='p-[3px] hover:bg-red-400 hover:text-white peer-hover:bg-[#b7b6b6] hidden group-hover:inline-block peer-hover:text-[#444]'
                onClick={handleDeletTag}>
                 &#10006;
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Tag
