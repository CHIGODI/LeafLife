import React from 'react';

const HighlightCard = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between items-center transition-transform duration-200 hover:shadow-xl hover:scale-105">
      <div className="mb-4">
        {/* Use the image prop to display different images for each card */}
        <img
          src={image}
          alt={title}
          className="w-30 h-30 object-cover mb-4"
        />
        <h3 className="text-xl font-bold text-center">{title}</h3>
      </div>
      <p className="text-center text-gray-600 mb-4">
        {description}
      </p>
      <button className="mt-auto text-green-500 bg-green-200 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg transition duration-200">
        Read More
      </button>
    </div>
  );
};

export default HighlightCard;
