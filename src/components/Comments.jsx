import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createComment, getComments, updateComment, deleteComment } from "../api/api";
import { toast } from "react-toastify";
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputTextarea } from "primereact/inputtextarea"
import "../styles/PostCard.css"

export default function CommentSection({ postId }) {
  const { user, token } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
    
  // modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");


  // cargar comentarios
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadComments();
  }, [postId]);


  // eliminar comentario
  const handleDeleteComment = async (commentId) => {
  if (!window.confirm("¿Seguro que quieres eliminar este comentario?")) return;
  try {
    await deleteComment(commentId);
    setComments(prev => prev.filter(c => c.id !== commentId));
    toast.success("Comentario eliminado");
  } catch (error) {
    toast.error(error.message);
  }
};
  // nuevo comentario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return

    try {
      const newComment = await createComment(postId, { content })
      setComments((prev) => [...prev, newComment]); // agrega el nuevo comentario al final
      setContent("");
      toast.success("Comentario publicado");
    } catch (error) {
      toast.error("Error al publicar el comentario", error);
    }
  };
    
  // abrir modal de edición
  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setEditContent(comment.content);
    setEditModalVisible(true);
  };

  // editar
  const handleEditSubmit = async () => {
    if (!editContent.trim()) return;
    try {
      const updated = await updateComment(editingComment.id, { content: editContent });
      setComments(prev => prev.map(c => c.id === editingComment.id ? { ...c, content: updated.content } : c));
      setEditModalVisible(false);
      toast.success("Comentario actualizado");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="comments-section" style={{ color: 'black'}}>
      <h2>Comentarios ({comments.length})</h2>

      {comments.length === 0 && <p>No hay comentarios aún.</p>}

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
            <section className="top-comment">
            <p className="comment-author">
              <strong>{comment.author} - </strong><small>{new Date(comment.created_at).toLocaleString("es-AR")}</small>
            </p>
            <div className="buttons-posts">
            {user?.id === comment.user_id && (
              <Button onClick={() => handleEditClick(comment)}><i className="pi pi-pencil"></i></Button>
            )}
            {(user?.id === comment.user_id || user?.role === "admin") && (
              <Button onClick={() => handleDeleteComment(comment.id)} text><i className="pi pi-trash"></i></Button>
            )}
            </div>
            </section>
            <p>{comment.content}</p>
            
        </div>
      ))}

      {token && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe un comentario..."
            rows="3"
            className="textarea-field"
          />
          <div className="comentar">
            <Button type="submit" className="pi pi-comment" text/>
          </div>
        </form>
      )}
      {/* Modal de edición */}
      <Dialog 
        header="Editar comentario" 
        visible={editModalVisible} 
        onHide={() => setEditModalVisible(false)}
        modal
      >
        <InputTextarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
          autoResize
        />
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <Button label="Cancelar" className="p-button-text" onClick={() => setEditModalVisible(false)} />
          <Button label="Guardar" onClick={handleEditSubmit} />
        </div>
      </Dialog>

    </div>
  );
}