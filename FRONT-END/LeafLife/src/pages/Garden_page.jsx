import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import AddCropsForm from './AddCropsForm';

const GardenStats = () => {
    const { id } = useParams();
    const [isPartitionFormOpen, setIsPartitionFormOpen] = useState(false);
    const [isCropsFormOpen, setIsCropsFormOpen] = useState(false);
    const [numPartitions, setNumPartitions] = useState(0);
    const [gardenPartitions, setGardenPartitions] = useState({});
    const [selectedPartitionIndex, setSelectedPartitionIndex] = useState(null);
    const [gardenName, setGardenName] = useState(''); // State for garden name

    useEffect(() => {
        const fetchGardenDetails = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://127.0.0.1/api/v1/users/${user_id}/gardens`); // Adjust the endpoint as needed
                if (response.ok) {
                    const gardenData = await response.json();
                    setGardenName(gardenData.name); // Assuming the garden data contains a 'name' field
                } else {
                    console.error('Failed to fetch garden details');
                }
            } catch (error) {
                console.error('Error fetching garden details:', error);
            }
        };

        const fetchCrops = async () => {
            try {
                const response = await fetch(`/api/gardens/${id}/crops`); // Update with your actual API endpoint
                if (response.ok) {
                    const cropsData = await response.json();
                    setGardenPartitions({ [id]: cropsData });
                } else {
                    console.error('Failed to fetch crops data');
                }
            } catch (error) {
                console.error('Error fetching crops:', error);
            }
        };

        fetchGardenDetails(); // Fetch garden name
        fetchCrops(); // Fetch crops data
    }, [id]);

    const handlePartitionSubmit = (e) => {
        e.preventDefault();
        const newPartitions = Array.from({ length: numPartitions }, (_, index) => ({
            name: `Bed ${index + 1}`,
            crops: [],
        }));

        setGardenPartitions(prevState => ({
            ...prevState,
            [id]: newPartitions
        }));

        setIsPartitionFormOpen(false);
    };

    const handleAddCropsClick = (index) => {
        setSelectedPartitionIndex(index);
        setIsCropsFormOpen(true);
    };

    const handleSaveCrops = (index, cropData) => {
        const updatedPartitions = gardenPartitions[id].map((partition, i) => {
            if (i === index) {
                return {
                    ...partition,
                    crops: [...partition.crops, cropData],
                };
            }
            return partition;
        });

        setGardenPartitions(prevState => ({
            ...prevState,
            [id]: updatedPartitions,
        }));
    };

    return (
        <div className="flex flex-col">
            <SideNav />
            <div className="flex flex-row justify-end w-[84%] ml-[16%]">
                <Account />
            </div>

            <div className="flex flex-row justify-start w-[84%] ml-[16%] mt-4">
                <div className="w-full">
                    <h2 className="text-lg font-bold mb-4">Garden Stats for {gardenName}</h2> {/* Display garden name here */}
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Garden Name</th>
                                <th className="py-2 px-4 border-b">Total Area</th>
                                <th className="py-2 px-4 border-b">Crops</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b">{gardenName || 'Loading...'}</td> {/* Display garden name */}
                                <td className="py-2 px-4 border-b">500 sq ft</td>
                                <td className="py-2 px-4 border-b">Mixed Vegetables</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <button
                            className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            onClick={() => setIsPartitionFormOpen(true)}
                        >
                            Partition Garden
                        </button>
                    </div>
                </div>
            </div>

            {isPartitionFormOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Partition Garden</h3>
                        <form onSubmit={handlePartitionSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Number of Partitions
                                </label>
                                <input
                                    type="number"
                                    value={numPartitions}
                                    onChange={(e) => setNumPartitions(e.target.value)}
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
                                    Create Partitions
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPartitionFormOpen(false)}
                                    className="py-2 px-4 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-[84%] ml-[16%] mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gardenPartitions[id] && gardenPartitions[id].map((partition, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-bold">{partition.name}</h3>
                        <p>Soil Type: {partition.soilType}</p>
                        <p>Crop Count: {partition.crops.length}</p>
                        <button
                            onClick={() => handleAddCropsClick(index)}
                            className="mt-2 py-1 px-3 bg-green-600 text-white rounded"
                        >
                            Add Crops
                        </button>
                    </div>
                ))}
            </div>

            {isCropsFormOpen && (
                <AddCropsForm
                    partitionIndex={selectedPartitionIndex}
                    onClose={() => setIsCropsFormOpen(false)}
                    onSave={handleSaveCrops}
                />
            )}
        </div>
    );
};

export default GardenStats;
