import React, { useState } from "react";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}`);
    // you can perform any additional action here, such as sending the data to the server
  };

  return (
    <div className="py-10 text-left grid place-content-center justify-center bg-gradient-to-b from-gray-300/40 to-white/50">
      <div className="md:w-[28rem] max-w-md font-lora p-6">

        {/* login title */}
        <h3 className='text-2xl font-light text-center py-3 mb-2'>Register</h3>

        <div className='border border-solid border-gray-300 w-full p-3 rounded-md shadow shadow-gray-500 bg-blue-100/30'>
          <form onSubmit={handleSubmit}>
            

            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              className=""
              id="firstName"
              name="userregisteredfirstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
  
            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              className=""
              id="lastName"
              name="userregisteredlastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className=""
              id="email"
              name="userregisteredemail"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />            

            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
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
            hover:bg-rose-600 transition-all duration-200 ease-linear shadow-md shadow-gray-400"
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