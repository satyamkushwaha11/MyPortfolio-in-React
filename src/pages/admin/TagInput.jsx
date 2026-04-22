import React, { useState } from 'react';

const TagInput = ({ value = [], onChange, placeholder = 'Add tag and press Enter' }) => {
    const [draft, setDraft] = useState('');

    const addTag = () => {
        const t = draft.trim();
        if (!t) return;
        if (value.includes(t)) {
            setDraft('');
            return;
        }
        onChange([...value, t]);
        setDraft('');
    };

    const removeTag = (tag) => {
        onChange(value.filter((v) => v !== tag));
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !draft && value.length) {
            onChange(value.slice(0, -1));
        }
    };

    return (
        <div className="admin-tag-input">
            {value.map((tag) => (
                <span key={tag} className="admin-tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                        ×
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={addTag}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TagInput;
