import React, { useEffect, useState } from 'react'
import './header.css';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { setLocalStorage } from '../../config/sessions';
import LOGO from '../logo';
import SimpleBtn from '../buttons/SimpleBtn/SimpleBtn';
import { GiHamburgerMenu } from 'react-icons/gi'


const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const setDarkMode = () => {
        setLocalStorage('theme', 'dark')
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }
    const setLightMode = () => {
        setLocalStorage('theme', 'light')
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
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    return (


        <div className={`header_container    ${scrolled ? 'scrolled' : ''}`}>
            <div className='flex items-center container justify-between'>
                <LOGO />
                <div className='hrz-ul'>
                    <ul className=' header-ul'>
                        <li className='header-li'>Home</li>
                        <li className='header-li'>About</li>
                        <li className='header-li'>Portfolio</li>
                        <li className='header-li'>Services</li>
                        <li className='header-li'> Blog</li>
                        <li className='header-li'>Contact</li>
                        <li>
                            <ThemeToggle toggleTheme={toggleTheme} />
                        </li>
                        <li>
                            <SimpleBtn>Download CV</SimpleBtn>
                        </li>
                    </ul>
                </div>

            </div>
            <div className=' vert-ul-icon' onClick={()=>setMenuOpen(!menuOpen)}>
                <GiHamburgerMenu size={25} />
            </div>
            <div className='absolute w-full bottom-[0px] left-0'>
                {
                    menuOpen &&
                    <ul className=' vert-ul'>
                        <li className='header-li'>Home</li>
                        <li className='header-li'>About</li>
                        <li className='header-li'>Portfolio</li>
                        <li className='header-li'>Services</li>
                        <li className='header-li'> Blog</li>
                        <li className='header-li'>Contact</li>
                        <li className='header-li'>
                            <SimpleBtn>Download CV</SimpleBtn>
                        </li>
                        <li className='header-li'>
                            <ThemeToggle toggleTheme={toggleTheme} />
                        </li>

                    </ul>
                }
            </div>
        </div>



    )
}

export default Header