import Spinner from "./Spinner"
import { useGetCategoriesQuery } from "../../../Reduxstore/Slices/categories/Categories"



const useFetchedCategories = () => {
  const {
    data: Categories = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetCategoriesQuery()


  let categoriesContent
  let categoriesParents
  let categoriesaction = false


  if (isLoading) {
    categoriesContent = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    let newCategories = Object.assign({}, Categories[0]);

    let categories = [];
    for (const cats in newCategories) {
      if (newCategories[cats].category) {
        for (const eachCat of newCategories[cats].category) {
          categories.push(eachCat);
        }
      }
    }

    categoriesaction = true
    categoriesContent = categories
    categoriesParents = newCategories
  } else if (isError) {
    categoriesContent = <div>{error.toString()}</div>
  }

  return {categoriesContent, categoriesParents, categoriesaction, refetch, isFetching}
}




export default useFetchedCategories