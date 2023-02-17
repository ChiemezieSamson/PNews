import React from "react";
import StickyBox from "react-sticky-box";
import { Posts } from "../../../data";
import { NavDirectionAndPageName } from "../../SharedAsset/SharedAssets";
import { SharedBlogPageStyleOne } from "../../SharedAsset/SharedBlogPageStyle_1st_Component";
import Aside from "../asidePage/Aside";
import { PagesBlogPostComponent } from "../IndexPageComponents/SharedComponents";

const Books = () => {
  return (
    <section className="text-left">

      <SharedBlogPageStyleOne Posts={Posts} />
   
      <div className='md:grid md:grid-cols-3'>
        <div className="col-span-2 md:mr-[3%]">
          <NavDirectionAndPageName page={"Books"} />
        
          <PagesBlogPostComponent Posts={Posts.slice(0, 10)} />
        </div>
        <aside className="col-span-1 mt-8 md:ml-[3%]">
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Aside />
          </StickyBox>
        </aside>
      </div>
    </section>
  )
}

export default Books


