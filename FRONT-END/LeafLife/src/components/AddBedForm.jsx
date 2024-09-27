// AddBedForm.js
import React, { useState } from 'react';

const AddBedForm = ({ onClose, onAdd }) => {
    const [bedNumber, setBedNumber] = useState('');
    const [bedType, setBedType] = useState('raised');
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [soilType, setSoilType] = useState('loam');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBed = {
            bed_number: bedNumber,
            bed_type: bedType,
            length,
            width,
            soil_type: soilType,
        };
        onAdd(newBed);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Add New Bed</h3>
                <form onSubmit={handleSubmit}>
                    {/* Form Fields for bed attributes */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Bed Number</label>
                        <input
                            type="text"
                            value={bedNumber}
                            onChange={(e) => setBedNumber(e.target.value)}
                            required
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Bed Type</label>
                        <select
                            value={bedType}
                            onChange={(e) => setBedType(e.target.value)}
                            className="border rounded w-full px-3 py-2"
                        >
                            <option value="raised">Raised Bed</option>
                            <option value="in_ground">In-Ground Bed</option>
                            <option value="container">Container Bed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Length (m)</label>
                        <input
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            required
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Width (m)</label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            required
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Soil Type</label>
                        <select
                            value={soilType}
                            onChange={(e) => setSoilType(e.target.value)}
                            className="border rounded w-full px-3 py-2"
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
                            className="py-2 px-4 bg-blue-600 text-white rounded-md mr-2"
                        >
                            Add Bed
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-red-600 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBedForm;
