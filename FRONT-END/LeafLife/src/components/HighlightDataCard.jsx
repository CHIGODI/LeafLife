import React from 'react';
import HighlightCard from './HighlightCard';
import agriImage2 from '../assets/images/aerial1.jpg';

// Import your images
import Image1 from '../assets/images/highlight1.png';
import Image2 from '../assets/images/highlight2.png';
import Image3 from '../assets/images/highlight3.png';
import Image4 from '../assets/images/highlight2.png';

const HighlightDataCard = () => {
  const highlights = [
    {
      title: 'Premium Markets',
      description: "Access premium markets that demand detailed crop records.",
      image: Image1,
    },
    {
      title: 'Connect to Sensors',
      description: "Boost your yields by 30% with FarmShield soil sensors.",
      image: Image2,
    },
    {
      title: 'Agronomic Support',
      description: 'Get expert scoring to achieve higher yields.',
      image: Image3,
    },
    {
      title: 'Access to Capital',
      description: "Use farming records as collateral to get financing.",
      image: Image4,
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${agriImage2})`,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundBlendMode: 'overlay'
      }}
    >
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Leaf Life Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              title={highlight.title}
              description={highlight.description}
              image={highlight.image}
            />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default HighlightDataCard;
