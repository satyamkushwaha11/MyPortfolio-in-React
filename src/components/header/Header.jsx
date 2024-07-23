import React, { useEffect, useState, useCallback } from 'react';
import './header.css';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { getLocalStorage, setLocalStorage } from '../../config/sessions';
import LOGO from '../logo';
import SimpleBtn from '../buttons/SimpleBtn/SimpleBtn';
import { GiHamburgerMenu } from 'react-icons/gi';
import debounce from 'lodash.debounce';

const Menu = ({ theme, toggleTheme, isVertical }) => (
    <ul className={isVertical ? 'vert-ul' : 'header-ul'}>
        <li className='header-li'>Home</li>
        <li className='header-li'>About</li>
        <li className='header-li'>Portfolio</li>
        <li className='header-li'>Services</li>
        <li className='header-li'>Blog</li>
        <li className='header-li'>Contact</li>
        <li>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </li>
        <li>
            <SimpleBtn>Download CV</SimpleBtn>
        </li>
    </ul>
);

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState("");

    const handleScroll = useCallback(debounce(() => {
        setScrolled(window.scrollY > 50);
    }, 100), []);

    const toggleTheme = (theme) => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setLocalStorage('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    useEffect(() => {
        const storedTheme = getLocalStorage('theme') || 'light';
        setTheme(storedTheme);
        document.body.setAttribute('data-theme', storedTheme);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel();
        };
    }, [handleScroll]);

    return (
        <div className={`header_container ${scrolled ? 'scrolled' : ''}`}>
            <div className='flex items-center container justify-between'>
                <LOGO />
                <div className='hrz-ul'>
                    <Menu theme={theme} toggleTheme={() => toggleTheme(theme)} isVertical={false} />
                </div>
            </div>
            <div className='vert-ul-icon' onClick={() => setMenuOpen(!menuOpen)}>
                <GiHamburgerMenu size={25} />
            </div>
            {menuOpen && (
                <div className='absolute w-full bottom-0 left-0'>
                    <Menu theme={theme} toggleTheme={() => toggleTheme(theme)} isVertical={true} />
                </div>
            )}
        </div>
    );
};

export default Header;





















// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import './header.css';
// import ThemeToggle from '../theme-toggle/ThemeToggle';
// import { getLocalStorage, setLocalStorage } from '../../config/sessions';
// import LOGO from '../logo';
// import SimpleBtn from '../buttons/SimpleBtn/SimpleBtn';
// import { GiHamburgerMenu } from 'react-icons/gi'


// const Header = () => {
//     const [scrolled, setScrolled] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [theme, setTheme] = useState("");


//     const setDarkMode = () => {
//         setTheme("dark")
//         setLocalStorage('theme', 'dark')
//         document.querySelector("body").setAttribute('data-theme', 'dark');
//     }
//     const setLightMode = () => {
//         setTheme("light")
//         setLocalStorage('theme', 'light')
//         document.querySelector("body").setAttribute('data-theme', 'light');

//     }

//     const toggleTheme = (theme) => {
//         if (theme === 'dark') {
//             setDarkMode()
//         }
//         else {
//             setLightMode()
//         }
//     }

//     useLayoutEffect(() => {
//         const getTheme = getLocalStorage('theme')
//         if (getTheme === "light") {
//             setLightMode()
//         }
//         else {
//             setDarkMode()
//         }

//         const handleScroll = () => {
//             if (window.scrollY > 50) {
//                 setScrolled(true);
//             } else {
//                 setScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [])
//     return (


//         <div className={`header_container    ${scrolled ? 'scrolled' : ''}`}>
//             <div className='flex items-center container justify-between'>
//                 <LOGO />
//                 <div className='hrz-ul'>
//                     <ul className=' header-ul'>
//                         <li className='header-li'>Home</li>
//                         <li className='header-li'>About</li>
//                         <li className='header-li'>Portfolio</li>
//                         <li className='header-li'>Services</li>
//                         <li className='header-li'>Blog</li>
//                         <li className='header-li'>Contact</li>
//                         <li>
//                             <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
//                         </li>
//                         <li>
//                             <SimpleBtn>Download CV</SimpleBtn>
//                         </li>
//                     </ul>
//                 </div>

//             </div>
//             <div className=' vert-ul-icon' onClick={() => setMenuOpen(!menuOpen)}>
//                 <GiHamburgerMenu size={25} />
//             </div>

//             <div className='absolute w-full bottom-[0px] left-0'>
//                 {
//                     menuOpen &&
//                     <ul className=' vert-ul'>
//                         <li className='header-li'>Home</li>
//                         <li className='header-li'>About</li>
//                         <li className='header-li'>Portfolio</li>
//                         <li className='header-li'>Services</li>
//                         <li className='header-li'> Blog</li>
//                         <li className='header-li'>Contact</li>
//                         <li className='header-li'>
//                             <SimpleBtn>Download CV</SimpleBtn>
//                         </li>

//                         <li className='header-li'>
//                             <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
//                         </li>

//                     </ul>
//                 }
//             </div>
//         </div>



//     )
// }

// export default Header



