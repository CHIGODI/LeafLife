import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';  // Ensure axios is installed and imported

const Dashboard = () => {
  // data is an object with keys gardens, beds and crops
  const [data, setData] = useState({
    gardens: 0,
    beds: 0,
    crops: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Here we will fetch data for number of gardens, crops and beds
  // Here django is supposed to return a dictionary with keys gardens, beds and crops
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/stats/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          } 
        );
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        if (error.response) {
          // Server responded with a status code other than 2xx
          console.error('[Backend]:', error.response.data);
          setError(error.response.data.error);
      } else {
          // Network error or other unexpected error
          setError('[Network]:An unexpected error occurred. Please try again.');
          console.error('Error logging in:', error.message);
      }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex">
        <SideNav className="w-64" />

        <div className="w-[84%] ml-[16%] flex flex-col p-6">
          <Account />
          <div className="flex justify-center mt-4">
            <div className="flex space-x-4 w-[80%]">
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
                <h3 className="text-lg text-gray-700 font-semibold">Gardens</h3>
                {loading ? (
                  <p className="text-gray-600 mt-6">Loading...</p>
                ) : error ? (
                  <p className="text-gray-600 mt-6">{error}</p>
                ) : (
                  <p className="text-gray-600 mt-6">You have {data.gardens} gardens</p>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
                <h3 className="text-lg text-gray-700 font-semibold">Beds</h3>
                {loading ? (
                  <p className="text-gray-600 mt-6">Loading...</p>
                ) : error ? (
                  <p className="text-gray-600 mt-6">{error}</p>
                ) : (
                  <p className="text-gray-600 mt-6">You have {data.beds} beds</p>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
                <h3 className="text-lg text-gray-700 font-semibold">Crops planted</h3>
                {loading ? (
                  <p className="text-gray-600 mt-6">Loading...</p>
                ) : error ? (
                  <p className="text-gray-600 mt-6">{error}</p>
                ) : (
                  <p className="text-gray-600 mt-6">You have {data.crops} crops</p>
                )}
              </div>
            </div>
          </div>

          <Link
            to="/new-farm"
            className="bg-green-500 text-white py-2 px-4 rounded mt-[10%] w-[16%] ml-[10%] flex items-center justify-center hover:bg-green-400"
          >
            <button>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              New Farm
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
