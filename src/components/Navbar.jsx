import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (!user) return null

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Miniblog</h1>

      <div className="navbar-links">
        <Link to="/posts">Inicio</Link>
        {user ? (
          <div>
            <span className="navbar-user">Hola, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
