import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'
import {catAdded, catUnchecked, emptyCategories, updateCategories} from "../../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice"
import { useSharedReduxCategories } from '../../../../SharedAsset/SharedReduxData'
import { createCategories, deleteCategoris } from '../../../../../Reduxstore/Slices/categories/Categories'

const Category = ({updatePostCategories}) => {
  const [categories, parentCategories] = useSharedReduxCategories()
  const [openCat, setOpenCat] = useState(false)
  const [checkedItemElemets, setCheckedItemElements] = useState([])
  const [openAddnewCat, setOpenAddnewCat] = useState(false)
  const [category , setCategory] = useState("")
  const [parent, setSelectedParentCat] = useState("")
  const [requiredParent, setRequiredParent] = useState(false)
  const [requiredText, setRequiredText] = useState(false)

 
  const openCategoris = useSelector(state => state.postCat)

  const dispatch = useDispatch()

   // handling the display or hidden of of add new category component
  const handleOpenAddNewCat = () => {
    setOpenAddnewCat((change) => !change)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  } 

  // handling the display or hidden of the whole category component
  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)

    if (updatePostCategories !== undefined && openCat !== true) {
      const allCategories = document.querySelectorAll(".allCategories")
      allCategories.forEach((element) => {
        if(updatePostCategories.includes(element.textContent)) {
          element.previousSibling.checked = true
          dispatch(catAdded({checkedCategory: element.textContent}))
          setCheckedItemElements((list) => [...list, element.previousSibling]);
        }
      })
    } 
    if(updatePostCategories !== undefined && openCat !== false){
      setCheckedItemElements(() => [])
    }
  }

  
  // the function is handle the selection of category when clicked,
  //the deselection of category when the already checked category is unchecked
  const handleRemoveCatOnDoubleClick = (event) => {

    // check to see if the category is not checked
    if (event.target.checked === false) { 
      dispatch(catUnchecked({uncheckedCategory : event.target.value}))

    // if so get the list element of already in the array and filter out the element containing the unchecked checkbox
      //then return the rest
    setCheckedItemElements((list) =>{
      let newElement = list.filter(item => item !== event.target)
      return newElement
     })

  } else {
    dispatch(catAdded({checkedCategory: event.target.value}))
    setCheckedItemElements((list) => {
       //first check if the element containing the checkbox of the value is already in the list
      if (list.includes(event.target)) {
        return [...list] // if so just return the list as it is
       } else {
        return [...list, event.target] // if not then add the new category parentelement to the list
       }
    })
  }}


  // CREATE NEW CATEGORY
  const handleAddNewCat = () => {
    if(parent === "— Parent Category —" || parent === "" ) {
      setRequiredText(false)
      setRequiredParent(true)      
    } else if (category === "") {
      setRequiredText(true)
      setRequiredParent(false)
    } else {
      setRequiredParent(false)
      setRequiredText(false)
    dispatch(createCategories(parent, category.toLowerCase()))
    
    setCategory(() => "")
    setSelectedParentCat(() => "")
    }
  }

  // DELETE CATEGORIES
  const handleDeletCat = () => {
    for(let i = 0; i < checkedItemElemets.length; i++) {
      checkedItemElemets[i].checked = false // for each of the collected element first uncheck them
    }

    dispatch(deleteCategoris(openCategoris))

    setCheckedItemElements(() => []) // empty all the collected checked item Elements array also

    dispatch(emptyCategories())
  }

  if (openCategoris.length < 1) {
    for(let i = 0; i < checkedItemElemets.length; i++) {
      checkedItemElemets[i].checked = false // for each of the collected element first uncheck them
    }
  }

  useEffect(() => {
    if (openCategoris.length < 1) {
      setSelectedParentCat(() => "")
      setCategory(() => "")
      setCheckedItemElements(() => [])
    }
  },[openCategoris])

  useEffect(() => {
    if (updatePostCategories !== undefined) {
      dispatch(updateCategories(updatePostCategories))
    }
  },[updatePostCategories, dispatch])


  return (    
    //* Category selection start here */
    <div className='text-sm'>
      {/* This is just the button for changing the diplay and hidden of the whole category component */}
      <WritePostAsideOpenClosebar BarName={"Categories"} handle={handleOpenCloseChild}/>
      
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>      
        <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-2'>
          {categories.map((cat,index) => {
            return (
            <li key={index} className="hover:bg-[#fff] capitalize">

              {/* check box of list of categories */}
              <input type="checkbox" id={cat} name="category" value={cat} className="appearance-none checked:bg-blue-400
              focus:outline-0 focus:ring-0" form="post_form" onChange={handleRemoveCatOnDoubleClick}/>
              <label htmlFor={cat} className="ml-3 allCategories">{cat}</label>
            </li>
            )
          })}
        </ul>

        {/* Add new category open and close section */}
        <div className='py-1'>
          <span className='grid grid-cols-2 gap-x-3'> 

            {/* This button only opens and closes the addnew categories section */}
            <button className='text-blue-400 underline mt-3 mb-3 inline-block text-sm cursor-pointer
            hover:text-blue-500' onClick={handleOpenAddNewCat}>Add New Category</button>

            {/* This button remove a list of already checked categories from the list 
            (it is only visible when a category is already checked) */}
            <button className={`text-[#a7a7a7] underline mt-3 mb-3 inline-block text-sm cursor-pointer
            hover:text-red-400  ${checkedItemElemets.length === 0 ? "hidden" : "inline" }`} 
            onClick={handleDeletCat}>Remove Category</button>
          </span>
          

          {/* The form for creating new category is here */}
          <form className={`${openAddnewCat? "block" : "hidden"}`} onSubmit={handleSubmit}>
            
            {/* input to create new category */}
            <label htmlFor="new_cat" className='inline-block text-sm text-[#444]'>NEW CATEGORY NAME</label>
            <input type="text" id='new_cat' name='add_new_category' className='mb-0' value={category} onChange={(e) => setCategory(() => e.target.value)}/>
            {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Tag name is required!</p> : "" }
                      
            {/* select option to chose the parent the new created category will belong to */}
            <label htmlFor="parent_cat" className='inline-block text-sm text-[#444] mt-5'>PARENT CATEGORY</label>
            <select name="parent_categories" id="parent_cat" value={parent} className="mb-0" onChange={(e) => setSelectedParentCat(() => e.target.value)}>
            <option className="text-sm">— Parent Category —</option>
            {parentCategories.map((cat,index) => {
              return (
                <option value={cat} key={index} className="text-sm">{cat}</option>
              )
            })}
            </select>
            {requiredParent ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Parent tag is required!</p> : ""}

            {/* Add New Category button */}
            <button type='submit' name='add_new_cat_button' className='text-sm text-blue-400 hover:text-blue-500 border 
            border-solid border-blue-400 hover:border-blue-500 px-4 py-2 mt-5' onClick={handleAddNewCat}>Add New Category</button>
          </form>         
        </div>        
      </div>     
 </div>
  )
}

export default Category
