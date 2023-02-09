import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { cats } from '../../../../../data'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'



const Category = () => {
  const [categories, setCategories] = useState(cats)
  const [openCat, setOpenCat] = useState(false)
  const [checkedItemArry, setCheckedItemArry] = useState([])
  const [checkedItemElemets, setCheckedItemElements] = useState([])
  const [openAddnewCat, setOpenAddnewCat] = useState(false)
  const [AddnewCat, setAddnewCat] = useState("")
  const [selectedParentCat, setSelectedParentCat] = useState("")
  const [parentCat, setParentCat] = useState(["— Parent Category —",...cats])

  const handleOpenAddNewCat = () => {
    setOpenAddnewCat((change) => !change)
  }

  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)
  }

  const handleRemoveCatOnDoubleClick = (event) => {
    if (event.target.checked === false) { 
    setCheckedItemArry((list) => {
      let newlist = list.filter(item => item !== event.target.value)
      return newlist
    }) 
    setCheckedItemElements((list) =>{
      let newElement = list.filter(item => item !== event.target)
      return newElement
     })
  } else {
    setCheckedItemArry((list) => {
      if (list.includes(event.target.value)) {
      return [...list] 
      } else {
      return [...list, event.target.value]
    } })
    setCheckedItemElements((list) => {
      if (list.includes(event.target)) {
        return [...list] 
       } else {
        return [...list, event.target]
       }
    })
  }}

  const handleAddNewCat = () => {
    if(categories.includes(AddnewCat.toLowerCase())) {
      setCategories(list => [...list]) 
    } else {
      setCategories(list => [...list, AddnewCat])
      setParentCat(list => [...list, AddnewCat])
    }
    setAddnewCat(() => "")
  }

  const handleDeletCat = () => {
    setCheckedItemArry(() => [])
    setCheckedItemElements(() => [])

    for(let i = 0; i < checkedItemElemets.length; i++) {
      checkedItemElemets[i].checked = false

      setParentCat(list => {
        if (parentCat.includes(checkedItemElemets[i].value)) {
          let newlist = list.filter(item => item !== checkedItemElemets[i].value)
          return newlist
        }
      })   
      checkedItemElemets[i].parentElement.remove()
    }
  }

  useEffect(() => {
    console.log(checkedItemArry);
    console.log(checkedItemElemets);
    console.log(AddnewCat);
    console.log(selectedParentCat);
  },[checkedItemArry,checkedItemElemets,AddnewCat,selectedParentCat])

  return (    
    //* Category selection start here */
    <div className='text-sm'>
      <WritePostAsideOpenClosebar BarName={"Categories"} handle={handleOpenCloseChild}/>
      
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>      
        <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-2'>
          {categories.map((cat,index) => {
            return (
            <li key={index} className="hover:bg-[#fff] capitalize">
              <input type="checkbox" id={cat} name="category" value={cat.toLowerCase()} className="appearance-none checked:bg-blue-400
              focus:outline-0 focus:ring-0" form="post_form" onChange={handleRemoveCatOnDoubleClick}/>
              <label htmlFor={cat} className="ml-3">{cat}</label>
            </li>
            )
          })}
        </ul>

        {/* Add new category  */}
        <div className='py-1'>
          <span className='grid grid-cols-2 gap-x-3'>
            <button className='text-blue-400 underline mt-3 mb-3 inline-block text-sm cursor-pointer
            hover:text-blue-500' onClick={handleOpenAddNewCat}>Add New Category</button>
            <button className={`text-[#a7a7a7] underline mt-3 mb-3 inline-block text-sm cursor-pointer
            hover:text-red-400  ${checkedItemArry.length === 0 ? "hidden" : "inline" }`} 
            onClick={handleDeletCat}>Remove Category</button>
          </span>
          

          <form className={`${openAddnewCat? "block" : "hidden"}`}>
            <label htmlFor="new_cat" className='inline-block text-sm text-[#444]'>NEW CATEGORY NAME</label>
            <input type="text" id='new_cat' name='add_new_category' value={AddnewCat} onChange={(e) => setAddnewCat(() => e.target.value.toLowerCase())}/>
            <label htmlFor="parent_cat" className='inline-block text-sm text-[#444]'>PARENT CATEGORY</label>
            <select name="parent_categories" id="parent_cat" onChange={(e) => setSelectedParentCat(() => e.target.value.toLowerCase())}>
            {parentCat.map((cat,index) => {
              return (
                <option value={cat} key={index} className="text-sm">{cat}</option>
              )
            })}
            </select>

            {/* Add New Category button */}
            <button type='button' name='add_new_cat_button' className='text-sm text-blue-400 hover:text-blue-500 border 
            border-solid border-blue-400 hover:border-blue-500 px-4 py-2' onClick={handleAddNewCat}>Add New Category</button>
          </form>         
        </div>        
      </div>     
 </div>
  )
}

export default Category
