import React from 'react';

const Hero = (props) => {
  return (
    <section className="h-[87vh] flex items-center justify-center">
        <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"><span className="font-extrabold text-green-500" >{props.title1}</span><span className='font-extrabold text-[#E53935] '>{props.title2}</span></h1>
          <p className="my-4 text-xl text-white font-extrabold">{props.subtitle}</p>
        </div>
    </section>
  );
};

export default Hero;
