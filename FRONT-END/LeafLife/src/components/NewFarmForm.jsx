import React, { useState, useRef } from 'react';
import Account from './Account';
import Sidebar from './SideNav';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const NewFarmForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [formError, setFormError] = useState(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || lat === null || long === null) {
      setFormError("Please fill in all required fields and select a location.");
      return;
    }
    setFormError(null);

    try {
      const response = await api.post('/garden/create/', { name, description, lat, long });
      toast.success("Garden created successfully!");
      navigate(`/gardenstats/${response.data.id}`);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.name);
        setFormError(error.response.data.name);
      } else {
        setFormError('[Network] An unexpected error occurred. Please try again.');
      }
    }
  };

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 0.0236, // Default latitude
    lng: 37.9062 // Default longitude
  };

  const onMapClick = (e) => {
    setLat(e.latLng.lat());
    setLong(e.latLng.lng());
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newLat = place.geometry.location.lat();
      const newLng = place.geometry.location.lng();
      setLat(newLat);
      setLong(newLng);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-[84%] ml-[16%] flex flex-col p-6">
        <Account />
        <div className="flex items-center justify-center mt-4">
          <div className="w-[60%] max-w-4xl p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add new farm</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Garden Name<span className="text-red-700 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  placeholder="Enter garden name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description<span className="text-red-700 ml-1">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  placeholder="Enter garden description"
                />
              </div>

              {/* Google Map and Autocomplete */}
              <div className="my-4">
                <LoadScript googleMapsApiKey={GMAP_API_KEY} libraries={['places']}>
                  <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={onPlaceChanged}>
                    <input
                      type="text"
                      placeholder="Search for a location"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm mb-4"
                    />
                  </Autocomplete>

                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={10}
                    center={lat && long ? { lat, lng: long } : defaultCenter}
                    onClick={onMapClick}
                  >
                    {lat && long && <Marker position={{ lat, lng: long }} />}
                  </GoogleMap>
                </LoadScript>
              </div>

              <input type="hidden" value={lat} />
              <input type="hidden" value={long} />

              {formError && <p className="text-red-500">{formError}</p>}
              <button
                type="submit"
                className="ml-[80%] w-[20%] py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              >
                Add farm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFarmForm;
