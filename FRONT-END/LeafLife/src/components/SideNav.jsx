import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FarmsDropdown from '../pages/FarmsDropdown';

const SideNav = () => {
  const location = useLocation();
  const [isFarmsOpen, setIsFarmsOpen] = useState(false);

  return (
    <div className="w-[16%] fixed min-h-screen bg-green-50 text-gray-800">
      <div className="p-4 text-2xl font-bold border-b border-green-700">
        Leaflife
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/dashboard' ? 'bg-green-200' : 'hover:bg-green-200'}  ${location.pathname === '/new-farm' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/dashboard" className="block w-full">Dashboard</Link>
        </li>
        <FarmsDropdown />
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/harvests' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/harvests" className="block w-full">Yields</Link>
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/activity' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/activity" className="block w-full">Reports Summary</Link>
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/growth-tracker' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/growth-tracker" className="block w-full">Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
