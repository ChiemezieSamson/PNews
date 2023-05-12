import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'
import {catAdded, catUnchecked, emptyCategories, selectAllPostCat, updateCategories} from "../../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice"
import { useCreateNewCategoriesMutation, useDeleteExistingCategoriesMutation, useUpdateExistingCategoriesMutation, } from '../../../../../Reduxstore/Slices/categories/Categories'
import useFetchedCategories from '../../../../SharedAsset/Spinners/categoriesSpinner'
import { parentCategoriesAndTags } from '../../../../../data'

const Category = ({updatePostCategories, parentCat, handleSelectedParentCat, handleSetCategory, 
  category, handlesetCheckedItemElements, checkedItemElemets}) => {
  const {categoriesContent, categoriesParents, categoriesaction, isFetching} = useFetchedCategories()
  const [addNewCategories, { isLoading }] = useCreateNewCategoriesMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateExistingCategoriesMutation()
  const [deleteCategoris, { isLoading: isDeleting }] = useDeleteExistingCategoriesMutation()
  const openCategoris = useSelector(selectAllPostCat)
  const [openCat, setOpenCat] = useState(false)  
  const [openAddnewCat, setOpenAddnewCat] = useState(false) 
  const [requiredText, setRequiredText] = useState(false)
  const categories = categoriesContent

  let parent = parentCat

  const dispatch = useDispatch()
  let type = "cat"

   // handling the display or hidden of of add new category component
  const handleOpenAddNewCat = () => {
    setOpenAddnewCat((change) => !change)
  }

  const handleParentCategory = (e) => {
    handleSelectedParentCat(e)
  }

  const handleNewCategoryName = (e) => {
    handleSetCategory(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  } 

  // handling the display or hidden of the whole category component
  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)

    if (updatePostCategories !== undefined && openCat !== true) {
      let action = "update"
      const allCategories = document.querySelectorAll(".allCategories")
      allCategories.forEach((element) => {
        if(updatePostCategories.includes(element.textContent)) {
          element.previousSibling.checked = true
          
          handlesetCheckedItemElements(element, action, type)
        }
      })
    } 
  }

  
  // the function is handle the selection of category when clicked,
  //the deselection of category when the already checked category is unchecked
  const handleRemoveCatOnDoubleClick = (event) => {
    let element = event
    
    // check to see if the category is not checked
    if (event.target.checked === false) { 
      let action = "delete"
      dispatch(catUnchecked({uncheckedCategory : event.target.value}))
    handlesetCheckedItemElements(element, action, type)

  } else {

    let action = "create"
    dispatch(catAdded({checkedCategory: event.target.value}))
    handlesetCheckedItemElements(element, action, type)
  }}

  const canSave =[parent, category].every(Boolean) && !isLoading && !categories.includes(category.toLowerCase())

  useEffect(() => {
    if(categoriesaction) {
      if(categories.includes(category.toLowerCase()) ) {
        setRequiredText(true)
      } else {
        setRequiredText(false)
      }
    }   
  },[category, categories, categoriesaction])
  

  // CREATE NEW CATEGORY
  const handleAddNewCat = async () => {
      if (canSave) {
        try {
          if(!categoriesParents._id) {
            await addNewCategories({parent, category}).unwrap()
            handleSetCategory("")
            handleSelectedParentCat("")
          } else {
            if(!isUpdating) {
              await updateCategory({categoryId: categoriesParents._id, parent, category})
              handleSetCategory("")
              handleSelectedParentCat("")
            }
          }          
        } catch (err) {
          console.error('Failed to save the post: ', err)
        } 
      handleSetCategory("")
      handleSelectedParentCat("")
    }
  }

  const canDelete = !isDeleting && Boolean(openCategoris[0])

  // DELETE CATEGORIES
  const handleDeletCat = async () => {
    if(canDelete) {
      let element = ""
      let action = "clear"
      for(let i = 0; i < checkedItemElemets.length; i++) {
        checkedItemElemets[i].checked = false // for each of the collected element first uncheck them
      }

      await deleteCategoris({categoryId: categoriesParents._id, openCategoris})

      handlesetCheckedItemElements(element, action, type)
      dispatch(emptyCategories())
    }    
  }

  useEffect(() => {
    if (updatePostCategories !== undefined) {
      dispatch(updateCategories(updatePostCategories))    
    }
  },[updatePostCategories, dispatch])


  return (    
    //* Category selection start here */
    <div className='text-sm disabled:opacity-40' disabled={isFetching}>
      {/* This is just the button for changing the diplay and hidden of the whole category component */}
      <WritePostAsideOpenClosebar BarName={"Categories"} handle={handleOpenCloseChild}/>
      
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 mb-10`}>      
        {categoriesaction ? <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-2'>
          {categories.map((cat, index) => {
            return (
            <li key={index} className="hover:bg-[#fff] capitalize">

              {/* check box of list of categories */}
              <input type="checkbox" id={index} name="category" value={cat} className="appearance-none checked:bg-blue-400
              focus:outline-0 focus:ring-0" form="post_form" onChange={handleRemoveCatOnDoubleClick}/>
              <label htmlFor={cat} className="ml-3 allCategories">{cat}</label>
            </li>
            )
          })}
        </ul> : categoriesContent}

        {/* Add new category open and close section */}
        <div className='py-1'>
          <span className='grid grid-cols-2 gap-x-3'> 

            {/* This button only opens and closes the addnew categories section */}
            <button className='text-blue-400 underline mt-3 mb-3 inline-block text-sm cursor-pointer
            hover:text-blue-500' onClick={handleOpenAddNewCat}>Add New Category</button>

            {/* This button remove a list of already checked categories from the list 
            (it is only visible when a category is already checked) */}
            <button className={`text-[#a7a7a7] underline mt-3 mb-3 inline-block text-sm cursor-pointer
            hover:text-red-400  ${checkedItemElemets.length === 0 ? "hidden" : "inline" } disabled:opacity-40`} 
            onClick={handleDeletCat}
            disabled={!canDelete}
            >Remove Category</button>
          </span>
          

          {/* The form for creating new category is here */}
          <form className={`${openAddnewCat? "block" : "hidden"}`} onSubmit={handleSubmit}>
            
            {/* input to create new category */}
            <label htmlFor="new_cat" className='inline-block text-sm text-[#444]'>NEW CATEGORY NAME</label>
            <input type="text" id='new_cat' name='add_new_category' className='mb-0' value={category} onChange={handleNewCategoryName}/>
            {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Category already exist!</p> : "" }
                      
            {/* select option to chose the parent the new created category will belong to */}
            <label htmlFor="parent_cat" className='inline-block text-sm text-[#444] mt-5'>PARENT CATEGORY</label>
            <select name="parent_categories" id="parent_cat" value={parentCat} onChange={handleParentCategory}>
            <option className="text-sm">— Parent Category —</option>
            {parentCategoriesAndTags.map((cat,index) => {
              return (
                <option value={cat} key={index} className="text-sm">{cat}</option>
              )
            })}
            </select>

            {/* Add New Category button */}
            <button type='submit' name='add_new_cat_button' className='text-sm text-blue-400 hover:text-blue-500 border 
            border-solid border-blue-400 hover:border-blue-500 px-4 py-2 disabled:opacity-40' onClick={handleAddNewCat} disabled={!canSave}>Add New Category</button>
          </form>         
        </div>        
      </div>     
 </div>
  )
}

export default Category
