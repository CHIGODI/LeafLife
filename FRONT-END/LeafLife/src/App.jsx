import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing_page';
import SignUp from './pages/SignUp_page';
import LoginPage from './pages/Login_page';
import Dashboard from './pages/Dashboard_page';
import BedForm from './components/BedForm';
import CropPage from './pages/CropPage';
import HarvestPage from './pages/HarvestPage';
import AccountInfo from './pages/AccountInfo';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import NewFarmForm from './components/NewFarmForm';
import GardenStats from './pages/Garden_page';
import ActivityPage from './pages/ActivityPage';


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
        <Route path="/beds" element={<BedForm />} />
        <Route path="/crops" element={<CropPage />} />
        <Route path="/harvests" element={<HarvestPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/account-info" element={<AccountInfo/>} />
        <Route path="/new-farm" element={<NewFarmForm />} />
      </Routes>
    </Router>
  );
};

export default App;
