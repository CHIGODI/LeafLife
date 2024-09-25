import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../utils/logout'; // Ensure this function correctly logs out the user
import api from '../utils/api'; // Import your configured axios instance
import { USER_ID, ACCESS_TOKEN } from '../utils/constants'; // Ensure USER_ID and ACCESS_TOKEN are imported

const Account = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null); // Create a ref for the dropdown

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/profile'); // Use the api instance
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const token = localStorage.getItem(ACCESS_TOKEN); // Get the token
        if (token) {
            fetchUser(); // Fetch user only if token exists
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev); // Toggle dropdown on icon click
    };

    // Handle clicks outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); // Close dropdown if clicked outside
            }
        };

        // Add event listener if dropdown is open
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on component unmount or when dropdown closes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="flex justify-end items-center h-[18%] relative">
            <button onClick={toggleDropdown} className="flex items-end space-x-2">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-600 mr-2 hover:text-hover transition-colors duration-300 ease-in-out" />
                {user && <span className="text-gray-700">{user.name}</span>}
            </button>
            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-[2%] top-[50%] mt-2 w-40 bg-white shadow-md">
                    <ul>
                        <li>
                            <button
                                onClick={() => handleLogout(navigate)} // Use logout function to navigate
                                className="block w-full text-center px-2 py-2 text-gray-700 rounded-lg hover:bg-hover-d  transition-colors duration-300 ease-in-out"
                            >
                                Logout
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/account-info')} // Navigate to Account Info page
                                className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-hover-d  border rounded-lg transition-colors duration-300 ease-in-out"
                            >
                                Account
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Account;
