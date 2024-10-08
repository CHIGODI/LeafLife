import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import BedCard from '../components/BedCard';
import AddBedForm from '../components/AddBedForm';
import AddCropForm from '../components/AddCropForm';
import AddActivityForm from '../components/AddActivityForm';
import api from '../utils/api';
import WeatherStrip from '../components/WeatherStrip';
import { toast } from 'react-toastify';

const GardenStats = () => {
    const { id: garden_id } = useParams(); // useParams to get garden_id
    const [beds, setBeds] = useState([]);
    const [crops, setCrops] = useState([]);
    const [isBedFormOpen, setIsBedFormOpen] = useState(false);
    const [gardenName, setGardenName] = useState('');
    const [selectedBedId, setSelectedBedId] = useState(null);
    const [isCropFormOpen, setIsCropFormOpen] = useState(false);
    const [showAddActivityForm, setShowAddActivityForm] = useState(false);

    // Define fetchBeds function
    const fetchBeds = async () => {
        try {
            const response = await api.get(`/garden/${garden_id}/beds/`);
            setBeds(response.data);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    useEffect(() => {
        const fetchGardenDetails = async () => {
            try {
                const response = await api.get(`/garden/${garden_id}`);
                setGardenName(response.data.name);
            } catch (error) {
                console.error('Error fetching garden details:', error);
            }
        };

        // Fetch beds when component loads
        fetchBeds();
        fetchGardenDetails();
    }, [garden_id]);

    const handleAddBed = async (newBed) => {
        try {
            const response = await api.post(`/garden/${garden_id}/bed/`, newBed);
            toast.success('Bed Added Successfully');
            setBeds(prevBeds => [...prevBeds, response.data]);
            setIsBedFormOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An unexpected error occurred. Please try again.');
        }
    };

    const handleAddCrops = async (newCrop) => {
        try {
            const response = await api.post(`/garden/${garden_id}/bed/${selectedBedId}/crop/`, newCrop);
            toast.success("Crop Added Successfully");
            setCrops(prevCrops => [...prevCrops, response.data]);
            setIsCropFormOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An unexpected error occurred. Please try again.');
        }
    };

    const handleAddActivity = async (activity) => {
        try {
            const response = await api.post('/activity/', activity);
            toast.success('Activity Added Successfully');
            setShowAddActivityForm(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <SideNav />
            <div className="w-[80%] ml-[20%] flex justify-end items-center pt-5 pl-[4%] pr-[4%] h-[18%]">
                <Account />
            </div>
            <div className="flex flex-row justify-start w-[80%] ml-[20%] p-[2%]">
                <div className="w-full">
                <h2 className="text-4xl text-orange-600 pl-2 font-bold mb-6">Welcome to {gardenName} Garden</h2>
                    <div className="pb-6">
                        <WeatherStrip gardenId={garden_id} />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                            onClick={() => setIsBedFormOpen(true)}
                        >
                            Add Bed
                        </button>
                        <button
                            className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                            onClick={() => setShowAddActivityForm(true)}
                        >
                            Add New Activity
                        </button>

                        {showAddActivityForm && (
                            <AddActivityForm
                            gardenId={garden_id}
                            beds={beds} // Pass beds data as a prop
                            onClose={() => setShowAddActivityForm(false)}
                            onAdd={handleAddActivity}
                            />
                        )}
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {beds.map((bed, index) => (
                            <BedCard
                                key={index}
                                bed={bed}
                                onAdd={() => {
                                    setSelectedBedId(bed.id);
                                    setIsCropFormOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isBedFormOpen && (
                <AddBedForm
                    onClose={() => setIsBedFormOpen(false)}
                    onAdd={handleAddBed}
                />
            )}
            {isCropFormOpen && (
                <AddCropForm
                    onClose={() => setIsCropFormOpen(false)}
                    onAddCrop={handleAddCrops}
                />
            )}
        </div>
    );
};

export default GardenStats;
