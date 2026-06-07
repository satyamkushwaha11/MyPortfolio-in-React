import { useEffect } from 'react';

const DEFAULT_TITLE =
    'Satyam Kushwaha — Full-Stack Software Engineer | AI & LLM Integration';

const setMeta = (selector, attr, value) => {
    if (!value) return;
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement('meta');
        const [, name] = selector.match(/\[(?:name|property)="(.+)"\]/) || [];
        if (selector.includes('property=')) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
};

/**
 * Lightweight per-route SEO. Sets the document title plus the description and
 * og:/twitter: title+description tags so each view (and shared link) reflects
 * the current page. Restores the site default on unmount.
 */
const usePageMeta = ({ title, description, image } = {}) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | Satyam Kushwaha` : DEFAULT_TITLE;
        document.title = fullTitle;
        setMeta('meta[name="description"]', 'content', description);
        setMeta('meta[property="og:title"]', 'content', fullTitle);
        setMeta('meta[property="og:description"]', 'content', description);
        setMeta('meta[name="twitter:title"]', 'content', fullTitle);
        setMeta('meta[name="twitter:description"]', 'content', description);
        if (image) {
            setMeta('meta[property="og:image"]', 'content', image);
            setMeta('meta[name="twitter:image"]', 'content', image);
        }
        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [title, description, image]);
};

export default usePageMeta;
