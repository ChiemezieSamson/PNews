import React from "react";
import { Outlet } from "react-router-dom";


const Favorite = () => {
  
  return (
    <section className="text-left">
      <Outlet />
    </section>
  )
}

export default Favorite