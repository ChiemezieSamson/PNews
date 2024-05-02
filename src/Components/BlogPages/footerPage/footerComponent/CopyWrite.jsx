import React from 'react'
import { Link } from 'react-router-dom'
import { otherPages } from '../../../../data'


const CopyWrite = () => {
 
  return (
    <>  

      <div className='grid text-center grid-flow-row sm:grid-flow-col content-center sm:justify-between pb-7 pt-3 '>

        <small className='order-last sm:order-first font-round text-neutral-300 text-xs pt-1.5 sm:pt-1'>
          &copy; 2021-Blog posts by <span className='text-neutral-100'> PNews.</span>
        </small>

        <ul>

          {otherPages.map((page) => {

            return (
              <li key={page.id} className="group text-sm inline">
                
                <Link to={page.to} className='text-neutral-100'>
                  <span className='whitespace-nowrap'>{page.page}</span> 
                  <span className='group-last:hidden text-neutral-300 pl-1 pr-1.5'> &#8725;</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default CopyWrite
