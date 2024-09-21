import React, { useState } from 'react';

const AddCropsForm = ({ partitionIndex, onClose, onSave }) => {
    const [cropData, setCropData] = useState({
        bedNumber: '',
        bedType: 'raised',
        length: '',
        width: '',
        soilType: 'loam',
        cropName: '', // New field for crop name
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCropData({
            ...cropData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate the area based on length and width
        const area = (cropData.length * cropData.width).toFixed(2); // area in square meters

        // Prepare the data to send to the API
        const dataToSubmit = {
            ...cropData,
            cropArea: area,
        };

        // Send data to the API
        try {
            const response = await fetch('/api/crops', { // Adjust the endpoint as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });
            const result = await response.json();
            if (response.ok) {
                // Call onSave to update the parent component with the new crop data
                onSave(partitionIndex, result); // Assuming the API returns the saved crop data
                onClose(); // Close the form
            } else {
                console.error('Error saving crop data:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset the form
        setCropData({
            bedNumber: '',
            bedType: 'raised',
            length: '',
            width: '',
            soilType: 'loam',
            cropName: '',
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Add Crop</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Crop Name</label>
                        <input
                            type="text"
                            name="cropName"
                            value={cropData.cropName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Bed Number</label>
                        <input
                            type="text"
                            name="bedNumber"
                            value={cropData.bedNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Bed Type</label>
                        <select
                            name="bedType"
                            value={cropData.bedType}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="raised">Raised Bed</option>
                            <option value="in_ground">In-Ground Bed</option>
                            <option value="container">Container Bed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Length (m)</label>
                        <input
                            type="number"
                            name="length"
                            value={cropData.length}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Width (m)</label>
                        <input
                            type="number"
                            name="width"
                            value={cropData.width}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Soil Type</label>
                        <select
                            name="soilType"
                            value={cropData.soilType}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="clay">Clay</option>
                            <option value="sandy">Sandy</option>
                            <option value="loam">Loam</option>
                            <option value="peat">Peat</option>
                            <option value="blackcotton">Black Cotton</option>
                            <option value="redsoil">Red Soil</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                        >
                            Save
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
