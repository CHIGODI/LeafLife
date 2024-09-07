import React from 'react';

const HighlightCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative mb-4 mr-4 ml-4">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <div className="border border-gray-100 mb-5"></div>

        <a
          href=""
          className="h-[36px] text-green-500 bg-green-200 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg text-center text-sm transition duration-300"
          >
          Read More
        </a>
      </div>
    </div>
  );
};

export default HighlightCard;
