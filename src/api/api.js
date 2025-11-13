const API_URL = "http://localhost:5000";

export async function fetchWithToken(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Error en la solicitud");
  }

  return response.status === 204 ? {} : response.json();
}

// posts
export async function getPosts() {
  return fetchWithToken("/posts");
}

export async function createPost(postData) {
  return fetchWithToken("/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}


// comentarios
export async function getComments(postId) {
  return fetchWithToken(`/posts/${postId}/comments`);
}

export async function createComment(postId, content) {
  return fetchWithToken(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function updateComment(commentId, data) {
  return fetchWithToken(`/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteComment(commentId) {
  return fetchWithToken(`/comments/${commentId}`, {
    method: "DELETE",
  });
}