import { useGetTagsQuery } from "../../../Reduxstore/Slices/tags/TagsSlice"

// Use to fecth the Tags when ever a call to the function is made
const useFetchedTags = () => {

  const { // redux data flow and or returned information
    data: Tags = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetTagsQuery()

  // An array of all the Tags
  let tagsContent
  // An object of all the Tags and thier parent
  let tagsParents
  // Notify true only when the Tags are ready
  let tagsaction = false


  if (isLoading) {

    tagsaction = false

  } else if (isSuccess && Tags?.length > 0) {

    let newTags = Object.assign({}, Tags[0]); // copy just the first object

    let tags = [];

     // getting the category in all the parent categories and pushing to "categories"
    for (const cats in newTags) {

      if (newTags[cats]?.tags) {

        for (const eachTag of newTags[cats]?.tags) {
          
          tags?.push(eachTag);
        }
      }
    }

    tagsaction = true
    tagsContent = tags
    tagsParents = newTags
  } else if (isError) {

    tagsContent = <div>{error.toString()}</div>
  }

  return {tagsContent, tagsParents, tagsaction, isFetching}
}


export default useFetchedTags
