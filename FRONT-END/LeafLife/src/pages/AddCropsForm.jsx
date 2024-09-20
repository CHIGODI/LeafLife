import React, { useState } from 'react';

const AddCropsForm = ({ partitionIndex, onClose, onSave }) => {
    const [cropName, setCropName] = useState('');
    const [cropArea, setCropArea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the crop data back to the parent component (GardenStats)
        onSave(partitionIndex, { cropName, cropArea: parseFloat(cropArea) });
        onClose(); // Close the form
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Add Crops</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Crop Name
                        </label>
                        <input
                            type="text"
                            value={cropName}
                            onChange={(e) => setCropName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Crop Area (sq ft)
                        </label>
                        <input
                            type="number"
                            value={cropArea}
                            onChange={(e) => setCropArea(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                        >
                            Save Crops
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCropsForm;
