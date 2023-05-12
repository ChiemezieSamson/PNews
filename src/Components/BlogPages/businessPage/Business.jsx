import React from 'react'
import { Outlet } from 'react-router-dom'

const Business = () => {
  return (
    <section className="text-left">
      <Outlet />
    </section>
  )
}

export default Business
