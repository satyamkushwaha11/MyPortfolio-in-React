import React, { useEffect } from 'react';
import './themeToggle.css'
import { getLocalStorage } from '../../config/sessions';

const ThemeToggle = ({theme, toggleTheme }) => {
    const toggleChange = () => {
        const seletedTheme=getLocalStorage('theme')
        if (seletedTheme === 'dark') {
            toggleTheme('light')
        } else {
            toggleTheme('dark')

        }
    }

    console.log(theme,'ppppppppppppp')
    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={!!(theme==="dark")}  onChange={toggleChange}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ThemeToggle