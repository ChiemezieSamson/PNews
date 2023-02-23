import React from 'react'
import { users } from '../../../../../data'

const Author = () => {
  
  return (
     //* Author selection start here */
    <div className='pt-5 mb-3 px-3'>
      <b className='inline-block font-bold lg:mb-5 mb-3 text-lg text-[#444]'>Author</b>
      <input type="text" list='categories' name='categories' form="post_form" />
      <datalist id='categories'>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          )
        })}
      </datalist>
    </div>
  )
}

export default Author
