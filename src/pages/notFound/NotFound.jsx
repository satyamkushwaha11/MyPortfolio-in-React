import React from 'react';
import { Link } from 'react-router-dom';
import SimpleBtn from '../../components/buttons/SimpleBtn/SimpleBtn';
import './notFound.css';

const NotFound = () => {
    return (
        <div className="page-container theme-bg not-found-container">
            <div className="container not-found-content">
                <div className="not-found-code">404</div>
                <h1>Page not found</h1>
                <p>The page you're looking for has wandered off. Let's get you back home.</p>
                <Link to="/">
                    <SimpleBtn fill>Return Home</SimpleBtn>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
