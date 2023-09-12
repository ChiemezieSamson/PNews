import React from "react";
import { useRouteError } from "react-router-dom";
import { HomeLink } from "../../SharedAsset/SharedAssets"
import bulbLight from "../../../asset/images/bulbLight.jpg"


const NotFound = () => {
  const error = useRouteError();

  return (
    <div className="text-center h-screen relative isolate text-white grid items-center">

      <div className="absolute inset-0 -z-10 after:absolute after:inset-0 after:bg-black/30">
        <img src={bulbLight} alt="notFound"/>
      </div>

      <div className="max-w-md mx-auto"> 

        <div className="prose">

          {error?.statusText &&

            <h1 className="relative text-neutral-100 text-9xl max-w-max mx-auto my-0 mb-4">

              <span>
                {error?.status}
              </span>

              <span className="absolute font-lora top-0 text-lg text-neutral-100 left-12">Oops!</span>

              <span className="absolute font-lora -bottom-4 left-14 inline-block text-lg text-neutral-100">{error?.statusText}</span>
            </h1>
          }
        </div>
        
        <div className="prose text-neutral-100 text-lg font-medium">

          <p className="py-1 my-0">we are sorry, an unexpected error has occurred.</p>
          <p className="py-1 my-0">The page you requested was {error?.statusText ? error?.statusText : "not found"}.</p>

          <p className="py-1 my-0">
            <i>{error?.error?.message || error?.data}</i>
          </p>
        </div>
        

        <div className="text-neutral-100">
          
          <HomeLink />
        </div>
      </div>
    </div>
  )
}

export default NotFound