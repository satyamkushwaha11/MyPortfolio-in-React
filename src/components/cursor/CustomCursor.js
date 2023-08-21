
import './cursor.css'

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [redDotPosition, setRedDotPosition] = useState({ x: 0, y: 0 });
  const [outerCirclePosition, setOuterCirclePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const delay = 0; // 0.3 seconds in milliseconds
    const timer = setTimeout(() => {
      setRedDotPosition({ x: cursorPosition.x, y: cursorPosition.y });
    }, delay);

    return () => clearTimeout(timer);
  }, [cursorPosition]);

  useEffect(() => {
    const followSpeed = 0; // Adjust as needed
    const updatedOuterX = (outerCirclePosition.x + (redDotPosition.x - outerCirclePosition.x) * followSpeed);
    const updatedOuterY = (outerCirclePosition.y + (redDotPosition.y - outerCirclePosition.y) * followSpeed);
    setOuterCirclePosition({ x: updatedOuterX, y: updatedOuterY });
  }, [redDotPosition]);

  return (
    <div className="custom-cursor">
      <div className="outer-circle" style={{ left: outerCirclePosition.x, top: outerCirclePosition.y }}></div>
      <div className="red-dot" style={{ left: redDotPosition.x, top: redDotPosition.y }}></div>
    </div>
  );
};

export default CustomCursor;
