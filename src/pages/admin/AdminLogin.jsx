import React, { useState } from 'react';
import SimpleBtn from '../../components/buttons/SimpleBtn/SimpleBtn';
import { signInAdmin, getAdminPassword, isPasswordFromEnv } from './adminAuth';

const AdminLogin = ({ onSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isDefault = getAdminPassword() === 'admin';
    const fromEnv = isPasswordFromEnv();

    const onSubmit = (e) => {
        e.preventDefault();
        if (signInAdmin(password)) {
            setError('');
            onSuccess();
        } else {
            setError('Incorrect password.');
        }
    };

    return (
        <div className="page-container theme-bg admin-login">
            <div className="container">
                <form onSubmit={onSubmit} className="admin-login-card">
                    <div className="color-orange font-bold mb-2">Admin</div>
                    <h1>Sign in</h1>
                    <p>Enter your admin password to manage site content.</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        className={`admin-input ${error ? 'input-error' : ''}`}
                    />
                    {error && <span className="form-error">{error}</span>}
                    {isDefault && (
                        <div className="admin-note">
                            Default password is <code>admin</code>. Set <code>REACT_APP_ADMIN_PASSWORD</code> in <code>.env.local</code> or change it after signing in.
                        </div>
                    )}
                    {fromEnv && (
                        <div className="admin-note">
                            Using password from <code>REACT_APP_ADMIN_PASSWORD</code> env var.
                        </div>
                    )}
                    <SimpleBtn fill type="submit" onClick={onSubmit}>
                        Sign in
                    </SimpleBtn>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
