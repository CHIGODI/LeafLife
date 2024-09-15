import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-auto bg-green-600 text-offwhite">
      <div className="p-4 text-2xl font-bold border-b border-green-700">
        Leaflife
      </div>
      <ul className="mt-4 space-y-2">
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/dashboard">User Dashboard</Link>
        </li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/gardens">Gardens</Link>
        </li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/beds">Beds</Link>
        </li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/crops">Crops</Link>
        </li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/harvests">Harvests</Link>
        </li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/activity">Activity</Link>
        </li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">
          <Link to="/growth-tracker">Growth Tracker</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
