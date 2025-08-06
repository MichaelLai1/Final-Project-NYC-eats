import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm({ addPost, userId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const generateId = () => {
    return Math.random().toString(36).slice(2, 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const newPost = {
      id: generateId(),
      title,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      userId,
      secretKey,
    };
    addPost(newPost);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>

      <label>
        Title (required):
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label>
        Image URL:
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>

      <label>
        Secret Key (for editing/deleting later):
        <input
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Set a secret key"
        />
      </label>

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
