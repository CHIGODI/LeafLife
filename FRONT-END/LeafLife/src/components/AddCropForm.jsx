import React, { useState } from 'react';

const AddCropForm = ({ onClose, onAddCrop }) => {
    const [cropName, setCropName] = useState('');
    const [variety, setVariety] = useState('');
    const [plantingDate, setPlantingDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       const newCrop =
            {
                name: cropName,
                variety,
                planting_date: plantingDate
             };
        onAddCrop(newCrop);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Add Crop</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Crop Name</label>
                        <input
                            type="text"
                            value={cropName}
                            onChange={(e) => setCropName(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Variety</label>
                        <input
                            type="text"
                            value={variety}
                            onChange={(e) => setVariety(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Planting Date</label>
                        <input
                            type="date"
                            value={plantingDate}
                            onChange={(e) => setPlantingDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Add Crop
                    </button>
                </form>
                <button className="mt-4 text-red-600" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddCropForm;
