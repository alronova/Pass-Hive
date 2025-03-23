import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BG from '../components/BG';
import { handleError, handleSuccess } from '../utils';

const bl_url = `${import.meta.env.VITE_backend_url}/auth/login`;

const login = () => {

  const [loginInfo, setLoginInfo] = useState({
      cred: '',
      password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
      const { id, value } = e.target;
      const copyLoginInfo = { ...loginInfo };
      copyLoginInfo[id] = value;
      setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(bl_url, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(loginInfo)
          });
          const result = await response.json();
          const { success, message, jwtToken, u_name, userId, error } = result;
          if (success) {
              handleSuccess(message);
              localStorage.setItem('Token', jwtToken);
              sessionStorage.setItem('UserName', u_name);
              sessionStorage.setItem('UserId', userId);
              console.log(result);
              setTimeout(() => {
                navigate('/home');
              }, 50000)
          } else if (error) {
              const details = error?.details[0].message;
              handleError(details);
          } else if (!success) {
              handleError(message);
          }
      } catch (err) {
          handleError(err);
      }
  }

  return (
    <>
    <BG />
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-transparent shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="text"
              id="cred"
              placeholder="Enter your Email or User Name"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-md bg-black text-white cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-900"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default login;
