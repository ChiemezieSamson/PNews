import React from 'react'
import { Link } from 'react-router-dom'
import { otherPages } from '../../../data'

const CopyWrite = () => {
 
  return (
    <section>  
      <div className='flex flex-col-reverse xs:flex-row text-center content-center justify-between pb-7 pt-3 '>
        <small className='font-round text-[#a8a8aa] sm:text-xs xs:text-[10px] text-xs pt-1.5 xs:pt-1'>
          &copy; 2022-Blog posts by <span className='text-[#fff]'> Nebe-Samson.</span>
        </small>

        <ul className=''>
          {otherPages.map((page) => {
            return (
              <li key={page.id} className="group sm:text-sm xs:text-xs text-sm inline-block">
                <Link to={page.to} className='text-[#eee'>{page.page} <span className='group-last:hidden text-[#a8a8aa] pl-1 pr-1.5'> &#8725;</span></Link>
              </li>
            )
          })}
        </ul>
      </div>

    </section>
  )
}

export default CopyWrite
