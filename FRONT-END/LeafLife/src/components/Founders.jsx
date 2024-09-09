import React from 'react';
import Dee from '../assets/images/dee.jpg';

const Founders = () => {
  return (
    <div className="bg-white-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-10">MEET THE FOUNDERS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-screen-lg">
        <div className="flex flex-col items-center p-4 bg-gray-100 shadow-md rounded-lg">
          <img 
            src={Dee} 
            alt="Julius" 
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover mb-4 rounded-full" 
          />
          <p className="text-lg font-semibold text-green-600 mb-2">JULIUS</p>
          <p className="text-sm text-gray-600 mb-1">julius@example.com</p>
          <p className="text-sm text-gray-600">github.com/julius</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-100 shadow-md rounded-lg">
          <img 
            src={Dee} 
            alt="Antony" 
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover mb-4 rounded-full" 
          />
          <p className="text-lg font-semibold text-green-600 mb-2">ANTONY</p>
          <p className="text-sm text-gray-600 mb-1">antony@example.com</p>
          <p className="text-sm text-gray-600">github.com/antony</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-100 shadow-md rounded-lg">
          <img 
            src={Dee} 
            alt="Prudence" 
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover mb-4 rounded-full" 
          />
          <p className="text-lg font-semibold text-green-600 mb-2">PRUDENCE</p>
          <p className="text-sm text-gray-600 mb-1">prudence@example.com</p>
          <p className="text-sm text-gray-600">github.com/prudence</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-100 shadow-md rounded-lg">
          <img 
            src={Dee} 
            alt="Diana" 
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover mb-4 rounded-full" 
          />
          <p className="text-lg font-semibold text-green-600 mb-2">DIANA</p>
          <p className="text-sm text-gray-600 mb-1">diana@example.com</p>
          <p className="text-sm text-gray-600">github.com/diana</p>
        </div>
      </div>
    </div>
  );
}

export default Founders;
