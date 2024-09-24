import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../utils/logout'; // Ensure this function correctly logs out the user
import api from '../utils/api'; // Import your configured axios instance
import { USER_ID } from '../utils/constants'; // Ensure USER_ID is imported
import { ACCESS_TOKEN } from '../utils/constants'; // Ensure ACCESS_TOKEN is imported

const Account = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user_id = localStorage.getItem(USER_ID);
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
    }, []); // Empty dependency array means this runs once on mount

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div className="p-5 h-[5%] flex justify-end items-center pr-[2.5%]">
            <button onClick={toggleDropdown} className="flex items-end space-x-2">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-600 mr-2" />
                {user && <span className="text-gray-700">{user.name}</span>}
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-40 bg-white">
                    <ul>
                        <li>
                            <button
                                onClick={() => handleLogout(navigate)} // Use logout function to navigate
                                className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-red-500 border rounded-lg hover:border-red-400"
                            >
                                Logout
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/account-info')} // Navigate to Account Info page
                                className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-blue-500 border rounded-lg hover:border-blue-400"
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
