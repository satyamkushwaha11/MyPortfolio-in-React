import React from 'react';
import { FaStar } from 'react-icons/fa';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import './myTech.css';

const starColors = ['#7F96FF', '#e76f51', '#00b4d8', '#386641', '#fca311', '#00509d', '#9d4edd'];

const TechCard = ({ tech, index }) => {
    const [ref, visible] = useReveal({ threshold: 0.2 });
    const starColor = starColors[index % starColors.length];
    const rating = Math.max(0, Math.min(5, Number(tech.rating) || 0));

    return (
        <div
            ref={ref}
            className={`tech-card flex gap-3 w-full ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 6) * 80}ms` }}
        >
            <div className="tech-card-img-wrap">
                <img src={`/icons/tech/${tech.image}`} alt={tech.name} />
            </div>
            <div className="tech-card-body">
                <span className="tech-card-name">{tech.name}</span>
                <p className="tech-card-desc">{tech.description}</p>
                <div className="tech-card-stars" style={{ color: starColor }}>
                    {Array.from({ length: rating }).map((_, i) => (
                        <FaStar key={`full-${i}`} size={16} />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                        <FaStar key={`empty-${i}`} className="text-[#e7dcdc47]" size={16} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const MyTech = () => {
    const [headingRef, headingVisible] = useReveal();
    const { data } = useData();
    const stack = data.tech;

    return (
        <div className="my-[5rem] lg:my-[5rem]">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`flex ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="text-center mb-[3rem] px-4 mx-auto">
                        <div className="color-orange text-[20px] font-bold mb-2">Expertise</div>
                        <div className="text-[2rem] md:text-[2.5rem] mb-3 font-bold">My Tech Stack</div>
                        <p className="w-full lg:w-3/4 mx-auto text-gray-400">
                            A breakdown of the tools I reach for across the stack — rated by how much I actually use them in production.
                        </p>
                    </div>
                </div>

                {stack.map((group) => (
                    <div className="mb-[25px] px-4 md:px-0" key={group.id || group.label}>
                        <h1 className="text-[22px] md:text-[25px] font-bold my-2">
                            <span>{group.label}</span>
                            <div className="group-underline mt-1 mb-2 h-[5px] bg-[var(--orange)] w-[60px]" />
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-3 pb-5">
                            {(group.data || []).map((tech, index) => (
                                <TechCard tech={tech} index={index} key={tech.id || tech.name} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTech;
