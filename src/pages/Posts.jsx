// src/components/Posts.jsx
import { useEffect, useState } from "react";
import { fetchWithToken } from "../api/api";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";
import "../styles/PostCard.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchWithToken("/posts");
        setPosts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="posts-container">
      <h2>Últimas publicaciones</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
