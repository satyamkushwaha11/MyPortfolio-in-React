import React, { useEffect, useState } from 'react';
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import './section3.css';

const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Section3 = () => {
    const [ref, visible] = useReveal();
    const { data } = useData();
    const { site } = data;
    const target = Number(site.totalProjects) || 0;
    const [totalProjects, setTotalProjects] = useState(0);

    useEffect(() => {
        if (!visible) return;
        if (totalProjects < target) {
            const timer = setTimeout(() => setTotalProjects((n) => n + 1), 90);
            return () => clearTimeout(timer);
        }
    }, [totalProjects, visible, target]);

    return (
        <div className="section3-wrap">
            <div ref={ref} className="container section3-grid">
                <div className={`section3-image-side ${visible ? 'reveal reveal-left' : 'reveal'}`}>
                    <div className="section3-counter section3-counter-years">
                        <div className="section3-counter-num text-[green]">
                            {site.yearsOfExperience}
                        </div>
                        <div className="section3-counter-label">
                            Years of Experience
                        </div>
                    </div>

                    <div className="section3-counter section3-counter-projects">
                        <div className="section3-counter-num text-[orange]">{totalProjects}</div>
                        <div className="section3-counter-label">Total Projects</div>
                    </div>

                    <img
                        src="/images/satyam1.png"
                        alt={site.name}
                        className="section3-photo flip-horz"
                    />
                </div>
                <div className={`section3-copy-side ${visible ? 'reveal reveal-right' : 'reveal'}`}>
                    <div className="text-center md:text-start mb-[2rem] md:mb-[4rem] px-2">
                        <div className="color-orange text-[18px] md:text-[20px] font-bold mb-2">
                            {site.aboutSubtitle}
                        </div>
                        <div className="text-[1.8rem] md:text-[2.5rem] leading-tight mb-3 font-bold">
                            {site.aboutTitle}
                        </div>
                        <p className="w-full text-gray-400">{site.aboutBody}</p>
                        <SimpleBtn fill className="mt-4" onClick={scrollToContact}>
                            Hire Me
                        </SimpleBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section3;
