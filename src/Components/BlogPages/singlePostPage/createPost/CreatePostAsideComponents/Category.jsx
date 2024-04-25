import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchedCategories from '../../../../SharedAsset/Spinners/categoriesSpinner'
import { useCreateNewCategoriesMutation, useDeleteExistingCategoriesMutation, useUpdateExistingCategoriesMutation } from '../../../../../Reduxstore/Slices/categories/Categories'
import {catAdded, catUnchecked, emptyCategories, selectAllPostCat, updateCategories} from "../../../../../Reduxstore/Slices/PostsComponentSlices/postcategory/PostcategoriesSlice"
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'
import { parentCategoriesAndTags } from '../../../../../data'
import { CategoryAndtagRemoveMessage, isFecthingStyle } from '../../../../SharedAsset/SharedAssets'
import { HeroOneBussinessFavoriteImageSpinner } from '../../../../SharedAsset/Spinners/Spinner'
import { textAndNumberOnly } from '../../../../SharedAsset/Vaidations/RegularExpression'

const Category = ({handleSelectedParentCat, parentCat, handleSetCategory, category, userAction, isFetching, 
  handlesetCheckedItemElements, checkedItemElemets, updatePostCategories, postId}) => {

    // fetch all the categories and their parent for category listing
  const {categoriesContent, categoriesParents, categoriesaction, isFetching: categoriesIsFetching} = useFetchedCategories()
    // Create new category onec if none have been created before
  const [addNewCategories, { isLoading, isFetching: CreateIsFetching}] = useCreateNewCategoriesMutation()
    // Update category using the id of the first created categories
  const [updateCategory, { isLoading: isUpdating, isFetching: UpdateIsFetching}] = useUpdateExistingCategoriesMutation()
    // Delete category makings sure that a category,user and authorities are correct
  const [deleteCategoris, { isLoading: isDeleting, isFetching: DeleteIsFetching}] = useDeleteExistingCategoriesMutation()

  // Array of all the selected categories, coming from redux store
  const openCategoris = useSelector(selectAllPostCat) 

  const [openCat, setOpenCat] = useState(false)  // use to open and close the category section
  const [openAddnewCat, setOpenAddnewCat] = useState(false) // use to open and close the add new category section
  const [requiredText, setRequiredText] = useState(false) // text used to indicate that an option is needed
  const [errorText, setErrorText] = useState(false) /// text used to indicate that your category didn't save or there is an erro
  const [parentFullText, setParentFullText] = useState(false) // text used to indicate that you have create up five item for this array
  const [isValid, setIsValid] = useState(false); // regular expressions
  // open and close the remove category yes or no text when delete is clicked
  const [deleteMessage , setDeleteMessage] = useState(false) 

  let categories  // list of all categorise arrary 
  const parent = parentCat // value of the selected parent
  const parentList  = parentCategoriesAndTags?.map((title, id) => ({id: id, title: title}) )// list of all categorise parent arrary 
  const isfectchingAll = DeleteIsFetching || CreateIsFetching || UpdateIsFetching || isFetching || categoriesIsFetching
  const canOpen = [userAction, categoriesaction].every(Boolean)

  // make sure that the categories are all fetched before assigning
  if(canOpen) {

    categories = categoriesContent?.map((title, id) => ({id: id, title: title}) )
  }

  const dispatch = useDispatch() 

  // handling the display or hidden of the whole category component
  const handleOpenCloseChild = () => {

    setOpenCat((change) => !change)
    setOpenAddnewCat(() => false)
    setDeleteMessage(() => false)

    if (postId && openCategoris?.length > 0) {
      let action = "update"

      if(updatePostCategories !== undefined) {

        // get all the category elements
        const allCategories = document.querySelectorAll(".allCategories")
  
        allCategories.forEach((element) => {
          // check if the content of the element is found in updatePostCategories and 
          // if found change the check box to checked
          if(updatePostCategories?.includes(element.textContent.toLowerCase())) {
  
            element.previousSibling.checked = true
            
             // function to updates all selected parent "li" element
            handlesetCheckedItemElements(element, action)
          }
        })
      }
    } 
  }

   // handling the display or hidden of add new category component
  const handleOpenAddNewCat = () => {

    setOpenAddnewCat((change) => !change)
  }

  // handling the remove category
  const handleSetDeleteMessage = () => {

    setDeleteMessage(() => false)
  }

  // handling setting the value of the input for category name and 
  //sending it to CreatePostAside component
  const handleNewCategoryName = (e) => {

    const { value } = e.target;
    const { isValid } = textAndNumberOnly(value);
    setIsValid(isValid);
    handleSetCategory(e)
  }

  // handling setting the value of the parent slecte value  and 
  //sending it to CreatePostAside component
  const handleParentCategory = (e) => {

    handleSelectedParentCat(e)
  }

  // Check to see if the parent array is up to 10
  useEffect(() => {

    if (parent ) { // make sure the user have selected a parent first

      if (categoriesParents[parent]?.category?.length < 10 || categoriesParents[parent]?.category?.length === undefined) {

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

      // function to filter out this element "li" parent from the array If the checkbox is false
      handlesetCheckedItemElements(element, action) 

    } else {
      let action = "create"

      dispatch(catAdded({checkedCategory: event.target.value}))

      // function to add this element "li" parent to the array If the checkbox is true
      handlesetCheckedItemElements(element, action)
    }
  }

  /***************** CREATE */

  const canSave = [parent, category, isValid].every(Boolean) && !isLoading && !parentFullText && !categoriesContent?.includes(category?.toLowerCase())

  useEffect(() => { // making sure the user dont add an already existing category

    if(canOpen) {

      if(categoriesContent?.includes(category?.toLowerCase()) ) {

        setRequiredText(true)
      } else {

        setRequiredText(false)
      }
    }   
  },[category, categoriesContent, canOpen])
  

  // CREATE NEW CATEGORY
  const handleAddNewCat = async () => {

      if (canSave) {

        setErrorText(() => false)

        try {

          if(!categoriesParents?._id) { 
            // run if the user haven't create any catgory before. (saving to database)
            await addNewCategories({parent, category}).unwrap()

            // function to empty this parent and category for next user action
            handleSetCategory("")
            handleSelectedParentCat("")
          } else {

            // run if the user have create any catgory before and the id for that is available (saving to database)
            if(!isUpdating) {

              await updateCategory({categoryId: categoriesParents?._id, parent, category})

               // function to empty this parent and category for next user action
              handleSetCategory("")
              handleSelectedParentCat("")
            }
          }          
        } catch (err) {

          setErrorText(() =>  true)
          console.error('Failed to save the category: ', err)
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

      for(let i = 0; i < checkedItemElemets?.length; i++) {

        // for each of the collected parent element first uncheck them
        checkedItemElemets[i].checked = false 
      }

      await deleteCategoris({categoryId: categoriesParents?._id, openCategoris})

      handleSetDeleteMessage()

      // function to empty all selected parent "li" element
      handlesetCheckedItemElements(element, action)

      dispatch(emptyCategories())
    }    
  }

  useEffect(() => {

    if (postId && updatePostCategories?.length > 0) {

      if(updatePostCategories !== undefined) {

        dispatch(updateCategories(updatePostCategories))    
      }
    }
  },[updatePostCategories, dispatch, postId])

  return (    
    //* Category selection start here */
    <div className="text-sm">

      {/* This is just the button for changing the diplay and hidden of the whole category component */}
      <WritePostAsideOpenClosebar BarName={"Categories"} handle={handleOpenCloseChild}/>
      
      <div className={`${openCat ? "block" : "hidden"} px-3 mt-2 mb-10 ${isFecthingStyle(isfectchingAll)} relative`}>  

        {errorText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Failed to save the category</p> : "" }    
        
        {canOpen ? 

          <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-[2%] text-stone-700'>

            {categories?.map((cat) => {
              
              return (

                <li key={cat?.id} className="hover:bg-neutral-100 capitalize">

                  {/* check box of list of categories */}
                  <input 
                    type="checkbox" 
                    aria-label='checkbox' 
                    id={cat?.id} 
                    name="category" 
                    value={cat.title} 
                    className="appearance-none font-poppins checked:bg-blue-400 aria-checked:bg-sky-700 focus:outline-0 focus:ring-0" 
                    form="post_form" 
                    onChange={handleRemoveCatOnDoubleClick}
                  />

                  <label htmlFor={cat?.id} className="ml-3 inline-block text-sm text-stone-700 allCategories">{cat.title}</label>
                </li>
              )
            })}
          </ul> 
          : 
           <HeroOneBussinessFavoriteImageSpinner
            groupStyle={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-[2%] text-stone-700"}
            imageStyle={"h-5 w-[80%] mx-auto my-2"}
            image={12}
          />    
        }

        {/* Add new category open and close section */}
        <div className="py-1 mt-4">

          <span className={`${checkedItemElemets?.length > 0 ? "grid grid-cols-2 gap-x-3 text-left max-w-sm mx-auto" : "inline"}`}> 

            {/* This button only opens and closes the addnew categories section */}
            <button 
              type='button'
              name='opencategories'
              id='opencategories'
              className="text-blue-400 underline my-3 inline-block text-sm cursor-pointer text-left hover:text-blue-600 TextHeadertransition"
              onClick={handleOpenAddNewCat}
            >{openAddnewCat ? "Close" : "Add New Category"}</button>

            {/* This button remove a list of already checked categories from the list it is only visible when a category is already checked) */}
            <button 
              type='button'
              name='deletecategories'
              id='deletecategories'
              className={`text-neutral-400 underline my-3 inline-block text-sm cursor-pointer text-right
              hover:text-red-400 TextHeadertransition ${checkedItemElemets?.length > 0 ? "inline" : "hidden"} disabled:opacity-40`} 
              onClick={() => setDeleteMessage(() => true)} 
              disabled={!canDelete}
            >Remove Category</button>

            <CategoryAndtagRemoveMessage
              deleteMessage={deleteMessage}
              checkedItemElemets={checkedItemElemets}
              handleDeletCat={handleDeletCat}
              handleSetDeleteMessage={handleSetDeleteMessage}
            />
          </span>
          

          {/* The form for creating new category is here */}
          <form name="new-category" className={`${openAddnewCat ? "block" : "hidden"} mt-3 ${isFecthingStyle(isfectchingAll)}`} onSubmit={(e) => e.preventDefault()}>
            
            {/* input to create new category */}
            <label htmlFor="new_cat" className='inline-block text-sm text-stone-700'>NEW CATEGORY NAME</label>

            <input 
              type="text" 
              id='new_cat' 
              name='add_new_category' 
              aria-label='text' 
              maxLength={13}              
              required
              className={`mb-0 aria-required:bg-rose-500 font-poppins disabled:opacity-40 ${(!isValid && category) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""}`} 
              autoFocus={true}
              disabled={!canOpen}
              value={category}
              onChange={handleNewCategoryName}
            />

            {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Category already exist!</p> : "" }
                      
            {/* select option to chose the parent the new created category will belong to */}

            <label htmlFor="parent_cat" className='inline-block text-sm text-stone-700 mt-5'>PARENT CATEGORY</label>

            <select 
              name="parent_categories"               
              id="parent_cat" 
              className='mb-0 aria-required:bg-rose-500 font-poppins disabled:opacity-40'
              aria-label='select'
              required
              value={parentCat} 
              disabled={!canOpen}
              onChange={handleParentCategory} 
            >

              <option className="text-sm prose inline-block">— Parent Category —</option>

              {parentList?.map((parent) => {

                return (

                  <option value={parent.title} key={parent?.id} className="text-sm inline-block prose">{parent.title}</option>
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
              disabled={!canSave}
            >Add New Category</button>
          </form>         
        </div>        
      </div>     
    </div>
  )
}

export default Category
