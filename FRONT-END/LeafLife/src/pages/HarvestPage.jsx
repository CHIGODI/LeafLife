import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidenav from '../components/SideNav'; // Import Sidenav component
import Navbar from '../components/Navbar';   // Import Navbar component
import Account from '../components/Account';

const YieldComponent = () => {
  const dummyYields = [
    { bed: 'Bed 1', crop: 'Tomatoes', quantity_harvested: 120, notes: 'Good yield, healthy crops.', harvest_date: '2024-09-20' },
    { bed: 'Bed 2', crop: 'Lettuce', quantity_harvested: 50, notes: 'Some leaves were damaged.', harvest_date: '2024-09-22' },
    { bed: 'Bed 3', crop: 'Carrots', quantity_harvested: 200, notes: 'Yield was above average.', harvest_date: '2024-09-23' },
    { bed: 'Bed 4', crop: 'Carrots', quantity_harvested: 200, notes: 'Yield was above average.', harvest_date: '2024-09-23' },
    { bed: 'Bed 5', crop: 'Carrots', quantity_harvested: 200, notes: 'Yield was above average.', harvest_date: '2024-09-23' },
    { bed: 'Bed 6', crop: 'Carrots', quantity_harvested: 200, notes: 'Yield was above average.', harvest_date: '2024-09-23' },
    { bed: 'Bed 7', crop: 'Carrots', quantity_harvested: 200, notes: 'Yield was above average.', harvest_date: '2024-09-23' },

  ];

  const [yields, setYields] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('bed');
  const [filterCrop, setFilterCrop] = useState('');

  useEffect(() => {
    // Comment out when using dummy data
    // fetchYields();

    setYields(dummyYields);
  }, []);

  const fetchYields = async () => {
    try {
      const response = await axios.get('/api/harvests/');
      setYields(response.data);
    } catch (error) {
      console.error('Error fetching yields', error);
    }
  };

  const handleSort = (criteria) => {
    const sortedYields = [...yields].sort((a, b) => (a[criteria] < b[criteria] ? -1 : 1));
    setSortCriteria(criteria);
    setYields(sortedYields);
  };

  const handleFilterChange = (e) => setFilterCrop(e.target.value);

  const filteredYields = yields.filter((yieldItem) => yieldItem.crop.toLowerCase().includes(filterCrop.toLowerCase()));

  return (
    <div className="flex h-screen">
      {/* Sidenav */}
      <Sidenav className="w-[20%] bg-green-800" />

      {/* Main Content Area */}
      <div className="w-[80%] ml-[20%] flex flex-col pl-[4%] pr-[4%]">
        <Account />
        <div className="p-4 text-text-dk text-bold text-l ">
          <h1 className="text-xl font-bold mb-4">Your Yields</h1>
          {/* Sorting and Filtering */}
          <div className="mb-4 text-gray-600">
            <label className="mr-4 ">Sort by:</label>
            <button onClick={() => handleSort('bed')} className="mr-2">Bed</button>
            <button onClick={() => handleSort('crop')} className="mr-2">Crop</button>
            <button onClick={() => handleSort('harvest_date')}>Harvest Date</button>
          </div>

          <div className="mb-4">
            <label className="mr-4 text-gray-400">Filter by Crop:</label>
            <input
              type="text"
              placeholder="Enter crop name"
              value={filterCrop}
              onChange={handleFilterChange}
              className="border px-2 py-1"
            />
          </div>

          {/* Yield Table */}
          {filteredYields.length > 0 ? (
            <table className="min-w-full bg-white border text-gray-600">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Bed</th>
                  <th className="py-2 px-4 border">Crop</th>
                  <th className="py-2 px-4 border">Quantity Harvested</th>
                  <th className="py-2 px-4 border">Notes</th>
                  <th className="py-2 px-4 border">Harvest Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredYields.map((yieldItem, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="py-2 px-4 border">{yieldItem.bed}</td>
                    <td className="py-2 px-4 border">{yieldItem.crop}</td>
                    <td className="py-2 px-4 border">{yieldItem.quantity_harvested}</td>
                    <td className="py-2 px-4 border">{yieldItem.notes}</td>
                    <td className="py-2 px-4 border">{yieldItem.harvest_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No yields recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldComponent;
