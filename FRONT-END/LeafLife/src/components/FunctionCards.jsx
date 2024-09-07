import React from 'react';
import HighlightCard from './HighlightCard';

const FunctionCards = () => {
  // a dynamic data
  const highlights = [
    {
      title: 'Crop Rotation',
      description: 'Crop rotation fsghdsb hdcjksed',
    },
    {
      title: 'Soil Health',
      description: 'Maintaining soil health through sustainable practices.',
    },
    {
      title: 'Water Management',
      description: 'Efficient water management techniques for farming.',
    },
    {
      title: 'Pest Control',
      description: 'Integrated pest management strategies to protect crops.',
    },
    {
      title: 'Nutrient Management',
      description: 'Optimizing the use of fertilizers to improve crop yields.',
    },
    {
      title: 'Climate Adaptation',
      description: 'Adapting farming practices to changing climate conditions.',
    },
    {
      title: 'Climate Adaptation',
      description: 'Adapting farming practices to changing climate conditions.',
    },
    {
      title: 'Climate Adaptation',
      description: 'Adapting farming practices to changing climate conditions.',
    },
  ];
  

  return (
    <section className="">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Leaf Life Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Map through the highlights array and render a HighlightCard for each highlight */}
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunctionCards;
