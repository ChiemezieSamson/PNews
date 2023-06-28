import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchedCategories from '../../../../../SharedAsset/Spinners/categoriesSpinner'
import { useDeleteExistingCategoriesMutation, useUpdateExistingCategoriesMutation } from '../../../../../../Reduxstore/Slices/categories/Categories'
import { catAdded, catUnchecked, emptyCategories, selectAllPostCat, updateCategories } from '../../../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice'
import { WritePostAsideOpenClosebar } from '../../../../../ButtonAndOthers/Buttons'
import { parentCategoriesAndTags } from '../../../../../../data'

const Category = ({updatePostCategories, handleSelectedParentCat, parentCat, handleSetCategory, category,
  handlesetCheckedItemElements, checkedItemElemets}) => {

    // fetch all the categories and their parent for category listing
  const {categoriesContent, categoriesParents, categoriesaction, isFetching} = useFetchedCategories()
  
    // Update category using the id of the first created categories
  const [updateCategory, { isLoading: isUpdating }] = useUpdateExistingCategoriesMutation()
  // Delete category makings sure that a category,user and authorities are correct
  const [deleteCategoris, { isLoading: isDeleting }] = useDeleteExistingCategoriesMutation()

  // Array of all the selected categories, coming from redux store
  const openCategoris = useSelector(selectAllPostCat) 

  const [openCat, setOpenCat] = useState(false)  // use to open and close the category section
  const [openAddnewCat, setOpenAddnewCat] = useState(false) // use to open and close the add new category section
  const [requiredText, setRequiredText] = useState(false) // text used to indicate that an option is needed
  const [errorText, setErrorText] = useState(false) /// text used to indicate that your category didn't save or there is an erro
  const [parentFullText, setParentFullText] = useState(false) // text used to indicate that you have create up five item for this array
  const [isValid, setIsValid] = useState(false); // regular expressions

  
  let categories  // list of all categorise arrary 
  const parent = parentCat // value of the selected parent
  const parentList  = parentCategoriesAndTags?.map((title, id) => ({id: id, title: title}) )// list of all categorise parent arrary 

  // make sure that the categories are all fetched before assigning
  if(categoriesaction) {
    categories = categoriesContent?.map((title, id) => ({id: id, title: title}) )
  }

  const dispatch = useDispatch() 

   // handling the display or hidden of of add new category component
  const handleOpenAddNewCat = () => {
    setOpenAddnewCat((change) => !change)
  }


  // regular expression that allows only letters and numbers (no symbols)
  const alphanumericRegex = /^[a-zA-Z0-9]+$/

  // handling setting the value of the input for category name and 
  //sending it to CreatePostAside component
  const handleNewCategoryName = (e) => {
    const { value } = e.target;
    const isValid = alphanumericRegex.test(value);
    setIsValid(isValid);
    handleSetCategory(e)
  }

  // handling setting the value of the parent slecte value  and 
  //sending it to CreatePostAside component
  const handleParentCategory = (e) => {
    handleSelectedParentCat(e)
  }

  // Check to see if the parent array is up to 5 
  useEffect(() => {
    if (parent) { // make sure the user have selected a parent first
      if (categoriesParents[parent]?.category.length < 5) {
        setParentFullText(() => false)
      } else {
        setParentFullText(() => true)
      }     
    } else {
      setParentFullText(() => false)
    }
  },[categoriesParents, parent])

  /************ CATEGORY SELECTION */
  
  // the function is handling the selection of category when clicked and
  //the deselection of category when the already checked category is unchecked
  const handleRemoveCatOnDoubleClick = (event) => {
    let element = event
    
    // check to see if the category is not checked
    if (event.target.checked === false) { 
      let action = "delete"

      dispatch(catUnchecked({uncheckedCategory : event.target.value}))

      // function to  filter out this element "li" parent from the array If the checkbox is false
      handlesetCheckedItemElements(element, action) 

    } else {
      let action = "create"

      dispatch(catAdded({checkedCategory: event.target.value}))

      // function to  add this element "li" parent to the array If the checkbox is true
      handlesetCheckedItemElements(element, action)
    }
  }

  /***************** CREATE */

  const canSave = [parent, category, isValid].every(Boolean)  && !parentFullText && !categoriesContent?.includes(category.toLowerCase())

  useEffect(() => { // making sure the user dont add an already existing category
    if(categoriesaction) {
      if(categoriesContent?.includes(category.toLowerCase()) ) {
        setRequiredText(true)
      } else {
        setRequiredText(false)
      }
    }   
  },[category, categoriesContent, categoriesaction])
  

  // CREATE NEW CATEGORY
  const handleAddNewCat = async () => {
      if (canSave) {

        setErrorText(false)

        try {
            // run if the user have create any catgory before and the id for that is available (saving to database)
            if(!isUpdating) {
              await updateCategory({categoryId: categoriesParents?._id, parent, category})

               // function to empty this parent and category for next user action
              handleSetCategory("")
              handleSelectedParentCat("")
          }         
        } catch (err) {
          setErrorText(true)
        } 
         // function to empty this parent and category for next user action
      handleSetCategory("")
      handleSelectedParentCat("")
    }
  }

   /***************** DELETE */

  const canDelete = !isDeleting && Boolean(openCategoris[0])

  // DELETE CATEGORIES
  const handleDeletCat = async () => {

    if(canDelete) {
      let element = ""
      let action = "clear"

      for(let i = 0; i < checkedItemElemets.length; i++) {
        // for each of the collected parent element first uncheck them
        checkedItemElemets[i].checked = false 
      }

      await deleteCategoris({categoryId: categoriesParents._id, openCategoris})

      // function to empty all selected parent "li" element
      handlesetCheckedItemElements(element, action)

      dispatch(emptyCategories())
    }    
  }

   // handling the display or hidden of the whole category component
  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)

    if (openCategoris?.length > 0) {
      let action = "update"

      // get all the category elements
      const allCategories = document.querySelectorAll(".allCategories")

      allCategories.forEach((element) => {
        // check if the content of the element is found in updatePostCategories and 
        // if found change the check box to checked
        if(updatePostCategories.includes(element.textContent.toLowerCase())) {
          element.previousSibling.checked = true
          
           // function to updates all selected parent "li" element
          handlesetCheckedItemElements(element, action)
        }
      })
    } 
  }

  useEffect(() => {
    if (updatePostCategories?.length > 0) {
      dispatch(updateCategories(updatePostCategories))    
    }
  },[updatePostCategories, dispatch])


  return (    
   //* Category selection start here */
   <div className='text-sm disabled:opacity-40' disabled={isFetching}>

    {/* This is just the button for changing the diplay and hidden of the whole category component */}

    <WritePostAsideOpenClosebar BarName={"Categories"} handle={handleOpenCloseChild}/>
    
    <div className={`${openCat ? "block" : "hidden"} px-3 mt-2 mb-10`}>  
      {errorText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to save the Category</p> : "" }    
      
      {categoriesaction ? 
        <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-[2%] text-stone-700'>

          {categories.map((cat) => {
            return (
              <li key={cat.id} className="hover:bg-neutral-100 capitalize">

                {/* check box of list of categories */}
                <input 
                  type="checkbox" 
                  aria-label='checkbox' 
                  id={cat.id} 
                  name="category" 
                  value={cat.title} 
                  className="appearance-none font-poppins checked:bg-blue-400 aria-checked:bg-sky-700 focus:outline-0 focus:ring-0" 
                  form="post_form" 
                  onChange={handleRemoveCatOnDoubleClick}
                />
                <label htmlFor={cat.title} className="ml-3 inline-block text-sm text-stone-700 allCategories">{cat.title}</label>
              </li>
            )
          })}
        </ul> : 
        categoriesContent
      }

      {/* Add new category open and close section */}

      <div className='py-1'>
        <span className='grid grid-cols-2 gap-x-3'> 

          {/* This button only opens and closes the addnew categories section */}

          <button 
          className={`text-blue-400 underline my-3 inline-block text-sm cursor-pointer
          hover:text-blue-600 TextHeadertransition ${openAddnewCat ? "text-left" : "text-center"}`} 
          onClick={handleOpenAddNewCat}>{openAddnewCat ? "Close" : "Add New Category"}</button>

          {/* This button remove a list of already checked categories from the list 
          (it is only visible when a category is already checked) */}

          <button 
          className={`text-stone-400/60 underline my-3 inline-block text-sm cursor-pointer
          hover:text-red-400 TextHeadertransition ${checkedItemElemets.length === 0 ? "hidden" : "inline" } disabled:opacity-40`} 
          onClick={handleDeletCat} disabled={!canDelete}>Remove Category</button>
        </span>
        

        {/* The form for creating new category is here */}

        <form name="new-category" className={`${openAddnewCat ? "block" : "hidden"} mt-3`} onSubmit={(e) => e.preventDefault()}>
          
          {/* input to create new category */}

          <label htmlFor="new_cat" className='inline-block text-sm text-stone-700'>NEW CATEGORY NAME</label>
          <input 
            type="text" 
            id='new_cat' 
            name='add_new_category' 
            aria-label='text' 
            maxLength={13}              
            required
            className={`mb-0 aria-required:bg-rose-500 font-poppins 
            ${(!isValid && category) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
              ""}`} 
            autoFocus={true}
            value={category}
            onChange={handleNewCategoryName}
          />
          {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Category already exist!</p> : "" }
                    
          {/* select option to chose the parent the new created category will belong to */}

          <label htmlFor="parent_cat" className='inline-block text-sm text-stone-700 mt-5'>PARENT CATEGORY</label>
          <select 
            name="parent_categories"               
            id="parent_cat" 
            className='mb-0 aria-required:bg-rose-500 font-poppins'
            aria-label='select'
            required
            value={parentCat} 
            onChange={handleParentCategory} 
          >
            <option className="text-sm prose inline-block">— Parent Category —</option>
            {parentList.map((parent) => {
              return (
                <option value={parent.title} key={parent.id} className="text-sm inline-block prose">{parent.title}</option>
              )
            })}
          </select>
          {parentFullText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Maximum categories for this parent reached!</p> : "" }

          {/* Add New Category button */}
          <button 
            type='submit' 
            name='add_new_cat_button' 
            className='text-sm text-blue-400 hover:text-blue-500 border disabled:hover:text-blue-400
            border-solid border-blue-400 mt-5 hover:border-blue-500 px-4 py-2 disabled:opacity-40' 
            onClick={handleAddNewCat} 
            disabled={!canSave}>Add New Category</button>
        </form>         
       </div>        
    </div>     
  </div>
  )
}

export default Category