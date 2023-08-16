import React, { useEffect } from 'react'
import './header.css';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { setLocalStorage } from '../../config/sessions';


const Header = () => {
    const setDarkMode = () => {
        setLocalStorage('theme','dark')
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }
    const setLightMode = () => {
        setLocalStorage('theme','light')
        document.querySelector("body").setAttribute('data-theme', 'light');
    }

    const toggleTheme = (theme) => {
        if (theme === 'dark') {
            setDarkMode()
        }
        else {
            setLightMode()
        }
    }

    useEffect(() => {
        // const getTheme =
        setLightMode()
    }, [])
    return (
        <div className='header_container'>
            hearder
            <ThemeToggle toggleTheme={toggleTheme}  />
        </div>
    )
}

export default Header