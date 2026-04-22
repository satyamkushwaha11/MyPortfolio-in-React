import React from 'react';
import './homepage.css';
import Section1 from '../../components/homepage-sections/section1/Section1';
import Section2 from '../../components/homepage-sections/section2/Section2';
import ContactMe from '../../components/homepage-sections/contactMe/ContactMe';
import Section3 from '../../components/homepage-sections/section3/Section3';
import Section4 from '../../components/homepage-sections/section4/Section4';
import MyTech from '../../components/homepage-sections/My-tech/MyTech';

const Homepage = () => {
    return (
        <div className="homepage-container">
            <section id="home">
                <Section1 />
            </section>
            <div className="theme-bg">
                <section id="services">
                    <Section2 />
                </section>
                <section id="about">
                    <Section3 />
                </section>
                <section id="skills">
                    <MyTech />
                </section>
                <section id="portfolio">
                    <Section4 />
                </section>
                <section id="contact">
                    <ContactMe />
                </section>
            </div>
        </div>
    );
};

export default Homepage;
