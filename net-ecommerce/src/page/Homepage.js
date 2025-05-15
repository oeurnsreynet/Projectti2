import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path based on structure
import SlideShow from './SlideShow';
import Service from './Service';
import Phone from './Phone';
import Watch from './Watch';
import Sale from './Sale';
import Blog from './Blog';
import Testimon from './Testimon';
import Subscribe from './Subscribe';
import Instagram from './Instagram';
import Footer from './Footer';

function Homepage() {
    return (
       <div>
        <Navbar />
        <SlideShow />
        <Service />
        <Phone />
        <Watch />
        <Sale />
        <Blog />
        <Testimon />
        <Subscribe />
        <Instagram />
        <Footer />
       </div>
    );
}

export default Homepage;
