import axios from 'axios';
import handleLogout from '../utils/logout';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get('/api/user/', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setUser(response.data);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     if (token) {
    //         fetchUser();
    //     }
    // }, [token]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    /*
    const handleLogout = async () => {
        try {
            // Make a request to the backend to log out the user
            const response = await axios.post('http://127.0.0.1:8000/api/v1/logout/', {
                refresh_token: localStorage.getItem('refresh_token'), // Use the correct key
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
    
            console.log(response.data); // Log the response data
    
            // Clear the authentication tokens from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
    
            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            console.error("Error logging out", error.response); // Use error.response for detailed error
        }
    };
    */
    
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
                                onClick={() => handleLogout(navigate)}
                                className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-red-500 border rounded-lg hover:border-red-400"
                            >
                                Logout
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-red-500 border rounded-lg  hover:border-red-400"
                            >
                                Account
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
};

export default Account;
