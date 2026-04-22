import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import debounce from 'lodash.debounce';

import './header.css';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import LOGO from '../logo';
import SimpleBtn from '../buttons/SimpleBtn/SimpleBtn';
import useScrollSpy from '../../hooks/useScrollSpy';
import useTheme from '../../hooks/useTheme';
import { useData } from '../../context/DataContext';
import { CV_URL_OVERRIDE } from '../../config/config';

const NAV = [
    { label: 'Home', to: '/', section: 'home' },
    { label: 'About', to: '/', section: 'about' },
    { label: 'Services', to: '/', section: 'services' },
    { label: 'Portfolio', to: '/', section: 'portfolio' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Blog', to: '/blog' },
    { label: 'Resume', to: '/resume' },
    { label: 'Contact', to: '/', section: 'contact' },
];

const isDownloadableFile = (url) => /\.(pdf|docx?|odt|rtf)(\?|#|$)/i.test(String(url || ''));

const SECTION_IDS = NAV.filter((n) => n.section).map((n) => n.section);

const Menu = ({ isVertical, onNavigate, activeSection, pathname, theme, toggleTheme, cvUrl }) => (
    <ul className={isVertical ? 'vert-ul' : 'header-ul'}>
        {NAV.map((item) => {
            const isActive =
                (item.section && pathname === '/' && activeSection === item.section) ||
                (!item.section && pathname === item.to);
            return (
                <li
                    key={item.label}
                    className={`header-li ${isActive ? 'header-li-active' : ''}`}
                    onClick={() => onNavigate(item)}
                >
                    {item.label}
                </li>
            );
        })}
        <li className="header-theme">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </li>
        <li>
            <SimpleBtn
                href={cvUrl}
                download={isDownloadableFile(cvUrl) || undefined}
                target={isDownloadableFile(cvUrl) ? undefined : '_blank'}
            >
                Download CV
            </SimpleBtn>
        </li>
    </ul>
);

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const activeSection = useScrollSpy(SECTION_IDS);
    const { data } = useData();
    const cvUrl = (CV_URL_OVERRIDE || data.site.cvUrl || '/Satyam_Kushwaha_CV.pdf').trim();

    const handleScroll = useMemo(
        () =>
            debounce(() => {
                setScrolled(window.scrollY > 50);
            }, 80),
        []
    );

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel();
        };
    }, [handleScroll]);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleNavigate = (item) => {
        setMenuOpen(false);
        if (item.section) {
            if (location.pathname !== '/') {
                navigate(`/#${item.section}`);
            } else {
                scrollToSection(item.section);
            }
        } else {
            navigate(item.to);
        }
    };

    return (
        <div className={`header_container ${scrolled ? 'scrolled' : ''}`}>
            <div className="flex items-center container justify-between w-full">
                <Link to="/" className="logo-link">
                    <LOGO />
                </Link>
                <div className="hrz-ul">
                    <Menu
                        isVertical={false}
                        onNavigate={handleNavigate}
                        activeSection={activeSection}
                        pathname={location.pathname}
                        theme={theme}
                        toggleTheme={toggleTheme}
                        cvUrl={cvUrl}
                    />
                </div>
                <button
                    type="button"
                    className="vert-ul-icon"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <IoClose size={28} /> : <GiHamburgerMenu size={25} />}
                </button>
            </div>

            <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
                <Menu
                    isVertical={true}
                    onNavigate={handleNavigate}
                    activeSection={activeSection}
                    pathname={location.pathname}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    cvUrl={cvUrl}
                />
            </div>
        </div>
    );
};

export default Header;
