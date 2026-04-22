import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useData } from '../../../context/DataContext';

const EMPTY_ITEM = { name: '', description: '', image: '', rating: 3 };

const AdminTech = () => {
    const {
        data,
        createTechGroup,
        updateTechGroup,
        removeTechGroup,
        createTechItem,
        updateTechItem,
        removeTechItem,
    } = useData();
    const [editingItem, setEditingItem] = useState(null);
    const [newGroupLabel, setNewGroupLabel] = useState('');

    const openNewItem = (groupId) =>
        setEditingItem({ mode: 'create', groupId, values: EMPTY_ITEM });
    const openEditItem = (groupId, item) =>
        setEditingItem({ mode: 'edit', groupId, id: item.id, values: { ...EMPTY_ITEM, ...item } });
    const closeItem = () => setEditingItem(null);

    const setField = (key, value) =>
        setEditingItem((cur) => ({ ...cur, values: { ...cur.values, [key]: value } }));

    const onSaveItem = (e) => {
        e.preventDefault();
        const v = editingItem.values;
        if (!v.name.trim()) return;
        const payload = { ...v, rating: Math.max(0, Math.min(5, Number(v.rating) || 0)) };
        if (editingItem.mode === 'create') {
            createTechItem(editingItem.groupId, payload);
        } else {
            updateTechItem(editingItem.groupId, editingItem.id, payload);
        }
        closeItem();
    };

    const onAddGroup = () => {
        if (!newGroupLabel.trim()) return;
        createTechGroup(newGroupLabel.trim());
        setNewGroupLabel('');
    };

    const renameGroup = (group) => {
        const next = window.prompt('Rename group', group.label);
        if (next && next.trim() && next !== group.label) {
            updateTechGroup(group.id, { label: next.trim() });
        }
    };

    const deleteGroup = (group) => {
        if (window.confirm(`Delete group "${group.label}" and all its items?`)) {
            removeTechGroup(group.id);
        }
    };

    const deleteItem = (groupId, item) => {
        if (window.confirm(`Delete "${item.name}"?`)) removeTechItem(groupId, item.id);
    };

    return (
        <div>
            <div className="admin-panel-header">
                <div>
                    <h2>Tech Stack</h2>
                    <p>Grouped skills shown in the Skills section. Image paths are looked up in <code>/public/icons/tech/</code>.</p>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onAddGroup();
                    }}
                    style={{ display: 'flex', gap: 8 }}
                >
                    <input
                        className="admin-input"
                        placeholder="New group name"
                        value={newGroupLabel}
                        onChange={(e) => setNewGroupLabel(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <button type="submit" className="admin-btn">
                        <FiPlus /> Group
                    </button>
                </form>
            </div>

            {data.tech.map((group) => (
                <div key={group.id} className="admin-tech-group">
                    <div className="admin-tech-group-header">
                        <div className="admin-tech-group-title">{group.label}</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button
                                type="button"
                                className="admin-btn admin-btn-ghost"
                                onClick={() => renameGroup(group)}
                            >
                                Rename
                            </button>
                            <button
                                type="button"
                                className="admin-btn admin-btn-ghost"
                                onClick={() => openNewItem(group.id)}
                            >
                                <FiPlus /> Item
                            </button>
                            <button
                                type="button"
                                className="admin-btn admin-btn-danger"
                                onClick={() => deleteGroup(group)}
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>

                    {group.data.length === 0 ? (
                        <div className="admin-empty">No items in this group yet.</div>
                    ) : (
                        <ul className="admin-list">
                            {group.data.map((item) => (
                                <li className="admin-row" key={item.id}>
                                    <div className="admin-row-thumb">
                                        {item.image && <img src={`/icons/tech/${item.image}`} alt="" />}
                                    </div>
                                    <div className="admin-row-main">
                                        <div className="admin-row-title">
                                            {item.name} · {item.rating}/5
                                        </div>
                                        <div className="admin-row-sub">{item.description}</div>
                                    </div>
                                    <div className="admin-row-actions">
                                        <button
                                            className="admin-icon-btn"
                                            type="button"
                                            onClick={() => openEditItem(group.id, item)}
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            className="admin-icon-btn danger"
                                            type="button"
                                            onClick={() => deleteItem(group.id, item)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            {editingItem && (
                <div className="admin-modal-backdrop" onClick={closeItem}>
                    <form
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={onSaveItem}
                    >
                        <h3>{editingItem.mode === 'create' ? 'Add item' : 'Edit item'}</h3>
                        <div className="admin-form">
                            <div className="admin-form-grid-2">
                                <div className="admin-field">
                                    <label>Name</label>
                                    <input
                                        value={editingItem.values.name}
                                        onChange={(e) => setField('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="admin-field">
                                    <label>Rating (0-5)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        value={editingItem.values.rating}
                                        onChange={(e) => setField('rating', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="admin-field">
                                <label>Icon filename</label>
                                <input
                                    value={editingItem.values.image}
                                    onChange={(e) => setField('image', e.target.value)}
                                    placeholder="e.g. react.png (from /public/icons/tech/)"
                                />
                            </div>
                            <div className="admin-field">
                                <label>Description</label>
                                <textarea
                                    value={editingItem.values.description}
                                    onChange={(e) => setField('description', e.target.value)}
                                />
                            </div>
                            <div className="admin-form-actions">
                                <button type="submit" className="admin-btn">Save</button>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-ghost"
                                    onClick={closeItem}
                                >
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

export default AdminTech;
