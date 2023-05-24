import React, { useState } from "react";
import { useCreateNewUserMutation } from "../../Reduxstore/Slices/users/UsersSlice";
import useFetchedUsers from "../SharedAsset/Spinners/userSpinner";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const {userContent, useraction, isFetching} = useFetchedUsers()
  const users = userContent
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [primary, setPrimary] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requiredText, setRequiredText] = useState(false)
  const [addNewUser, { isLoading } ] = useCreateNewUserMutation()

  const navigate = useNavigate();
  

  const canSave = [firstname, lastname, username, primary, password, confirmPassword].every(Boolean) && !isLoading

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkUser = users.map((user) => user.email.primary );

   if (checkUser.includes(primary)){
    setRequiredText(true)
   } else{
    if (canSave) {
      try {
        await addNewUser({firstname, lastname, username, primary, password, confirmPassword}).unwrap()

        navigate("/login")
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
      }
    }
   }

    setFirstName(() => "")
    setLastName(() => "")
    setPrimary(() => "")
    setPassword(() => "")
    setUsername(() => "")
    setConfirmPassword(() => "")
  };

  return (useraction &&
    <div className="py-10 text-left grid place-content-center justify-center bg-gradient-to-b from-gray-300/40 to-white/50"
    disabled={isFetching}>
      <div className="md:w-[28rem] max-w-md font-lora p-6">

        {/* login title */}
        <h3 className='text-2xl font-light text-center py-3 mb-2'>Register</h3>

        <div className='border border-solid border-gray-300 w-full p-3 rounded-md shadow shadow-gray-500 bg-blue-100/30'>
          <form onSubmit={handleSubmit}>
            

            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstname">
              First Name
            </label>
            <input
              className=""
              id="firstname"
              name="userregisteredfirstname"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
  
            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
              Last Name
            </label>
            <input
              className=""
              id="lastname"
              name="userregisteredlastname"
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              User Name
            </label>
            <input
              className=""
              id="username"
              name="userregisteredusername"
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="block text-gray-700 font-bold mb-2" htmlFor="primary">
              Email
            </label>
            <input
              id="primary"
              name="userregisteredprimary"
              type="email"
              className="mb-0"
              placeholder="Email"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />  {requiredText ? <p className='text-xs text-rose-500 tracking-wider font-lora'>Already have a user with this primary email!</p> : "" }          

            <label className="block text-gray-700 font-bold mb-2 mt-5" htmlFor="password">
              Password
            </label>
            <input
              className=""
              id="password"
              name="userregisteredpassword"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className=""
              id="confirmpassword"
              name="userregisteredconfirmpassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* registere user button */}
            <button
              type="submit"
              className="cursor-pointer w-full text-sm py-2 bg-rose-500 border-0 text-white rounded-md tracking-wide
            hover:bg-rose-600 transition-all duration-200 ease-linear shadow-md shadow-gray-400 disabled:opacity-40" disabled={!canSave}
            >
              Register
            </button>

          </form>

          <div className='border border-solid border-gray-400 rounded-md text-center p-4 text-sm tracking-wide mt-5 
            shadow shadow-gray-500'>
          <span>Already registered</span>
          <button className='cursor-pointer border-0 inline-block text-blue-600 mx-2'>
            <span>Sign in?</span>
          </button>
        </div>
        </div>
      </div>
    </div>
    );
  }
  
  
export default RegistrationForm