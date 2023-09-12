import React from "react";
import { Outlet } from "react-router-dom";

const Books = () => {
  
  return (
    <section className="text-left">

      <Outlet />
    </section>
  )
}

export default Books


