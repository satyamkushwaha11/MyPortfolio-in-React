import React, { useMemo, useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import './section4.css';

const ProjectCard = ({ project, index }) => {
    const [ref, visible] = useReveal({ threshold: 0.15 });
    return (
        <article
            ref={ref}
            className={`project-card ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 3) * 120}ms` }}
        >
            <div className="project-card-media">
                <img src={project.image} alt={project.title} />
                <div className="project-card-overlay">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                        <FiExternalLink size={22} />
                    </a>
                    <a href={project.source} target="_blank" rel="noopener noreferrer" aria-label="Source code">
                        <FiGithub size={22} />
                    </a>
                </div>
            </div>
            <div className="project-card-body">
                <div className="project-card-category">{project.category}</div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
                <ul className="project-card-tags">
                    {project.tags.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

const Section4 = () => {
    const [filter, setFilter] = useState('All');
    const [headingRef, headingVisible] = useReveal();
    const { data } = useData();
    const projects = data.projects;

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
        [projects]
    );

    const filtered = useMemo(
        () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
        [filter, projects]
    );

    return (
        <div className="my-[5rem] lg:my-[5rem]">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`flex ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="text-center mb-[3rem] px-4 mx-auto">
                        <div className="color-orange text-[18px] md:text-[20px] font-bold mb-2">Portfolio</div>
                        <div className="text-[2rem] md:text-[2.5rem] leading-tight mb-3 font-bold">My Amazing Works</div>
                        <p className="w-full lg:w-3/4 mx-auto text-gray-400">
                            A selection of projects I've shipped — filter by type to focus on what matters.
                        </p>
                    </div>
                </div>

                <div className="portfolio-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`portfolio-filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="portfolio-grid">
                    {filtered.map((project, index) => (
                        <ProjectCard
                            key={`${project.id || project.title}-${filter}`}
                            project={project}
                            index={index}
                        />
                    ))}
                    {filtered.length === 0 && (
                        <div className="portfolio-empty">No projects in this category yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Section4;
