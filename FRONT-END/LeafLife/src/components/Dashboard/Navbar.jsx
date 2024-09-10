import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logged out');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Dashboard Management</h1>
      <div className="flex items-center space-x-16">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          Add Garden
        </button>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-gray-600" />
            <span className="font-medium text-gray-600"></span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
