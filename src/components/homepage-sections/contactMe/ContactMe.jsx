import React, { useMemo, useState } from 'react';
import { ImLocation } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn';
import useReveal from '../../../hooks/useReveal';
import { useData } from '../../../context/DataContext';
import { CONTACT_EMAIL_OVERRIDE } from '../../../config/config';
import './contact.css';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) errors.name = 'Name is required';
    if (!values.email.trim()) errors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = 'Enter a valid email';
    if (!values.message.trim()) errors.message = 'Message is required';
    return errors;
};

const ContactMe = () => {
    const [values, setValues] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [infoRef, infoVisible] = useReveal();
    const [formRef, formVisible] = useReveal();
    const { data } = useData();
    const { site } = data;
    const targetEmail = CONTACT_EMAIL_OVERRIDE || site.email;

    const contactInfo = useMemo(
        () => [
            {
                Icon: ImLocation,
                label: 'Address',
                value: site.location,
                color: '#f75023',
                bg: '#fedfd7',
            },
            {
                Icon: MdEmail,
                label: 'Email',
                value: site.email,
                href: `mailto:${site.email}`,
                color: '#1cbe59',
                bg: '#ddf5e6',
            },
            {
                Icon: FaPhoneAlt,
                label: 'Phone',
                value: site.phone,
                href: `tel:${site.phone}`,
                color: '#8067f0',
                bg: '#ece8fd',
            },
        ],
        [site.location, site.email, site.phone]
    );

    const onChange = (e) => {
        const { id, value } = e.target;
        setValues((v) => ({ ...v, [id]: value }));
        if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const found = validate(values);
        if (Object.keys(found).length) {
            setErrors(found);
            return;
        }
        const subject = values.subject.trim() || `New message from ${values.name}`;
        const bodyLines = [
            `Name: ${values.name}`,
            `Email: ${values.email}`,
            values.phone && `Phone: ${values.phone}`,
            '',
            values.message,
        ].filter(Boolean);
        const mailto =
            `mailto:${targetEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        setStatus('sending');
        window.location.href = mailto;
        setTimeout(() => {
            setStatus('sent');
            setTimeout(() => setStatus('idle'), 4000);
        }, 300);
    };

    return (
        <div className="contact-me-container">
            <div className="container">
                <div className="text-center mb-[3rem] md:mb-[4rem] px-4">
                    <div className="color-orange text-[18px] md:text-[20px] font-bold mb-2">Contact Me</div>
                    <div className="text-[1.8rem] md:text-[2.5rem] leading-tight mb-3 font-bold">I Want To Hear From You</div>
                    <p className="w-full lg:w-2/4 mx-auto text-gray-400">
                        Fill out the form and I'll get back to you, usually within a day. Or call between 9:00 a.m. and 8:00 p.m. IST, Mon–Fri.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row px-4 lg:px-0 gap-8 lg:gap-10">
                    <div
                        ref={infoRef}
                        className={`w-full lg:w-1/2 ${infoVisible ? 'reveal reveal-left' : 'reveal'}`}
                    >
                        <div className="flex flex-col gap-4 md:gap-6 mb-5">
                            {contactInfo.map(({ Icon, label, value, href, color, bg }) => (
                                <div className="flex gap-4 contact-item" key={label}>
                                    <div className="icon-contact-me" style={{ color, backgroundColor: bg }}>
                                        <Icon size={32} />
                                    </div>
                                    <div className="flex flex-col gap-3 py-1">
                                        <h5 className="text-[30px] font-semibold">{label}</h5>
                                        {href ? (
                                            <a href={href} className="contact-value contact-link">
                                                {value}
                                            </a>
                                        ) : (
                                            <div className="contact-value">{value}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={formRef}
                        className={`w-full lg:w-1/2 ${formVisible ? 'reveal reveal-right' : 'reveal'}`}
                    >
                        <form onSubmit={onSubmit} noValidate>
                            <div className="flex flex-col sm:flex-row justify-between gap-4 pb-5">
                                <div className="flex flex-col w-full sm:w-[48%]">
                                    <input
                                        type="text"
                                        className={`rounded-lg input-contact-me py-5 px-2 ${errors.name ? 'input-error' : ''}`}
                                        id="name"
                                        value={values.name}
                                        onChange={onChange}
                                        placeholder="Name"
                                    />
                                    {errors.name && <span className="form-error">{errors.name}</span>}
                                </div>
                                <div className="flex flex-col w-full sm:w-[48%]">
                                    <input
                                        type="email"
                                        className={`rounded-lg input-contact-me py-5 px-2 ${errors.email ? 'input-error' : ''}`}
                                        id="email"
                                        value={values.email}
                                        onChange={onChange}
                                        placeholder="Email"
                                    />
                                    {errors.email && <span className="form-error">{errors.email}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between gap-4 pb-5">
                                <div className="flex flex-col w-full sm:w-[48%]">
                                    <input
                                        type="tel"
                                        className="rounded-lg input-contact-me py-5 px-2"
                                        id="phone"
                                        value={values.phone}
                                        onChange={onChange}
                                        placeholder="Phone Number"
                                    />
                                </div>
                                <div className="flex flex-col w-full sm:w-[48%]">
                                    <input
                                        type="text"
                                        className="rounded-lg input-contact-me py-5 px-2"
                                        id="subject"
                                        value={values.subject}
                                        onChange={onChange}
                                        placeholder="Subject"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <textarea
                                    placeholder="Write Your Message Here..."
                                    rows="8"
                                    id="message"
                                    value={values.message}
                                    onChange={onChange}
                                    className={`w-full px-3 py-5 rounded-lg input-contact-me ${errors.message ? 'input-error' : ''}`}
                                />
                                {errors.message && <span className="form-error">{errors.message}</span>}
                            </div>

                            <div className="mt-4 flex items-center gap-4 flex-wrap">
                                <SimpleBtn fill type="submit" onClick={onSubmit}>
                                    {status === 'sending' ? 'Sending…' : 'Submit Now'}
                                </SimpleBtn>
                                {status === 'sent' && (
                                    <span className="form-success">Your email client should have opened — thanks!</span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMe;
