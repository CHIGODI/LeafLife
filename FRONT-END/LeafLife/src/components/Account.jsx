import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Account = () => {

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

    const handleLogout = () => {
        console.log('Logged out');
    };

    return (
        <div className="bg-red-100 p-5 h-[5%] flex justify-end align-center pr-[2.5%]">
            <button onClick={toggleDropdown} className="flex items-end space-x-2">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-600 mr-2" />
                {user && <span className="text-gray-700">{user.name}</span>}
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-40 bg-white">
                    <ul>
                        <li>
                            <button
                                onClick={handleLogout}
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
