import React, { useState, useEffect } from "react";
import "../css/Forum.css"; // Add custom styles for the forum

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch all posts
  useEffect(() => {
    fetch("http://localhost:5000/forum")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Handle new post submission
  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost }),
      });

      if (response.ok) {
        const createdPost = await response.json();
        setPosts([createdPost, ...posts]); // Add new post to the top
        setNewPost(""); // Reset input field
      }
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  return (
    <section className="forum">
      <h1 className="forum-title">Public Forum</h1>
      <form onSubmit={handleNewPost} className="forum-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something..."
          rows="4"
          className="forum-textarea"
        ></textarea>
        <button type="submit" className="forum-submit-btn">
          Post
        </button>
      </form>

      <div className="forum-posts">
        {posts.map((post) => (
          <div key={post.id} className="forum-post">
            <p className="forum-post-content">{post.content}</p>
            <p className="forum-post-date">{new Date(post.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forum;