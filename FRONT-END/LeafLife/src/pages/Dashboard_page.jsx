import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Account from '../components/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSeedling, faMountain, faLeaf, faChartLine } from '@fortawesome/free-solid-svg-icons';
import api from '../utils/api';
import FarmsDropdown from '../components/FarmsDropdown';


const Dashboard = () => {
  // data is an object with keys gardens, beds and crops
  const [data, setData] = useState({
    gardens: 0,
    beds: 0,
    crops: 0,
  });
  const [full_tree, setGardens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Here we will fetch data for number of gardens, crops and beds
  // Here django is supposed to return a dictionary with keys gardens, beds and crops
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/user/stats/'); // Use the api instance
        // Calculate total gardens, beds, and crops
        const { gardens } = response.data.full_tree;

        console.log(gardens);
        // Calculate total gardens, beds, and crops in a single pass
        let totalGardens = gardens.length;
        let totalBeds = 0;
        let totalCrops = 0;

        gardens.forEach(garden => {
          totalBeds += garden.beds.length; // Count beds in each garden
          garden.beds.forEach(bed => {
            totalCrops += bed.crops.length; // Count crops in each bed
          });
        });
        // Update the state with the fetched data
        setData({
          gardens: totalGardens,
          beds: totalBeds,
          crops: totalCrops,
        });
        setLoading(false);
        // get full tree
        const fullTree = response.data.full_tree
        // console.log(fullTree.gardens)
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
      <div className="flex bg-bg h-screen">
        <SideNav className="w-[20%]" />

        <div className="w-[80%] ml-[20%] flex flex-col pl-[4%] pr-[4%]">
          <Account />
          <div className="flex flex-row flex-wrap justify-center gap-4  mt-[1.2%]">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1 min-w-[48%] max-w-[50%] shadow-all">
              <h5 className="text-text-lg flex justify-between items-center">
                GARDENS
                <FontAwesomeIcon icon={faMountain} className="mr-2" />
              </h5>

                {loading ? (
                  <h2 className="text-text-dk text-bold text-xl">Loading...</h2>
                ) : error ? (
                  <h2 className="text-text-dk text-bold text-xl">{error}</h2>
                ) : (
                  <h2 className="text-text-dk text-bold text-xl">{data.gardens}</h2>
                )}
              <p className="text-text-lg text-xs">
                Total number of gardens you have
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1 min-w-[48%] max-w-[50%] shadow-all">
              <h5 className="text-text-lg flex justify-between items-center">
                BEDS
                <FontAwesomeIcon icon={faMountain} className="mr-2" />
              </h5>

              {loading ? (
                <h2 className="text-text-dk text-bold text-xl">Loading...</h2>
              ) : error ? (
                <h2 className="text-text-dk text-bold text-xl">{error}</h2>
              ) : (
                <h2 className="text-text-dk text-bold text-xl">{data.beds}</h2>
              )}
              <p className="text-text-lg text-xs">
                Total number of beds you have
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1 min-w-[48%] max-w-[50%] shadow-all">
              <h5 className="text-text-lg flex justify-between items-center">
                CROPS
                <FontAwesomeIcon icon={faSeedling} className="mr-2" />
              </h5>

              {loading ? (
                <h2 className="text-text-dk text-bold text-xl">Loading...</h2>
              ) : error ? (
                <h2 className="text-text-dk text-bold text-xl">{error}</h2>
              ) : (
                <h2 className="text-text-dk text-bold text-xl">{data.crops}</h2>
              )}
              <p className="text-text-lg text-xs">
                Total number of crops planted
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1 min-w-[48%] max-w-[50%] shadow-all">
              <h5 className="text-text-lg flex justify-between items-center">
                ACTIVITIES
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              </h5>

              {loading ? (
                <h2 className="text-text-dk text-bold text-xl">Loading...</h2>
              ) : error ? (
                <h2 className="text-text-dk text-bold text-xl">{error}</h2>
              ) : (
                <h2 className="text-text-dk text-bold text-xl">{data.activities}</h2>
              )}
              <p className="text-text-lg text-xs">
                You have no activities yet
              </p>
            </div>
          </div>

          <Link
            to="/new-farm"
            className="bg-green-500 text-white py-2 px-4 rounded mt-[10%] w-[16%] ml-[80%] flex items-center justify-center hover:bg-green-400 transition-colors duration-300 ease-in-out"
          >
            <button>
              <FontAwesomeIcon icon={faPlus} className="" />
              New Farm
            </button>
          </Link>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
