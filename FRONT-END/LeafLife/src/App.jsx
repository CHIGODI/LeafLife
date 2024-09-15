import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing_page';
import SignUp from './pages/SignUp_page';
import LoginPage from './pages/Login_page';
import Dashboard from './pages/Dashboard_page';
import BedPage from './components/BedPage';
import CropPage from './components/CropPage';
import HarvestPage from './components/HarvestPage';
import ActivityPage from './components/ActivityPage';
import GrowthTrackerPage from './components/GrowthTrackerPage';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import NewFarmForm from './components/NewFarmForm';
import GardenStats from './pages/Garden_page';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup"
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
        <Route path="/login"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route path="/dashboard"
          element={<Dashboard />}
        />
        <Route path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route path="/gardens" element={<GardenStats />} />
        <Route path="/gardenstats" element={<GardenStats />} />
        <Route path="/beds" element={<BedPage />} />
        <Route path="/crops" element={<CropPage />} />
        <Route path="/harvests" element={<HarvestPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/growth-tracker" element={<GrowthTrackerPage />} />
        <Route path="/new-farm" element={<NewFarmForm />} />
      </Routes>
    </Router>
  );
};

export default App;
