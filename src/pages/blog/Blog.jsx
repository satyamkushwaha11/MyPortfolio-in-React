import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import useReveal from '../../hooks/useReveal';
import './blog.css';

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

const BlogCard = ({ post, index }) => {
    const [ref, visible] = useReveal({ threshold: 0.15 });
    return (
        <article
            ref={ref}
            className={`blog-card ${visible ? 'reveal reveal-up' : 'reveal'}`}
            style={{ transitionDelay: `${(index % 3) * 120}ms` }}
        >
            <Link to={`/blog/${post.slug}`} className="blog-card-media">
                <img src={post.cover} alt={post.title} />
            </Link>
            <div className="blog-card-body">
                <div className="blog-card-meta">
                    <span><FiCalendar /> {formatDate(post.date)}</span>
                    <span><FiClock /> {post.readMinutes} min read</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="blog-card-title">
                    {post.title}
                </Link>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <ul className="blog-card-tags">
                    {post.tags.map((t) => (
                        <li key={t}>#{t}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

const Blog = () => {
    const [query, setQuery] = useState('');
    const [headingRef, headingVisible] = useReveal();
    const { data } = useData();
    const posts = data.posts;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return posts;
        return posts.filter((p) =>
            [p.title, p.excerpt, ...(p.tags || [])].join(' ').toLowerCase().includes(q)
        );
    }, [query, posts]);

    return (
        <div className="page-container theme-bg">
            <div className="container">
                <div
                    ref={headingRef}
                    className={`blog-hero ${headingVisible ? 'reveal reveal-up' : 'reveal'}`}
                >
                    <div className="color-orange text-[20px] font-bold mb-2">Journal</div>
                    <h1 className="text-[2.5rem] md:text-[3rem] font-bold mb-3">From the Blog</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Thoughts on React, design systems, and the tools I use every day.
                    </p>
                    <div className="blog-search">
                        <FiSearch />
                        <input
                            type="search"
                            placeholder="Search posts, tags, topics…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search blog posts"
                        />
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="blog-empty">No posts match “{query}”.</div>
                ) : (
                    <div className="blog-grid">
                        {filtered.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
