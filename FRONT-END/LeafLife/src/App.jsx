import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FounderMessage from './components/FounderMessage';
import FunctionCards from './components/FunctionCards';
import MissionValues from './components/MissionValues';
import Sustainability from './components/Sustainability';
import Founders from './components/Founders';
import Contact from './components/Contact';
import SignupForm from './components/Dashboard/SignUpForm';
import LoginForm from './components/Dashboard/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import GardenPage from './components/Dashboard/GardenPage';
import BedPage from './components/Dashboard/BedPage';
import CropPage from './components/Dashboard/CropPage';
import HarvestPage from './components/Dashboard/HarvestPage';
import ActivityPage from './components/Dashboard/ActivityPage';
import GrowthTrackerPage from './components/Dashboard/GrowthTrackerPage';
import agriImage from './assets/images/agri2.jpg';
import agriImage2 from './assets/images/aerial1.jpg';

const Home = () => (
  <>
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${agriImage})` }}>
      <Navbar />
      <Hero title="Welcome to Leaf Life" subtitle="Grow your passion for farming" />
    </div>
    <FounderMessage />
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${agriImage2})` }}>
      <FunctionCards />
    </div>
    <MissionValues />
    <Sustainability />
    <Founders />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignupForm />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginForm />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        {/* Add new routes */}
        <Route path="/gardens" element={<GardenPage />} />
        <Route path="/beds" element={<BedPage />} />
        <Route path="/crops" element={<CropPage />} />
        <Route path="/harvests" element={<HarvestPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/growth-tracker" element={<GrowthTrackerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
