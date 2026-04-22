import React from 'react';
import UpdownIcon from '../../logo/UpdownIcon/UpdownIcon';
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn';
import SocialMedia from '../../social media/SocialMedia';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import './section1.css';

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Section1 = () => {
    const [infoRef, infoVisible] = useReveal();
    const [imgRef, imgVisible] = useReveal();
    const { data } = useData();
    const { site } = data;

    return (
        <div className="section_1">
            <div className="section_1_background_img" />
            <div className="container section_1_container">
                <div className="section1_content">
                    <div
                        ref={infoRef}
                        className={`my-info px-2 pb-5 text-center lg:text-left lg:w-1/2 text-[var(--reverse-color)] ${
                            infoVisible ? 'reveal reveal-left' : 'reveal'
                        }`}
                    >
                        <div className="text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-semibold text-[var(--orange)]">
                            Hello, I'm
                        </div>
                        <h3 className="text-[2.4rem] md:text-[3rem] lg:text-[4rem] font-bold leading-tight mt-3 md:mt-5 mb-5 md:mb-[2rem]">
                            {site.name}
                        </h3>
                        <div className="text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] mt-3 mb-4">
                            A <span className="text-[#1cbe59]">{site.role}</span> From
                            <span className="text-[var(--orange)]"> India</span>.
                        </div>
                        <p className="text-[0.95rem] md:text-[1rem] mb-5 max-w-xl mx-auto lg:mx-0">
                            {site.heroDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 mt-[2rem] items-center justify-center lg:justify-start">
                            <SimpleBtn fill onClick={() => scrollTo('about')}>
                                About Me
                            </SimpleBtn>
                            <SocialMedia />
                        </div>
                    </div>
                    <div
                        ref={imgRef}
                        className={`my-img-container lg:w-1/2 flex items-center justify-center lg:justify-end ${
                            imgVisible ? 'reveal reveal-right' : 'reveal'
                        }`}
                    >
                        <div className="hero-photo-wrap">
                            <UpdownIcon classNamee="floating-element top-[50px] left-[40px]" imageUrl={'/icons/tech/mongoDb.png'} />
                            <UpdownIcon classNamee="floating-element floating-delay-1 top-[110px] right-[20px]" imageUrl={'/icons/tech/nodejs.png'} />
                            <UpdownIcon classNamee="floating-element floating-delay-2 top-[250px] left-[0px]" imageUrl={'/icons/tech/react.png'} />
                            <UpdownIcon classNamee="floating-element floating-delay-3 bottom-[160px] right-[0px]" imageUrl={'/icons/tech/reactNative.png'} />
                            <UpdownIcon classNamee="floating-element floating-delay-4 bottom-[80px] left-[160px]" imageUrl={'/icons/tech/expressjs.png'} />
                            <img
                                src="/images/satyam1.png"
                                alt={site.name}
                                className="hero-photo"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="dizme_tm_down hidden lg:flex text-[var(--reverse-color)]">
                <button
                    type="button"
                    className="anchor"
                    onClick={() => scrollTo('services')}
                    aria-label="Scroll down"
                >
                    <svg
                        width="26"
                        height="40"
                        viewBox="0 0 247 390"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            fillRule: 'evenodd',
                            clipRule: 'evenodd',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeMiterlimit: '1.5',
                        }}
                    >
                        <path id="wheel" d="M123.359,79.775l0,72.843" style={{ fill: 'none', strokeWidth: '20px' }} />
                        <path
                            id="mouse"
                            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                            style={{ fill: 'none', strokeWidth: '20px' }}
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Section1;
