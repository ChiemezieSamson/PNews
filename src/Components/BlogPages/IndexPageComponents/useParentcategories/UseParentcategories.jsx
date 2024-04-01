
const useParentcategories = (parent, categories, Posts, canOpen) => {
  const uniqueItems = new Map(); // used in making sure that a unqui array is returned
  const FindParentArray = canOpen && categories[parent]?.category
  const CopiedPosts =  canOpen &&  [...Posts]
  const newPost = []
  
  canOpen && CopiedPosts?.sort(() => Math.random() - 0.5)?.filter(post => {

    for (const category of FindParentArray) {

      if (post?.postCategory?.includes(category)){

        newPost?.push(post)
      }
    }
    
    return newPost
  })

  // Iterate through the array and add items with unique IDs to the map
  for (let i = 0; i < newPost?.length; i++) {

    const item = newPost[i];
    const id = item?._id;

    uniqueItems.set(id, item);
  }

  // Convert the map values to an array
  const uniqueItemsArray = Array.from(uniqueItems.values());

  return {allPost: uniqueItemsArray}
}

export default useParentcategories
