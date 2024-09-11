import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ token }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass auth token
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  // Toggle logout visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handle logout action
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-8 bg-white shadow-md">
        <h1 className="text-xl font-bold">Dashboard Management</h1>
        <div className="flex items-center space-x-16">
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-gray-600 mr-2" />
              {user && <span className="text-gray-700">{user.name}</span>}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-40 bg-white">
                <ul>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-red-500 border rounded-lg shadow-lg hover:border-red-400"
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
    </div>
  );
};

export default Navbar;
