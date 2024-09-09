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
import agriImage from './assets/images/agri2.jpg';
import agriImage2 from './assets/images/aerial1.jpg';

const Home = () => (
  <>
    {/* Combined Navbar and Hero with the same background image */}
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${agriImage})` }}
    >
      <Navbar />
      <Hero title="Welcome to Leaf Life" subtitle="Grow your passion for farming" />
    </div>

    <FounderMessage />
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${agriImage2})` }}
    >
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
        {/* Home route - renders Navbar and other components */}
        <Route path="/" element={<Home />} />

        {/* Sign up route */}
        <Route
          path="/signup"
          element={
            <>
              <div
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${agriImage})` }}
              >
                <Navbar />
                <SignupForm />
              </div>
            </>
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginForm />
            </>
          }
        />

        {/* Contact route */}
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        
      </Routes>
    </Router>
  );
};

export default App;
