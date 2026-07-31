import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sectionHref } from '../config/sections';

/**
 * Jump to a homepage section through the router instead of scrolling directly,
 * so the address bar always holds a link that can be copied and shared
 * (e.g. "/#portfolio"). RouteScrollManager does the actual scrolling, and it
 * works from any page — /blog, /resume, … all land back on the section.
 */
const useSectionNavigate = () => {
    const navigate = useNavigate();
    return useCallback((id) => navigate(sectionHref(id)), [navigate]);
};

export default useSectionNavigate;
