import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiCopyrightBold } from 'react-icons/pi';
import SocialMedia from '../social media/SocialMedia';
import { useData } from '../../context/DataContext';
import './footer.css';

const QUICK_LINKS = [
    { label: 'Home', to: '/', section: 'home' },
    { label: 'About Me', to: '/', section: 'about' },
    { label: 'Skills', to: '/', section: 'skills' },
    { label: 'Projects', to: '/', section: 'portfolio' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Blogs', to: '/blog' },
];

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = useData();
    const { site } = data;

    const handleLink = (item) => {
        if (item.section) {
            if (location.pathname !== '/') {
                navigate(`/#${item.section}`);
            } else {
                const el = document.getElementById(item.section);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(item.to);
        }
    };

    return (
        <div className="footer-container">
            <div className="footer-content-wrapper container">
                <div className="footer-content">
                    <h2>About Me</h2>
                    <ul>
                        <li>
                            <p className="text-[14px]">
                                A full-stack web developer from India, merging creative design with powerful functionality.
                            </p>
                        </li>
                        <SocialMedia size={18} className="mt-3" />
                    </ul>
                </div>

                <div className="footer-content">
                    <h2>Contact Me</h2>
                    <ul className="flex flex-col gap-2">
                        <li>{site.location}</li>
                        <li>
                            <a href={`tel:${site.phone}`}>{site.phone}</a>
                        </li>
                        <li className="wrap-break">
                            <a href={`mailto:${site.email}`}>{site.email}</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-content">
                    <h2>Quick Links</h2>
                    <ul className="flex flex-col gap-2 footer-ul">
                        {QUICK_LINKS.map((item) =>
                            item.section ? (
                                <li key={item.label} onClick={() => handleLink(item)}>
                                    {item.label}
                                </li>
                            ) : (
                                <li key={item.label}>
                                    <Link to={item.to}>{item.label}</Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="footer-content">
                    <h2 className="flex items-start gap-1 lg:items-center justify-start leading-6">
                        <PiCopyrightBold /> {site.name}
                    </h2>
                    <ul>
                        <li>
                            MADE WITH ❤️ BY
                            <div>
                                <i>{site.name}</i>.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
