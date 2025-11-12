import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import { Fragment } from 'react'
import { useAuth } from "./context/AuthContext"
import "./styles.css"

export default function App() {
  const { user } = useAuth()
  return (
    <div>
      <Navbar />
      {user && <div style={{ marginTop: 90, backgroundClip: 'transparent'}}></div>}
      <Routes>
        {!user ? (
        <Fragment>
          <Route path="/" element={<Home />} />
          <Route path="/registrarse" element={<RegisterForm />} />
          <Route path="/loguearse" element={<Login />} />
        </Fragment>
        ) : (
        <Fragment>
          <Route path="/posts" element={<Posts />} />
        </Fragment>
        )}
        </Routes>
    </div>
  );
}
