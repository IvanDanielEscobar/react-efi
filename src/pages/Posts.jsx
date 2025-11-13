import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { fetchWithToken } from "../api/api";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";
import  CreatePost  from "../components/CreatePost";
import "../styles/PostCard.css";



export default function Posts() {
  const { token, user } = useAuth()
  const [ posts, setPosts ] = useState([]);
  
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchWithToken("/posts");
        setPosts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    if (token) {
    loadPosts();
    }
  }, [token]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev])
  }

  const handlePostUpdated = (postId, updatedData) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, ...updatedData } : p));
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return (
    <div className="posts-container">
      <CreatePost className="create-posts" onPostCreated={handlePostCreated} />
      <h2 className="title-header-posts"> Últimas publicaciones</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <PostCard 
          key={post.id} 
          post={post}
          onPostUpdate={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
          />
        ))}
      </div>
    </div>
  );
}
