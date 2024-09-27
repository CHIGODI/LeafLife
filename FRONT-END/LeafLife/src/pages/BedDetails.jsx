import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import { toast } from 'react-toastify';

const BedDetails = () => {
    const { id } = useParams();
    const [bedDetails, setBedDetails] = useState(null);
    const garden_id = location.pathname.split('/')[2];
    const bed_id = location.pathname.split('/')[4];
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchBedDetails = async () => {
            try {
                const response = await api.get(`/user/${user_id}/garden/${garden_id}/bed/${bed_id}/crops`);
                console.log(response.data);
                setBedDetails(response.data);
            } catch (error) {
                console.error('Error fetching bed details:', error);
                toast.error('Failed to load bed details.');
            }
        };

        fetchBedDetails();
    }, [id]);

    if (!bedDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col h-screen">
            <SideNav />
            <div className="w-[80%] ml-[20%] flex justify-end items-center pl-[4%] pr-[4%] h-[18%]">
                <Account />
            </div>

            <div className="w-[80%] ml-[20%] mt-10 p-6">
                <h2 className="text-2xl font-bold mb-6">Bed Details</h2>
                <h3 className="text-xl font-bold mt-8 mb-4">Crops Planted</h3>
                {bedDetails.length > 0 ? (
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left p-4">Crop Name</th>
                                <th className="text-left p-4">Variety</th>
                                <th className="text-left p-4">Planting Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bedDetails.map((crop) => (
                                <tr key={crop.id} className="border-b">
                                    <td className="p-4">{crop.name}</td>
                                    <td className="p-4">{crop.variety}</td>
                                    <td className="p-4">{crop.planting_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No crops planted</p>
                )}
            </div>
        </div>
    );
};

export default BedDetails;
