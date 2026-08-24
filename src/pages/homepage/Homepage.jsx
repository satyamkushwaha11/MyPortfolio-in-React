import React from 'react';
import './homepage.css';
import Section1 from '../../components/homepage-sections/section1/Section1';
import Section2 from '../../components/homepage-sections/section2/Section2';
import ContactMe from '../../components/homepage-sections/contactMe/ContactMe';
import Section3 from '../../components/homepage-sections/section3/Section3';
import Section4 from '../../components/homepage-sections/section4/Section4';
import MyTech from '../../components/homepage-sections/My-tech/MyTech';
import Certifications from '../../components/homepage-sections/certifications/Certifications';
import Testimonials from '../../components/homepage-sections/testimonials/Testimonials';
import usePageMeta from '../../hooks/usePageMeta';

const Homepage = () => {
    usePageMeta({
        description:
            'Satyam Kushwaha is a Full-Stack Software Engineer building scalable web and mobile apps with React, Node.js, and AI — specializing in LLM integration, agentic AI, and automation. Explore projects, services, and articles.',
    });

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
                <section id="certifications">
                    <Certifications />
                </section>
                <section id="portfolio">
                    <Section4 />
                </section>
                <section id="testimonials">
                    <Testimonials />
                </section>
                <section id="contact">
                    <ContactMe />
                </section>
            </div>
        </div>
    );
};

export default Homepage;
