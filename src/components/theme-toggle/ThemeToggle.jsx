import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './themeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';
    return (
        <label className="switch" aria-label="Toggle theme">
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
            <span className="slider round">
                <span className="slider-knob">
                    {isDark ? <FiMoon size={12} /> : <FiSun size={12} />}
                </span>
            </span>
        </label>
    );
};

export default ThemeToggle;
