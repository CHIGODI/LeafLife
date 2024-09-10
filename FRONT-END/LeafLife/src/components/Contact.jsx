import React from 'react';
import BackgroundImage from '../assets/images/image1agri.jpg';

const Contact = () => {
  return (
    <div className="h-screen bg-gray-300">
      {/* Contact Section with Background Image */}
      <div
        className="h-96 bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <h1 className="text-4xl font-bold mb-4 text-green-600">How To Reach Out To Us</h1>
        <p className="text-lg text-green-600">Visit our socials or get in touch via phone or email.</p>
      </div>

      {/* Footer with Contact Information */}
      <footer className="bg-gray-300 py-8">
        <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
            <p className="text-lg font-semibold text-green-600">PHONE</p>
            <p className="text-sm text-gray-600">+254 43 966 928</p>
            <p className="text-sm text-gray-600">+254 43 966 928</p>
            <p className="text-sm text-gray-600">+254 43 966 928</p>
            <p className="text-sm text-gray-600">+254 43 966 928</p>
          </div>
          <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
            <p className="text-lg font-semibold text-green-600">EMAIL</p>
            <p className="text-sm text-gray-600">leaflife@gmail.com</p>
            <p className="text-sm text-gray-600">julius@gmail.com</p>
            <p className="text-sm text-gray-600">prudence@gmail.com</p>
            <p className="text-sm text-gray-600">antony@gmail.com</p>
            <p className="text-sm text-gray-600">diana@gmail.com</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-lg font-semibold text-green-600">SOCIAL</p>
            <p className="text-sm text-gray-600">@leaflife</p>
            <p className="text-sm text-gray-600">@julius</p>
            <p className="text-sm text-gray-600">@prudence</p>
            <p className="text-sm text-gray-600">@antony</p>
            <p className="text-sm text-gray-600">@diana</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
