import React from 'react';
import './themeToggle.css'
import { getLocalStorage } from '../../config/sessions';

const ThemeToggle = ({ toggleTheme }) => {
    const toggleChange = () => {
        const seletedTheme=getLocalStorage('theme')
        if (seletedTheme === 'dark') {
            console.log('hhh')
            toggleTheme('light')
        } else {
            toggleTheme('dark')

        }
    }
    return (
        <div>
            <label className="switch">
                <input type="checkbox" onChange={toggleChange}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ThemeToggle