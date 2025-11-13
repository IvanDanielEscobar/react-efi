import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import { Fragment } from 'react'
import { useAuth } from "./context/AuthContext"
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function App() {
  const { user } = useAuth()
  return (
    <div>
      <Navbar />
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
