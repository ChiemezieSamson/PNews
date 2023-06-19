import React, { useState } from "react";
import { NavDirectionAndPageName } from "../../SharedAsset/SharedAssets";
import { PagesBlogPostComponent } from "../IndexPageComponents/SharedComponents";
import Aside from "../asidePage/Aside";
import StickyBox from "react-sticky-box";
import useFetchedComments from "../../SharedAsset/Spinners/commentSpinner";
import useFetchedUsers from "../../SharedAsset/Spinners/userSpinner";
import { useFetchedPostByQery } from "../../SharedAsset/Spinners/postsSpinner";
import { FaSistrix } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [search, setSearch] = useState("")
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByQery()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const navigate = useNavigate()

  const canOpen = [action, useraction, commentaction].every(Boolean)

  let searchIcon = <FaSistrix className="inline-block "/>

  const handleInputSearch = (event) => {
    setSearch(() => event.target.value)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    if (search !== "") {
      navigate(`/search?s=${search}`, {replace: true}, [navigate])
    } else {
      navigate("/search", {replace: true}, [navigate])
    }
  }

  return (
    <div className='md:grid md:grid-cols-3 text-left disabled:opacity-40' disabled={isFetching}>
      <div className="md:col-span-2 md:mr-[3%]">
        <NavDirectionAndPageName />

        <form id="search-form" role="search" 
          className='my-4 grid grid-cols-10 bg-neutral-200 p-3 mb-10'
          onSubmit={handleButtonClick}>

          <input id="s" type="search" placeholder='Search...' name='s'  aria-label="Search posts"
            className='bg-neutral-50 focus:outline-none m-0 col-span-9 caret-[#f70d28] placeholder:text-stone-800 
               focus:border-none border-none 
              shadow-inner text-center lg:text-left rounded-none'
              defaultValue={search}
              onChange={handleInputSearch}/>

          <button type="submit" 
            className='font-black col-span-1 m-0 p-0 text-sm md:text-lg text-neutral-100 bg-[rgb(247,13,40)]
            hover:bg-[rgb(230,13,40)]'>{searchIcon}</button>
        </form>
      
        {canOpen && 
          <PagesBlogPostComponent
            users={users}
            Comments={Comments}
            Posts={Posts.slice(0,10)}
            currentPage={currentPage}
            totalPages={totalPages}
            />}
          
      </div>

      <aside className="md:col-span-1 mt-8 md:ml-[3%]">
        <StickyBox offsetTop={0} offsetBottom={0}>
          <Aside Comments={Comments}/>
        </StickyBox>
      </aside>
    </div>       
  )
}

export default SearchPage