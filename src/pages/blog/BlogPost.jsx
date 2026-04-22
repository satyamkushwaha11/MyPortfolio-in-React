import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import SocialMedia from '../../components/social media/SocialMedia';
import useReveal from '../../hooks/useReveal';
import './blog.css';

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

const BlogPost = () => {
    const { slug } = useParams();
    const { data } = useData();
    const post = data.posts.find((p) => p.slug === slug);
    const [ref, visible] = useReveal();

    if (!post) {
        return (
            <div className="page-container theme-bg">
                <div className="container blog-missing">
                    <h2>Post not found</h2>
                    <p>The post you're looking for may have moved.</p>
                    <Link to="/blog" className="blog-back-link">
                        <FiArrowLeft /> Back to the blog
                    </Link>
                </div>
            </div>
        );
    }

    const related = data.posts
        .filter((p) => p.slug !== post.slug && (p.tags || []).some((t) => (post.tags || []).includes(t)))
        .slice(0, 2);

    const paragraphs = Array.isArray(post.content)
        ? post.content
        : String(post.content || '').split(/\n\n+/);

    return (
        <div className="page-container theme-bg">
            <article
                ref={ref}
                className={`container blog-post ${visible ? 'reveal reveal-up' : 'reveal'}`}
            >
                <Link to="/blog" className="blog-back-link">
                    <FiArrowLeft /> All posts
                </Link>

                <header className="blog-post-header">
                    <ul className="blog-card-tags">
                        {(post.tags || []).map((t) => (
                            <li key={t}>#{t}</li>
                        ))}
                    </ul>
                    <h1>{post.title}</h1>
                    <div className="blog-card-meta justify-center">
                        <span><FiCalendar /> {formatDate(post.date)}</span>
                        <span><FiClock /> {post.readMinutes} min read</span>
                        <span>By {post.author}</span>
                    </div>
                </header>

                <div className="blog-post-cover">
                    <img src={post.cover} alt={post.title} />
                </div>

                <div className="blog-post-body">
                    {paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>

                <div className="blog-post-share">
                    <span>Share this post:</span>
                    <SocialMedia size={22} />
                </div>

                {related.length > 0 && (
                    <aside className="blog-related">
                        <h3>Keep reading</h3>
                        <div className="blog-related-grid">
                            {related.map((p) => (
                                <Link key={p.slug} to={`/blog/${p.slug}`} className="blog-related-card">
                                    <span className="blog-related-date">{formatDate(p.date)}</span>
                                    <span className="blog-related-title">{p.title}</span>
                                </Link>
                            ))}
                        </div>
                    </aside>
                )}
            </article>
        </div>
    );
};

export default BlogPost;
