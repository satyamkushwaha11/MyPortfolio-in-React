import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa6';
import { useData } from '../../context/DataContext';
import './social.css';

const LINKS = [
    { key: 'github', label: 'GitHub', Icon: FaGithub },
    { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin },
    { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
    { key: 'facebook', label: 'Facebook', Icon: FaFacebook },
];

const SocialMedia = ({ size, className }) => {
    const { data } = useData();
    const socials = data.site.socials || {};

    return (
        <ul className={`social-media-list flex gap-4 flex-wrap ${className || ''}`}>
            {LINKS.map(({ key, label, Icon }) => (
                <li key={key} className="social-media-item">
                    <a
                        href={socials[key] || '#'}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon size={size || 30} />
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialMedia;
