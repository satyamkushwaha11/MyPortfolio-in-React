import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useData } from '../../../context/DataContext';
import TagInput from '../TagInput';

const EMPTY = {
    title: '',
    category: '',
    image: '',
    description: '',
    tags: [],
    live: '',
    source: '',
};

const AdminProjects = () => {
    const { data, createItem, updateItem, removeItem, reorderItem } = useData();
    const [editing, setEditing] = useState(null);

    const openNew = () => setEditing({ mode: 'create', values: EMPTY });
    const openEdit = (project) =>
        setEditing({ mode: 'edit', id: project.id, values: { ...EMPTY, ...project } });
    const close = () => setEditing(null);

    const onSave = (e) => {
        e.preventDefault();
        if (!editing.values.title.trim()) return;
        if (editing.mode === 'create') {
            createItem('projects', editing.values, 'p');
        } else {
            updateItem('projects', editing.id, editing.values);
        }
        close();
    };

    const onDelete = (project) => {
        if (window.confirm(`Delete "${project.title}"?`)) removeItem('projects', project.id);
    };

    const setField = (key, value) =>
        setEditing((cur) => ({ ...cur, values: { ...cur.values, [key]: value } }));

    return (
        <div>
            <div className="admin-panel-header">
                <div>
                    <h2>Projects</h2>
                    <p>Items shown in the Portfolio section on the home page.</p>
                </div>
                <button className="admin-btn" onClick={openNew} type="button">
                    <FiPlus /> Add Project
                </button>
            </div>

            {data.projects.length === 0 ? (
                <div className="admin-empty">No projects yet. Add your first one.</div>
            ) : (
                <ul className="admin-list">
                    {data.projects.map((project, index) => (
                        <li className="admin-row" key={project.id}>
                            <div className="admin-row-thumb">
                                {project.image && <img src={project.image} alt="" />}
                            </div>
                            <div className="admin-row-main">
                                <div className="admin-row-title">{project.title}</div>
                                <div className="admin-row-sub">
                                    {project.category} · {(project.tags || []).join(', ')}
                                </div>
                            </div>
                            <div className="admin-row-actions">
                                <button
                                    className="admin-icon-btn"
                                    type="button"
                                    onClick={() => reorderItem('projects', project.id, 'up')}
                                    disabled={index === 0}
                                    title="Move up"
                                >
                                    <FiArrowUp />
                                </button>
                                <button
                                    className="admin-icon-btn"
                                    type="button"
                                    onClick={() => reorderItem('projects', project.id, 'down')}
                                    disabled={index === data.projects.length - 1}
                                    title="Move down"
                                >
                                    <FiArrowDown />
                                </button>
                                <button
                                    className="admin-icon-btn"
                                    type="button"
                                    onClick={() => openEdit(project)}
                                    title="Edit"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="admin-icon-btn danger"
                                    type="button"
                                    onClick={() => onDelete(project)}
                                    title="Delete"
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
                        <h3>{editing.mode === 'create' ? 'Add project' : 'Edit project'}</h3>
                        <div className="admin-form">
                            <div className="admin-form-grid-2">
                                <div className="admin-field">
                                    <label>Title</label>
                                    <input
                                        value={editing.values.title}
                                        onChange={(e) => setField('title', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="admin-field">
                                    <label>Category</label>
                                    <input
                                        value={editing.values.category}
                                        onChange={(e) => setField('category', e.target.value)}
                                        placeholder="e.g. Web App"
                                    />
                                </div>
                            </div>
                            <div className="admin-field">
                                <label>Image URL</label>
                                <input
                                    value={editing.values.image}
                                    onChange={(e) => setField('image', e.target.value)}
                                    placeholder="/images/..."
                                />
                            </div>
                            <div className="admin-field">
                                <label>Description</label>
                                <textarea
                                    value={editing.values.description}
                                    onChange={(e) => setField('description', e.target.value)}
                                />
                            </div>
                            <div className="admin-field">
                                <label>Tags</label>
                                <TagInput
                                    value={editing.values.tags || []}
                                    onChange={(next) => setField('tags', next)}
                                />
                            </div>
                            <div className="admin-form-grid-2">
                                <div className="admin-field">
                                    <label>Live URL</label>
                                    <input
                                        value={editing.values.live}
                                        onChange={(e) => setField('live', e.target.value)}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label>Source URL</label>
                                    <input
                                        value={editing.values.source}
                                        onChange={(e) => setField('source', e.target.value)}
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

export default AdminProjects;
