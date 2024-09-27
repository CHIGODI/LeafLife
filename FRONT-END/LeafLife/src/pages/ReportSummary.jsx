import React, { useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Account from '../components/Account';

const ActivityPage = () => {
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dummy data for 5 gardens
    const dummyData = [
      { date: '2024-09-20', garden1: 70, garden2: 2, garden3: 4, garden4: 5, garden5: 1, garden6: 0 },
      { date: '2024-09-21', garden1: 4, garden2: 3, garden3: 2, garden4: 6, garden5: 3, garden6: 1 },
      { date: '2024-09-22', garden1: 2, garden2: 5, garden3: 5, garden4: 3, garden5: 4, garden6: 1 },
      { date: '2024-09-23', garden1: 5, garden2: 4, garden3: 1, garden4: 4, garden5: 2, garden6: 1 },
      { date: '2024-09-24', garden1: 6, garden2: 3, garden3: 2, garden4: 5, garden5: 3, garden6: 1 },

    ];

    setBarData(dummyData);
    setLoading(false);

    // Commented API part for later use
    /*
    const fetchBarChartData = async () => {
      try {
        const response = await fetch('/api/activities/'); // Replace with your actual API endpoint
        const activities = await response.json();

        const formattedData = activities.map((activity) => ({
          date: activity.date,
          garden1: activity.garden === 1 ? activity.time_taken : 0,
          garden2: activity.garden === 2 ? activity.time_taken : 0,
          garden3: activity.garden === 3 ? activity.time_taken : 0,
          garden4: activity.garden === 4 ? activity.time_taken : 0,
          garden5: activity.garden === 5 ? activity.time_taken : 0,
        }));

        setBarData(formattedData);
      } catch (error) {
        console.error('Error fetching BarChart data:', error);
        setError('Failed to load BarChart data');
      }
    };

    setLoading(true);
    fetchBarChartData()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    */
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex bg-bg h-screen">
      <SideNav className="w-[20%]" />
      <div className="w-[80%] ml-[20%] flex flex-col pl-[4%] pr-[4%]">
        <Account />
        <div className="flex justify-center gap-4  mt-[1.2%] gap-8 bg-yellow-300">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-lg font-bold mb-4">Garden Activity Progress</h2>
            <BarChart className="items-center mt-16" width={900} height={400} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Time Taken (Hours)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {Object.keys(barData[0])
                .filter(key => key.startsWith('garden'))
                .map((gardenKey, index) => (
                  <Bar key={gardenKey} dataKey={gardenKey} name={`Garden ${index + 1}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
