import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-auto bg-green-600 text-offwhite">
      <div className="p-4 text-2xl font-bold border-b border-green-700">
        Leaflife
      </div>
      <ul className="mt-4 space-y-2">
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">Dashboard</li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">My Garden</li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">Bed</li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">Plants</li>
      </ul>
      <hr className="border-gray-700 my-4 mx-2" />
      <ul className="space-y-2">
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">New</li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">New</li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">New</li>
        <li className="px-4 py-2 hover:bg-green-700 cursor-pointer">New</li>
      </ul>
    </div>
  );
};

export default Sidebar;
