import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import './section4.css';

const isRealUrl = (url) => /^https?:\/\//i.test(String(url || ''));

const ProjectCard = ({ project, index, githubProfile }) => {
    const [ref, visible] = useReveal({ threshold: 0.15 });
    // Live site icon: only show when there's a real URL.
    const liveUrl = isRealUrl(project.live) ? project.live : null;
    // Code icon: use the project's own repo if set, otherwise fall back to my
    // GitHub profile (client projects have no public repo).
    const codeUrl = isRealUrl(project.source) ? project.source : githubProfile;
    return (
        <article
            ref={ref}
            className={`project-card ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 3) * 120}ms` }}
        >
            <div className="project-card-media">
                <img src={project.image} alt={project.title} />
                <div className="project-card-overlay">
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit live website">
                            <FiExternalLink size={22} />
                        </a>
                    )}
                    {codeUrl && (
                        <a href={codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View code on GitHub">
                            <FiGithub size={22} />
                        </a>
                    )}
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

const PAGE_SIZE = 6;

const Section4 = () => {
    const [filter, setFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [headingRef, headingVisible] = useReveal();
    const gridTopRef = useRef(null);
    const { data } = useData();
    const projects = data.projects;
    const githubProfile = data.site?.socials?.github;

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
        [projects]
    );

    const filtered = useMemo(
        () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
        [filter, projects]
    );

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const current = Math.min(page, pageCount);
    const paged = useMemo(
        () => filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
        [filtered, current]
    );

    // Back to page 1 whenever the category filter changes.
    useEffect(() => {
        setPage(1);
    }, [filter]);

    const goToPage = (n) => {
        setPage(n);
        gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

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

                <div ref={gridTopRef} className="portfolio-filter">
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
                    {paged.map((project, index) => (
                        <ProjectCard
                            key={`${project.id || project.title}-${filter}-${current}`}
                            project={project}
                            index={index}
                            githubProfile={githubProfile}
                        />
                    ))}
                    {filtered.length === 0 && (
                        <div className="portfolio-empty">No projects in this category yet.</div>
                    )}
                </div>

                {pageCount > 1 && (
                    <div className="portfolio-pagination" role="navigation" aria-label="Portfolio pages">
                        <button
                            type="button"
                            className="page-btn page-arrow"
                            onClick={() => goToPage(current - 1)}
                            disabled={current === 1}
                            aria-label="Previous page"
                        >
                            <FiChevronLeft size={18} />
                        </button>
                        {Array.from({ length: pageCount }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`page-btn ${current === i + 1 ? 'active' : ''}`}
                                onClick={() => goToPage(i + 1)}
                                aria-label={`Page ${i + 1}`}
                                aria-current={current === i + 1 ? 'page' : undefined}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="page-btn page-arrow"
                            onClick={() => goToPage(current + 1)}
                            disabled={current === pageCount}
                            aria-label="Next page"
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Section4;
