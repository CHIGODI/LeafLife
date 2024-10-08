import React, { useState, useEffect } from 'react';


const AddActivityForm = ({ gardenId, beds, onClose, onAdd }) => {
    const [activityType, setActivityType] = useState('inspection');
    const [bedId, setBedId] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newActivity = {
            activity_type: activityType,
            garden: gardenId,
            bed: bedId || null,
            start,
            end,
            notes,
        };
        onAdd(newActivity);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Log New Activity</h3>
                <form onSubmit={handleSubmit}>
                    {/* Form Fields for activity attributes */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Activity Type</label>
                        <select
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                            className="border rounded w-full px-3 py-2"
                        >
                            <option value="fertilization">Fertilization</option>
                            <option value="watering">Watering</option>
                            <option value="weed_control">Weed Control</option>
                            <option value="pest_control">Pest Control</option>
                            <option value="inspection">Inspection</option>
                            <option value="planting">Planting</option>
                            <option value="pruning">Pruning</option>
                            <option value="transplanting">Transplanting</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Bed (Optional)</label>
                        <select
                            value={bedId}
                            onChange={(e) => setBedId(e.target.value)}
                            className="border rounded w-full px-3 py-2"
                            disabled={!gardenId}
                        >
                            <option value="">None</option>
                            {beds.map(bed => (
                                <option key={bed.id} value={bed.id}>
                                    {bed.bed_number}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Start Time</label>
                        <input
                            type="datetime-local"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            required
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">End Time</label>
                        <input
                            type="datetime-local"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="4"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md">
                            Add Activity
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

export default AddActivityForm;
