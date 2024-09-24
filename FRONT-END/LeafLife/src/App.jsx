import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import ProtectedRoutes from './components/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// logout function
const Logout = () => {
  localStorage.clear();
  return <Navigate to="/" />;
};

function RegisterAndLogout() {
  localStorage.clear();
  return <SignUp />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<> <Navbar /><RegisterAndLogout /></>}/>
        <Route path="/login" element={<> <Navbar /><LoginPage /></>}/>
        <Route path="/dashboard" element={ <ProtectedRoutes> <Dashboard /></ProtectedRoutes>} />
        <Route path="/contact" element={ <> <Navbar /> <Contact /></>}/>
        <Route path="/gardens" element={ <ProtectedRoutes> <GardenStats /> </ProtectedRoutes>} />
        <Route path="/gardenstats/:id" element={ <ProtectedRoutes> <GardenStats /> </ProtectedRoutes>} />
        <Route path="/beds" element={ <ProtectedRoutes> <BedForm /> </ProtectedRoutes>} />
        <Route path="/crops" element={ <ProtectedRoutes> <CropPage /> </ProtectedRoutes>} />
        <Route path="/harvests" element={<ProtectedRoutes> <HarvestPage /></ProtectedRoutes>} />
        <Route path="/activity" element={<ProtectedRoutes> <ActivityPage /> </ProtectedRoutes>} />
        <Route path="/account-info" element={<ProtectedRoutes> <AccountInfo/> </ProtectedRoutes>} />
        <Route path="/new-farm" element={<ProtectedRoutes> <NewFarmForm /> </ProtectedRoutes>} />
        <Route path="/logout" element={Logout} />
        <Route path="*" element={<Navigate to="/" />} />  
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable
      />
    </Router>
  );
};

export default App;
