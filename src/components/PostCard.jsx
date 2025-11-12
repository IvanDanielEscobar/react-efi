import React from "react";
import "../styles/PostCard.css";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-author">Publicado por <strong>{post.author}</strong></p>
      <p className="post-content">{post.content}</p>

      {post.comments && post.comments.length > 0 && (
        <div className="comments-section">
          <h4>Comentarios ({post.comments.length})</h4>
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="comment-author">{comment.author} dice:</p>
              <p className="comment-content">{comment.content}</p>
              <small className="comment-date">
                {new Date(comment.created_at).toLocaleString("es-AR")}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
