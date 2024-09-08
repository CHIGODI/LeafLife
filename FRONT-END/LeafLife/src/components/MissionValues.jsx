import React from 'react';
import logo from '../assets/images/logo.png';

const MissionValues = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center px-4 py-8 bg-white space-y-4 md:space-y-0 md:space-x-4">
      {/* Logo and Main Message - 1/3 of the space */}
      <div className="flex flex-col items-center mb-8 md:mb-0 md:basis-1/3 p-4">
        <img
          src={logo}
          alt="Leaf Life Logo"
          className="w-20 h-20 mb-4"
        />
        <h1 className="text-3xl font-bold text-center mb-4">
          Smart Farming for a Sustainable Future
        </h1>
        <p className="text-center max-w-xl text-gray-600">
          At Leaf Life, we empower farmers with digital tools to optimize their farming practices. Our mission is to simplify farm management and enhance crop rotation for better yields and sustainability. We strive to be a trusted partner in every farmer’s journey towards a smarter, more productive future.
        </p>
      </div>

      {/* Values and Work Sections - 2/3 of the space */}
      <div className="flex flex-col md:flex-row gap-4 md:basis-2/3 w-full">
        {/* Child Div 1 with Dark Green Border */}
        <div className="bg-green-300 p-6 rounded-lg shadow-md flex-1 border-2 border-green-800">
          <h2 className="text-xl font-bold mb-4 text-green-900">THE VALUES WE UPHOLD</h2>
          <p className="text-gray-700">
            At Leaf Life, our mission is to empower farmers with digital tools for smarter farm management and sustainable crop rotation. We envision a world where every farmer thrives through innovative, environmentally friendly practices. Our success is measured by the positive impact we create in transforming agriculture for a more sustainable future.
          </p>
        </div>
        
        {/* Child Div 2 with Dark Green Border */}
        <div className="bg-green-300 p-6 rounded-lg shadow-md flex-1 border-2 border-green-800">
          <h2 className="text-xl font-bold mb-4 text-green-900">THE WORK WE DO</h2>
          <p className="text-gray-700">
            At Leaf Life, we've empowered farmers with digital tools for smarter farming, advancing our vision of sustainability. We've turned challenges like technology adoption into opportunities for growth. Each success story strengthens our commitment to transforming agriculture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionValues;
