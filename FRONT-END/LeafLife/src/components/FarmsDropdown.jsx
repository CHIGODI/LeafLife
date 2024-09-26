import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

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
                console.error('[Backend]:', err.response.data);
                setError(err.response.data.error);
            } else {
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
                className={`w-full rounded-tr-full rounded-br-full px-4 py-2 cursor-pointer text-base text-left ${location.pathname.startsWith('/gardens') ? 'bg-nav-active' : 'hover:text-nav-hover transition-colors duration-300 ease-in-out'}`}
            >
                <FontAwesomeIcon className="mx-2" icon={faTractor} />
                My Farms
                <FontAwesomeIcon
                    className="ml-24"
                    icon={isFarmsOpen ? faCaretUp : faCaretDown}
                />
            </button>
            {isFarmsOpen && (
                <ul className="bg-custom-green w-full pl-6 text-base cursor-pointer max-h-40 overflow-y-auto">
                    {loading ? (
                        <li className="animate-pulse flex justify-center align-center">
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        </li>
                    ) : error ? (
                        <li>{error}</li>
                    ) : gardens.length > 0 ? (
                        gardens.map(garden => (
                            <li
                                key={garden.id}
                                className={`pt-2 pb-2 ml-7 ${location.pathname === `/gardenstats/${garden.id}` ? 'bg-nav-active' : 'hover:nav-text'}`}
                            >
                                <Link to={`/gardenstats/${garden.id}`} className="block w-full text-sm">
                                    {garden.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li></li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FarmsDropdown;
