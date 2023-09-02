import { useGetCategoriesQuery } from "../../../Reduxstore/Slices/categories/Categories"

// Use to fecth the categories when ever a call to the function is made
const useFetchedCategories = () => {

  const { // redux data flow and or returned information
    data: Categories = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery()


  // An array of all the categories
  let categoriesContent
  // An object of all the categories and thier parent
  let categoriesParents
  // Notify true only when the categories are ready
  let categoriesaction = false


  if (isLoading) {

    // show a background Spinner
    categoriesContent = <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
    categoriesaction = false

  } else if (isSuccess && Categories.length > 0) {
    let newCategories = Object.assign({}, Categories[0]); // copy just the first object

    let categories = [];

    // getting the category in all the parent categories and pushing to "categories"
    for (const cats in newCategories) {
      if (newCategories[cats]?.category) {
        for (const eachCat of newCategories[cats]?.category) {
          categories?.push(eachCat);
        }
      }
    }

    categoriesaction = true
    categoriesContent = categories
    categoriesParents = newCategories
  } else if (isError) {

    categoriesContent = <div>{error.toString()}</div>
  }

  return {categoriesContent, categoriesParents, categoriesaction, isFetching}
}


export default useFetchedCategories