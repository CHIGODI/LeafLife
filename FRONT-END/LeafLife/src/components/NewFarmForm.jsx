import React, { useState } from 'react';
import Account from './Account';
import Sidebar from './SideNav';
import axios from 'axios';

const NewFarmForm = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [partitionName, setPartitionName] = useState('');
    const [partitionSize, setPartitionSize] = useState('');
    const [error, setError] = useState(null);

    // Handle form submission (final step) CHANGE BACKEND to match this
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/gardens', {
                name,
                description,
                lat,
                long,
                partition: { name: partitionName, size: partitionSize }
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

    // Move to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Move to the previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-[84%] ml-[16%] flex flex-col p-6">
                <Account />
                <div className="flex items-center justify-center mt-4">
                    <div className="w-[60%] max-w-4xl p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4">Add new farm</h1>

                        {step === 1 && (
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Garden Name<span className="text-red-700 ml-1">*</span>
                                    </label>
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
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description<span className="text-red-700 ml-1">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                        placeholder="Enter garden description"
                                        required
                                    />
                                </div>

                                {/* Hidden Latitude and Longitude */}
                                <input type="hidden" value={lat} />
                                <input type="hidden" value={long} />

                                <div>
                                    <button
                                        type="button"
                                        onClick={getLocation}
                                        className="w-[40%] py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                    >
                                        Get My Location
                                    </button>
                                    {error && <p className="text-red-500">{error}</p>}
                                </div>
                                <button type="button" className="ml-[80%] w-[20%] py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4">Add farm</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFarmForm;
