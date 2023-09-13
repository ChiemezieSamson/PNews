import React from 'react'
import { Link } from 'react-router-dom'
import { otherPages } from '../../../../data'


const CopyWrite = () => {
 
  return (
    <>  

      <div className='grid text-center grid-flow-row xs:grid-flow-col content-center xs:justify-between pb-7 pt-3 '>

        <small className='order-last xs:order-first font-round text-neutral-300 text-xs pt-1.5 xs:pt-1'>
          &copy; 2022-Blog posts by <span className='text-neutral-100'> Nebe-Samson.</span>
        </small>

        <ul>

          {otherPages.map((page) => {

            return (
              <li key={page.id} className="group sm:text-sm xs:text-xs text-sm inline">
                
                <Link to={page.to} className='text-neutral-100'>
                  {page.page} 
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
