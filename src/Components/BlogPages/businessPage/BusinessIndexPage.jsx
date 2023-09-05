import React from "react";
import StickyBox from "react-sticky-box";
import { AdminComponent, CategoriesComponent, isFecthingStyle, NavDirectionAndPageName, overLay, TimeComponent } from "../../SharedAsset/SharedAssets";
import Aside from "../asidePage/Aside";
import { PagesBlogPostComponent } from "../IndexPageComponents/SharedComponents";
import { Link } from "react-router-dom";
import { useFetchedPostByPaginationTwo } from "../../SharedAsset/Spinners/postsSpinner";
import { publicFolder } from "../../../data";
import useFetchedComments from "../../SharedAsset/Spinners/commentSpinner";
import useFetchedUsers from "../../SharedAsset/Spinners/userSpinner";
import { SharedBlogPageStyleOne } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import { HeroOneBussinessFavoriteImageSpinner } from "../../SharedAsset/Spinners/Spinner";

const BusinessIndexPage = () => {
  const {content , action, totalPages, currentPage, isFetching} = useFetchedPostByPaginationTwo()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction} = useFetchedComments()
  const Posts = content
  const users = userContent
  const Comments = commentsContent

  const canOpen = [action, useraction, commentaction].every(Boolean)
 
  return (
    <>
      {canOpen ?
        <div className={`${isFecthingStyle(isFetching)}`}>

          <ul className="hidden md:grid md:gap-1 md:grid-rows-6 md:grid-cols-7 mb-4 md:max-h-[450px] lg:max-h-[500px]">

            {Posts?.slice(0, 4)?.map((post) => {

              return (

                <li key={post?._id} className="md:first:col-start-1 md:first:col-end-4 md:first:row-start-1 md:first:row-end-7 
                    md:[&:nth-child(2)]:col-start-4 md:[&:nth-child(2)]:col-end-6 md:[&:nth-child(2)]:row-start-1 md:[&:nth-child(2)]:row-end-7  
                    md:[&:nth-child(3)]:col-start-6 md:[&:nth-child(3)]:col-end-8 md:[&:nth-child(3)]:row-start-1 md:[&:nth-child(3)]:row-end-4   
                    md:last:col-start-6 md:last:col-end-8 md:last:row-start-4 md:last:row-end-7 relative group">

                  <Link to={`/single/${post?._id}`}  className={overLay()}>
                    <img src={publicFolder + post?.postImage} alt="post"  loading="lazy"/>
                  </Link>

                  <span className="text-white absolute -top-[6px] left-0 z-30 max-w-fit inset-x-auto">
                    <CategoriesComponent cat={post?.postCategory[0]} />
                  </span>                    

                  <Link to={`/single/${post?._id}`} className="absolute group-first:bottom-[8%] group-[&:nth-child(2)]:bottom-[8%] bottom-[12%] max-w-fit text-white inset-x-auto z-30 mx-1">
                      <h4 className="group-first:text-lg group-first:lg:text-2xl HeroImageMultipleListH3" title='title'>
                        <span>
                          {post?.postTitle}
                        </span>
                      </h4>
                  </Link>

                  <span className='absolute bottom-0 max-w-fit text-white right-0 z-30 mx-1 rounded-md group-hover:backdrop-blur-sm group-hover:bg-black/10 group-hover:bg-blend-burn px-px'>
                    <span className="inline-block mr-4 hover:mainColor TextHeadertransition"> 
                      <AdminComponent user={post?.postAuthor} users={users}/>
                    </span>
                    <TimeComponent time={post?.createdAt}/>
                  </span> 
                </li>
              )
            })}
          </ul>
        </div>
        :
        <HeroOneBussinessFavoriteImageSpinner
          groupStyle={"hidden md:grid md:gap-1 md:grid-rows-6 md:grid-cols-7 mb-4 md:max-h-[450px] lg:max-h-[500px] h-screen"}
          imageStyle={`md:first:col-start-1 md:first:col-end-4 md:first:row-start-1 md:first:row-end-7 
          md:[&:nth-child(2)]:col-start-4 md:[&:nth-child(2)]:col-end-6 md:[&:nth-child(2)]:row-start-1 md:[&:nth-child(2)]:row-end-7  
          md:[&:nth-child(3)]:col-start-6 md:[&:nth-child(3)]:col-end-8 md:[&:nth-child(3)]:row-start-1 md:[&:nth-child(3)]:row-end-4   
          md:last:col-start-6 md:last:col-end-8 md:last:row-start-4 md:last:row-end-7 relative group`}
          image={4}
       />
      }

      <div className="md:hidden">
        <SharedBlogPageStyleOne 
          Posts={canOpen && Posts?.slice(1, 4)} 
          users={users}
          canOpen={canOpen}
          isFetching={isFetching}
        />
      </div>


      <div className='grid grid-flow-row md:grid-cols-3'>

        <aside className="md:col-span-1 mt-8 md:mr-[3%] order-last md:order-first">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Aside Comments={Comments} commentaction={commentaction}/>
          </StickyBox>
        </aside>

        <div className="md:col-span-2 md:ml-[3%]">
          <NavDirectionAndPageName />
        
          <PagesBlogPostComponent 
            users={users}
            Comments={Comments}
            Posts={canOpen && Posts?.slice(4, 12)}
            currentPage={currentPage}
            totalPages={totalPages}
            canOpen={canOpen}
            isFetching={isFetching}
          />
        </div>
      </div>
    </>     
  )
}

export default BusinessIndexPage