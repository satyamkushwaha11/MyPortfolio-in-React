import React, { useEffect, useRef, useState } from 'react';
import './cursor.css';

// Elements that make the ring "grow" when hovered.
const INTERACTIVE =
    'a, button, input, textarea, select, label, [role="button"], .header-li, .tech-card, .cursor-grow';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const target = useRef({ x: -100, y: -100 }); // latest mouse position
    const ringPos = useRef({ x: -100, y: -100 }); // smoothed ring position
    const raf = useRef(0);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // Only run where there's a precise pointer (skip touch screens).
        if (!window.matchMedia('(pointer: fine)').matches) return;
        setEnabled(true);
        document.body.classList.add('has-custom-cursor');

        const onMove = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
            // Check the element under the cursor on every move — reliable, no
            // mouseover/mouseout flicker across child boundaries.
            const overInteractive = !!e.target.closest?.(INTERACTIVE);
            document.body.classList.toggle('cursor-hover', overInteractive);
        };
        const onDown = () => document.body.classList.add('cursor-down');
        const onUp = () => document.body.classList.remove('cursor-down');
        const onLeave = () => document.body.classList.add('cursor-hidden');
        const onEnter = () => document.body.classList.remove('cursor-hidden');

        // Ring trails the dot with simple easing for the "lag" effect.
        const tick = () => {
            ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
            ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;
            if (ringRef.current) {
                ringRef.current.style.left = `${ringPos.current.x}px`;
                ringRef.current.style.top = `${ringPos.current.y}px`;
            }
            raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        return () => {
            cancelAnimationFrame(raf.current);
            document.body.classList.remove(
                'has-custom-cursor',
                'cursor-hover',
                'cursor-down',
                'cursor-hidden'
            );
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    if (!enabled) return null;

    return (
        <>
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
    );
};

export default CustomCursor;
