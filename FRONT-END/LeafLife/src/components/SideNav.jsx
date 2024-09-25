import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FarmsDropdown from './FarmsDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBasketShopping, faBook, faGear  } from '@fortawesome/free-solid-svg-icons';

const SideNav = () => {
  const location = useLocation();

  return (
    <div className="w-[16%] fixed min-h-screen bg-green-50 text-gray-800 flex flex-col">
      <div className="p-4 text-2xl font-bold cursor-pointer">
        <Link to="/" className='font-bold'>LeafLife</Link>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        <li className={`w-[90%] rounded-tr-lg rounded-br-lg px-4 py-2 cursor-pointer ${location.pathname === '/dashboard' ? 'bg-green-200' : 'hover:bg-green-200'}  ${location.pathname === '/new-farm' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/dashboard" className="block w-full">
            <FontAwesomeIcon className='mx-2' icon={faHouse} />
            Dashboard
          </Link>
        </li>
        <FarmsDropdown />
        <li className={`w-[90%] rounded-tr-lg rounded-br-lg px-4 py-2 cursor-pointer ${location.pathname === '/harvests' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/harvests" className="block w-full">
            <FontAwesomeIcon className='mx-2' icon={faBasketShopping} />
            Yields
          </Link>
        </li>
        <li className={`w-[90%] rounded-tr-lg rounded-br-lg px-4 py-2 cursor-pointer ${location.pathname === '/activity' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/activity" className="block w-full">
            <FontAwesomeIcon className='mx-2' icon={faBook} />
            Reports Summary
          </Link>
        </li>
        <li className={`w-[90%] rounded-tr-lg rounded-br-lg px-4 py-2 cursor-pointer ${location.pathname === '/growth-tracker' ? 'bg-green-200' : 'hover:bg-green-200'}`}>
          <Link to="/growth-tracker" className="block w-full">
            <FontAwesomeIcon className='mx-2' icon={faGear} />
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
