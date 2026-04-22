import React from 'react';
import './themeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <label className="switch" aria-label="Toggle theme">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
            <span className="slider round" />
        </label>
    );
};

export default ThemeToggle;
