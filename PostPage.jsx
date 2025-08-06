import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostPage.css";

function PostPage({ posts, updatePost, deletePost, userId }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const navigate = useNavigate();

  const [secretKeyInput, setSecretKeyInput] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");
  const [newComment, setNewComment] = useState("");

  if (!post) return <p className="not-found">Post not found.</p>;

  const verifyKey = () => {
    if (secretKeyInput === post.secretKey || userId === post.userId) {
      setCanEdit(true);
      alert("Access granted to edit/delete this post.");
    } else {
      alert("Incorrect secret key and you are not the author.");
    }
    setSecretKeyInput("");
  };

  const handleUpdate = () => {
    updatePost({ ...post, title, content, imageUrl });
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
      navigate("/");
    }
  };

  const handleUpvote = () => {
    updatePost({ ...post, upvotes: (post.upvotes || 0) + 1 });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedPost = {
      ...post,
      comments: [
        ...(post.comments || []),
        {
          id: Math.random().toString(36).slice(2, 9),
          text: newComment,
          author: userId,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    updatePost(updatedPost);
    setNewComment("");
  };

  return (
    <article className="post-page">
      <header>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-author">
          Posted by <strong>{post.userId}</strong>
        </p>
      </header>

      {!canEdit && (
        <section className="secret-key-section">
          <input
            type="password"
            className="input-secret"
            placeholder="Enter secret key"
            value={secretKeyInput}
            onChange={(e) => setSecretKeyInput(e.target.value)}
            aria-label="Secret key input"
          />
          <button onClick={verifyKey} className="btn btn-primary">
            Unlock Edit/Delete
          </button>
        </section>
      )}

      {canEdit && !editing && (
        <section className="edit-controls">
          <button onClick={() => setEditing(true)} className="btn btn-secondary">
            Edit Post
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Post
          </button>
        </section>
      )}

      {editing && (
        <form
          className="edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <label className="form-label">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </label>

          <label className="form-label">
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
            />
          </label>

          <label className="form-label">
            Image URL:
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="form-input"
            />
          </label>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!editing && (
        <section className="post-content">
          {content && <p>{content}</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Post related" className="post-image" />
          )}

          <div className="upvote-section">
            <p className="upvote-count">Upvotes: {post.upvotes || 0}</p>
            <button onClick={handleUpvote} className="btn btn-upvote" aria-label="Upvote post">
              ▲ Upvote
            </button>
          </div>
        </section>
      )}

      {/* Comment Section */}
      <section className="comment-section">
        <h3>Comments</h3>

        <form className="comment-form" onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
            className="form-textarea"
          />
          <button type="submit" className="btn btn-primary">Add Comment</button>
        </form>

        <ul className="comment-list">
          {(post.comments || []).map((comment) => (
            <li key={comment.id} className="comment">
              <p>{comment.text}</p>
              <small>
                By <strong>{comment.author}</strong> • {new Date(comment.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default PostPage;
