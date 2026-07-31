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
import useSectionUrlSync from '../../hooks/useSectionUrlSync';
import useSectionNavigate from '../../hooks/useSectionNavigate';
import { useData } from '../../context/DataContext';
import { SECTION_IDS, isHomepagePath, sectionHref } from '../../config/sections';
import { CV_URL_OVERRIDE } from '../../config/config';

const NAV = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Services', section: 'services' },
    { label: 'Portfolio', section: 'portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Resume', to: '/resume' },
    { label: 'Contact', section: 'contact' },
];

const navHref = (item) => (item.section ? sectionHref(item.section) : item.to);

const NAV_SECTION_IDS = NAV.filter((n) => n.section).map((n) => n.section);

// Some sections (skills, testimonials) have no tab of their own — while they are
// in view, keep the previous tab underlined instead of clearing the whole nav.
const navSectionFor = (sectionId) => {
    for (let i = SECTION_IDS.indexOf(sectionId); i >= 0; i -= 1) {
        if (NAV_SECTION_IDS.includes(SECTION_IDS[i])) return SECTION_IDS[i];
    }
    return null;
};

const isDownloadableFile = (url) => /\.(pdf|docx?|odt|rtf)(\?|#|$)/i.test(String(url || ''));

// Let the browser handle ctrl/cmd/shift-click and middle-click so tabs can still
// be opened in a new window.
const isModifiedClick = (e) =>
    e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;

const Menu = ({ isVertical, onNavigate, activeSection, pathname, theme, toggleTheme, cvUrl }) => (
    <ul className={isVertical ? 'vert-ul' : 'header-ul'}>
        {NAV.map((item) => {
            const isActive =
                (item.section && isHomepagePath(pathname) && activeSection === item.section) ||
                (!item.section && pathname === item.to);
            return (
                <li
                    key={item.label}
                    className={`header-li ${isActive ? 'header-li-active' : ''}`}
                >
                    {/* A real <a href> so the tab can be copied, shared and
                        opened in a new tab; the click is still handled by the
                        router for a smooth in-page scroll. */}
                    <a
                        className="header-nav-link"
                        href={navHref(item)}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={(e) => {
                            if (isModifiedClick(e)) return;
                            e.preventDefault();
                            onNavigate(item);
                        }}
                    >
                        {item.label}
                    </a>
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
    const goToSection = useSectionNavigate();
    const location = useLocation();
    const activeSection = useScrollSpy(SECTION_IDS);
    const { data } = useData();

    // Mirror the section in view into the URL, so whatever the visitor copies
    // from the address bar reopens on the same section.
    useSectionUrlSync(activeSection, isHomepagePath(location.pathname));
    const activeNavSection = navSectionFor(activeSection);
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

    const handleNavigate = (item) => {
        setMenuOpen(false);
        if (item.section) {
            goToSection(item.section);
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
                        activeSection={activeNavSection}
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
                    activeSection={activeNavSection}
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
