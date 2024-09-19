import React from 'react';
import founderPic from '../assets/images/image1agri.jpg';

const FounderMessage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-white shadow-lg rounded-lg">
      <div className="flex-shrink-0 md:w-1/2 mb-4 md:mb-0">
        <img
          src={founderPic}
          alt="Founder"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      
      <div className="md:w-1/2 md:pl-6">
        <h2 className="text-2xl font-semibold mb-4">Message from the Founders</h2>
        <p className="text-gray-700">
          As we embark on our journey with Leaf Life, we are excited to share our inaugural annual report with you. This year has been a time of discovery and growth as we launched our platform and began our mission to empower farmers through innovative digital tools for sustainable agriculture. Despite being a new startup, our dedication to enhancing farm management and supporting local communities has driven us to make meaningful progress.
        </p>
        <p className="text-gray-700 mt-4">
          In this report, you will find an overview of our early achievements, the impact of our sustainability initiatives, and our vision for the future. We invite you to explore the highlights of our work and join us as we build towards a more sustainable and prosperous future for agriculture. Thank you for your support as we grow and make a difference together.
        </p>
      </div>
    </div>
  );
};

export default FounderMessage;
