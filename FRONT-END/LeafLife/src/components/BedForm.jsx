import React, { useState } from 'react';
import axios from 'axios';
import SideNav from './SideNav';
import Account from './Account';

const BedForm = () => {
  const [bedNumber, setBedNumber] = useState('');
  const [bedType, setBedType] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [soilType, setSoilType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const bedData = {
      bed_number: bedNumber,
      bed_type: bedType,
      length,
      width,
      soil_type: soilType,
    };

    try {
      const response = await axios.post('https://your-api-endpoint.com/beds', bedData);
      console.log(response.data);
      setSuccess(true);
      setBedNumber('');
      setBedType('');
      setLength('');
      setWidth('');
      setSoilType('');
    } catch (err) {
      console.error(err);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }

    // localStorage.setItem('bedData', JSON.stringify(bedData));

    // console.log('Data saved to local storage:', bedData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNav />
      <div className="w-[84%] ml-[16%] flex flex-col p-6">
        <Account />
        <div className="flex items-center justify-center mt-4">
          <div className="w-[60%] max-w-4xl p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add New Bed</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
              {success && <p className="text-green-500 bg-green-300 p-3 rounded-lg ">Bed added successfully!</p>}
              <div>
                <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-700">
                  Bed Number<span className="text-red-700 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="bedNumber"
                  value={bedNumber}
                  onChange={(e) => setBedNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  placeholder="Enter bed number"
                  required
                />
              </div>

              <div>
                <label htmlFor="bedType" className="block text-sm font-medium text-gray-700">
                  Bed Type<span className="text-red-700 ml-1">*</span>
                </label>
                <select
                  id="bedType"
                  value={bedType}
                  onChange={(e) => setBedType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  required
                >
                  <option value="">Select bed type</option>
                  <option value="raised">Raised Bed</option>
                  <option value="in_ground">In-Ground Bed</option>
                  <option value="container">Container Bed</option>
                </select>
              </div>

              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                  Length (in meters)<span className="text-red-700 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  placeholder="Enter length in meters"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                  Width (in meters)<span className="text-red-700 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  placeholder="Enter width in meters"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700">
                  Soil Type<span className="text-red-700 ml-1">*</span>
                </label>
                <select
                  id="soilType"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  required
                >
                  <option value="">Select soil type</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loam">Loam</option>
                  <option value="peat">Peat</option>
                  <option value="blackcotton">Black Cotton</option>
                  <option value="redsoil">Red Soil</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-[20%] py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Bed'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedForm;
