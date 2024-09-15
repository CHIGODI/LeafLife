import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const location = useLocation();
  return (
    <>
      <div className="flex">
        <SideNav className={`w-64`} />
        <div className="flex-1 flex flex-col">
          <Navbar />
            <div className="flex justify-center mt-4">
            <div className="flex space-x-4 w-[80%]">
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
                <h3 className="text-lg text-gray-700 font-semibold">Gardens</h3>
                <p className="text-gray-600 mt-6">You have 0 gardens</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
                <h3 className="text-lg text-gray-700 font-semibold">Beds</h3>
                <p className="text-gray-600 mt-6">You have 0 beds</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
                  <h3 className="text-lg text-gray-700 font-semibold">Crops planted</h3>
                  <p className="text-gray-600 mt-6">You have 0 crops</p>
              </div>
            </div>
            </div>
            <Link to="/new-farm" className={`bg-green-500 text-white py-2 px-4 rounded mt-[10%] w-[16%] ml-[10%] flex items-center justify-center hover:bg-green-400`}>
                <button><FontAwesomeIcon icon={faPlus} className="mr-2" />New Farm</button>
            </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
