import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { sectionFromPath } from '../config/sections';

const RETRY_MS = 60;
const MAX_TRIES = 25; // ~1.5s for the target section to show up in the DOM
const SETTLE_MS = 100;
const ALIGN_LIMIT_MS = 3000;
const MAX_CORRECTIONS = 3;
const TOLERANCE_PX = 8;

// Where the section should end up: scrollIntoView honours scroll-margin-top
// (set on section[id] in index.css to clear the fixed header).
const targetOffset = (el) => parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;

/**
 * Owns scroll position on every navigation:
 *  - "/portfolio" (shared link, nav click, back/forward) -> scroll to that section
 *  - any other route change -> back to the top
 *
 * "#portfolio" is still honoured so links shared before sections had their own
 * paths keep working; useSectionUrlSync rewrites them to "/portfolio" once the
 * page settles.
 *
 * `location.key` is in the dependency list on purpose: clicking the same nav tab
 * twice produces the same path but a new key, and the page should still jump
 * back to that section.
 */
const RouteScrollManager = () => {
    const { pathname, hash, key } = useLocation();
    const isFirstRun = useRef(true);

    useEffect(() => {
        const firstRun = isFirstRun.current;
        isFirstRun.current = false;

        // On a cold load the browser is already at the top, so animating there is
        // pointless — and smooth-scrolling into a half-painted page overshoots.
        const behavior = firstRun ? 'instant' : 'smooth';
        const id = sectionFromPath(pathname) || decodeURIComponent(hash.replace(/^#/, ''));

        let cancelled = false;
        let timer;
        // Never fight a visitor who takes over and scrolls themselves.
        const stop = () => {
            cancelled = true;
            clearTimeout(timer);
        };
        window.addEventListener('wheel', stop, { passive: true });
        window.addEventListener('touchmove', stop, { passive: true });
        window.addEventListener('keydown', stop);

        const cleanup = () => {
            stop();
            window.removeEventListener('wheel', stop);
            window.removeEventListener('touchmove', stop);
            window.removeEventListener('keydown', stop);
        };

        if (!id) {
            window.scrollTo({ top: 0, behavior });
            return cleanup;
        }

        // A smooth scroll locks in its destination when it starts, so images
        // loading above the target leave the page short of the section. Once
        // scrolling has settled, nudge it onto the mark.
        const alignWhenSettled = () => {
            let lastY = null;
            let still = 0;
            let waited = 0;
            let corrections = 0;

            const tick = () => {
                if (cancelled) return;
                const el = document.getElementById(id);
                if (!el) return;

                still = window.scrollY === lastY ? still + 1 : 0;
                lastY = window.scrollY;
                waited += SETTLE_MS;

                if (still >= 2) {
                    const delta = el.getBoundingClientRect().top - targetOffset(el);
                    if (Math.abs(delta) <= TOLERANCE_PX) return;
                    // Already at the end of the page and still short: nothing to fix.
                    if (corrections >= MAX_CORRECTIONS) return;
                    window.scrollBy({ top: delta, behavior: 'instant' });
                    corrections += 1;
                    still = 0;
                }

                if (waited < ALIGN_LIMIT_MS) timer = setTimeout(tick, SETTLE_MS);
            };

            timer = setTimeout(tick, SETTLE_MS);
        };

        // The section may not be mounted or laid out yet on a fresh load, so keep
        // trying briefly before giving up and leaving the page at the top.
        let tries = 0;
        const attempt = () => {
            if (cancelled) return;
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior, block: 'start' });
                alignWhenSettled();
                return;
            }
            tries += 1;
            if (tries < MAX_TRIES) timer = setTimeout(attempt, RETRY_MS);
        };
        attempt();

        return cleanup;
    }, [pathname, hash, key]);

    return null;
};

export default RouteScrollManager;
