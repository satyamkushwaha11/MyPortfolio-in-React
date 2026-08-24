import React from 'react';
import { FaAward, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import {
    SiCoursera,
    SiHackerrank,
    SiOracle,
    SiSololearn,
    SiUdemy,
} from 'react-icons/si';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import certifications from '../../../data/certifications.json';
import './certifications.css';

// Brand icon + accent per issuer; issuers without a brand icon (Anthropic is
// missing from this react-icons version) fall back to a generic award.
const ISSUER_ICONS = {
    oracle: { Icon: SiOracle, color: '#C74634' },
    anthropic: { Icon: FaAward, color: '#D97757' },
    udemy: { Icon: SiUdemy, color: '#A435F0' },
    coursera: { Icon: SiCoursera, color: '#0056D2' },
    hackerrank: { Icon: SiHackerrank, color: '#1BA94C' },
    sololearn: { Icon: SiSololearn, color: '#149EF2' },
};

const issuerIcon = (issuer) => {
    const key = String(issuer || '').toLowerCase();
    const match = Object.keys(ISSUER_ICONS).find((k) => key.includes(k));
    return match ? ISSUER_ICONS[match] : { Icon: FaAward, color: 'var(--orange)' };
};

const CertCard = ({ cert, index }) => {
    const [ref, visible] = useReveal({ threshold: 0.2 });
    const { Icon, color } = issuerIcon(cert.issuer);

    return (
        <div
            ref={ref}
            className={`cert-card ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 3) * 80}ms` }}
        >
            <div className="cert-icon-wrap" style={{ color }}>
                <Icon size={28} aria-hidden="true" />
            </div>
            <div className="cert-card-body">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-issuer">
                    {cert.issuer}
                    {cert.issued ? ` · Issued ${cert.issued}` : ''}
                </span>
                {cert.credentialId && (
                    <span className="cert-credential">Credential ID: {cert.credentialId}</span>
                )}
                {cert.url && (
                    <a
                        className="cert-link"
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View credential <FaExternalLinkAlt size={11} aria-hidden="true" />
                    </a>
                )}
            </div>
        </div>
    );
};

const Certifications = () => {
    const [headingRef, headingVisible] = useReveal();
    const { data } = useData();
    const linkedin = data.site.socials?.linkedin;
    const linkedinCertsUrl = linkedin
        ? `${linkedin.replace(/\/+$/, '')}/details/certifications/`
        : null;

    return (
        <div className="my-[5rem] lg:my-[5rem]">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`flex ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="text-center mb-[3rem] px-4 mx-auto">
                        <div className="color-orange text-[18px] md:text-[20px] font-bold mb-2">Credentials</div>
                        <div className="text-[2rem] md:text-[2.5rem] leading-tight mb-3 font-bold">Licenses & Certifications</div>
                        <p className="w-full lg:w-3/4 mx-auto text-gray-400">
                            Verified credentials from Oracle, Anthropic, Coursera, HackerRank and more — each one links to the certificate itself.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
                    {certifications.map((cert, index) => (
                        <CertCard cert={cert} index={index} key={cert.id} />
                    ))}
                </div>

                {linkedinCertsUrl && (
                    <div className="flex-center mt-8 px-4">
                        <a
                            className="cert-linkedin-link"
                            href={linkedinCertsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin size={18} aria-hidden="true" />
                            <span>See verified credentials on LinkedIn</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certifications;
