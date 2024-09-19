import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Add this import
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

const GardenStats = () => {
    const { id } = useParams();  // Extract the garden ID from the URL
    const [pieData, setPieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPieChartData = async () => {
            try {
                const response = await fetch('/garden-bed-stats.json'); // Fetch the mock JSON file
                const data = await response.json();

                // Find the garden by ID
                const garden = data.find(garden => garden.id === parseInt(id));

                if (garden) {
                    // Format the crop data for the Pie chart
                    setPieData(garden.crops.map((crop) => ({
                        name: crop.crop_name,
                        value: crop.crop_count,
                    })));
                } else {
                    setError('Garden not found');
                }
            } catch (error) {
                console.error('Error fetching PieChart data:', error);
                setError('Failed to load PieChart data');
            }
        };

        // Fetch pie chart data when the component mounts and when the id changes
        setLoading(true);
        fetchPieChartData().finally(() => setLoading(false));
    }, [id]);  // Re-fetch data when the id changes


    // Code for APIs
    /*
    const GardenStats = () => {
        const [pieData, setPieData] = useState([]);
        const [barData, setBarData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchPieChartData = async () => {
                try {
                    const response = await axios.get('/api/garden-bed-stats'); // Replace with your actual API endpoint
                    const pieChartData = response.data.map((bed) => ({
                        name: bed.crop_name, // Assuming API returns crop name
                        value: bed.crop_count, // Assuming API returns crop count per bed
                    }));
                    setPieData(pieChartData);
                } catch (error) {
                    console.error('Error fetching PieChart data:', error);
                    setError('Failed to load PieChart data');
                }
            };

            const fetchBarChartData = async () => {
                try {
                    const response = await axios.get('/api/garden-activity-stats'); // Replace with your actual API endpoint
                    const barChartData = response.data.map((activity) => ({
                        day: activity.day,  // Assuming API returns the day of the activity
                        garden1: activity.garden1_time,  // Assuming API returns time taken in Garden 1
                        garden2: activity.garden2_time,  // Assuming API returns time taken in Garden 2
                        timeTaken: activity.time_taken,  // Total time taken for the activity
                    }));
                    setBarData(barChartData);
                } catch (error) {
                    console.error('Error fetching BarChart data:', error);
                    setError('Failed to load BarChart data');
                }
            };

            // Fetch both pie and bar chart data
            setLoading(true);
            Promise.all([fetchPieChartData(), fetchBarChartData()])
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }
    */

    return (
        <div className="flex">
            <SideNav />
            <div className="flex flex-col w-[84%] ml-[16%]">
                <Account />
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col p-8 w-[100%] flex flex-col gap-8 ">
                    <h2 className="text-lg font-bold mb-4">Garden Bed Space Usage</h2>
                    <div className="relative flex">
                        <PieChart className="mt-16" width={900} height={400}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                outerRadius={180}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        {/* Key for the Pie Chart */}
                        <div className="absolute right-0 bottom-20 bg-gray-100 p-4 border border-gray-200 rounded-md shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Crops</h3>
                            <ul>
                                {pieData.map((entry, index) => (
                                    <li key={index} className="flex items-center mb-1">
                                        <span
                                            className="inline-block w-4 h-4 mr-2 rounded-full"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></span>
                                        {entry.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GardenStats;
