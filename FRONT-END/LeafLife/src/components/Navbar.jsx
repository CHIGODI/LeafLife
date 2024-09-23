import axios from 'axios';
import handleLogout from '../utils/logout';
import React from 'react';
import logo from '../assets/images/leaf-life-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access_token');

  const linkClasses = (path) =>
    `text-green-600 bg-transparent hover-underline ${location.pathname === path ? 'active-underline' : 'hover:bg-transparent'
    }`;

  return (
    <nav className="flex flex-row justify-between bg-transparent">
      <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
        <Link className="flex flex-shrink-0 items-center mr-4" to="/">
          <img className="h-20 w-auto" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-[50%] flex flex-row justify-around items-center">
        <style>
          {`
          .hover-underline::after {
            content: '';
            display: block;
            width: 0;
            height: 2px;
            background-color: green;
            transition: width 0.3s ease;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -2.5px;
          }

          .hover-underline:hover::after {
            width: 80%;
          }

          .active-underline::after {
            content: '';
            display: block;
            width: 80%;
            height: 2px;
            background-color: green;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -5px;
          }
        `}
        </style>

        <Link to="/" className={`relative ${linkClasses('/')}`}>
          Home
        </Link>
        <Link to="/services" className={`relative ${linkClasses('/services')}`}>
          Services
        </Link>
        <Link to="/contact" className={`relative ${linkClasses('/contact')}`}>
          Contact
        </Link>

        {/* Conditionally render based on authentication status */}
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="border border-green-600 px-[2%] py-2 rounded-[1rem] hover:bg-green-600 hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="border border-green-600 px-[2%] py-2 rounded-[1rem] hover:bg-green-600 hover:text-white">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={`relative ${linkClasses('/dashboard')}`}>
              Dashboard
            </Link>
            <button
              onClick={() => handleLogout(navigate)}
              className="border border-red-600 px-[2%] py-2 rounded-[1rem] hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
