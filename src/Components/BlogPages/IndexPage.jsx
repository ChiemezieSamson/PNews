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
import PaginationFunctions from "./PaginationComponents/PaginationControl/PaginationFunctions/PaginationFunctions";
import { useFetchedPostByPagination, useFetchedPosts } from "../SharedAsset/Spinners/postsSpinner";
import useFetchedUsers from "../SharedAsset/Spinners/userSpinner";
import useFetchedCategories from "../SharedAsset/Spinners/categoriesSpinner";
import useFetchedComments from "../SharedAsset/Spinners/commentSpinner";
import { isFecthingStyle } from "../SharedAsset/SharedAssets";


const IndexPage = () => {
  const {action: paginationAction, totalPages, currentPage, isFetching} = useFetchedPostByPagination()
  const {content , action} = useFetchedPosts()
  const {userContent, useraction} = useFetchedUsers()
  const {commentsContent, commentaction,} = useFetchedComments()
  const {categoriesParents, categoriesaction} = useFetchedCategories()
  const users = userContent
  const Posts = content
  const Comments = commentsContent


  const canOpen = [action, useraction, categoriesaction, commentaction, paginationAction].every(Boolean)
  return (
    <>    
      <div className={`text-left ${isFecthingStyle(isFetching)}`}>

        {canOpen && <HeroImages Posts={Posts}/>}

        <div className="md:grid md:grid-cols-3">

          <div className="col-span-2 md:mr-[4%]">
          {canOpen && <FeaturedPosts Posts={Posts} users={users}/>}

          
            <ArroundTheWorldPosts 
              Comments={Comments}
              Posts={Posts} 
              categories={categoriesParents} 
              users={users}
              canOpen={canOpen}
            />
              
            <FashionAndTrendsPosts 
              Posts={Posts} 
              canOpen={canOpen}
              categories={categoriesParents}
            />

            <EntertainmentPosts 
              Comments={Comments}
              Posts={Posts} 
              categories={categoriesParents} 
              users={users}
              canOpen={canOpen}
            />
              {canOpen &&
       
              <TechPosts Posts={Posts} categories={categoriesParents}/>
      
            }
          </div>

          {canOpen &&
          <aside className="col-span-1 hidden md:block md:ml-[4%]">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <PopularPost Posts={Posts}/>
              <EditorsChioceAndDontMiss Posts={Posts} Comments={Comments}/>
            </StickyBox>
          </aside>}
        </div>

        {canOpen && <ImageComponent Posts={Posts}/>}

        {canOpen && <div className="md:grid md:grid-cols-3">
          <span className="col-span-2 md:mr-[4%]">
            <LatestPosts Posts={Posts}/>
            <div className="grid grid-flow-col justify-center w-full">
              <PaginationFunctions 
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </span>

          <span className="col-span-1 md:ml-[4%]">
            <StickyBox offsetTop={0} offsetBottom={0}>
              <StayConnectedAndRecommended Posts={Posts}/>
            </StickyBox>
          </span>
        </div>}      
      </div>
    </>    
  )
}

export default IndexPage