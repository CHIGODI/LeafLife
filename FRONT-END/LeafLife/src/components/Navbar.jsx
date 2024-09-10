import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-transparent"> 
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-20 w-auto" src={logo} alt="Logo" />
            </Link>
            <div className="md:ml-auto mt-4">
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className="text-green-500 bg-transparent hover:bg-green-400 hover:text-white rounded-md px-3 py-2 transition duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/contact"
                  className="text-green-500 bg-transparent hover:bg-green-400 hover:text-white rounded-md px-3 py-2 transition duration-300"
                >
                  Contact
                </Link>
                <Link
                  to="/signup"
                  className="text-green-500 bg-transparent hover:bg-green-400 hover:text-white rounded-md px-3 py-2 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
