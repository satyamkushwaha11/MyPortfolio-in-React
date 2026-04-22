import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import { isAdminAuthed } from './adminAuth';
import './admin.css';

const Admin = () => {
    const [authed, setAuthed] = useState(() => isAdminAuthed());
    if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;
    return <AdminLayout onSignOut={() => setAuthed(false)} />;
};

export default Admin;
