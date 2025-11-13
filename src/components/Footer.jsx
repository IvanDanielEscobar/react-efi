import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
    const navigate = useNavigate()
  return (
    <footer className="footer">
      <p>EFI. Por: Escobar Ivan y Villavicencio Jonatan.</p>
         <div>
            <span 
              className="footer-link" 
              onClick={() => navigate("/about")}
            >
              Acerca de
            </span> | 
            <span 
              className="footer-link" 
              onClick={() => navigate("/contact")}
            >
              Contacto
            </span> | 
            <span 
              className="footer-link" 
              onClick={() => window.open("https://github.com/IvanDanielEscobar/react-efi", "_blank")}
            >
              GitHub
            </span>
      </div>
    </footer>
  );
}