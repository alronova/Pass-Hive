import React, { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BG from '../components/BG';
import { handleError, handleSuccess } from '../utils';
const bs_url = `${import.meta.env.VITE_backend_url}/auth/signup`;

const signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[id] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(signupInfo);
    try {
      const response = await fetch(bs_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        console.log(error);
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      // console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <>
    <BG />
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-transparent shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          
          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">User Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter a unique User Name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-md hover:from-gray-800 hover:to-black transition"
          >
            Sign Up
          </button>
        <div className="mt-4 text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link></p>
        </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default signup;
