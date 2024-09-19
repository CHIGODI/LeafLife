import React, { useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import Navbar from '../components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ActivityPage = () => {
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await fetch('/garden-activity-stats.json'); // Fetch from the JSON file
        const barChartData = await response.json();
        setBarData(barChartData.map((activity) => ({
          day: activity.day,
          garden1: activity.garden1_time,
          garden2: activity.garden2_time,
          timeTaken: activity.time_taken,
        })));
      } catch (error) {
        console.error('Error fetching BarChart data:', error);
        setError('Failed to load BarChart data');
      }
    };

    setLoading(true);
    fetchBarChartData()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-col w-[84%] ml-[16%]">
        <Navbar />
        <div className="p-8 w-[100%] flex flex-col gap-8 ">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-lg font-bold mb-4">Garden Activity Progress</h2>
            <BarChart className="items-center mt-16" width={900} height={400} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: 'Time Taken (Hours)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="garden1" name="Garden 1" fill="#8884d8" />
              <Bar dataKey="garden2" name="Garden 2" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
