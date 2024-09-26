import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FarmsDropdown from './FarmsDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBasketShopping, faBook, faGear  } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/leaf-life-logo.svg';

const SideNav = () => {
  const location = useLocation();

  return (
    <div className="w-[20%] fixed min-h-screen bg-nav-bg text-gray-800 flex flex-col text-nav-text shadow-right">
      <div className="pt-8 pb-8 pl-4 text-2xl font-bold cursor-pointer">
        <Link to="/" className='font-extrabold text-neutral-dark-gray text-3xl flex flex-row align-center'>
          <img className="h-10 w-auto" src={logo} alt="Logo" />
           LeafLife
        </Link>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-neutral-dark-gray">
        <li className={`w-[90%] rounded-tr-full rounded-br-full px-4 py-2 cursor-pointer ${location.pathname === '/dashboard' ? 'bg-nav-active' : 'hover:text-nav-hover transition-colors duration-300 ease-in-out'}  ${location.pathname === '/new-farm' ? 'bg-nav-active' : 'hover:text-nav-hover transition-colors duration-300 ease-in-out'}`}>
          <Link to="/dashboard" className="block w-full text-base">
            <FontAwesomeIcon className='mx-2' icon={faHouse} />
            Dashboard
          </Link>
        </li>
        <FarmsDropdown />
        <li className={`w-[90%] rounded-tr-full rounded-br-full px-4 py-2 cursor-pointer ${location.pathname === '/harvests' ? 'bg-nav-active' : 'hover:text-nav-hover transition-colors duration-300 ease-in-out'}`}>
          <Link to="/harvests" className="block w-full text-base">
            <FontAwesomeIcon className='mx-2' icon={faBasketShopping} />
            Yields
          </Link>
        </li>
        <li className={`w-[90%] rounded-tr-full rounded-br-full px-4 py-2 cursor-pointer ${location.pathname === '/activity' ? 'bg-nav-active' : 'hover:text-nav-hover transition-colors duration-300 ease-in-out'}`}>
          <Link to="/activity" className="block w-full text-base">
            <FontAwesomeIcon className='mx-2' icon={faBook} />
            Reports Summary
          </Link>
        </li>
        <li className={`w-[90%] rounded-tr-full rounded-br-full px-4 py-2 cursor-pointer ${location.pathname === '/growth-tracker' ? 'bg-nav-active' : 'hover:text-nav-hover transition-colors duration-300 ease-in-out'}`}>
          <Link to="/growth-tracker" className="block w-full text-base">
            <FontAwesomeIcon className='mx-2' icon={faGear} />
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
