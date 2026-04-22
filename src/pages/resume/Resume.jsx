import React from 'react';
import { FiDownload, FiPrinter, FiMail, FiPhone, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import './resume.css';

const Resume = () => {
    const { data } = useData();
    const { site } = data;
    const resume = site.resume || {};
    const pdfUrl = site.cvFileUrl || '/Satyam_Kushwaha_CV.pdf';

    const onPrint = () => window.print();

    return (
        <div className="resume-page theme-bg">
            <div className="resume-toolbar no-print">
                <div className="container resume-toolbar-inner">
                    <div className="resume-toolbar-hint">
                        Press <kbd>Save as PDF</kbd> in your browser's print dialog to download.
                    </div>
                    <div className="resume-toolbar-actions">
                        <a
                            href={pdfUrl}
                            download
                            className="resume-toolbar-btn"
                        >
                            <FiDownload /> Download PDF
                        </a>
                        <button type="button" onClick={onPrint} className="resume-toolbar-btn resume-toolbar-btn-primary">
                            <FiPrinter /> Print / Save as PDF
                        </button>
                    </div>
                </div>
            </div>

            <article className="resume-sheet">
                <header className="resume-header">
                    <h1 className="resume-name">{site.name}</h1>
                    <div className="resume-role">{site.role}</div>
                    <div className="resume-location">{site.location}</div>
                    <ul className="resume-contact">
                        <li>
                            <FiPhone />
                            <a href={`tel:${site.phone}`}>{site.phone}</a>
                        </li>
                        <li>
                            <FiMail />
                            <a href={`mailto:${site.email}`}>{site.email}</a>
                        </li>
                        {site.website && (
                            <li>
                                <FiGlobe />
                                <a href={site.website} target="_blank" rel="noopener noreferrer">
                                    {site.website.replace(/^https?:\/\//, '')}
                                </a>
                            </li>
                        )}
                        {site.socials?.github && (
                            <li>
                                <FiGithub />
                                <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
                                    {site.socials.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                                </a>
                            </li>
                        )}
                        {site.socials?.linkedin && (
                            <li>
                                <FiLinkedin />
                                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                    {site.socials.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                                </a>
                            </li>
                        )}
                    </ul>
                </header>

                {resume.summary && (
                    <section className="resume-section">
                        <h2><span>Pro</span>fessional Summary</h2>
                        <p>{resume.summary}</p>
                    </section>
                )}

                {Array.isArray(resume.skills) && resume.skills.length > 0 && (
                    <section className="resume-section">
                        <h2><span>Te</span>chnical Skills</h2>
                        <dl className="resume-skills">
                            {resume.skills.map((group) => (
                                <div className="resume-skill-row" key={group.label}>
                                    <dt>{group.label}</dt>
                                    <dd>{(group.items || []).join(', ')}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {Array.isArray(resume.experience) && resume.experience.length > 0 && (
                    <section className="resume-section">
                        <h2><span>Wor</span>k Experience</h2>
                        {resume.experience.map((job, i) => (
                            <div className="resume-job" key={i}>
                                <div className="resume-job-header">
                                    <div>
                                        <div className="resume-job-company">{job.company}</div>
                                        <div className="resume-job-role">{job.role}</div>
                                    </div>
                                    <div className="resume-job-meta">
                                        <div>{job.location}</div>
                                        <div>{job.period}</div>
                                    </div>
                                </div>
                                <ul>
                                    {(job.bullets || []).map((b, bi) => (
                                        <li key={bi}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {Array.isArray(data.projects) && data.projects.length > 0 && (
                    <section className="resume-section">
                        <h2><span>Pro</span>jects</h2>
                        {data.projects.map((project) => (
                            <div className="resume-job" key={project.id}>
                                <div className="resume-job-header">
                                    <div>
                                        <div className="resume-job-company">{project.title}</div>
                                        <div className="resume-job-role">{project.category}</div>
                                    </div>
                                </div>
                                <p className="resume-project-desc">{project.description}</p>
                                {Array.isArray(project.tags) && project.tags.length > 0 && (
                                    <div className="resume-project-tags">Tech: {project.tags.join(', ')}</div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {Array.isArray(resume.education) && resume.education.length > 0 && (
                    <section className="resume-section">
                        <h2><span>Edu</span>cation</h2>
                        {resume.education.map((ed, i) => (
                            <div className="resume-education" key={i}>
                                <div>
                                    <div className="resume-job-company">{ed.school}</div>
                                    <div className="resume-job-role">{ed.degree}</div>
                                </div>
                                <div className="resume-job-meta">{ed.location}</div>
                            </div>
                        ))}
                    </section>
                )}

                {Array.isArray(resume.achievements) && resume.achievements.length > 0 && (
                    <section className="resume-section">
                        <h2><span>Ach</span>ievements</h2>
                        <ul>
                            {resume.achievements.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </article>
        </div>
    );
};

export default Resume;
