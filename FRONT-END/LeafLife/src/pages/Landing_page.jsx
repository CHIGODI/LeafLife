import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FounderMessage from '../components/FounderMessage';
import HighlightDataCard from '../components/HighlightDataCard';
import MissionValues from '../components/MissionValues';
import Sustainability from '../components/Sustainability';
import Contact from '../components/Contact';
import agriImage from '../assets/images/agri2.jpg';
import agriImage2 from '../assets/images/aerial1.jpg';
import HowToAccessLeafLife from '../components/HowToAcessLeafLife';

const LandingPage = () => {
    localStorage.clear();
    return (
        <div className=" h-screen">
            <div
                className="relative h-screen bg-cover bg-center"
                style={{
                    backgroundImage: `url(${agriImage})`,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <Navbar />
                <Hero title1="Leaf" title2="Life" subtitle="Grow your passion for farming" />
            </div>

            <MissionValues />


            {/* <FounderMessage /> */}
                <HighlightDataCard />

            <Sustainability />
            {/* <Founders /> */}
            <HowToAccessLeafLife />
            <Contact />
        </div>
    );
};

export default LandingPage;
