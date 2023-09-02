import StickyBox from "react-sticky-box";
import FeaturedPosts from "./IndexPageComponents/FeaturedPosts";
import HeroImages from "./IndexPageComponents/HeroImages";
import FashionAndTrendsPosts from "./IndexPageComponents/FashionAndTrendsPosts";
import EntertainmentPosts from "./IndexPageComponents/EntertainmentPosts";
import TechPosts from "./IndexPageComponents/TechPosts";
import ImageComponent from "./IndexPageComponents/ImageComponent";
import LatestPosts from "./IndexPageComponents/LatestPosts";
import PopularPost from "./IndexPageComponents/IndexPageComponentAsideComponent.jsx/PopularPost";
import StayConnectedAndRecommended from "./IndexPageComponents/IndexPageComponentAsideComponent.jsx/StayConnectedAndRecommended";
import EditorsChioceAndDontMiss from "./IndexPageComponents/IndexPageComponentAsideComponent.jsx/EditorsChioceAndDontMiss";
import ArroundTheWorldPosts from "./IndexPageComponents/ArroundTheWorldPosts";
import { useFetchedPostByPagination, useFetchedPosts } from "../SharedAsset/Spinners/postsSpinner";
import useFetchedUsers from "../SharedAsset/Spinners/userSpinner";
import useFetchedCategories from "../SharedAsset/Spinners/categoriesSpinner";
import useFetchedComments from "../SharedAsset/Spinners/commentSpinner";


const IndexPage = () => {
  const {content: paginationContent, action: paginationAction, totalPages, currentPage, isFetching: paginationIsFetching} = useFetchedPostByPagination()
  const {content , action, isFetching} = useFetchedPosts()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction,} = useFetchedComments()
  const {categoriesParents, categoriesaction} = useFetchedCategories()
  const users = userContent
  const Posts = content
  const Comments = commentsContent

  const canOpen = [action, useraction, categoriesaction, commentaction, paginationAction].every(Boolean)

  return (
    <div className="text-left"> 

      <HeroImages 
        Posts={Posts}
        categories={categoriesParents}
        canOpen={canOpen}
        isFetching={isFetching}
      />

      <div className="md:grid md:grid-cols-3">

        <div className="col-span-2 md:mr-[4%]">

          <FeaturedPosts 
            Posts={Posts} 
            users={users}
            categories={categoriesParents}
            canOpen={canOpen}
            isFetching={isFetching}
          />

        
          <ArroundTheWorldPosts 
            Comments={Comments}
            Posts={Posts} 
            categories={categoriesParents} 
            users={users}
            canOpen={canOpen}
            isFetching={isFetching}
          />
            
          <FashionAndTrendsPosts 
            Posts={Posts} 
            canOpen={canOpen}
            categories={categoriesParents}
            isFetching={isFetching}
          />

          <EntertainmentPosts 
            Comments={Comments}
            Posts={Posts} 
            categories={categoriesParents} 
            users={users}
            canOpen={canOpen}
            isFetching={isFetching}
          />            
      
          <TechPosts 
            Posts={Posts} 
            categories={categoriesParents}
            canOpen={canOpen}
            isFetching={isFetching}
          />     
        </div>

        
        <aside className="col-span-1 hidden md:block md:ml-[4%]">

          <StickyBox offsetTop={0} offsetBottom={0}>

            <PopularPost 
              Posts={Posts}
              canOpen={canOpen}
              isFetching={isFetching}
            />

            <EditorsChioceAndDontMiss 
              Posts={Posts} 
              Comments={Comments}
              isFetching={isFetching}
              canOpen={canOpen}
            />
          </StickyBox>
        </aside>
      </div>

      <ImageComponent 
        Posts={Posts}  
        canOpen={canOpen}
        isFetching={isFetching}
      />
      
      <div className="md:grid md:grid-cols-3">

        <span className="col-span-2 md:mr-[4%]">

          <LatestPosts 
            Posts={paginationContent}
            isFetching={paginationIsFetching}
            canOpen={canOpen}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </span>

        <span className="col-span-1 md:ml-[4%]">
          <StickyBox offsetTop={0} offsetBottom={0}>

            <StayConnectedAndRecommended 
              Posts={Posts}
              isFetching={isFetching}
              canOpen={canOpen}
            />
            
          </StickyBox>
        </span>
      </div>   
    </div>  
  )
}

export default IndexPage