import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import useReveal from '../../hooks/useReveal';
import './gallery.css';

const GalleryItem = ({ image, index, onOpen }) => {
    const [ref, visible] = useReveal({ threshold: 0.1 });
    return (
        <button
            ref={ref}
            type="button"
            onClick={() => onOpen(index)}
            className={`gallery-item ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 6) * 80}ms` }}
        >
            <img src={image.src} alt={image.caption} loading="lazy" />
            <div className="gallery-item-overlay">
                <span className="gallery-item-category">{image.category}</span>
                <span className="gallery-item-caption">{image.caption}</span>
            </div>
        </button>
    );
};

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [headingRef, headingVisible] = useReveal();
    const { data } = useData();
    const images = data.gallery;

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(images.map((i) => i.category)))],
        [images]
    );

    const filtered = useMemo(
        () => (filter === 'All' ? images : images.filter((i) => i.category === filter)),
        [filter, images]
    );

    const close = useCallback(() => setLightboxIndex(null), []);
    const prev = useCallback(
        () => setLightboxIndex((i) => (i === 0 ? filtered.length - 1 : i - 1)),
        [filtered.length]
    );
    const next = useCallback(
        () => setLightboxIndex((i) => (i === filtered.length - 1 ? 0 : i + 1)),
        [filtered.length]
    );

    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [lightboxIndex, close, prev, next]);

    const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

    return (
        <div className="page-container theme-bg">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`gallery-hero ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="color-orange text-[20px] font-bold mb-2">Gallery</div>
                    <h1 className="text-[2.5rem] md:text-[3rem] font-bold mb-3">Moments & Moodboard</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A scrapbook of photos and visual references I keep coming back to.
                    </p>
                </div>

                <div className="gallery-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`gallery-filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="gallery-grid">
                    {filtered.map((image, index) => (
                        <GalleryItem
                            key={`${image.id || image.src}-${filter}`}
                            image={image}
                            index={index}
                            onOpen={setLightboxIndex}
                        />
                    ))}
                </div>
            </div>

            {active && (
                <div
                    className="lightbox"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.target === e.currentTarget && close()}
                >
                    <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
                        <IoClose size={28} />
                    </button>
                    <button type="button" className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous">
                        <FiChevronLeft size={32} />
                    </button>
                    <figure className="lightbox-figure">
                        <img src={active.src} alt={active.caption} />
                        <figcaption>
                            <span>{active.caption}</span>
                            <small>
                                {lightboxIndex + 1} / {filtered.length}
                            </small>
                        </figcaption>
                    </figure>
                    <button type="button" className="lightbox-nav lightbox-next" onClick={next} aria-label="Next">
                        <FiChevronRight size={32} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Gallery;
