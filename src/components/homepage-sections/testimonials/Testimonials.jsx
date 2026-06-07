import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import useReveal from '../../../hooks/useReveal';
import testimonials from '../../../data/testimonials.json';
import './testimonials.css';

const TestimonialCard = ({ item }) => (
    <article className="tm-card">
        <FaQuoteLeft className="tm-quote-icon" size={22} />
        <p className="tm-quote">{item.quote}</p>
        <div className="tm-meta">
            <a
                className="tm-logo"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${item.company}`}
            >
                <img src={item.logo} alt={`${item.company} logo`} />
            </a>
            <div className="tm-meta-text">
                <span className="tm-company">{item.company}</span>
                <span className="tm-role">{item.role}</span>
            </div>
        </div>
    </article>
);

const Testimonials = () => {
    const [headingRef, headingVisible] = useReveal();
    // Duplicate the list so the marquee can loop seamlessly.
    const loop = [...testimonials, ...testimonials];

    return (
        <div className="tm-section my-[5rem] lg:my-[5rem]">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`flex ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="text-center mb-[3rem] px-4 mx-auto">
                        <div className="color-orange text-[18px] md:text-[20px] font-bold mb-2">Testimonials</div>
                        <div className="text-[2rem] md:text-[2.5rem] leading-tight mb-3 font-bold">Trusted By Teams I've Built For</div>
                        <p className="w-full lg:w-3/4 mx-auto text-gray-400">
                            A few words from the products and companies I've shipped work for.
                        </p>
                    </div>
                </div>
            </div>

            {/* Full-bleed marquee; pauses on hover. */}
            <div className="tm-marquee">
                <div className="tm-track">
                    {loop.map((item, i) => (
                        <TestimonialCard key={`${item.id}-${i}`} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
