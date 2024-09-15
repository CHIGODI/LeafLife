import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';

const GardenForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/gardens', {
                name,
                description,
                lat,
                long
            });

            console.log('Garden created successfully:', response.data);
        } catch (error) {
            console.error('There was an error creating the garden:', error);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                },
                (error) => {
                    setError("Unable to retrieve your location.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar className="w-64" />
            <div className="flex-1 flex flex-col p-6">
                <Navbar />
                <div className="flex flex-1 items-center justify-center mt-4">
                    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4">Create New Garden</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Garden Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                    placeholder="Enter garden name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                    placeholder="Enter garden description"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    id="lat"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                    placeholder="Click Get My Location"
                                    readOnly
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="long" className="block text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    id="long"
                                    value={long}
                                    onChange={(e) => setLong(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                    placeholder="Click Get My Location"
                                    readOnly
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={getLocation}
                                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                >
                                    Get My Location
                                </button>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Create Garden
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GardenForm;
