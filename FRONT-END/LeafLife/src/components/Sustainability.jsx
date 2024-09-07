import React from 'react';
import Image1 from '../assets/images/aerial1.jpg';
import Image2 from '../assets/images/image1agri.jpg';
import Image3 from '../assets/images/image2agri.jpg';
import Image4 from '../assets/images/image3agti.jpg';

const Sustainability = () => {
  return (
    <div className="flex flex-col px-8 py-12 bg-green-300 shadow-lg">
      {/* Title and Description Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 flex-grow">
        {/* Title */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-black leading-tight mb-6">
            Advocating for sustainability
          </h1>
        </div>
        
        {/* Description */}
        <div className="md:w-1/2 text-gray-700 leading-relaxed">
          <p>
            At Leaf Life, we champion sustainability by promoting eco-friendly farming practices that minimize environmental impact. We support local communities through education and resources, enhancing agricultural practices and livelihoods. Our commitment to ethical governance ensures transparency and accountability, driving positive change for both the environment and the communities we serve.
          </p>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 flex-grow">
        <img
          src={Image4}
          alt="Planting"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <img
          src={Image1}
          alt="Farming with Oxen"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <img
          src={Image3}
          alt="Crop Field"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <img
          src={Image2}
          alt="Farmer Inspecting Plants"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 italic">
        Engaging the local community is a vital component of our work.
      </div>
    </div>
  );
};

export default Sustainability;
