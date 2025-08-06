import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('time'); // 'time' or 'upvotes'

  // Filter posts by search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort posts
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'upvotes') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return 0;
  });

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '60%', marginRight: '10px' }}
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="time">Sort by Newest</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      {sortedPosts.length === 0 && <p>No restaurants found.</p>}

      <ul className="post-list">
  {sortedPosts.map(post => (
    <li key={post.id} className="post-card">
      <Link to={`/posts/${post.id}`} className="post-link">
        {post.title}
      </Link>
      <div className="post-meta">
        Created: {formatDate(post.createdAt)} | Upvotes: {post.upvotes || 0}
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}

export default PostList;
