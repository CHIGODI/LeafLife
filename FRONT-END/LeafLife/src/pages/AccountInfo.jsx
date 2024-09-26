import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaPen, FaMapMarkerAlt } from 'react-icons/fa'; // For icons
import api from '../utils/api';
import SideNav from '../components/SideNav';

const AccountInfo = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/');
        setProfile(response.data);
      } catch (err) {
        setError('Unable to fetch profile information.');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="flex">
      <SideNav />
      <div className="bg-[#F2F2F2] min-h-screen w-[80%] ml-[20%] px-[5%] py-10 flex flex-col items-start">
        <h1 className="text-3xl font-bold mb-6">Account Profile</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaUser className="text-gray-600" /> Personal Information
          </h2>
          <div className="text-gray-700 space-y-2">
            <p><span className="font-semibold">Name:</span> {profile.name}</p>
            <p><FaEnvelope className="inline mr-2" /> Email: {profile.email}</p>
            <p><span className="font-semibold">Username:</span> {profile.username}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-gray-600" /> Account Insights
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
            <p>Last Login: {new Date(profile.last_login).toLocaleString()}</p>
            <p>Posts: {profile.posts_count}</p>
            <p>Followers: {profile.followers_count}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaPen className="text-gray-600" /> Other Details
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>Bio: {profile.bio || 'N/A'}</p>
            <p><FaMapMarkerAlt className="inline mr-2" /> Location: {profile.location || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
