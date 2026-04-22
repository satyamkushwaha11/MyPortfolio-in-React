import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiEye, FiLogOut, FiRefreshCw, FiUpload } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { signOutAdmin } from './adminAuth';
import AdminSite from './panels/AdminSite';
import AdminProjects from './panels/AdminProjects';
import AdminPosts from './panels/AdminPosts';
import AdminTech from './panels/AdminTech';
import AdminGallery from './panels/AdminGallery';
import AdminSecurity from './panels/AdminSecurity';

const TABS = [
    { key: 'site', label: 'Site Config' },
    { key: 'projects', label: 'Projects' },
    { key: 'posts', label: 'Blog Posts' },
    { key: 'tech', label: 'Tech Stack' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'security', label: 'Security' },
];

const downloadJson = (filename, value) => {
    const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const AdminLayout = ({ onSignOut }) => {
    const [tab, setTab] = useState('site');
    const { data, resetAll, importData } = useData();
    const fileRef = useRef(null);
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2800);
    };

    const handleExport = () => {
        downloadJson(`portfolio-data-${new Date().toISOString().slice(0, 10)}.json`, data);
        showToast('Exported current data as JSON.');
    };

    const handleImportClick = () => fileRef.current?.click();

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        try {
            const text = await file.text();
            const parsed = JSON.parse(text);
            importData(parsed);
            showToast('Imported JSON successfully.');
        } catch {
            showToast('Could not parse that file as JSON.');
        }
    };

    const handleReset = () => {
        if (window.confirm('Reset ALL site data to defaults? Unsaved changes will be lost.')) {
            resetAll();
            showToast('Reset to defaults.');
        }
    };

    const handleSignOut = () => {
        signOutAdmin();
        onSignOut();
    };

    return (
        <div className="admin-shell">
            <header className="admin-topbar">
                <div className="admin-topbar-left">
                    <span className="color-orange font-bold">Admin</span>
                    <span className="admin-topbar-sep">/</span>
                    <span>{TABS.find((t) => t.key === tab)?.label}</span>
                </div>
                <div className="admin-topbar-actions">
                    <Link to="/" className="admin-link" target="_blank" rel="noopener noreferrer">
                        <FiEye /> View site
                    </Link>
                    <button type="button" className="admin-link" onClick={handleExport}>
                        <FiDownload /> Export
                    </button>
                    <button type="button" className="admin-link" onClick={handleImportClick}>
                        <FiUpload /> Import
                    </button>
                    <button type="button" className="admin-link admin-link-danger" onClick={handleReset}>
                        <FiRefreshCw /> Reset
                    </button>
                    <button type="button" className="admin-link" onClick={handleSignOut}>
                        <FiLogOut /> Sign out
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="application/json"
                        onChange={handleFile}
                        style={{ display: 'none' }}
                    />
                </div>
            </header>

            <div className="admin-body">
                <aside className="admin-sidebar">
                    <nav>
                        {TABS.map((t) => (
                            <button
                                type="button"
                                key={t.key}
                                className={`admin-tab ${tab === t.key ? 'active' : ''}`}
                                onClick={() => setTab(t.key)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </nav>
                </aside>
                <main className="admin-main">
                    {tab === 'site' && <AdminSite />}
                    {tab === 'projects' && <AdminProjects />}
                    {tab === 'posts' && <AdminPosts />}
                    {tab === 'tech' && <AdminTech />}
                    {tab === 'gallery' && <AdminGallery />}
                    {tab === 'security' && <AdminSecurity />}
                </main>
            </div>

            {toast && <div className="admin-toast">{toast}</div>}
        </div>
    );
};

export default AdminLayout;
