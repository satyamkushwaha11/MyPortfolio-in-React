import { useEffect, useRef } from 'react';
import { sectionHref } from '../config/sections';

const SETTLE_MS = 200;

/**
 * Keeps the address bar in sync with the section currently in view, so the URL
 * a visitor copies points at what they are actually looking at.
 *
 * Uses history.replaceState rather than navigate(): it must not pile up history
 * entries while scrolling, and it must not push a new router location (that
 * would make RouteScrollManager scroll again and fight the user). The existing
 * history state object is passed through so react-router's internal index stays
 * intact.
 */
const useSectionUrlSync = (activeSection, enabled = true) => {
    const timer = useRef();

    useEffect(() => {
        if (!enabled || !activeSection) return undefined;

        // Wait for the scroll to settle, otherwise one smooth scroll past three
        // sections rewrites the URL three times on the way down.
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            const next = sectionHref(activeSection);
            const { pathname, search, hash } = window.location;
            if (pathname === next && !hash) return;
            window.history.replaceState(window.history.state, '', `${next}${search}`);
        }, SETTLE_MS);

        return () => clearTimeout(timer.current);
    }, [activeSection, enabled]);
};

export default useSectionUrlSync;
