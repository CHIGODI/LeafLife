import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FounderMessage from '../components/FounderMessage';
import FunctionCards from '../components/FunctionCards';
import MissionValues from '../components/MissionValues';
import Sustainability from '../components/Sustainability';
import Founders from '../components/Founders';
import Contact from '../components/Contact';
import agriImage from '../assets/images/agri2.jpg';
import agriImage2 from '../assets/images/aerial1.jpg';

const LandingPage = () => {
    return(
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
        )};

export default LandingPage;
