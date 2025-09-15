import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from './Navigation';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${id}`, {
        credentials: 'omit'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Blog post not found');
        } else {
          setError('Failed to load blog post');
        }
        return;
      }
      
      const blogData = await response.json();
      setBlog(blogData);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navigation />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navigation />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Blog Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    // Convert line breaks to <br> tags and handle basic formatting
    return content
      .split('\n\n')
      .map((paragraph, index) => (
        <p key={index} style={{ marginBottom: '1rem' }}>
          {paragraph.split('\n').map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < paragraph.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      ));
  };

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Section */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Blog Post</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/">Blog</Link>
                  <span>{blog.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Detail Section */}
      <section className="blog-detail spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="blog__detail__content">
                {/* Featured Image */}
                <div className="blog__detail__pic">
                  <img src={blog.image} alt={blog.title} className="img-fluid" style={{ width: '100%', borderRadius: '8px' }} />
                </div>

                {/* Blog Meta */}
                <div className="blog__detail__meta">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <span className="blog__detail__date">
                        <i className="fa fa-calendar"></i> {formatDate(blog.date)}
                      </span>
                      <span className="blog__detail__author">
                        <i className="fa fa-user"></i> {blog.author}
                      </span>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <span className="blog__detail__category badge bg-primary">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blog Title */}
                <h1 className="blog__detail__title" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                  {blog.title}
                </h1>

                {/* Blog Excerpt */}
                <div className="blog__detail__excerpt" style={{ 
                  fontSize: '1.1rem', 
                  color: '#666', 
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  {blog.excerpt}
                </div>

                {/* Blog Content */}
                <div className="blog__detail__content-text" style={{ 
                  lineHeight: '1.8',
                  fontSize: '1rem'
                }}>
                  {formatContent(blog.content)}
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="blog__detail__tags" style={{ marginTop: '2rem' }}>
                    <h6>Tags:</h6>
                    <div className="tag-list">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary me-2 mb-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to Blog */}
                <div className="blog__detail__back" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                  <Link to="/" className="btn btn-primary">
                    <i className="fa fa-arrow-left"></i> Back to Home
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-md-4">
              <div className="blog__sidebar">
                {/* Author Info */}
                <div className="blog__sidebar__item">
                  <h5>About the Author</h5>
                  <div className="author-info" style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <p><strong>{blog.author}</strong></p>
                    <p className="text-muted">Published on {formatDate(blog.date)}</p>
                  </div>
                </div>

                {/* Category Info */}
                <div className="blog__sidebar__item">
                  <h5>Category</h5>
                  <div className="category-info" style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <span className="badge bg-primary">{blog.category}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="blog__sidebar__item">
                  <h5>Share this Post</h5>
                  <div className="share-buttons" style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <button 
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => {
                        const url = window.location.href;
                        navigator.clipboard.writeText(url);
                        alert('Link copied to clipboard!');
                      }}
                    >
                      <i className="fa fa-link"></i> Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;


