import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useData } from '../../../context/DataContext';

const EMPTY = { src: '', caption: '', category: '' };

const AdminGallery = () => {
    const { data, createItem, updateItem, removeItem } = useData();
    const [editing, setEditing] = useState(null);

    const openNew = () => setEditing({ mode: 'create', values: EMPTY });
    const openEdit = (item) =>
        setEditing({ mode: 'edit', id: item.id, values: { ...EMPTY, ...item } });
    const close = () => setEditing(null);

    const setField = (key, value) =>
        setEditing((cur) => ({ ...cur, values: { ...cur.values, [key]: value } }));

    const onSave = (e) => {
        e.preventDefault();
        if (!editing.values.src.trim()) return;
        if (editing.mode === 'create') {
            createItem('gallery', editing.values, 'gal');
        } else {
            updateItem('gallery', editing.id, editing.values);
        }
        close();
    };

    const onDelete = (item) => {
        if (window.confirm(`Delete "${item.caption || item.src}"?`)) removeItem('gallery', item.id);
    };

    return (
        <div>
            <div className="admin-panel-header">
                <div>
                    <h2>Gallery</h2>
                    <p>Images shown at <code>/gallery</code>. Use paths like <code>/images/name.jpg</code> (place files under <code>public/images</code>).</p>
                </div>
                <button className="admin-btn" onClick={openNew} type="button">
                    <FiPlus /> Add Image
                </button>
            </div>

            {data.gallery.length === 0 ? (
                <div className="admin-empty">No gallery images yet.</div>
            ) : (
                <ul className="admin-list">
                    {data.gallery.map((item) => (
                        <li className="admin-row" key={item.id}>
                            <div className="admin-row-thumb">
                                {item.src && <img src={item.src} alt="" />}
                            </div>
                            <div className="admin-row-main">
                                <div className="admin-row-title">{item.caption || item.src}</div>
                                <div className="admin-row-sub">
                                    {item.category} · {item.src}
                                </div>
                            </div>
                            <div className="admin-row-actions">
                                <button className="admin-icon-btn" type="button" onClick={() => openEdit(item)}>
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="admin-icon-btn danger"
                                    type="button"
                                    onClick={() => onDelete(item)}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {editing && (
                <div className="admin-modal-backdrop" onClick={close}>
                    <form
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={onSave}
                    >
                        <h3>{editing.mode === 'create' ? 'Add image' : 'Edit image'}</h3>
                        <div className="admin-form">
                            <div className="admin-field">
                                <label>Image URL</label>
                                <input
                                    value={editing.values.src}
                                    onChange={(e) => setField('src', e.target.value)}
                                    placeholder="/images/..."
                                    required
                                />
                            </div>
                            <div className="admin-form-grid-2">
                                <div className="admin-field">
                                    <label>Caption</label>
                                    <input
                                        value={editing.values.caption}
                                        onChange={(e) => setField('caption', e.target.value)}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label>Category</label>
                                    <input
                                        value={editing.values.category}
                                        onChange={(e) => setField('category', e.target.value)}
                                        placeholder="e.g. Portrait"
                                    />
                                </div>
                            </div>
                            <div className="admin-form-actions">
                                <button type="submit" className="admin-btn">Save</button>
                                <button type="button" className="admin-btn admin-btn-ghost" onClick={close}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
