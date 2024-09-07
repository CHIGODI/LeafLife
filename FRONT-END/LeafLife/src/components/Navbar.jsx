import React from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-transparent"> 
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <a className="flex flex-shrink-0 items-center mr-4" href="/index.html">
              <img className="h-10 w-auto" src={logo} alt="Logo" />
              <span className="hidden md:block text-green-500 text-2xl font-bold ml-2">Leaf Life</span>
            </a>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="text-green-500 bg-transparent hover:bg-green-400 hover:text-white rounded-md px-3 py-2 transition duration-300"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-green-500 bg-transparent hover:bg-green-400 hover:text-white rounded-md px-3 py-2 transition duration-300"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-green-500 bg-transparent hover:bg-green-400 hover:text-white rounded-md px-3 py-2 transition duration-300"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
