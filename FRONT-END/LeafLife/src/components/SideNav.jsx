import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        <button
          onClick={() => setIsFarmsOpen(!isFarmsOpen)}
          className={`px-4 py-2 cursor-pointer w-full text-left ${location.pathname.startsWith('/gardens') ? 'bg-green-200' : 'hover:bg-green-200'}`}
        >
          My Farms
        </button>
        <li className="cursor-pointer">
          {isFarmsOpen && (
            <ul className="pl-6 text-sm bg-green-50 rounded-md cursor-pointer">
              <li className={`mt-0 px-2 py-1 ${location.pathname === '/gardens' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
                <Link to="/gardenstats" className="block w-full">North Garden</Link>
              </li>
              <li className={`mt-0 px-2 py-1 ${location.pathname === '/gardens' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
                <Link to="/gardenstats" className="block w-full">South Garden</Link>
              </li>
            </ul>
          )}
        </li>
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
