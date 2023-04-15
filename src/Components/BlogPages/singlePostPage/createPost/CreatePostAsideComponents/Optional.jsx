import React, { useEffect, useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { WritePostAsideOpenClosebar } from '../../../../ButtonAndOthers/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { optionalAdded } from '../../../../../Reduxstore/Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice'


const Optional = ({updatePostOptions}) => {
  const dispatchedOpitional = useSelector(state => state.postOptional)
  const [openCat, setOpenCat] = useState(false)
  const [Trending, setTrending] = useState(updatePostOptions !== undefined ? updatePostOptions.Trending : "")
  const [shared, setShared] = useState(updatePostOptions !== undefined ? updatePostOptions.shared : "")
  const [viewed, setViewed] = useState(updatePostOptions !== undefined ? updatePostOptions.viewed : "")

  const dispatch = useDispatch()
  
  const handleCheckedTrendig = (e) => {
    e.target.checked ? setTrending(() => true) : setTrending(() => false)
  }

  const handlesetViewed = (e) => {
    setViewed(()=> e.target.value)
  }

  const handlessetShared = (e) => {
    setShared(()=> e.target.value)
  }


  const handleOpenCloseChild = () => {
    setOpenCat((change) => !change)

    if(updatePostOptions !== undefined && openCat !== true) {
      setShared(()=> updatePostOptions.shared)
      setViewed(()=> updatePostOptions.viewed)
      setTrending(()=> updatePostOptions.Trending)
    }
  }

  useEffect(() => {
    if (dispatchedOpitional.shared === null || dispatchedOpitional.viewed === null) {
      setTrending(() => false)
      setViewed(()=> "")
      setShared(()=> "")
    }
  },[dispatchedOpitional])

  
  useEffect(() => {
    dispatch(optionalAdded(shared, viewed, Trending))
  },[Trending, shared, viewed, dispatch])

  return (
    <div className='text-sm bg-white lg:bg-[#eee]'>
      <WritePostAsideOpenClosebar BarName={"Excerpt (Optional)"} handle={handleOpenCloseChild}/>

      {/* form to add the share, view and trending post start here*/}
      <div className={`${openCat? "block" : "hidden"} px-3 mt-2 pb-16`}>
         
          <label htmlFor="sharedPost">SHARES</label>
          <input type="number" name='shares' id='sharedPost' value={shared} form="post_form" onChange={handlessetShared}/>
        
          <label htmlFor="viewedPost">VIEWS</label>
          <input type="number" name='views' id='viewedPost' value={viewed} form="post_form" onChange={handlesetViewed}/>

          <span className='inline-block mt-4'>
            <input type="checkbox" name='trendinpost' id='trending' className='hidden' onChange={handleCheckedTrendig}/>
            <label htmlFor="trending" >
            <div className='pr-0.5 mr-4'>Add to trending posts:</div>
              {Trending ? 
              <span className='px-2 inline-block text-2xl text-blue-400' >
                <FaToggleOn  className='inline-block'/>
              </span> :
              <span className='px-2 inline-block text-2xl  text-[#444]'>
                <FaToggleOff className='inline-block'/>
              </span> 
                }  
            </label>
          </span>
           

      </div>
    </div>
  )
}

export default Optional
