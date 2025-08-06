import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";
import PostPage from "./components/PostPage.jsx";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = `user_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const addPost = (post) => setPosts((prev) => [post, ...prev]);
  const updatePost = (updatedPost) =>
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  const deletePost = (id) =>
    setPosts((prev) => prev.filter((post) => post.id !== id));

  return (
    <div>
      <header className="navbar">
        <h1 className="app-title">NYC Eats 🍔</h1>
        <nav className="nav-links">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/create" className="nav-btn">Create Post</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/create" element={<PostForm addPost={addPost} userId={userId} />} />
          <Route
            path="/posts/:id"
            element={
              <PostPage
                posts={posts}
                updatePost={updatePost}
                deletePost={deletePost}
                userId={userId}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
