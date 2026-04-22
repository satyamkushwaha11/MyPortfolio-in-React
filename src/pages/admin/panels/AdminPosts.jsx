import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useData } from '../../../context/DataContext';
import TagInput from '../TagInput';

const slugify = (str) =>
    String(str || '')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

const toParagraphs = (text) => text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
const fromParagraphs = (paras) => (Array.isArray(paras) ? paras : [String(paras || '')]).join('\n\n');

const EMPTY = {
    slug: '',
    title: '',
    excerpt: '',
    date: new Date().toISOString().slice(0, 10),
    readMinutes: 4,
    cover: '',
    tags: [],
    author: '',
    content: '',
};

const AdminPosts = () => {
    const { data, createItem, updateItem, removeItem } = useData();
    const [editing, setEditing] = useState(null);

    const openNew = () =>
        setEditing({
            mode: 'create',
            values: { ...EMPTY, author: data.site.name || '' },
        });

    const openEdit = (post) =>
        setEditing({
            mode: 'edit',
            id: post.id,
            values: {
                ...EMPTY,
                ...post,
                content: fromParagraphs(post.content),
            },
        });

    const close = () => setEditing(null);

    const setField = (key, value) =>
        setEditing((cur) => ({ ...cur, values: { ...cur.values, [key]: value } }));

    const onSave = (e) => {
        e.preventDefault();
        const v = editing.values;
        if (!v.title.trim()) return;
        const payload = {
            ...v,
            slug: v.slug.trim() || slugify(v.title),
            readMinutes: Number(v.readMinutes) || 1,
            content: toParagraphs(v.content),
        };
        if (editing.mode === 'create') {
            createItem('posts', payload, 'post');
        } else {
            updateItem('posts', editing.id, payload);
        }
        close();
    };

    const onDelete = (post) => {
        if (window.confirm(`Delete "${post.title}"?`)) removeItem('posts', post.id);
    };

    return (
        <div>
            <div className="admin-panel-header">
                <div>
                    <h2>Blog Posts</h2>
                    <p>Articles shown at <code>/blog</code>. Use two newlines to separate paragraphs in the body.</p>
                </div>
                <button className="admin-btn" onClick={openNew} type="button">
                    <FiPlus /> New Post
                </button>
            </div>

            {data.posts.length === 0 ? (
                <div className="admin-empty">No posts yet.</div>
            ) : (
                <ul className="admin-list">
                    {data.posts.map((post) => (
                        <li className="admin-row" key={post.id}>
                            <div className="admin-row-thumb">
                                {post.cover && <img src={post.cover} alt="" />}
                            </div>
                            <div className="admin-row-main">
                                <div className="admin-row-title">{post.title}</div>
                                <div className="admin-row-sub">
                                    {post.date} · /{post.slug} · {(post.tags || []).join(', ')}
                                </div>
                            </div>
                            <div className="admin-row-actions">
                                <button className="admin-icon-btn" type="button" onClick={() => openEdit(post)}>
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="admin-icon-btn danger"
                                    type="button"
                                    onClick={() => onDelete(post)}
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
                        <h3>{editing.mode === 'create' ? 'New post' : 'Edit post'}</h3>
                        <div className="admin-form">
                            <div className="admin-field">
                                <label>Title</label>
                                <input
                                    value={editing.values.title}
                                    onChange={(e) => setField('title', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="admin-form-grid-2">
                                <div className="admin-field">
                                    <label>Slug (URL)</label>
                                    <input
                                        value={editing.values.slug}
                                        onChange={(e) => setField('slug', e.target.value)}
                                        placeholder="auto-generated from title"
                                    />
                                </div>
                                <div className="admin-field">
                                    <label>Author</label>
                                    <input
                                        value={editing.values.author}
                                        onChange={(e) => setField('author', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="admin-form-grid-2">
                                <div className="admin-field">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={editing.values.date}
                                        onChange={(e) => setField('date', e.target.value)}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label>Read time (minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editing.values.readMinutes}
                                        onChange={(e) => setField('readMinutes', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="admin-field">
                                <label>Cover image URL</label>
                                <input
                                    value={editing.values.cover}
                                    onChange={(e) => setField('cover', e.target.value)}
                                />
                            </div>
                            <div className="admin-field">
                                <label>Excerpt</label>
                                <textarea
                                    value={editing.values.excerpt}
                                    onChange={(e) => setField('excerpt', e.target.value)}
                                    style={{ minHeight: 80 }}
                                />
                            </div>
                            <div className="admin-field">
                                <label>Tags</label>
                                <TagInput
                                    value={editing.values.tags || []}
                                    onChange={(next) => setField('tags', next)}
                                />
                            </div>
                            <div className="admin-field">
                                <label>Content (use blank line to split paragraphs)</label>
                                <textarea
                                    value={editing.values.content}
                                    onChange={(e) => setField('content', e.target.value)}
                                    style={{ minHeight: 240 }}
                                />
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

export default AdminPosts;
