import React from 'react';
import { FiCode, FiSmartphone, FiServer, FiZap, FiShoppingBag } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import './section2.css';
import useReveal from '../../../hooks/useReveal';

const services = [
    {
        Icon: FiCode,
        title: 'Full-Stack Web Development',
        desc: 'End-to-end web apps built with React and Node.js — fast, responsive, and production-ready from the database to the UI.',
    },
    {
        Icon: FaRobot,
        title: 'AI & LLM Integration',
        desc: 'Add real intelligence to your product with LLM integration, agentic AI, and smart features powered by OpenAI and beyond.',
    },
    {
        Icon: FiSmartphone,
        title: 'Mobile App Development',
        desc: 'Cross-platform mobile apps with React Native — one codebase, a native feel on both iOS and Android.',
    },
    {
        Icon: FiServer,
        title: 'Backend & API Development',
        desc: 'Scalable REST APIs, secure authentication, and well-modeled databases designed to grow with your users.',
    },
    {
        Icon: FiZap,
        title: 'Automation & Workflows',
        desc: 'Automate the repetitive — workflows, pipelines, and integrations that save your team hours every week.',
    },
    {
        Icon: FiShoppingBag,
        title: 'E-commerce & SaaS Platforms',
        desc: 'Marketplaces, dashboards, payments, and admin panels — complete SaaS products shipped end-to-end.',
    },
];

const ServiceCard = ({ Icon, title, desc, index }) => {
    const [ref, visible] = useReveal({ threshold: 0.15 });
    return (
        <div
            ref={ref}
            className={`service-card ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 3) * 100}ms` }}
        >
            <div className="service-icon">
                <Icon size={28} />
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-desc">{desc}</p>
        </div>
    );
};

const Section2 = () => {
    const [headingRef, headingVisible] = useReveal();
    return (
        <div className="section2_content min-h-[10vh] border-0 py-[4rem] md:py-[6rem] lg:py-[7rem]">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`flex ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="text-center mb-[3rem] px-4 mx-auto">
                        <div className="color-orange text-[18px] md:text-[20px] font-bold mb-2">Services</div>
                        <div className="text-[2rem] md:text-[2.5rem] leading-tight mb-3 font-bold">What I Can Build For You</div>
                        <p className="w-full lg:w-3/4 mx-auto text-gray-400">
                            From a single feature to a full product — here's how I can help bring your idea to life.
                        </p>
                    </div>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} index={index} {...service} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section2;
