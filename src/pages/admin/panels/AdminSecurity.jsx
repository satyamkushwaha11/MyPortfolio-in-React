import React, { useState } from 'react';
import { getAdminPassword, setAdminPassword } from '../adminAuth';

const AdminSecurity = () => {
    const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [confirm, setConfirm] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');
    const isDefault = getAdminPassword() === 'admin';

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus(null);
        setError('');
        if (current !== getAdminPassword()) {
            setError('Current password is incorrect.');
            return;
        }
        if (next.length < 4) {
            setError('New password must be at least 4 characters.');
            return;
        }
        if (next !== confirm) {
            setError('New password and confirmation do not match.');
            return;
        }
        setAdminPassword(next);
        setCurrent('');
        setNext('');
        setConfirm('');
        setStatus('Password updated.');
    };

    return (
        <div>
            <div className="admin-panel-header">
                <div>
                    <h2>Security</h2>
                    <p>Change the admin password. Stored in this browser's localStorage — set it per-device.</p>
                </div>
            </div>
            {isDefault && (
                <div className="admin-note" style={{ marginBottom: 20 }}>
                    Heads up: you're still using the default password <code>admin</code>. Change it before sharing the URL.
                </div>
            )}
            <form className="admin-form" onSubmit={onSubmit}>
                <div className="admin-field">
                    <label>Current password</label>
                    <input
                        type="password"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        required
                    />
                </div>
                <div className="admin-form-grid-2">
                    <div className="admin-field">
                        <label>New password</label>
                        <input
                            type="password"
                            value={next}
                            onChange={(e) => setNext(e.target.value)}
                            required
                        />
                    </div>
                    <div className="admin-field">
                        <label>Confirm new password</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {error && <span className="form-error">{error}</span>}
                {status && <span className="form-success">{status}</span>}
                <div className="admin-form-actions">
                    <button type="submit" className="admin-btn">Update password</button>
                </div>
            </form>
        </div>
    );
};

export default AdminSecurity;
