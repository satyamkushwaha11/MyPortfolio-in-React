import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './scrollToTopButton.css';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            className={`scroll-to-top ${visible ? 'visible' : ''}`}
            onClick={handleClick}
            aria-label="Scroll to top"
        >
            <FiArrowUp size={22} />
        </button>
    );
};

export default ScrollToTopButton;
