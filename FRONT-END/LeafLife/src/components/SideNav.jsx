import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
  const location = useLocation();
  const [isFarmsOpen, setIsFarmsOpen] = useState(false);

  return (
    <div className="w-52 min-h-screen bg-green-50 text-gray-800">
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
          Farms
        </button>
        <li className="cursor-pointer">
          {isFarmsOpen && (
            <ul className="pl-6 text-sm bg-green-50 rounded-md cursor-pointer">
              <li className={`mt-0 px-2 py-1 ${location.pathname === '/gardens' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
                <Link to="/gardenstats" className="block w-full">Julio Garden</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/beds' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/beds" className="block w-full">Beds</Link>
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/crops' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/crops" className="block w-full">Crops</Link>
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/harvests' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/harvests" className="block w-full">Yields</Link>
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/activity' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/activity" className="block w-full">Activities Reports</Link>
        </li>
        <li className={`px-4 py-2 cursor-pointer ${location.pathname === '/growth-tracker' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/growth-tracker" className="block w-full">Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
