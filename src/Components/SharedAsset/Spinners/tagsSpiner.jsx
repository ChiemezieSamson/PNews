import { useGetTagsQuery } from "../../../Reduxstore/Slices/tags/TagsSlice"
import Spinner from "./Spinner"




const useFetchedTags = () => {
  const {
    data: Tags = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetTagsQuery()


  let tagsContent
  let tagsParents
  let tagsaction = false


  if (isLoading) {
    tagsContent = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    let newTags = Object.assign({}, Tags[0]);

    let tags = [];
    for (const cats in newTags) {
      if (newTags[cats].tags) {
        for (const eachTag of newTags[cats].tags) {
          tags.push(eachTag);
        }
      }
    }

    tagsaction = true
    tagsContent = tags
    tagsParents = newTags
  } else if (isError) {
    tagsContent = <div>{error.toString()}</div>
  }

  return {tagsContent, tagsParents, tagsaction, refetch, isFetching}
}


export default useFetchedTags
