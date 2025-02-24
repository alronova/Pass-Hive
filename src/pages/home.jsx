import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
const bv_url = `${import.meta.env.VITE_backend_url}/auth/verifyToken`;
const jwt_token = localStorage.getItem("Token");

const home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(bv_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt_token}`,
          },
        });
        const result = await response.json();
        const { success, message, decoded, error } = result;

        if (success) {
          console.log(decoded);
          sessionStorage.setItem("UserName", decoded.u_name);
          handleSuccess(message);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else if (error) {
          const details = error?.details?.[0]?.message;
          handleError(details);
          navigate("/");
        } else {
          handleError(message);
          navigate("/");
        }
      } catch (err) {
        handleError(err);
        navigate("/");
      }
    };

    verifyToken();
  }, []);
  return (
    <div>
      Welcome to home!
    </div>
  )
}

export default home
