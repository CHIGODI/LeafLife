import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import BedCard from '../components/BedCard';
import AddBedForm from '../components/AddBedForm';
import AddCropForm from '../components/AddCropForm';
import api from '../utils/api';
import WeatherStrip from '../components/WeatherStrip';
import { toast } from 'react-toastify';


const GardenStats = () => {
    const { id } = useParams();
    const [beds, setBeds] = useState([]);
    const [crops, setCrops] = useState([]);
    const [isBedFormOpen, setIsBedFormOpen] = useState(false);
    const [gardenName, setGardenName] = useState('');
    const user_id = localStorage.getItem('user_id');
    const garden_id = location.pathname.split('/')[2];
    const [selectedBedId, setSelectedBedId] = useState(null);
    const [isCropFormOpen, setIsCropFormOpen] = useState(false);

    useEffect(() => {
        const fetchGardenDetails = async () => {
            try {
                const response = await api.get(`/garden/${id}`);
                const gardenData = response.data;
                setGardenName(gardenData.name);
            } catch (error) {
                console.error('Error fetching garden details:', error);
            }
        };

        const fetchBeds = async () => {
            try {
                const response = await api.get(`/user/${user_id}/garden/${garden_id}/beds/`);
                const bedsData = await response.data;
                setBeds(bedsData);
                } catch (error) {
                    if (error.response) {
                        toast.error(error.response.data.error);
                        console.error('Error fetching beds:', error);
                    }else {
                        console.error('Error fetching beds:', error);
                        toast.error('An unexpected error occurred. Please try again.');
                    }
                }
            };

        fetchGardenDetails();
        fetchBeds();
    }, [id]);

    const handleAddBed = async (newBed) => {
        setBeds(prevBeds => [...prevBeds, newBed]);
        setIsBedFormOpen(false);

        try{
            const response = await api.post(`/user/${user_id}/garden/${garden_id}/bed/`,
                {
                    bed_number: newBed.bed_number,
                    length: newBed.length,
                    width: newBed.width,
                });
            toast.success(response.data.message);
            console.log(response.data.id);
        }
        catch(error){
            if (error.response) {
            console.error('Error adding bed:', error);
            toast.error(error.response.data.error);
        }
        else {
            console.error('Error adding bed:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }};

    const handleAddCrops = async (newCrop) => {
        try {
            const response = await api.post(`/user/${user_id}/garden/${garden_id}/bed/${selectedBedId}/crop/`, {
                name: newCrop.name,
                variety: newCrop.variety,
                planting_date: newCrop.planting_date
            });
            toast.success("Crop Added Successfully");

            // If the request is successful, add the new crop to the state
            setCrops(prevCrops => [...prevCrops, response.data.crop]);  // Assuming `response.data.crop` has the new crop info
            setIsCropFormOpen(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                console.error('Error adding crops:', error);
                toast.error('An unexpected error occurred. Please try again.');
            }
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
                    <div className='pb-6' >
                        <WeatherStrip gardenId={garden_id}/>
                    </div>
                    <h2 className="text-lg font-bold mb-4">{gardenName} Garden</h2>
                    <button
                        className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                        onClick={() => setIsBedFormOpen(true)}
                    >
                        Add Bed
                    </button>

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
