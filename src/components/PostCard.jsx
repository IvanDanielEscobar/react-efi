import React, { useState } from "react";
import CommentSection from "./Comments";
import { Button } from "primereact/button";
import "../styles/PostCard.css";
import { useAuth } from "../context/AuthContext";
import { fetchWithToken } from "../api/api";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

export default function PostCard({ post, onPostDeleted, onPostUpdate }) {
  const { user, token } = useAuth()

  // modal 
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

    // abrir modal
  const handleEditClick = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditModalVisible(true);
  };

  //editar
  const handleEditSubmit = async () => {
    try {
      const response = await fetchWithToken(`/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      toast.success("Post actualizado");
      if (onPostUpdate) onPostUpdate(post.id, { title: editTitle, content: editContent });
      setEditModalVisible(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // eliminar post
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este post?")) return;
    try {
      await fetchWithToken(`/posts/${post.id}`, { method: "DELETE" });
      toast.success("Post eliminado");
      if (onPostDeleted) onPostDeleted(post.id); // actualizar lista
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-author">
        Publicado por <strong>{post.author}</strong>
      </p>
      <p className="post-content">{post.content}</p>
      <p 
      className=""
      style={{ color: 'black'}}
      >
        {new Date(post.created_at).toLocaleString("es-AR")}
      </p>
      {user?.id === post.user_id && (
        <Button onClick={handleEditClick} >Editar</Button>
      )}
      {(user?.id === post.user_id || user?.role === "admin")&&(
        <Button onClick={handleDelete}>Eliminar</Button>
      )}
      <CommentSection postId={post.id} />

      {/* modal */}
      <Dialog 
        header="Editar post" 
        visible={editModalVisible} 
        onHide={() => setEditModalVisible(false)} 
        modal
      >
        <input 
          type="text" 
          value={editTitle} 
          onChange={(e) => setEditTitle(e.target.value)} 
          placeholder="Título" 
          style={{ width: "100%", marginBottom: "1rem" }} 
        />
        <InputTextarea 
          value={editContent} 
          onChange={(e) => setEditContent(e.target.value)} 
          rows={5} 
          autoResize 
        />
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <Button label="Cancelar" className="p-button-text" onClick={() => setEditModalVisible(false)} />
          <Button label="Guardar" onClick={handleEditSubmit} />
        </div>
      </Dialog>
    </div>
  );
}
