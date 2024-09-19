import React from 'react';
import BackgroundImage from '../assets/images/image1agri.jpg';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-300">
      <div
        className="h-96 bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <h1 className="text-4xl font-bold mb-4 text-green-600">How To Reach Out To Us</h1>
        <p className="text-lg text-green-600">Visit our socials or get in touch via phone or email.</p>
      </div>

      <footer className="bg-green-700 text-white py-8">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul>
              <li>FarmCloud</li>
              <li>FarmShield</li>
              <li>Smart Greenhouses</li>
              <li>Screenhouses</li>
              <li>NetHouses</li>
              <li>Smart Drip Kits</li>
              <li>Herbs for Export</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Resources</h2>
            <ul>
              <li>About Us</li>
              <li>Farmer Help Centre</li>
              <li>Sign into FarmCloud</li>
              <li>Pricing Calculator</li>
              <li>Pre-Site Survey</li>
              <li>Request a Meeting</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <p>Synnefa Kenya office</p>
            <p>Postal Address: P.O. BOX 23170-00505</p>
            <p>Nairobi, Kenya</p>
            <p>Kenya Support Line: +254 20 3892455</p>
            <p>US Support Line: +1 302 545 4495</p>

            <div className="flex space-x-4 mt-4">
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
