import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const HighlightCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative mb-4 mr-4 ml-4 transform transition duration-200 ease-in-out hover:shadow-xl hover:scale-95 active:scale-85">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <div className="border border-gray-100 mb-5"></div>

        <Link
          to="/login"
          className="h-[36px] text-green-500 bg-green-200 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg text-center text-sm transition duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default HighlightCard;
