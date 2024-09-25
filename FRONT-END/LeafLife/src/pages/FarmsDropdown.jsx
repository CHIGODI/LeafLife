import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api'; // Import your API utility

const FarmsDropdown = () => {
    const [isFarmsOpen, setIsFarmsOpen] = useState(false);
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGardens = async () => {
        setLoading(true);
        try {
            const response = await api.get('/user/gardens/'); // Adjust the endpoint as necessary
            setGardens(response.data); // Assuming the API returns an array of gardens
        } catch (err) {
            if (err.response) {
                // Handle server errors
                console.error('[Backend]:', err.response.data);
                setError(err.response.data.error);
            } else {
                // Handle network errors
                setError('[Network]: An unexpected error occurred. Please try again.');
                console.error('Error fetching gardens:', err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFarmsClick = () => {
        setIsFarmsOpen(!isFarmsOpen);
        if (!isFarmsOpen) {
            fetchGardens(); // Fetch gardens when the dropdown is opened
        }
    };

    return (
        <div>
            <button
                onClick={handleFarmsClick}
                className={`px-4 py-2 cursor-pointer w-full text-left ${
                    location.pathname.startsWith('/gardens') ? 'bg-green-200' : 'hover:bg-green-200'
                }`}
            >
                My Farms
            </button>
            {isFarmsOpen && (
                <ul className="pl-6 text-sm bg-green-50 rounded-md cursor-pointer">
                    {loading ? (
                        <li>Loading...</li>
                    ) : error ? (
                        <li>{error}</li>
                    ) : gardens.length > 0 ? (
                        gardens.map(garden => (
                            <li key={garden.id} className={`mt-0 px-2 py-1 ${location.pathname === `/gardenstats/${garden.id}` ? 'bg-green-200' : 'hover:bg-green-200'}`}>
                                <Link to={`/gardenstats/${garden.id}`} className="block w-full">
                                    {garden.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>No gardens found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FarmsDropdown;

/* import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gardensData from './gardendata'; // Import the local garden data

const FarmsDropdown = () => {
    const [isFarmsOpen, setIsFarmsOpen] = useState(false);
    const [gardens, setGardens] = useState([]);

    const fetchGardens = () => {
        setGardens(gardensData); // Simulate fetching data from a file
    };

    const handleFarmsClick = () => {
        setIsFarmsOpen(!isFarmsOpen);
        if (!isFarmsOpen) {
            fetchGardens(); // Fetch gardens when the dropdown is opened
        }
    };

    return (
        <div>
            <button
                onClick={handleFarmsClick}
                className={`px-4 py-2 cursor-pointer w-full text-left ${location.pathname.startsWith('/gardens') ? 'bg-green-200' : 'hover:bg-green-200'
                    }`}
            >
                My Farms
            </button>
            {isFarmsOpen && (
                <ul className="pl-6 text-sm bg-green-50 rounded-md cursor-pointer">
                    {gardens.length > 0 ? (
                        gardens.map(garden => (
                            <li key={garden.id} className={`mt-0 px-2 py-1 ${location.pathname === '/gardenstats' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
                                <Link to={`/gardenstats/${garden.id}`} className="block w-full">
                                    {garden.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>No gardens found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FarmsDropdown;

// Will be used with api calls

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const FarmsDropdown = () => {
//     const [isFarmsOpen, setIsFarmsOpen] = useState(false);
//     const [gardens, setGardens] = useState([]);

//     const fetchGardens = async () => {
//         try {
//             const response = await axios.get('/api/user-gardens/'); // Ensure the URL matches your backend API endpoint
//             setGardens(response.data);
//         } catch (error) {
//             console.error('Error fetching gardens:', error);
//         }
//     };

//     const handleFarmsClick = () => {
//         setIsFarmsOpen(!isFarmsOpen);
//         if (!isFarmsOpen) {
//             fetchGardens(); // Fetch gardens when the dropdown is opened
//         }
//     };

//     return (
//         <div>
//             <button
//                 onClick={handleFarmsClick}
//                 className={`px-4 py-2 cursor-pointer w-full text-left ${location.pathname.startsWith('/gardens') ? 'bg-green-200' : 'hover:bg-green-200'
//                     }`}
//             >
//                 My Farms
//             </button>
//             {isFarmsOpen && (
//                 <ul className="pl-6 text-sm bg-green-50 rounded-md cursor-pointer">
//                     {gardens.length > 0 ? (
//                         gardens.map(garden => (
//                             <li key={garden.id} className={`mt-0 px-2 py-1 ${location.pathname === '/gardenstats' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
//                                 <Link to={`/gardenstats/${garden.id}`} className="block w-full">
//                                     {garden.name}
//                                 </Link>
//                             </li>
//                         ))
//                     ) : (
//                         <li>No gardens found</li>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default FarmsDropdown;
 */