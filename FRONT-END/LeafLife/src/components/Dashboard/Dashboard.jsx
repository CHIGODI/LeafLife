import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar className="w-64" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <DashboardContent className="flex-1" />
      </div>
    </div>
  );
};

export default Dashboard;
