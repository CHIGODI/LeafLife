import React from 'react';
import dataimage1 from '../assets/images/dataimage1.png';
import { Link } from 'react-router-dom';

const HowToAccessLeafLife = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
            <div className="p-6 rounded-lg">
                <img
                    src={dataimage1}
                    alt="Farm management illustration"
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="flex flex-col space-y-10">
                <div className="flex flex-col mb-2">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        How to access the power<br /> of <span className="text-green-600 font-bold">Leaf</span><span className="font-bold text-blue-500">Life</span>
                    </h1>
                </div>
                <div className="text-left">
                    <p className="text-lg text-gray-700 font-medium">
                        <span className="text-green-500">✔</span> Sign up for free access and set up your farm
                    </p>
                </div>
                <div className="text-left">
                    <p className="text-lg text-gray-700 font-medium">
                        <span className="text-green-500">✔</span> Enter daily farm records through Mobile or Laptop
                    </p>
                </div>
                <div className="text-left">
                    <p className="text-lg text-gray-700 font-medium">
                        <span className="text-green-500">✔</span> Share farm with experienced agronomists
                    </p>
                </div>
                <div className="text-left">
                    <p className="text-lg text-gray-700 font-medium">
                        <span className="text-green-500">✔</span> Instant delivery of farm inputs and inventory management
                    </p>
                </div>
                <div className="text-left">
                    <p className="text-lg text-gray-700 font-medium">
                        <span className="text-green-500">✔</span> Get instant connection to market access, financing, and insurance
                    </p>
                </div>
                <div className="mt-8">
                    <Link to="/signup">
                    <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300">
                        Free Signup
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowToAccessLeafLife;
