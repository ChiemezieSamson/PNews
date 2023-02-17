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


const IndexPage = () => {
  return (
    <div className="text-left">

      <HeroImages />

      <div className="md:grid md:grid-cols-3">
        <div className="col-span-2 md:mr-[4%]">
          <FeaturedPosts />
          <ArroundTheWorldPosts />
          <FashionAndTrendsPosts />
          <EntertainmentPosts />
          <TechPosts />
        </div>

        <aside className="col-span-1 hidden md:block md:ml-[4%]">
        <StickyBox offsetTop={0} offsetBottom={0}>
          <PopularPost />
          <EditorsChioceAndDontMiss />
        </StickyBox>
        </aside>
      </div>

      <ImageComponent />

      <div className="md:grid md:grid-cols-3">
        <span className="col-span-2 md:mr-[4%]">
          <LatestPosts />
          <div className="grid grid-flow-col justify-center w-full">
            <PaginationFunctions />
          </div>
        </span>
        <span className="col-span-1 md:ml-[4%]">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <StayConnectedAndRecommended />
          </StickyBox>
        </span>
      </div>
      
    </div>
  )
}

export default IndexPage