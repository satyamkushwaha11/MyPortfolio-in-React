// Single source of truth for the homepage sections that are addressable by URL.
// The ids here must match the `id` on each <section> in pages/homepage/Homepage.jsx,
// and each one doubles as its URL path: "portfolio" -> /portfolio.
export const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

// The first section is the top of the page, so it gets the bare "/" URL.
export const DEFAULT_SECTION = SECTION_IDS[0];

// Shareable URL for a section: "/" for home, "/portfolio" for the rest.
export const sectionHref = (id) => (id === DEFAULT_SECTION ? '/' : `/${id}`);

// Which section a path points at, or null if the path is a different page
// (/blog, /resume, …). "/" counts as the homepage but has no section of its own.
export const sectionFromPath = (pathname) => {
    const id = String(pathname || '').replace(/^\/+|\/+$/g, '');
    return SECTION_IDS.includes(id) ? id : null;
};

// True for "/" and every section path — all of them render the homepage.
export const isHomepagePath = (pathname) =>
    pathname === '/' || sectionFromPath(pathname) !== null;

// Scrolls to a section. Returns false when the element is not on the page yet
// so callers can retry (see routers/RouteScrollManager.js).
export const scrollToSection = (id, behavior = 'smooth') => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior, block: 'start' });
    return true;
};
