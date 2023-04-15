import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useSharedReduxCategories = () => {
  const categoriesFromRedux = useSelector(state => state.categories)
  const [categories, setCategories] = useState([])
  const [parentCategories, setParentCategories] = useState([])


  useEffect(() => {
    setCategories(() => [])
    let parent = []
    for (const cats in categoriesFromRedux) {
      parent.push(cats)
      if (categoriesFromRedux[cats].categories) { 
        setCategories((list) => [...list, ...categoriesFromRedux[cats].categories])
      }
    }
    setParentCategories(() => parent)
  },[categoriesFromRedux])
  return [categories, parentCategories]
}


