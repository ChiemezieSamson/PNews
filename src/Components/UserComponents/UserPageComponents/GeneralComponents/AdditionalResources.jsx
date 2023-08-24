import React, { useState } from 'react'
import { SinginAndSecurityIntro } from '../../../SharedAsset/SharedAssets'
import { WritePostAsideOpenClosebar } from '../../../ButtonAndOthers/Buttons'
import { Link } from 'react-router-dom'
import { FaRegPaperPlane } from 'react-icons/fa'

const AdditionalResources = () => {
  const [openUserPost, setOpenUserPost] = useState(false) // use to open and close the Posts section

  // handling the display or hidden of the whole log out component
  const handleOpenCloseChild = () => {
    setOpenUserPost((change) => !change)
  }

  const legal = [
    {
      id: 1,
      name: "Privacy Policy",
      link: "/privacy&policy",
    },
    {
      id: 1,
      name: "Terms of Service",
      link: "",
    }
  ]

  const miscellaneous = [
    {
      id: 1,
      name: "About",
      link: "/about",
    },
    {
      id: 1,
      name: "Contact Us",
      link: "/contactus",
    }
  ]

  return (
    <div>
      <WritePostAsideOpenClosebar BarName={"Additional resources"} handle={handleOpenCloseChild}/>

      <div className={`${openUserPost ? "block" : "hidden"} mt-2 mb-10 px-3 text-stone-800`}>
        <SinginAndSecurityIntro text={"Check out other places for helpful information to learn more about CUmeh blog and services.."} />

        <div className='grid grid-flow-row divide-y my-7'>

          <ul>
            <b className='block font-bold text-lg text-stone-800 capitalize'>legal</b>
            {legal.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={item.link} className='grid grid-flow-col justify-between cursor-pointer py-2.5 hover:bg-neutral-200/60 pr-1'>
                    <span>{item.name}</span>
                    <FaRegPaperPlane  className='inline-block'/>
                  </Link>
                </li>
              )
            })}
          </ul>

          <ul>
            <b className='block mt-2.5 font-bold text-lg text-stone-800 capitalize'>Miscellaneous</b>
            {miscellaneous.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={item.link} className='grid grid-flow-col justify-between cursor-pointer py-2.5 hover:bg-neutral-200/60 pr-1'>
                    <span>{item.name}</span>
                    <FaRegPaperPlane  className='inline-block'/>
                  </Link>
                </li>
              )
            })}
          </ul>           
        </div>
      </div>      
    </div>
  )
}

export default AdditionalResources
