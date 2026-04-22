import React from 'react';

const UpdownIcon = ({ imageUrl, classNamee }) => {
    return (
        <div className={`floating-element ${classNamee || ''}`}>
            <img src={imageUrl || ''} alt="" />
        </div>
    );
};

export default UpdownIcon;
