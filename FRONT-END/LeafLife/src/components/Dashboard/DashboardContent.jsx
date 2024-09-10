import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const pieData = [
  { name: 'Tomatoes', value: 25 },
  { name: 'Carrots', value: 15 },
  { name: 'Lettuce', value: 20 },
  { name: 'Peppers', value: 10 },
  { name: 'Beans', value: 30 },
];

const barData = [
  { day: 'Mon', timeTaken: 5, garden1: 4, garden2: 2 },
  { day: 'Tue', timeTaken: 3, garden1: 3, garden2: 1 },
  { day: 'Wed', timeTaken: 4, garden1: 2, garden2: 3 },
  { day: 'Thu', timeTaken: 6, garden1: 5, garden2: 2 },
  { day: 'Fri', timeTaken: 2, garden1: 1, garden2: 1 },
  { day: 'Sat', timeTaken: 7, garden1: 4, garden2: 3 },
  { day: 'Sun', timeTaken: 5, garden1: 3, garden2: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

const DashboardContent = () => {
  return (
    <div className="p-8 mt-16 flex flex-col w-auto gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">Garden Bed Space Usage</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">Garden 1 Activity Progress</h2>
        <BarChart width={600} height={300} data={barData}>
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
  );
};

export default DashboardContent;
