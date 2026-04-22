import React, { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useData } from '../../../context/DataContext';

const FIELDS = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role / Title' },
    { key: 'location', label: 'Location' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone' },
    { key: 'cvUrl', label: 'CV URL', help: 'Path or URL for the Download CV button.' },
    { key: 'yearsOfExperience', label: 'Years of Experience' },
    { key: 'totalProjects', label: 'Total Projects (shown in counter)', type: 'number' },
];

const TEXTAREAS = [
    { key: 'heroDescription', label: 'Hero Description' },
    { key: 'aboutSubtitle', label: 'About Subtitle (small text above)' },
    { key: 'aboutTitle', label: 'About Title' },
    { key: 'aboutBody', label: 'About Body' },
];

const SOCIAL_FIELDS = [
    { key: 'github', label: 'GitHub URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'facebook', label: 'Facebook URL' },
];

const AdminSite = () => {
    const { data, updateSite } = useData();
    const [form, setForm] = useState(data.site);
    const [saved, setSaved] = useState(false);

    useEffect(() => setForm(data.site), [data.site]);

    const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const setSocial = (key, value) =>
        setForm((f) => ({ ...f, socials: { ...(f.socials || {}), [key]: value } }));

    const onSubmit = (e) => {
        e.preventDefault();
        updateSite({
            ...form,
            totalProjects: Number(form.totalProjects) || 0,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <form className="admin-form" onSubmit={onSubmit}>
            <div className="admin-panel-header">
                <div>
                    <h2>Site Config</h2>
                    <p>Edit your name, contact info, hero copy, and social links. Changes save instantly to the live site.</p>
                </div>
            </div>

            <div className="admin-form-grid-2">
                {FIELDS.map((f) => (
                    <div className="admin-field" key={f.key}>
                        <label htmlFor={`site-${f.key}`}>{f.label}</label>
                        <input
                            id={`site-${f.key}`}
                            type={f.type || 'text'}
                            value={form[f.key] ?? ''}
                            onChange={(e) => setField(f.key, e.target.value)}
                        />
                        {f.help && <small style={{ color: '#6f6b80' }}>{f.help}</small>}
                    </div>
                ))}
            </div>

            {TEXTAREAS.map((f) => (
                <div className="admin-field" key={f.key}>
                    <label htmlFor={`site-${f.key}`}>{f.label}</label>
                    <textarea
                        id={`site-${f.key}`}
                        value={form[f.key] ?? ''}
                        onChange={(e) => setField(f.key, e.target.value)}
                    />
                </div>
            ))}

            <h3 className="text-[18px] font-semibold mt-2">Social Links</h3>
            <div className="admin-form-grid-2">
                {SOCIAL_FIELDS.map((s) => (
                    <div className="admin-field" key={s.key}>
                        <label htmlFor={`soc-${s.key}`}>{s.label}</label>
                        <input
                            id={`soc-${s.key}`}
                            type="url"
                            value={form.socials?.[s.key] ?? ''}
                            onChange={(e) => setSocial(s.key, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="admin-form-actions">
                <button type="submit" className="admin-btn">
                    {saved ? (
                        <>
                            <FiCheck /> Saved
                        </>
                    ) : (
                        'Save changes'
                    )}
                </button>
            </div>
        </form>
    );
};

export default AdminSite;
